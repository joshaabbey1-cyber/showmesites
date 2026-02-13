# 🏗️ SiteForge — ShowMeSites

Auto-generate and sell professional websites to local businesses in Columbia, MO.

## How It Works

1. **Scrape** — Find businesses with no website via Google Places API
2. **Generate** — Auto-build beautiful single-page sites with real data (hours, reviews, photos, maps)
3. **Preview** — Each business gets a live preview URL
4. **Sell** — Walk in with your tablet, show the preview, activate via Stripe ($29/mo)

## Live Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with all business previews & pricing |
| `/site/[slug]` | Individual business preview sites (10 built) |
| `/api/checkout` | Stripe checkout session creator |
| `/api/webhook` | Stripe webhook handler |
| `/success` | Post-payment success page |

## Tech Stack

- **Next.js 14** — Static generation + API routes
- **Stripe** — Subscriptions, checkout, webhooks
- **Vercel** — Hosting (free tier)
- **Google Places API** — Business data scraping
- **Supabase** — Database (coming soon)
- **Resend** — Email outreach (coming soon)

## Quick Start

```bash
# Install
npm install

# Set up Stripe products & payment links
cp .env.example .env.local
# Fill in your keys in .env.local
node stripe-setup.js

# Dev
npm run dev

# Deploy
npx vercel --prod
```

## Environment Variables

See `.env.example` for all required variables.

## Current Targets (19 businesses, no website)

| Business | Rating | Reviews | Category |
|----------|--------|---------|----------|
| Columbia Pet Center | ⭐4.6 | 1,009 | Pet Store |
| Cafe Poland by Iwona | ⭐4.8 | 804 | Café |
| Clean Cut Barbershop | ⭐4.7 | 346 | Barbershop |
| University Garage | ⭐4.9 | 289 | Auto Repair |
| El Fogón Veracruzano | ⭐4.7 | 268 | Mexican Restaurant |
| Irene's | ⭐4.6 | 258 | Restaurant |
| M.Boss Barber and Salon | ⭐4.6 | 248 | Barber & Salon |
| Old Neighborhood Cafe | ⭐4.6 | 191 | Restaurant |
| RD First Class Barber Shop | ⭐5.0 | 172 | Barbershop |
| Body Refinery Gym | ⭐4.8 | 158 | Gym |

## Pricing Tiers

- **Starter** — $19/mo (subdomain, single page)
- **Pro** — $29/mo (custom domain, SEO, reviews, WhatsApp)
- **Premium** — $79/mo (multi-page, booking, gallery)

## License

Private — ShowMeSites
