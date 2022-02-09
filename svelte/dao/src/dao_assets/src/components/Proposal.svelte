<script lang="ts">
    import type { Proposal } from "../../../declarations/dao/dao.did";
    import { identity } from "../stores/identity";
    import { vote } from "../daoClient";
    import { createEventDispatcher } from "svelte";
    import { decode } from "../payloadEncoder";

    const dispatch = createEventDispatcher();

    export let proposal: Proposal;

    let principal = $identity.getPrincipal();

    let payload = decode(proposal.payload.message);

    $: canVote = "open" in proposal.state && !proposal.voters.some(([p, _]) => p === principal);
    let loading = false;

    async function handleVote(yes: boolean) {
        loading = true;
        try {
            await vote(proposal.id, yes);
            dispatch("voteCast");
        } finally {
            loading = false;
        }
    }
</script>

<div class="proposal">
    <label>Id: <span>{proposal.id.toString()}</span></label>
    <label>Proposer: <span>{proposal.proposer.toString()}</span></label>
    <label>State: <span>{Object.keys(proposal.state)[0]}</span></label>
    <label>Yes Votes: <span>{proposal.votes_yes.amount_e8s}</span></label>
    <label>No Votes: <span>{proposal.votes_no.amount_e8s}</span></label>
    <label>New Transfer Fee (E8s): <span>{payload.transfer_fee[0].amount_e8s}</span></label>
    <button disabled={!canVote} on:click={() => handleVote(true)}>Yes</button>
    <button disabled={!canVote} on:click={() => handleVote(false)}>No</button>
</div>

<style>
    .proposal {
        padding: 1rem;
    }

    .proposal:first-child {
        padding-top: 0;
    }

    .proposal:last-child {
        padding-bottom: 0;
    }
</style>
