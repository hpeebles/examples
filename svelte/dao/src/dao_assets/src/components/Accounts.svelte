<script lang="ts">
    import Account from "./Account.svelte";
    import { accounts } from "../stores/accounts";

</script>

<div class="accounts">
    {#each $accounts as account}
        <Account {account} />
    {/each}
</div>

<style>
</style>
