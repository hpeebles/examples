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
        loading = true;
        try {
            await transfer(to, amountE8s);
            dispatch("transferComplete");
        } finally {
            loading = false;
            toString = "";
            amountE8sString = "";
        }
    }
</script>

<div class="transfer">
    <label>To: <input class="inputTo" type="text" bind:value={toString} /></label>
    <label>Amount (E8s): <input type="text" bind:value={amountE8sString} /></label>
    <button on:click={handleTransfer}>Send</button>
</div>

<style>
    .inputTo {
        width: 90%;
    }
</style>
