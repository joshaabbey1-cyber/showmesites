# 🚀 SiteForge — Deploy to Vercel

## One-Time Setup (5 minutes)

### Step 1: Run Stripe Setup
```bash
npm install
node stripe-setup.js
```
This creates your products, prices, and payment links in Stripe.  
**Save the webhook secret** it outputs.

### Step 2: Add Vercel Environment Variables
Go to [vercel.com](https://vercel.com) → Your Project → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `STRIPE_SECRET_KEY` | Your Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | From Step 1 output |
| `NEXT_PUBLIC_BASE_URL` | `https://your-project.vercel.app` |

### Step 3: Deploy
```bash
npx vercel --prod
```

Or push to GitHub and connect to Vercel for automatic deploys.

## What Gets Deployed

| URL | What |
|-----|------|
| `/` | SiteForge landing page with all business previews |
| `/site/columbia-pet-center` | Columbia Pet Center preview site |
| `/site/cafe-poland-by-iwona` | Cafe Poland preview site |
| `/site/clean-cut-barbershop` | Clean Cut Barbershop preview site |
| `/site/university-garage` | University Garage preview site |
| `/site/el-fogon-veracruzano` | El Fogón Veracruzano preview site |
| `/site/irenes` | Irene's preview site |
| `/site/rd-first-class-barber-shop` | RD First Class Barber Shop preview site |
| `/site/m-boss-barber-and-salon` | M.Boss Barber and Salon preview site |
| `/site/old-neighborhood-cafe` | Old Neighborhood Cafe preview site |
| `/site/body-refinery-gym` | Body Refinery Gym preview site |
| `/api/checkout?slug=X&name=Y` | Stripe checkout redirect |
| `/api/webhook` | Stripe webhook handler |
| `/success` | Post-payment success page |

## How the Stripe Flow Works

1. Business owner visits `/site/columbia-pet-center`
2. Clicks "Activate for $29/mo" → hits `/api/checkout`
3. Checkout creates a Stripe product + price dynamically
4. Redirects to Stripe Checkout (hosted by Stripe)
5. On success → redirects to `/success?slug=columbia-pet-center`
6. Webhook fires → logs payment (add Supabase update here)

## Adding More Businesses

Edit `data/businesses.js` to add new businesses from the scraper.
Each business needs: slug, name, address, rating, reviews, category, hours, heroImg, tagline, badge, topReviews, features.

Re-deploy and new sites appear automatically.
