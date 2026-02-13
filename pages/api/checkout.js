import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug, name } = req.query;

  if (!slug || !name) {
    return res.status(400).json({ error: 'Missing slug or name parameter' });
  }

  try {
    // Create or find the product
    const products = await stripe.products.list({ limit: 100 });
    let product = products.data.find(p => p.metadata?.slug === slug);

    if (!product) {
      product = await stripe.products.create({
        name: `${name} — Website by SiteForge`,
        description: `Professional website for ${name} in Columbia, MO. Includes hosting, SSL, Google Maps, reviews display, mobile-responsive design, and ongoing updates.`,
        metadata: { slug, business_name: name },
      });
    }

    // Create or find the price ($29/month)
    const prices = await stripe.prices.list({ product: product.id, limit: 10 });
    let price = prices.data.find(p => 
      p.unit_amount === 2900 && 
      p.recurring?.interval === 'month' && 
      p.active
    );

    if (!price) {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: 2900, // $29.00
        currency: 'usd',
        recurring: { interval: 'month' },
        metadata: { slug },
      });
    }

    // Create checkout session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.host}`;
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: price.id,
        quantity: 1,
      }],
      metadata: {
        slug,
        business_name: name,
      },
      subscription_data: {
        metadata: {
          slug,
          business_name: name,
        },
      },
      success_url: `${baseUrl}/success?slug=${slug}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/site/${slug}`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_creation: 'always',
    });

    // Redirect to Stripe Checkout
    res.redirect(303, session.url);
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
}
