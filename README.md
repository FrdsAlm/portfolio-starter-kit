# Modern Portfolio & Blog with Sanity CMS

A high-performance, dynamic portfolio website built with **Next.js 16**, **Tailwind CSS**, and **Sanity CMS**.

## 🚀 Features

-   **Dynamic Content**: All content (Profile, Work History, Skills, Tech Stack, Blog) is managed via Sanity CMS.
-   **Zero-API Polling**: Uses **On-Demand Revalidation** via Webhooks. The site is static until you publish changes in Sanity, then updates instantly.
-   **Performance**:
    -   Single-query data fetching architecture.
    -   Optimized images with `next/image` and Sanity CDN.
    -   Perfect Lighthouse scores.
-   **UI/UX**:
    -   Responsive design with Tailwind CSS v4.
    -   Dark/Light mode support.
    -   Animated skills marquee.
    -   Glassmorphism effects.
-   **SEO**:
    -   Dynamic Sitemap & Robots.txt.
    -   JSON-LD Schema Markup.
    -   Open Graph (OG) images for social sharing.
    -   RSS Feed.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **CMS**: [Sanity.io](https://www.sanity.io/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Deployment**: [Vercel](https://vercel.com/)

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/FrdsAlm/portfolio-starter-kit.git
cd portfolio-starter-kit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-04
SANITY_REVALIDATE_SECRET=your_secret_token
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.
Visit `http://localhost:3000/studio` to access the Sanity Studio.

## 🔄 On-Demand Revalidation Setup

To enable instant updates without API polling:

1.  Go to **Sanity Manage** -> **API** -> **Webhooks**.
2.  Create a new webhook:
    -   **URL**: `https://your-domain.com/api/revalidate`
    -   **Trigger**: Create, Update, Delete
    -   **Secret**: Use the same string as `SANITY_REVALIDATE_SECRET` in your env vars.
3.  **Disable** "Drafts" in the webhook settings.

## ✏️ Scripted Content Updates

`scripts/update-content.mjs` applies a one-off content update to Sanity (bio, Accenture roles, skills, tech cards). It needs an Editor token from **Sanity Manage** -> **API** -> **Tokens**:

```bash
SANITY_WRITE_TOKEN=your_token node scripts/update-content.mjs          # preview
SANITY_WRITE_TOKEN=your_token node scripts/update-content.mjs --apply  # write
```

## 📄 License

© 2024 Firdous Alam. Built with Next.js, Sanity & Google Antigravity.
