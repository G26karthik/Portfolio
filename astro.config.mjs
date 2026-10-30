import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE: the one place the domain lives (canonical, sitemap, OG URLs).
export default defineConfig({
  site: 'https://g26karthik.dev',
  integrations: [sitemap({ filter: (page) => !page.includes('/poster') })],
  build: { inlineStylesheets: 'auto' },
});
