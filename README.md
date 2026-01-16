# plob.dev

**linktree, but better.**

A developer-first profile page generator with built-in blogging, product showcase, and deep analytics. Built for speed, customization, and seamless user experience.

![plob.dev banner](https://github.com/user-attachments/assets/placeholder)

## ✨ Features

- **Wildcard Subdomains**: Every user gets their own `username.plob.dev` profile.
- **Link Management**: Add, reorder, and track clicks on your links.
- **Micro-Blogging**: Write and publish markdown blogs directly on your subdomain (`username.plob.dev/blog/slug`).
- **Product Showcase**: Display products with images and prices.
- **Deep Analytics**: Track views, clicks, and visitor stats (powered by Vercel Analytics).
- **Customizable Layouts**: Toggle between horizontal/vertical links, enable/disable sections.
- **Keyboard First**: Navigate the entire dashboard with `g` + `key` shortcuts.
- **Secure Auth**: Powered by Lucia Auth + Neon (PostgreSQL).
- **Fast**: Built on Next.js 14 App Router and Edge Middleware.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: [Neon](https://neon.tech/) (Serverless PostgreSQL)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Auth**: [Lucia Auth](https://lucia-auth.com/)
- **Styling**: TailwindCSS
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm/pnpm
- A Neon database project

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/kymibuilds/plop.dev.git
   cd plop.dev
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` (or create one):
   ```bash
   NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000
   DATABASE_URL=postgresql://user:pass@ep-....neon.tech/neondb?sslmode=require
   ```
   *Note: For local development with subdomains, use `lvh.me` instead of localhost if needed, or configure your hosts file.*

4. Push database schema:
   ```bash
   bun db:push
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.
To test public profiles locally, go to `http://username.localhost:3000` (requires distinct port mapping or `lvh.me`).

## 🌍 Deployment

Deployed on **Vercel**.

### Environment Variables Required on Vercel:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Your Neon connection string (ensure `sslmode=require`) |
| `NEXT_PUBLIC_ROOT_DOMAIN` | `plob.dev` |

### Domain Configuration:

You must add **two** domains in Vercel settings:
1. `plob.dev` (Main)
2. `*.plob.dev` (Wildcard for subdomains)

And configure your DNS nameservers to point to Vercel:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

## ⌨️ Shortcuts

- `g` + `l` : Go to Links
- `g` + `b` : Go to Blogs
- `g` + `p` : Go to Products
- `g` + `a` : Go to Analytics
- `g` + `s` : Go to Sponsors
- `p` : Publish Blog (in editor)
- `u` : Unpublish Blog (in editor)

## 📄 License

MIT
