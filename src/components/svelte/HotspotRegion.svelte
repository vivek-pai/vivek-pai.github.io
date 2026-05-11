<script lang="ts">
  import type { Hotspot } from '@lib/types';
  import { navigate } from 'astro:transitions/client';

  export let hotspot: Hotspot;
  export let onHover: (id: string | null) => void = () => {};

  function handleClick() {
    if (hotspot.active && hotspot.href) {
      navigate(hotspot.href);
    }
  }

  function handleKey(e: KeyboardEvent) {
    if ((e.key === 'Enter' || e.key === ' ') && hotspot.active) {
      handleClick();
    }
  }
</script>

{#if hotspot.active}
  <g
    class="hotspot hotspot--active"
    role="button"
    tabindex="0"
    aria-label="Navigate to {hotspot.label} — {hotspot.sublabel}"
    on:click={handleClick}
    on:keydown={handleKey}
    on:mouseenter={() => onHover(hotspot.id)}
    on:mouseleave={() => onHover(null)}
  >
    <slot />
  </g>
{:else}
  <g class="hotspot hotspot--silent" aria-hidden="true" style="pointer-events:none">
    <slot />
  </g>
{/if}

<style>
  .hotspot--active {
    cursor: pointer;
  }
  .hotspot--active:focus {
    outline: none;
  }
  .hotspot--active:focus-visible :global(.hotspot-outline) {
    stroke: var(--color-accent, #da4f2e);
    stroke-width: 1.5;
    opacity: 1;
  }
</style>
