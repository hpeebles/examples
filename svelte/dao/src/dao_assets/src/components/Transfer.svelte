<script lang="ts">
    import { Principal } from "@dfinity/principal";
    import { transfer } from "../daoClient";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let loading = false;
    let toString = "";
    let amountE8sString = "";

    async function handleTransfer() {
        const to = Principal.fromText(toString);
        const amountE8s = BigInt(amountE8sString);

        await transfer(to, amountE8s);
        dispatch("transferComplete");
        toString = "";
        amountE8sString = "";
    }
</script>

<div class="transfer">
    <label>To:</label><input type="text" bind:value={toString} />
    <label>Amount (E8s):</label><input type="text" bind:value={amountE8sString} />
    <button on:click={handleTransfer}>Send</button>
</div>

<style>
</style>
