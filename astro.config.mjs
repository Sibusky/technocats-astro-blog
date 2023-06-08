import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  site: "https://astro-technocats.netlify.app/",
  integrations: [
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    sitemap(),
    react(),
  ],
  output: "server",
  adapter: netlify(),
});
