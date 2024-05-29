import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sitemap()],
  output: 'server',
  adapter: vercel({
    maxDuration: 250,
    //isr: {
    //  bypassToken: "161556d774a8161556d774a8161556d774a8",
    //  exclude: [ "/", "/kategorije/[...slug]" ]
    //},
  })
});