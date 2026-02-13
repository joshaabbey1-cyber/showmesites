import Head from 'next/head';
import { businesses, getBusinessBySlug } from '../../data/businesses';

export async function getStaticPaths() {
  return {
    paths: businesses.map(b => ({ params: { slug: b.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const biz = getBusinessBySlug(params.slug);
  return { props: { biz } };
}

function Stars({ rating }) {
  return (
    <span className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{color: i <= Math.round(rating) ? '#e8a838' : '#333'}}>★</span>
      ))}
    </span>
  );
}

export default function BusinessSite({ biz }) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = days[new Date().getDay()];
  
  const checkoutUrl = `/api/checkout?slug=${biz.slug}&name=${encodeURIComponent(biz.name)}`;

  return (
    <>
      <Head>
        <title>{biz.name} — {biz.category} in Columbia, MO</title>
        <meta name="description" content={`${biz.name} — ${biz.tagline} Located at ${biz.address}. ⭐${biz.rating} rating with ${biz.reviews} reviews.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root{--p:#1a1a2e;--a:#e8a838;--g:#43b87a;--al:#f5d89a;--sf:#faf8f4;--tm:#6b7280}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Plus Jakarta Sans',sans-serif;color:var(--p);-webkit-font-smoothing:antialiased}
        h1,h2,h3,h4{font-family:'DM Serif Display',serif;font-weight:400}
      `}</style>

      {/* ── PREVIEW BANNER ── */}
      <div style={{
        position:'fixed',top:0,left:0,right:0,zIndex:1000,
        background:'linear-gradient(135deg,#e8a838,#d49a2e)',color:'#1a1a2e',
        textAlign:'center',padding:'13px 20px',fontWeight:700,fontSize:'13.5px',
        display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',
        boxShadow:'0 4px 20px rgba(232,168,56,0.3)',fontFamily:'Plus Jakarta Sans,sans-serif',
      }}>
        <span>⚡ This is a FREE preview — we built this site for <strong>{biz.name}</strong></span>
        <a href={checkoutUrl} style={{
          background:'var(--p)',color:'#fff',padding:'8px 22px',borderRadius:'100px',
          textDecoration:'none',fontSize:'12.5px',fontWeight:700,transition:'all .2s',
        }}>Activate for $29/mo →</a>
      </div>

      {/* ── HERO ── */}
      <div style={{
        position:'relative',minHeight:'88vh',display:'flex',alignItems:'flex-end',
        padding:'60px 48px',overflow:'hidden',background:'var(--p)',marginTop:'48px',
      }}>
        <div style={{position:'absolute',inset:0}}>
          <img src={biz.heroImg} alt={biz.name} style={{width:'100%',height:'100%',objectFit:'cover',opacity:.35,filter:'brightness(.6) saturate(1.1)'}} />
        </div>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(26,26,46,.97) 0%,rgba(26,26,46,.45) 50%,rgba(26,26,46,.1) 100%)'}} />
        <div style={{position:'relative',zIndex:2,maxWidth:'680px'}}>
          <div style={{
            display:'inline-flex',alignItems:'center',gap:'8px',
            background:'rgba(67,184,122,.12)',border:'1px solid rgba(67,184,122,.25)',color:'#6ee7a8',
            padding:'8px 18px',borderRadius:'100px',fontSize:'11.5px',fontWeight:700,
            letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:'22px',
          }}>{biz.icon} {biz.badge}</div>
          <h1 style={{fontSize:'clamp(2.4rem,5.5vw,4.5rem)',color:'#fff',lineHeight:1.05,marginBottom:'18px',letterSpacing:'-1.5px'}}>
            Welcome to <em style={{color:'var(--a)',fontStyle:'italic'}}>{biz.name}</em>
          </h1>
          <p style={{fontSize:'1.1rem',color:'rgba(255,255,255,.6)',lineHeight:1.65,marginBottom:'34px',maxWidth:'500px'}}>{biz.tagline}</p>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
            {biz.phone && (
              <a href={`tel:${biz.phone}`} style={{
                display:'inline-flex',alignItems:'center',gap:'10px',padding:'15px 30px',
                borderRadius:'100px',background:'var(--g)',color:'#fff',textDecoration:'none',
                fontWeight:700,fontSize:'14.5px',fontFamily:'Plus Jakarta Sans,sans-serif',
              }}>📞 Call Us</a>
            )}
            <a href={`https://maps.google.com/?q=${encodeURIComponent(biz.name + ' ' + biz.address)}`} target="_blank" rel="noreferrer" style={{
              display:'inline-flex',alignItems:'center',gap:'10px',padding:'15px 30px',
              borderRadius:'100px',background:'rgba(255,255,255,.06)',color:'#fff',
              border:'1.5px solid rgba(255,255,255,.15)',textDecoration:'none',
              fontWeight:700,fontSize:'14.5px',fontFamily:'Plus Jakarta Sans,sans-serif',
            }}>📍 Get Directions</a>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{
        margin:'-50px 48px 0',position:'relative',zIndex:10,background:'#fff',
        borderRadius:'16px',boxShadow:'0 16px 48px rgba(0,0,0,.08)',
        display:'grid',gridTemplateColumns:'repeat(4,1fr)',overflow:'hidden',
      }}>
        {[
          {icon:'⭐',val:biz.rating,label:'Google Rating',bg:'rgba(232,168,56,.06)'},
          {icon:'💬',val:biz.reviews.toLocaleString(),label:'Reviews',bg:'rgba(67,184,122,.06)'},
          {icon:biz.icon,val:biz.category,label:'Category',bg:'rgba(99,102,241,.06)'},
          {icon:'❤️',val:'Local',label:'Locally Owned',bg:'rgba(239,68,68,.06)'},
        ].map((s,i) => (
          <div key={i} style={{padding:'26px 18px',textAlign:'center',borderRight:i<3?'1px solid #f0f0f0':'none'}}>
            <div style={{width:'42px',height:'42px',margin:'0 auto 10px',borderRadius:'12px',background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>{s.icon}</div>
            <div style={{fontFamily:'DM Serif Display,serif',fontSize:'1.5rem',color:'var(--p)',marginBottom:'3px'}}>{s.val}</div>
            <div style={{fontSize:'10.5px',color:'var(--tm)',textTransform:'uppercase',letterSpacing:'.6px',fontWeight:600}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT / FEATURES ── */}
      <section style={{padding:'80px 48px',background:'var(--sf)'}}>
        <div style={{textAlign:'center',maxWidth:'540px',margin:'0 auto 44px'}}>
          <div style={{fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:'var(--g)',marginBottom:'10px'}}>What We Offer</div>
          <h2 style={{fontSize:'clamp(1.7rem,3vw,2.3rem)',lineHeight:1.15}}>Why {biz.name}?</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',maxWidth:'880px',margin:'0 auto'}}>
          {biz.features.map((f,i) => (
            <div key={i} style={{
              background:'#fff',borderRadius:'14px',padding:'24px',textAlign:'center',
              boxShadow:'0 2px 14px rgba(0,0,0,.03)',border:'1px solid rgba(0,0,0,.04)',
              transition:'all .3s',
            }}>
              <div style={{fontSize:'28px',marginBottom:'10px'}}>{['🌟','✅','🎯','🏆','💎','⚡'][i%6]}</div>
              <div style={{fontSize:'14px',fontWeight:700}}>{f}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCATION & HOURS SIDE BY SIDE ── */}
      <section style={{padding:'80px 48px'}}>
        <div style={{textAlign:'center',maxWidth:'540px',margin:'0 auto 44px'}}>
          <div style={{fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:'var(--g)',marginBottom:'10px'}}>Visit Us</div>
          <h2 style={{fontSize:'clamp(1.7rem,3vw,2.3rem)',lineHeight:1.15}}>Location & Hours</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',maxWidth:'880px',margin:'0 auto'}}>
          {/* Map */}
          <div style={{borderRadius:'16px',overflow:'hidden',boxShadow:'0 4px 20px rgba(0,0,0,.06)',background:'#fff',border:'1px solid rgba(0,0,0,.04)'}}>
            <iframe 
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&q=${encodeURIComponent(biz.name + ',' + biz.address)}`}
              width="100%" height="280" style={{border:0,display:'block'}} allowFullScreen loading="lazy" 
            />
            <div style={{padding:'20px'}}>
              <div style={{fontSize:'15px',fontWeight:700,marginBottom:'4px'}}>{biz.name}</div>
              <div style={{fontSize:'13.5px',color:'var(--tm)'}}>{biz.address}</div>
            </div>
          </div>
          {/* Hours */}
          <div style={{background:'#fff',borderRadius:'16px',boxShadow:'0 4px 20px rgba(0,0,0,.06)',overflow:'hidden',border:'1px solid rgba(0,0,0,.04)'}}>
            {biz.hours.map((h,i) => {
              const isToday = h.day === today;
              return (
                <div key={i} style={{
                  display:'flex',justifyContent:'space-between',padding:'16px 24px',
                  borderBottom:i < biz.hours.length-1 ? '1px solid #f5f5f5' : 'none',
                  background:isToday ? 'rgba(67,184,122,.04)' : 'transparent',
                }}>
                  <span style={{fontWeight:isToday?700:600,color:isToday?'var(--g)':'var(--p)',fontSize:'14px'}}>
                    {h.day}{isToday ? ' • Today' : ''}
                  </span>
                  <span style={{color:'var(--tm)',fontSize:'14px'}}>{h.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{padding:'80px 48px',background:'var(--p)',color:'#fff'}}>
        <div style={{textAlign:'center',maxWidth:'540px',margin:'0 auto 44px'}}>
          <div style={{fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:'var(--al)',marginBottom:'10px'}}>Reviews</div>
          <h2 style={{fontSize:'clamp(1.7rem,3vw,2.3rem)',lineHeight:1.15,color:'#fff'}}>Loved by {biz.reviews.toLocaleString()}+ Customers</h2>
          <p style={{color:'rgba(255,255,255,.4)',fontSize:'1rem',marginTop:'10px'}}>Real reviews from your neighbors in Columbia.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',maxWidth:'960px',margin:'0 auto'}}>
          {biz.topReviews.map((r,i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.06)',
              borderRadius:'16px',padding:'26px',
            }}>
              <div style={{color:'var(--a)',fontSize:'13px',marginBottom:'14px',letterSpacing:'2px'}}>★★★★★</div>
              <p style={{fontSize:'.9rem',lineHeight:1.7,color:'rgba(255,255,255,.7)',marginBottom:'18px',fontStyle:'italic'}}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{
                  width:'36px',height:'36px',borderRadius:'50%',
                  background:'linear-gradient(135deg,var(--g),#38a169)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontWeight:700,fontSize:'12px',color:'#fff',
                }}>{r.initials}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:'.85rem',color:'#fff'}}>{r.author}</div>
                  <div style={{fontSize:'.75rem',color:'rgba(255,255,255,.3)'}}>Google Review</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background:'linear-gradient(135deg,#0d1b2a,#1b2838)',textAlign:'center',padding:'100px 48px',
      }}>
        <h2 style={{color:'#fff',fontSize:'clamp(1.8rem,4vw,2.8rem)',marginBottom:'14px'}}>Ready to Go Live?</h2>
        <p style={{color:'rgba(255,255,255,.5)',fontSize:'1.05rem',marginBottom:'32px',maxWidth:'460px',marginLeft:'auto',marginRight:'auto'}}>
          Activate your website today. Get found by more customers in Columbia. Cancel anytime.
        </p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href={checkoutUrl} style={{
            display:'inline-flex',alignItems:'center',gap:'10px',padding:'18px 36px',
            borderRadius:'100px',background:'var(--a)',color:'var(--p)',textDecoration:'none',
            fontWeight:800,fontSize:'15px',fontFamily:'Plus Jakarta Sans,sans-serif',
            boxShadow:'0 8px 24px rgba(232,168,56,.3)',
          }}>⚡ Activate for $29/month</a>
          <a href="mailto:hello@showmesites.com" style={{
            display:'inline-flex',alignItems:'center',gap:'10px',padding:'18px 36px',
            borderRadius:'100px',background:'rgba(255,255,255,.06)',color:'#fff',
            border:'1.5px solid rgba(255,255,255,.12)',textDecoration:'none',
            fontWeight:700,fontSize:'15px',fontFamily:'Plus Jakarta Sans,sans-serif',
          }}>✉️ Contact Us First</a>
        </div>
        <div style={{marginTop:'24px',display:'flex',justifyContent:'center',gap:'24px',color:'rgba(255,255,255,.3)',fontSize:'12px'}}>
          <span>✓ No setup fees</span>
          <span>✓ Cancel anytime</span>
          <span>✓ Live in 24 hours</span>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:'#070a10',color:'rgba(255,255,255,.3)',textAlign:'center',padding:'26px 40px',fontSize:'12px'}}>
        <p>© 2026 {biz.name} · Columbia, MO · Website by <a href="/" style={{color:'var(--a)',textDecoration:'none'}}>SiteForge</a></p>
      </footer>
    </>
  );
}
