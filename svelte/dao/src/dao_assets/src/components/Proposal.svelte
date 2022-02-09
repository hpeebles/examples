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
    <table>
        <tr>
            <td>Id</td>
            <td>{proposal.id.toString()}</td>
        </tr>
        <tr>
            <td>Proposer</td>
            <td>{proposal.proposer.toString()}</td>
        </tr>
        <tr>
            <td>State</td>
            <td>{Object.keys(proposal.state)[0]}</td>
        </tr>
        <tr>
            <td>Yes Votes</td>
            <td>{proposal.votes_yes.amount_e8s}</td>
        </tr>
        <tr>
            <td>No Votes</td>
            <td>{proposal.votes_no.amount_e8s}</td>
        </tr>
        <tr>
            <td>New Transfer Fee (E8s)</td>
            <td>{payload.transfer_fee[0].amount_e8s}</td>
        </tr>
    </table>
    <button disabled={!canVote} on:click={() => handleVote(true)}>Yes</button>
    <button disabled={!canVote} on:click={() => handleVote(false)}>No</button>
</div>

<style>
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 4px;
    }

    table {
        margin: 0 auto;
    }

    td {
        text-align: initial;
    }

    button {
        margin-top: 8px;
    }
</style>
