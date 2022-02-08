<script>
  import { AuthClient } from "@dfinity/auth-client";
  import { onMount } from "svelte";
  import { identity } from "../stores/identity";

  /** @type {AuthClient} */
  let client;

  $: isLoggedIn = !$identity.getPrincipal().isAnonymous();

  onMount(async () => {
    client = await AuthClient.create();
    if (await client.isAuthenticated()) {
      handleAuth();
    }
  });

  function handleAuth() {
    console.log(client.getIdentity());
    identity.set(client.getIdentity());
  }

  function login() {
    client.login({
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://${process.env.INTERNET_IDENTITY_CANISTER_ID}.localhost:8000/#authorize`,
      onSuccess: handleAuth,
    });
  }

  async function logout() {
    await client.logout();
    identity.logOut();
  }
</script>

<div class="container">
  {#if isLoggedIn}
    <div>
      <button on:click={logout}>Log out</button>
    </div>
  {:else}
    <button on:click={login}>Authenticate with Internet Identity</button>
  {/if}
</div>

<style>
  .container {
    margin: 64px 0;
  }

  .principal-info {
    margin-top: 32px;
  }
</style>
