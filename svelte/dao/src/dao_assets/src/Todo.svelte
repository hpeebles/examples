<script lang="ts">
  import type { Todo } from "../../declarations/todo/todo.did";
  import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";
  import FaCheckCircle from "svelte-icons/fa/FaCheckCircle.svelte";
  import { createEventDispatcher } from "svelte";

  export let todo: Todo;
  const dispatch = createEventDispatcher();

  function deleteTodo() {
    dispatch("deleteTodo", todo);
  }

  function completeTodo() {
    dispatch("completeTodo", todo);
  }
</script>

<div class="todo-wrapper" class:done={todo.done}>
  <div class="desc">
    {todo.description}
  </div>
  <div class="actions">
    <div class="icon complete" on:click={completeTodo}>
      <FaCheckCircle />
    </div>
    <div class="icon delete" on:click={deleteTodo}>
      <FaRegTrashAlt />
    </div>
  </div>
</div>

<style>
  .todo-wrapper {
    display: flex;
    justify-content: space-between;
    background-color: #efefef;
    padding: 15px;
    margin-bottom: 10px;
  }

  .todo-wrapper.done {
    background-color: #dedede;
  }

  .desc {
    flex: auto;
  }

  .todo-wrapper.done .desc {
    text-decoration: line-through;
  }

  .actions {
    flex: 0 0 40px;
    display: flex;
  }

  .icon {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  .delete {
    color: red;
  }

  .complete {
    color: seagreen;
    margin-right: 5px;
  }
</style>
