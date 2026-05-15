import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import lit from '@astrojs/lit';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://vivekrpai.com',
  output: 'static',
  integrations: [mdx(), svelte(), lit()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    ssr: {
      external: ['@lit-labs/ssr-dom-shim'],
    },
  },
  // Use legacy content collections API (Astro 5 compat)
  legacy: {
    collections: true,
  },
});
