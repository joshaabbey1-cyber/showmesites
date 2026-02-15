// Lead capture endpoint
// Leads are logged to Vercel's runtime logs (visible in dashboard)
// TODO: Connect to Supabase once ready

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { business, owner, phone, email } = req.body;

  if (!business || !owner || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Log the lead — visible in Vercel dashboard > Logs
  console.log('═══════════════════════════════════════');
  console.log('🔥 NEW LEAD');
  console.log(`   Business: ${business}`);
  console.log(`   Owner:    ${owner}`);
  console.log(`   Phone:    ${phone}`);
  console.log(`   Email:    ${email || 'not provided'}`);
  console.log(`   Time:     ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════');

  // TODO: Insert into Supabase
  // const { data, error } = await supabase
  //   .from('leads')
  //   .insert({ business_name: business, owner_name: owner, phone, email })

  // TODO: Send notification email via Resend
  // await resend.emails.send({
  //   from: 'ShowMeSites <leads@showmesites.com>',
  //   to: 'joshaabbey1@gmail.com',
  //   subject: `🔥 New Lead: ${business}`,
  //   html: `<h2>New lead!</h2><p><strong>${business}</strong></p><p>${owner} — ${phone}</p>`,
  // })

  res.status(200).json({ success: true, message: 'Lead captured' });
}
