import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Disable body parsing — Stripe needs the raw body
export const config = {
  api: { bodyParser: false },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } else {
      // Dev mode — parse directly (set up webhook secret in production!)
      event = JSON.parse(buf.toString());
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const slug = session.metadata?.slug;
      const businessName = session.metadata?.business_name;
      const customerId = session.customer;
      const subscriptionId = session.subscription;

      console.log(`✅ NEW CUSTOMER: ${businessName} (${slug})`);
      console.log(`   Stripe Customer: ${customerId}`);
      console.log(`   Subscription: ${subscriptionId}`);

      // TODO: Update Supabase
      // await supabase.from('businesses').update({
      //   payment_status: 'active',
      //   stripe_customer_id: customerId,
      //   stripe_subscription_id: subscriptionId,
      //   activated_at: new Date().toISOString(),
      // }).eq('slug', slug);

      // TODO: Send activation email via Resend
      // await resend.emails.send({
      //   from: 'SiteForge <hello@showmesites.com>',
      //   to: session.customer_details.email,
      //   subject: `🎉 ${businessName} — Your website is live!`,
      //   html: `<h1>Welcome!</h1><p>Your site is now live at showmesites.com/site/${slug}</p>`,
      // });

      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const slug = subscription.metadata?.slug;
      
      console.log(`❌ CANCELLED: ${slug}`);

      // TODO: Update Supabase to mark as cancelled
      // await supabase.from('businesses').update({
      //   payment_status: 'cancelled',
      // }).eq('stripe_subscription_id', subscription.id);

      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object;
      console.log(`💰 PAYMENT: $${(invoice.amount_paid / 100).toFixed(2)} from ${invoice.customer}`);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      console.log(`⚠️ PAYMENT FAILED: ${invoice.customer}`);
      // TODO: Send dunning email
      break;
    }

    default:
      console.log(`Unhandled event: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
