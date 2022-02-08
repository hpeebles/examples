<script lang="ts">
    import { submitProposal } from "../daoClient";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let loading = false;
    let newFeeE8sString = "";

    async function handleSubmitProposal() {
        const newFeeE8s = BigInt(newFeeE8sString);
        loading = true;
        try {
            await submitProposal(newFeeE8s);
            dispatch("proposalSubmitted");
        } finally {
            loading = false;
            newFeeE8sString = "";
        }
    }
</script>

<div class="submitProposal">
    <label>New Transfer Fee (E8s):</label><input type="text" bind:value={newFeeE8sString} />
    <button on:click={handleSubmitProposal}>Submit</button>
</div>

<style>
</style>
