<script lang="ts">
  import type { Todo as TodoType } from "../../declarations/todo/todo.did";
  import Todo from "./Todo.svelte";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { elasticOut } from "svelte/easing";

  export let todos: TodoType[] = [];

  $: empty = todos.length === 0;
</script>

<div class="todos" class:relax={empty}>
  {#if empty}
    <div class="idle">relax...</div>
  {:else}
    {#each todos as todo, _i (todo.id)}
      <div
        class="todo"
        animate:flip={{ duration: 600, easing: elasticOut }}
        out:fade|local={{ duration: 150 }}
      >
        <Todo {todo} on:deleteTodo on:completeTodo />
      </div>
    {/each}
  {/if}
</div>

<style>
  .todos {
    padding: 10px;
    border: 1px solid #dddddd;
    margin: auto;
    min-height: 450px;
    text-align: left;
    overflow: scroll;
  }

  .relax {
    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.8)
      ),
      url("../assets/cat.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .todos.relax {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .idle {
    text-align: center;
    text-transform: uppercase;
    text-shadow: 1px 1px 1px #000;
    color: #fff;
    font-size: 4em;
    font-weight: 100;
  }
</style>
