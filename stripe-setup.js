/**
 * ╔══════════════════════════════════════════════════╗
 * ║  SiteForge — Stripe Setup Script                 ║
 * ║  Run: node stripe-setup.js                       ║
 * ╚══════════════════════════════════════════════════╝
 * 
 * This creates your Stripe products, prices, and payment links.
 * Run this ONCE after setting up your Stripe account.
 */

const Stripe = require('stripe');
const stripe = Stripe('process.env.STRIPE_SECRET_KEY || 'sk_test_YOUR_KEY_HERE'');

async function setup() {
  console.log('🔧 Setting up Stripe for SiteForge...\n');

  // ── 1. Create Products ──
  console.log('📦 Creating products...');
  
  const starter = await stripe.products.create({
    name: 'SiteForge Starter',
    description: 'Professional single-page website for your business. Includes subdomain, mobile-responsive design, Google Maps, and business hours.',
    metadata: { tier: 'starter' },
  });

  const pro = await stripe.products.create({
    name: 'SiteForge Pro',
    description: 'Everything in Starter plus custom domain, SEO optimization, contact form, WhatsApp integration, and Google Reviews display.',
    metadata: { tier: 'pro' },
    default_price_data: {
      unit_amount: 2900,
      currency: 'usd',
      recurring: { interval: 'month' },
    },
  });

  const premium = await stripe.products.create({
    name: 'SiteForge Premium',
    description: 'Everything in Pro plus multi-page site, online booking/menu, photo gallery, priority support, and social media integration.',
    metadata: { tier: 'premium' },
  });

  console.log(`  ✅ Starter: ${starter.id}`);
  console.log(`  ✅ Pro: ${pro.id}`);
  console.log(`  ✅ Premium: ${premium.id}`);

  // ── 2. Create Prices ──
  console.log('\n💰 Creating prices...');

  const starterPrice = await stripe.prices.create({
    product: starter.id,
    unit_amount: 1900, // $19
    currency: 'usd',
    recurring: { interval: 'month' },
    metadata: { tier: 'starter' },
  });

  const proPrice = await stripe.prices.create({
    product: pro.id,
    unit_amount: 2900, // $29
    currency: 'usd',
    recurring: { interval: 'month' },
    metadata: { tier: 'pro' },
  });

  const premiumPrice = await stripe.prices.create({
    product: premium.id,
    unit_amount: 7900, // $79
    currency: 'usd',
    recurring: { interval: 'month' },
    metadata: { tier: 'premium' },
  });

  console.log(`  ✅ Starter: $19/mo — ${starterPrice.id}`);
  console.log(`  ✅ Pro: $29/mo — ${proPrice.id}`);
  console.log(`  ✅ Premium: $79/mo — ${premiumPrice.id}`);

  // ── 3. Create Payment Links ──
  console.log('\n🔗 Creating payment links...');

  const starterLink = await stripe.paymentLinks.create({
    line_items: [{ price: starterPrice.id, quantity: 1 }],
    allow_promotion_codes: true,
    after_completion: {
      type: 'redirect',
      redirect: { url: 'https://siteforge.vercel.app/success?tier=starter' },
    },
  });

  const proLink = await stripe.paymentLinks.create({
    line_items: [{ price: proPrice.id, quantity: 1 }],
    allow_promotion_codes: true,
    after_completion: {
      type: 'redirect',
      redirect: { url: 'https://siteforge.vercel.app/success?tier=pro' },
    },
  });

  const premiumLink = await stripe.paymentLinks.create({
    line_items: [{ price: premiumPrice.id, quantity: 1 }],
    allow_promotion_codes: true,
    after_completion: {
      type: 'redirect',
      redirect: { url: 'https://siteforge.vercel.app/success?tier=premium' },
    },
  });

  console.log(`  ✅ Starter: ${starterLink.url}`);
  console.log(`  ✅ Pro: ${proLink.url}`);
  console.log(`  ✅ Premium: ${premiumLink.url}`);

  // ── 4. Create Webhook Endpoint ──
  console.log('\n🪝 Creating webhook endpoint...');

  try {
    const webhook = await stripe.webhookEndpoints.create({
      url: 'https://siteforge.vercel.app/api/webhook',
      enabled_events: [
        'checkout.session.completed',
        'customer.subscription.created',
        'customer.subscription.deleted',
        'customer.subscription.updated',
        'invoice.payment_succeeded',
        'invoice.payment_failed',
      ],
    });
    console.log(`  ✅ Webhook: ${webhook.id}`);
    console.log(`  🔑 Webhook Secret: ${webhook.secret}`);
    console.log(`  ⚠️  SAVE THIS SECRET — add it as STRIPE_WEBHOOK_SECRET in Vercel env vars`);
  } catch (err) {
    console.log(`  ⚠️  Webhook creation failed (may already exist): ${err.message}`);
  }

  // ── SUMMARY ──
  console.log('\n' + '═'.repeat(56));
  console.log('📋 SUMMARY — Add these to your .env / Vercel:');
  console.log('═'.repeat(56));
  console.log(`STRIPE_STARTER_PRICE_ID=${starterPrice.id}`);
  console.log(`STRIPE_PRO_PRICE_ID=${proPrice.id}`);
  console.log(`STRIPE_PREMIUM_PRICE_ID=${premiumPrice.id}`);
  console.log(`STRIPE_STARTER_LINK=${starterLink.url}`);
  console.log(`STRIPE_PRO_LINK=${proLink.url}`);
  console.log(`STRIPE_PREMIUM_LINK=${premiumLink.url}`);
  console.log('═'.repeat(56));
  console.log('\n🎉 Stripe setup complete! Now deploy to Vercel.');
}

setup().catch(err => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});
