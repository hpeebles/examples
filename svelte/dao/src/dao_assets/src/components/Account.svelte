<script lang="ts">
    import type { Account as AccountType } from "../../../declarations/dao/dao.did";

    export let account: AccountType;
</script>

<div class="account">
    <div>{account.owner.toString()}</div>
    <div>{account.tokens.amount_e8s}</div>
</div>

<style>
</style>
