<script lang="ts">
  import Auth from "./components/Auth.svelte";
  import { identity } from "./stores/identity";
  import Accordion from "./components/Accordion.svelte";
  import AccordionItem from "./components/AccordionItem.svelte";
  import Accounts from "./components/Accounts.svelte";
  import { accounts } from "./stores/accounts";
  import { listAccounts } from "./daoClient";
  import Transfer from "./components/Transfer.svelte";
  import SubmitProposal from "./components/SubmitProposal.svelte";

  $: isLoggedIn = !$identity.getPrincipal().isAnonymous();

  $: if (isLoggedIn) {
    refreshAccounts();
  }

  async function refreshAccounts() {
    accounts.set(await listAccounts());
  }

  let openedAccordion = undefined;
  const toggleAccordion = e => (openedAccordion = e.detail == openedAccordion ? undefined : e.detail);
</script>

<main>
  <h1>BASIC DAO</h1>

  <div class="container">
    <Auth />
    {#if isLoggedIn}
      <Accordion>
        <AccordionItem id="user-id" isOpen={openedAccordion === "user-id"} on:toggleAccordion={toggleAccordion}>
          <div slot="title" class="acc-header">
            <span class="valign-wrapper left">UserId</span>
          </div>
          <span>{$identity.getPrincipal().toString()}</span>
        </AccordionItem>
        <AccordionItem id="accounts" isOpen={openedAccordion === "accounts"} on:toggleAccordion={toggleAccordion}>
          <div slot="title" class="acc-header">
            <span class="valign-wrapper left">Accounts</span>
          </div>
          <Accounts />
        </AccordionItem>
        <AccordionItem id="transfer" isOpen={openedAccordion === "transfer"} on:toggleAccordion={toggleAccordion}>
          <div slot="title" class="acc-header">
            <span class="valign-wrapper left">Transfer</span>
          </div>
          <Transfer on:transferComplete={refreshAccounts} />
        </AccordionItem>
        <AccordionItem id="submitProposal" isOpen={openedAccordion === "submitProposal"} on:toggleAccordion={toggleAccordion}>
          <div slot="title" class="acc-header">
            <span class="valign-wrapper left">Submit Proposal</span>
          </div>
          <SubmitProposal />
        </AccordionItem>
      </Accordion>
    {/if}
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 360px;
    margin: 0 auto;
  }

  .container {
    margin: auto;
    width: 400px;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 20px;
  }

  main {
    max-width: none;
  }

  .acc-header {
    width: 100%;
  }
</style>
