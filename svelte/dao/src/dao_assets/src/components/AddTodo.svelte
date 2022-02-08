<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let busy: boolean;

  const dispatch = createEventDispatcher();

  let todoText: string;
  let inp: HTMLInputElement;

  onMount(() => inp.focus());

  function addTodo() {
    dispatch("addTodo", todoText);
    todoText = "";
  }
</script>

<form class="add-todo" on:submit|preventDefault={addTodo}>
  <input
    disabled={busy}
    bind:this={inp}
    type="text"
    placeholder="enter a todo ..."
    bind:value={todoText}
  />
  <button>{busy ? "Busy..." : "Add todo"}</button>
</form>

<style>
  .add-todo {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
  }

  button {
    flex: 0 0 100px;
  }
  input {
    flex: auto;
    margin-right: 5px;
    outline: none;
  }
</style>
