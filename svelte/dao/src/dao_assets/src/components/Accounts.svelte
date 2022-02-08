<script lang="ts">
    import Account from "./Account.svelte";
    import { accounts } from "../stores/accounts";
</script>

<div class="accounts">
    {#each $accounts as account, i}
        <Account {account} />
        {#if i < $accounts.length - 1}
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
