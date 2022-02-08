<script lang="ts">
    import type { Account as Account } from "../../../declarations/dao/dao.did";

    export let account: Account;
</script>

<div class="account">
    <label>Address: <span>{account.owner.toString()}</span></label>
    <label>Balance (E8s): <span>{account.tokens.amount_e8s}</span></label>
</div>

<style>
    .account {
        padding: 1rem;
    }

    .account:first-child {
        padding-top: 0;
    }

    .account:last-child {
        padding-bottom: 0;
    }
</style>
