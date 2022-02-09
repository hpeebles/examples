<script lang="ts">
    import { accounts } from "../stores/accounts";
</script>

<div class="accounts">
    <table>
        <tr>
            <th>Account</th>
            <th>Balance (E8s)</th>
        </tr>
        {#each $accounts as account}
            <tr>
                <td>{account.owner.toString()}</td>
                <td>{account.tokens.amount_e8s}</td>
            </tr>
        {/each}
    </table>
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
</style>
