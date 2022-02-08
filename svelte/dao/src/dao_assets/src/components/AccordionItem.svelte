<script>
    import { slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let id;
    export let isOpen;
</script>

<div class="accordion-item" on:click={() => dispatch('toggleAccordion', id)} >
    <slot name="title" />
</div>

{#if isOpen }
    <div class="collapsible-body" transition:slide|local>
        <slot />
    </div>
{/if}

<style>
    .accordion-item {
        display: flex;
        cursor: pointer;
        line-height: 1.5;
        padding: 1rem;
        border-bottom: 1px solid #ddd;
    }

    .collapsible-body {
        display: block;
        line-height: 1.5;
        padding: 1rem;
        border-bottom: 1px solid #ddd;
    }
</style>
