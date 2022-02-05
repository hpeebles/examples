<script lang="ts">
  export let all: boolean;
  export let active: boolean;
  export let completed: boolean;
</script>

<div class="filter">
  <div
    class="toggle"
    class:on={all}
    on:click={() => {
      all = true;
      active = false;
      completed = false;
    }}
  >
    All
  </div>
  <div
    class="toggle"
    class:on={active}
    on:click={() => {
      all = false;
      active = true;
      completed = false;
    }}
  >
    Active
  </div>
  <div
    class="toggle"
    class:on={completed}
    on:click={() => {
      all = false;
      active = false;
      completed = true;
    }}
  >
    Completed
  </div>
</div>

<style>
  .filter {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .toggle {
    width: 50%;
    text-transform: uppercase;
    font-weight: 100;
    font-size: 0.9em;
    padding: 10px;
    border-radius: 25px;
    color: red;
    border: 1px solid red;
    margin: 0 5px;
  }

  .toggle.on {
    color: white;
    border: 1px solid red;
    background-color: red;
  }
</style>
