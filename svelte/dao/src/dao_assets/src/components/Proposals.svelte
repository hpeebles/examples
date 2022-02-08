<script lang="ts">
    import Proposal from "./Proposal.svelte";
    import { proposals } from "../stores/proposals";
</script>

<div class="proposals">
    {#each $proposals as proposal, i}
        <Proposal {proposal} on:voteCast />
        {#if i < $proposals.length - 1}
            <hr>
        {/if}
    {/each}
</div>

<style>
    hr {
        width: 25%;
        border: 0;
        border-top: 1px solid #ddd;
    }
</style>
