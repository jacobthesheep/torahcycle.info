import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";

export default defineConfig({
  site: "https://torahcycle-info.vercel.app/",
  output: "server",
  adapter: vercel(),
  integrations: [svelte()]
});
