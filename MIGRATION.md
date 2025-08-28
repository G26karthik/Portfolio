# Migration to React or Next.js with GitHub Pages

This guide gives you two solid paths to modernize your portfolio while keeping GitHub Pages hosting.

## Option A — React (Vite) + GitHub Pages

Pros: Simple, fast dev server, easy deploy. Cons: Manual SEO/OG tags per page unless using a static site approach.

1) Scaffold
- npm create vite@latest portfolio-react -- --template react
- cd portfolio-react
- npm install

2) Base path for GitHub Pages
- In vite.config.ts/js:
  export default defineConfig({ base: '/Portfolio/' })

3) Port content
- Move assets to public/ or src/assets.
- Create pages as components: Home, Projects, Skills, Experience, Certifications.
- Use react-helmet-async for SEO meta and JSON-LD.
- Keep AOS/GSAP or switch to framer-motion.

4) Deploy to Pages
- npm i -D gh-pages
- In package.json:
  "homepage": "https://g26karthik.github.io/Portfolio/",
  "scripts": { "predeploy": "npm run build", "deploy": "gh-pages -d dist" }
- npm run build; npm run deploy

## Option B — Next.js static export + GitHub Pages

Pros: Best SEO with <Head/>, file-based routing, easy static export. Cons: Dynamic features need static-friendly patterns.

1) Scaffold
- npx create-next-app@latest portfolio-next --ts --eslint
- cd portfolio-next
- npm install

2) Configure for Pages export
- next.config.ts/js:
  const isProd = process.env.NODE_ENV === 'production'
  const basePath = '/Portfolio'
  module.exports = {
    output: 'export',
    images: { unoptimized: true },
    assetPrefix: isProd ? basePath + '/' : '',
    basePath: isProd ? basePath : '',
    trailingSlash: true
  }

3) Add pages
- pages/index.tsx, pages/projects.tsx, pages/skills.tsx, pages/experience.tsx, pages/certifications.tsx
- Use next/head for SEO and JSON-LD.
- Put static images in public/; reference with basePath-aware URLs.

4) Deploy to Pages
- Add to package.json:
  "scripts": { "export": "next build && next export", "deploy": "npm run export && gh-pages -d out" }
- npm i -D gh-pages
- npm run export; npm run deploy

5) GitHub Actions (optional, automated)
- Create .github/workflows/pages.yml that runs npm ci, npm run export, then deploys /out to gh-pages.

## Porting Notes
- Canonical/OG/Twitter: replicate in Head per page.
- CSP: prefer a meta tag with the domains used; avoid inline scripts or use a nonce.
- Links: keep rel="noopener noreferrer" for target=_blank.
- Manifest/404: copy to public/ with adjusted scope/base.
- Paths: remember the /Portfolio/ base when linking.

## Recommendation
If you want a quick win: choose Next.js (Option B) for built-in SEO and export. React+Vite is also fine if you prefer minimalism. Both keep GitHub Pages.
