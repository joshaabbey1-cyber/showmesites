import Head from 'next/head';
import Link from 'next/link';
import { businesses } from '../data/businesses';

const catIcons = {"Pet Store":"🐾","Polish Café":"☕","Barbershop":"💈","Auto Repair":"🔧","Mexican Restaurant":"🌮","Restaurant":"🍽️","Barber & Salon":"✂️","Gym":"💪","Plumbing":"🔩","Electrician":"⚡","Salon & Barber":"✂️","Tex-Mex BBQ":"🔥"};

function Stars({r}){return <span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=Math.round(r)?'#e8a838':'#333'}}>★</span>)}</span>}

export default function Home() {
  return (
    <>
      <Head>
        <title>SiteForge — Websites for Columbia, MO Businesses</title>
        <meta name="description" content="Professional websites for local businesses in Columbia, Missouri. We build it, you just say yes. Starting at $29/month." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased;background:#0a0a14;color:#e5e5e5}
        h1,h2,h3{font-family:'DM Serif Display',serif;font-weight:400}
        a{text-decoration:none}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{padding:'20px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'34px',height:'34px',borderRadius:'9px',background:'linear-gradient(135deg,#e8a838,#d49a2e)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'16px',color:'#0a0a14'}}>S</div>
          <span style={{fontWeight:700,fontSize:'17px',color:'#fff',letterSpacing:'-0.3px'}}>SiteForge</span>
        </div>
        <div style={{display:'flex',gap:'28px',alignItems:'center'}}>
          <a href="#previews" style={{color:'#9ca3af',fontSize:'14px',fontWeight:600}}>Previews</a>
          <a href="#pricing" style={{color:'#9ca3af',fontSize:'14px',fontWeight:600}}>Pricing</a>
          <a href="#how" style={{color:'#9ca3af',fontSize:'14px',fontWeight:600}}>How It Works</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{padding:'100px 48px 80px',textAlign:'center',position:'relative'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,168,56,.06) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(232,168,56,.08)',border:'1px solid rgba(232,168,56,.15)',padding:'8px 20px',borderRadius:'100px',fontSize:'12px',fontWeight:700,color:'#e8a838',marginBottom:'28px',letterSpacing:'.5px'}}>
          🏗️ Built for Columbia, MO businesses
        </div>
        <h1 style={{fontSize:'clamp(2.4rem,6vw,4.2rem)',color:'#fff',lineHeight:1.06,marginBottom:'22px',letterSpacing:'-1.5px',maxWidth:'720px',marginLeft:'auto',marginRight:'auto'}}>
          We already built your <em style={{color:'#e8a838'}}>website</em>
        </h1>
        <p style={{color:'rgba(255,255,255,.45)',fontSize:'1.15rem',lineHeight:1.65,maxWidth:'520px',marginLeft:'auto',marginRight:'auto',marginBottom:'40px'}}>
          We found your business on Google. We built you a beautiful, mobile-friendly website. Just activate it.
        </p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="#previews" style={{
            padding:'16px 36px',borderRadius:'100px',background:'linear-gradient(135deg,#e8a838,#d49a2e)',
            color:'#0a0a14',fontWeight:800,fontSize:'15px',boxShadow:'0 8px 24px rgba(232,168,56,.25)',
          }}>See Your Preview →</a>
          <a href="#pricing" style={{
            padding:'16px 36px',borderRadius:'100px',background:'rgba(255,255,255,.04)',
            color:'#fff',border:'1.5px solid rgba(255,255,255,.1)',fontWeight:700,fontSize:'15px',
          }}>View Pricing</a>
        </div>
        <div style={{marginTop:'40px',display:'flex',justifyContent:'center',gap:'32px'}}>
          {[{v:'10+',l:'Sites Built'},{v:'4.8',l:'Avg Rating'},{v:'$29',l:'Per Month'},{v:'24hr',l:'Setup Time'}].map((s,i)=>(
            <div key={i} style={{textAlign:'center'}}>
              <div style={{fontSize:'1.8rem',fontWeight:800,color:'#e8a838',fontFamily:'DM Serif Display,serif'}}>{s.v}</div>
              <div style={{fontSize:'11px',color:'#4b5563',textTransform:'uppercase',letterSpacing:'.5px',fontWeight:600}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PREVIEWS GRID ── */}
      <section id="previews" style={{padding:'60px 48px 80px'}}>
        <div style={{textAlign:'center',marginBottom:'44px'}}>
          <div style={{fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:'#43b87a',marginBottom:'10px'}}>Live Previews</div>
          <h2 style={{fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'#fff'}}>Find Your Business Below</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:'16px',maxWidth:'1100px',margin:'0 auto'}}>
          {businesses.map(biz => (
            <Link href={`/site/${biz.slug}`} key={biz.slug}>
              <div style={{
                background:'#111122',border:'1px solid rgba(255,255,255,.05)',borderRadius:'14px',
                overflow:'hidden',transition:'all .3s',cursor:'pointer',
              }} className="card-hover">
                <div style={{height:'160px',position:'relative',overflow:'hidden'}}>
                  <img src={biz.heroImg} alt={biz.name} style={{width:'100%',height:'100%',objectFit:'cover',opacity:.6,transition:'all .4s'}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(17,17,34,.95) 0%,transparent 60%)'}}/>
                  <div style={{position:'absolute',bottom:'14px',left:'18px',display:'flex',alignItems:'center',gap:'8px'}}>
                    <span style={{fontSize:'24px'}}>{catIcons[biz.category]||'📍'}</span>
                    <div>
                      <div style={{fontSize:'16px',fontWeight:700,color:'#fff'}}>{biz.name}</div>
                      <div style={{fontSize:'12px',color:'rgba(255,255,255,.5)'}}>{biz.category}</div>
                    </div>
                  </div>
                </div>
                <div style={{padding:'18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                      <Stars r={biz.rating}/>
                      <span style={{fontSize:'13px',fontWeight:700,color:'#e8a838'}}>{biz.rating}</span>
                    </div>
                    <span style={{fontSize:'12px',color:'#6b7280'}}>{biz.reviews.toLocaleString()} reviews</span>
                  </div>
                  <p style={{fontSize:'13px',color:'#9ca3af',lineHeight:1.5,marginBottom:'14px',
                    overflow:'hidden',textOverflow:'ellipsis',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',
                  }}>{biz.tagline}</p>
                  <div style={{
                    display:'inline-flex',alignItems:'center',gap:'6px',
                    padding:'8px 18px',borderRadius:'100px',background:'rgba(232,168,56,.08)',
                    border:'1px solid rgba(232,168,56,.12)',color:'#e8a838',fontSize:'12px',fontWeight:700,
                  }}>👁️ View Preview</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{padding:'80px 48px',background:'rgba(255,255,255,.02)'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:'#43b87a',marginBottom:'10px'}}>Simple Process</div>
          <h2 style={{fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'#fff'}}>How It Works</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px',maxWidth:'900px',margin:'0 auto'}}>
          {[
            {n:'1',title:'We Build It',desc:'We find your business on Google and auto-generate a beautiful website using your real photos, hours, reviews, and location.',icon:'🏗️'},
            {n:'2',title:'You Preview It',desc:'Check out your free preview. Everything is customized to your business — categories, colors, and features.',icon:'👁️'},
            {n:'3',title:'Activate & Go Live',desc:'Click activate, pay $29/month, and your site goes live instantly. Custom domain available for $39/mo.',icon:'🚀'},
          ].map((step,i) => (
            <div key={i} style={{background:'#111122',border:'1px solid rgba(255,255,255,.05)',borderRadius:'16px',padding:'32px 28px',textAlign:'center',position:'relative'}}>
              <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'linear-gradient(135deg,#e8a838,#d49a2e)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',fontWeight:800,color:'#0a0a14',margin:'0 auto 18px'}}>{step.n}</div>
              <div style={{fontSize:'36px',marginBottom:'12px'}}>{step.icon}</div>
              <h3 style={{fontSize:'1.2rem',color:'#fff',marginBottom:'8px'}}>{step.title}</h3>
              <p style={{fontSize:'14px',color:'#6b7280',lineHeight:1.6}}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{padding:'80px 48px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:'#43b87a',marginBottom:'10px'}}>Pricing</div>
          <h2 style={{fontSize:'clamp(1.6rem,3vw,2.2rem)',color:'#fff'}}>Simple, Honest Pricing</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',maxWidth:'960px',margin:'0 auto'}}>
          {[
            {name:'Starter',price:'$19',period:'/mo',features:['Subdomain (you.showmesites.com)','Single page site','Mobile responsive','Google Maps embed','Business hours display'],cta:'Get Started',popular:false},
            {name:'Pro',price:'$29',period:'/mo',features:['Everything in Starter','Custom domain support','SEO optimized','Contact form + WhatsApp','Google Reviews display','Monthly updates'],cta:'Most Popular',popular:true},
            {name:'Premium',price:'$79',period:'/mo',features:['Everything in Pro','Multi-page site','Online booking / menu','Photo gallery','Priority support','Social media integration'],cta:'Go Premium',popular:false},
          ].map((plan,i) => (
            <div key={i} style={{
              background:plan.popular?'linear-gradient(135deg,rgba(232,168,56,.08),rgba(232,168,56,.03))':'#111122',
              border:`1.5px solid ${plan.popular?'rgba(232,168,56,.25)':'rgba(255,255,255,.05)'}`,
              borderRadius:'18px',padding:'36px 28px',position:'relative',
              transform:plan.popular?'scale(1.04)':'none',
            }}>
              {plan.popular && (
                <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#e8a838,#d49a2e)',color:'#0a0a14',padding:'5px 20px',borderRadius:'100px',fontSize:'11px',fontWeight:800,letterSpacing:'.5px'}}>RECOMMENDED</div>
              )}
              <div style={{fontSize:'14px',fontWeight:700,color:plan.popular?'#e8a838':'#9ca3af',marginBottom:'8px'}}>{plan.name}</div>
              <div style={{fontSize:'2.4rem',fontWeight:800,color:'#fff',fontFamily:'DM Serif Display,serif'}}>
                {plan.price}<span style={{fontSize:'16px',color:'#6b7280',fontWeight:400}}>{plan.period}</span>
              </div>
              <div style={{margin:'24px 0',display:'flex',flexDirection:'column',gap:'10px'}}>
                {plan.features.map((f,j) => (
                  <div key={j} style={{display:'flex',gap:'10px',alignItems:'flex-start',fontSize:'13.5px',color:'rgba(255,255,255,.65)'}}>
                    <span style={{color:'#43b87a',flexShrink:0}}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button style={{
                width:'100%',padding:'14px',borderRadius:'100px',border:'none',cursor:'pointer',
                background:plan.popular?'linear-gradient(135deg,#e8a838,#d49a2e)':'rgba(255,255,255,.06)',
                color:plan.popular?'#0a0a14':'#fff',fontWeight:700,fontSize:'14px',
                fontFamily:'Plus Jakarta Sans,sans-serif',
                border:plan.popular?'none':'1.5px solid rgba(255,255,255,.1)',
              }}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:'#070a10',padding:'40px 48px',borderTop:'1px solid rgba(255,255,255,.04)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:'1100px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{width:'28px',height:'28px',borderRadius:'8px',background:'linear-gradient(135deg,#e8a838,#d49a2e)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'13px',color:'#0a0a14'}}>S</div>
            <span style={{fontWeight:600,fontSize:'14px',color:'#fff'}}>SiteForge</span>
          </div>
          <div style={{color:'rgba(255,255,255,.25)',fontSize:'12px'}}>
            © 2026 SiteForge · Columbia, MO · <a href="mailto:hello@showmesites.com" style={{color:'#e8a838'}}>hello@showmesites.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}
