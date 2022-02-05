<script lang="ts">
  import { onMount } from "svelte";
  import { dao } from "../../declarations/dao";

  let busy: boolean = false;
  let all = true;
  let active = false;
  let completed = false;

  onMount(listAccounts);

  function listAccounts() {
    busy = false;
    dao.list_accounts().then((result) => (console.log(result)));
  }
</script>

<main>
  <h1>Things to do</h1>

  <div class="container">

  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  .container {
    margin: auto;
    width: 400px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 20px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
