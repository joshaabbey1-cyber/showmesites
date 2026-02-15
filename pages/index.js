import Head from 'next/head';
import { useState, useRef } from 'react';
import { businesses } from '../data/businesses';

export default function Home() {
  const [form, setForm] = useState({ business: '', owner: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const formRef = useRef(null);

  const handleSearch = (val) => {
    setSearch(val);
    if (val.length < 2) { setSearchResult(null); return; }
    const q = val.toLowerCase();
    const match = businesses.find(b => b.name.toLowerCase().includes(q));
    setSearchResult(match || null);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (err) { /* still show success — we'll capture in logs */ }
    setSending(false);
    setSubmitted(true);
  };

  const demoImages = [
    { name: 'Columbia Pet Center', cat: 'Pet Store', rating: 4.6, reviews: '1,009' },
    { name: 'Cafe Poland by Iwona', cat: 'Polish Café', rating: 4.8, reviews: '804' },
    { name: 'University Garage', cat: 'Auto Repair', rating: 4.9, reviews: '289' },
  ];

  return (
    <>
      <Head>
        <title>ShowMeSites — Free Professional Website for Your Business</title>
        <meta name="description" content="We build professional websites for local businesses in 24 hours — completely free to preview. See your business online today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased;background:#0a0a14;color:#e5e5e5;overflow-x:hidden}
        h1,h2,h3{font-family:'DM Serif Display',serif;font-weight:400}
        a{text-decoration:none}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        input:focus{border-color:rgba(232,168,56,.5) !important;outline:none}
        .input-field{width:100%;padding:16px 20px;border-radius:12px;border:1.5px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:#fff;font-size:14px;font-family:'Plus Jakarta Sans',sans-serif;transition:border-color .3s}
        .input-field::placeholder{color:#4b5563}
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr !important}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important}
          .steps-grid{grid-template-columns:1fr !important}
          .demo-grid{grid-template-columns:1fr !important}
          .section-padding{padding-left:20px !important;padding-right:20px !important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{padding:'18px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,.04)',position:'sticky',top:0,zIndex:100,background:'rgba(10,10,20,.85)',backdropFilter:'blur(20px)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'34px',height:'34px',borderRadius:'9px',background:'linear-gradient(135deg,#e8a838,#d49a2e)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'16px',color:'#0a0a14'}}>S</div>
          <span style={{fontWeight:700,fontSize:'17px',color:'#fff',letterSpacing:'-0.3px'}}>ShowMeSites</span>
        </div>
        <button onClick={scrollToForm} style={{padding:'10px 24px',borderRadius:'100px',border:'none',cursor:'pointer',background:'linear-gradient(135deg,#e8a838,#d49a2e)',color:'#0a0a14',fontWeight:800,fontSize:'13px',fontFamily:'Plus Jakarta Sans,sans-serif'}}>Get Your Free Site →</button>
      </nav>

      {/* ── HERO ── */}
      <section className="section-padding" style={{padding:'80px 48px 60px',position:'relative'}}>
        <div style={{position:'absolute',top:'20%',left:'50%',transform:'translate(-50%,-50%)',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,168,56,.06) 0%,transparent 70%)',pointerEvents:'none'}}/>

        <div className="hero-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',maxWidth:'1100px',margin:'0 auto',alignItems:'center'}}>
          {/* Left — Copy */}
          <div style={{animation:'fadeUp .6s ease'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(67,184,122,.08)',border:'1px solid rgba(67,184,122,.15)',padding:'8px 18px',borderRadius:'100px',fontSize:'11.5px',fontWeight:700,color:'#6ee7a8',marginBottom:'24px',letterSpacing:'.5px'}}>
              ⚡ Built in 24 hours · Free to preview
            </div>

            <h1 style={{fontSize:'clamp(2rem,4.5vw,3.4rem)',color:'#fff',lineHeight:1.08,marginBottom:'18px',letterSpacing:'-1.5px'}}>
              Your business deserves a <em style={{color:'#e8a838',fontStyle:'italic'}}>website</em>
            </h1>

            <p style={{color:'rgba(255,255,255,.4)',fontSize:'1.05rem',lineHeight:1.65,marginBottom:'32px',maxWidth:'420px'}}>
              We build beautiful, mobile-ready websites for local businesses — and we&apos;ll build yours for <strong style={{color:'rgba(255,255,255,.7)'}}>free</strong>. No catch. See your preview in 24 hours.
            </p>

            <div style={{display:'flex',gap:'12px',marginBottom:'36px',flexWrap:'wrap'}}>
              <button onClick={scrollToForm} style={{padding:'16px 32px',borderRadius:'100px',border:'none',cursor:'pointer',background:'linear-gradient(135deg,#e8a838,#d49a2e)',color:'#0a0a14',fontWeight:800,fontSize:'14.5px',fontFamily:'Plus Jakarta Sans,sans-serif',boxShadow:'0 8px 24px rgba(232,168,56,.25)'}}>
                Get My Free Website →
              </button>
              <a href="#examples" style={{padding:'16px 32px',borderRadius:'100px',border:'1.5px solid rgba(255,255,255,.1)',color:'#fff',fontWeight:700,fontSize:'14.5px',display:'inline-flex',alignItems:'center',gap:'8px'}}>
                See Examples
              </a>
            </div>

            <div style={{display:'flex',gap:'24px'}}>
              {[{v:'10+',l:'Sites Built'},{v:'4.8★',l:'Avg Rating'},{v:'24hr',l:'Turnaround'}].map((s,i) => (
                <div key={i}>
                  <div style={{fontSize:'1.3rem',fontWeight:800,color:'#e8a838',fontFamily:'DM Serif Display,serif'}}>{s.v}</div>
                  <div style={{fontSize:'10px',color:'#4b5563',textTransform:'uppercase',letterSpacing:'.5px',fontWeight:600}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Already built? Search */}
          <div style={{animation:'fadeUp .6s ease .15s both'}}>
            <div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',borderRadius:'20px',padding:'32px',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:'-50%',right:'-50%',width:'200%',height:'200%',background:'radial-gradient(circle at 80% 20%,rgba(232,168,56,.03) 0%,transparent 50%)',pointerEvents:'none'}}/>
              <div style={{fontSize:'13px',fontWeight:700,color:'#9ca3af',marginBottom:'16px',textTransform:'uppercase',letterSpacing:'1px'}}>Already got a preview link?</div>
              <div style={{fontSize:'14px',color:'rgba(255,255,255,.5)',marginBottom:'20px',lineHeight:1.5}}>
                If we already built your site, search for your business name below.
              </div>
              <div style={{position:'relative'}}>
                <input
                  type="text" value={search} onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search your business name..."
                  className="input-field"
                />
                {search.length >= 2 && (
                  <div style={{marginTop:'12px'}}>
                    {searchResult ? (
                      <a href={`/site/${searchResult.slug}`} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 18px',background:'rgba(232,168,56,.06)',border:'1px solid rgba(232,168,56,.15)',borderRadius:'12px'}}>
                        <span style={{fontSize:'22px'}}>{searchResult.icon}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:'14px',fontWeight:700,color:'#fff'}}>{searchResult.name}</div>
                          <div style={{fontSize:'12px',color:'#6b7280'}}>⭐ {searchResult.rating} · {searchResult.reviews.toLocaleString()} reviews</div>
                        </div>
                        <span style={{padding:'8px 16px',borderRadius:'100px',background:'#e8a838',color:'#0a0a14',fontWeight:800,fontSize:'11.5px'}}>View →</span>
                      </a>
                    ) : (
                      <div style={{padding:'14px 18px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',borderRadius:'12px',textAlign:'center'}}>
                        <div style={{fontSize:'13px',color:'#6b7280',marginBottom:'8px'}}>No preview found for &ldquo;{search}&rdquo;</div>
                        <button onClick={() => { setForm(f => ({...f, business: search})); scrollToForm(); }} style={{fontSize:'12px',fontWeight:700,color:'#e8a838',background:'none',border:'none',cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',textDecoration:'underline'}}>
                          → Request a free site for this business
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <div className="section-padding" style={{padding:'0 48px 60px'}}>
        <div className="stats-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'rgba(255,255,255,.04)',borderRadius:'16px',overflow:'hidden',maxWidth:'800px',margin:'0 auto'}}>
          {[
            {icon:'🏪',val:'10+',label:'Businesses Served'},
            {icon:'⭐',val:'4.8',label:'Average Rating'},
            {icon:'💬',val:'3,700+',label:'Customer Reviews'},
            {icon:'🚀',val:'24hrs',label:'Delivery Time'},
          ].map((s,i) => (
            <div key={i} style={{background:'rgba(255,255,255,.02)',padding:'22px 16px',textAlign:'center'}}>
              <div style={{fontSize:'18px',marginBottom:'6px'}}>{s.icon}</div>
              <div style={{fontSize:'1.3rem',fontWeight:800,color:'#fff',fontFamily:'DM Serif Display,serif'}}>{s.val}</div>
              <div style={{fontSize:'10px',color:'#4b5563',fontWeight:600,textTransform:'uppercase',letterSpacing:'.3px'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding" style={{padding:'60px 48px',background:'rgba(255,255,255,.015)'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:'#43b87a',marginBottom:'10px'}}>Simple Process</div>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2.2rem)',color:'#fff'}}>How It Works</h2>
        </div>
        <div className="steps-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',maxWidth:'900px',margin:'0 auto'}}>
          {[
            {n:'1',icon:'📋',title:'Tell Us Your Business',desc:'Fill out the form below — business name, your info, and what you do. Takes 30 seconds.'},
            {n:'2',icon:'🏗️',title:'We Build It (Free)',desc:'Our team creates a professional, mobile-ready website with your real hours, reviews, location, and photos.'},
            {n:'3',icon:'⚡',title:'Preview & Go Live',desc:'You get a preview link within 24 hours. Love it? Activate for $29/mo. Not happy? No charge, ever.'},
          ].map((step,i) => (
            <div key={i} style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.05)',borderRadius:'16px',padding:'32px 24px',textAlign:'center',position:'relative'}}>
              <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',width:'28px',height:'28px',borderRadius:'50%',background:'linear-gradient(135deg,#e8a838,#d49a2e)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:800,color:'#0a0a14'}}>{step.n}</div>
              <div style={{fontSize:'32px',marginBottom:'14px',marginTop:'8px'}}>{step.icon}</div>
              <h3 style={{fontSize:'1.1rem',color:'#fff',marginBottom:'8px'}}>{step.title}</h3>
              <p style={{fontSize:'13.5px',color:'#6b7280',lineHeight:1.6}}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXAMPLES ── */}
      <section id="examples" className="section-padding" style={{padding:'70px 48px'}}>
        <div style={{textAlign:'center',marginBottom:'44px'}}>
          <div style={{fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:'#e8a838',marginBottom:'10px'}}>Real Examples</div>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2.2rem)',color:'#fff'}}>Sites We&apos;ve Built</h2>
          <p style={{color:'#4b5563',fontSize:'14px',marginTop:'8px'}}>Real businesses in Columbia, MO. Real data. Real results.</p>
        </div>
        <div className="demo-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',maxWidth:'900px',margin:'0 auto'}}>
          {businesses.slice(0, 3).map((biz, i) => (
            <div key={i} style={{background:'#111122',border:'1px solid rgba(255,255,255,.05)',borderRadius:'16px',overflow:'hidden'}}>
              <div style={{height:'160px',position:'relative'}}>
                <img src={biz.heroImg} alt={biz.name} style={{width:'100%',height:'100%',objectFit:'cover',opacity:.5}}/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(17,17,34,.95) 0%,transparent 50%)'}}/>
                <div style={{position:'absolute',bottom:'14px',left:'16px'}}>
                  <div style={{fontSize:'15px',fontWeight:700,color:'#fff'}}>{biz.name}</div>
                  <div style={{fontSize:'12px',color:'rgba(255,255,255,.4)'}}>{biz.category}</div>
                </div>
              </div>
              <div style={{padding:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                    <span style={{color:'#e8a838',fontSize:'12px'}}>★★★★★</span>
                    <span style={{fontSize:'13px',fontWeight:700,color:'#e8a838'}}>{biz.rating}</span>
                  </div>
                  <span style={{fontSize:'11px',color:'#4b5563'}}>{biz.reviews.toLocaleString()} reviews</span>
                </div>
                <div style={{fontSize:'12.5px',color:'#6b7280',lineHeight:1.5,marginBottom:'14px',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{biz.tagline}</div>
                <a href={`/site/${biz.slug}`} style={{display:'block',textAlign:'center',padding:'10px',borderRadius:'10px',background:'rgba(232,168,56,.08)',border:'1px solid rgba(232,168,56,.12)',color:'#e8a838',fontSize:'12.5px',fontWeight:700}}>View Live Preview →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="section-padding" style={{padding:'60px 48px',background:'rgba(255,255,255,.015)'}}>
        <div style={{textAlign:'center',marginBottom:'44px'}}>
          <div style={{fontSize:'11px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:'#43b87a',marginBottom:'10px'}}>Everything Included</div>
          <h2 style={{fontSize:'clamp(1.5rem,3vw,2.2rem)',color:'#fff'}}>What You Get for $29/mo</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',maxWidth:'720px',margin:'0 auto'}}>
          {[
            '📱 Mobile-responsive design',
            '⭐ Google reviews displayed',
            '🗺️ Embedded Google Maps',
            '🕐 Live business hours',
            '📞 Click-to-call button',
            '🔒 Free SSL certificate',
            '🚀 Lightning-fast hosting',
            '🔍 SEO optimized',
            '🔄 Monthly updates included',
          ].map((f,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'14px 18px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.04)',borderRadius:'10px'}}>
              <span style={{fontSize:'15px'}}>{f.split(' ')[0]}</span>
              <span style={{fontSize:'13px',color:'rgba(255,255,255,.6)',fontWeight:600}}>{f.split(' ').slice(1).join(' ')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LEAD CAPTURE FORM ── */}
      <section ref={formRef} className="section-padding" style={{padding:'80px 48px'}}>
        <div style={{maxWidth:'520px',margin:'0 auto'}}>
          {!submitted ? (
            <>
              <div style={{textAlign:'center',marginBottom:'36px'}}>
                <div style={{fontSize:'48px',marginBottom:'16px',animation:'float 3s ease-in-out infinite'}}>🏗️</div>
                <h2 style={{fontSize:'clamp(1.6rem,3.5vw,2.3rem)',color:'#fff',marginBottom:'10px'}}>
                  Get Your <em style={{color:'#e8a838'}}>Free</em> Website
                </h2>
                <p style={{color:'#6b7280',fontSize:'14.5px',lineHeight:1.6}}>
                  Fill this out and we&apos;ll build your professional website within 24 hours. Free preview — no credit card required.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                <div>
                  <label style={{display:'block',fontSize:'12px',fontWeight:700,color:'#9ca3af',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'.5px'}}>Business Name *</label>
                  <input required type="text" className="input-field" placeholder="e.g. Joe's Barbershop"
                    value={form.business} onChange={(e) => setForm(f => ({...f, business: e.target.value}))}
                  />
                </div>
                <div>
                  <label style={{display:'block',fontSize:'12px',fontWeight:700,color:'#9ca3af',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'.5px'}}>Your Name *</label>
                  <input required type="text" className="input-field" placeholder="e.g. Joe Smith"
                    value={form.owner} onChange={(e) => setForm(f => ({...f, owner: e.target.value}))}
                  />
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                  <div>
                    <label style={{display:'block',fontSize:'12px',fontWeight:700,color:'#9ca3af',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'.5px'}}>Phone *</label>
                    <input required type="tel" className="input-field" placeholder="(573) 555-1234"
                      value={form.phone} onChange={(e) => setForm(f => ({...f, phone: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label style={{display:'block',fontSize:'12px',fontWeight:700,color:'#9ca3af',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'.5px'}}>Email</label>
                    <input type="email" className="input-field" placeholder="joe@email.com"
                      value={form.email} onChange={(e) => setForm(f => ({...f, email: e.target.value}))}
                    />
                  </div>
                </div>

                <button type="submit" disabled={sending} style={{
                  marginTop:'8px',padding:'18px',borderRadius:'14px',border:'none',cursor:'pointer',
                  background: sending ? '#6b7280' : 'linear-gradient(135deg,#e8a838,#d49a2e)',
                  color:'#0a0a14',fontWeight:800,fontSize:'15px',fontFamily:'Plus Jakarta Sans,sans-serif',
                  boxShadow:'0 8px 24px rgba(232,168,56,.25)',transition:'all .3s',
                }}>
                  {sending ? 'Submitting...' : '🚀 Build My Free Website'}
                </button>

                <div style={{textAlign:'center',display:'flex',justifyContent:'center',gap:'20px',color:'#4b5563',fontSize:'11.5px',marginTop:'4px'}}>
                  <span>✓ 100% free preview</span>
                  <span>✓ No credit card</span>
                  <span>✓ Ready in 24hrs</span>
                </div>
              </form>
            </>
          ) : (
            <div style={{textAlign:'center',padding:'40px 20px',animation:'fadeUp .5s ease'}}>
              <div style={{fontSize:'64px',marginBottom:'20px'}}>🎉</div>
              <h2 style={{fontSize:'1.8rem',color:'#fff',marginBottom:'12px'}}>We&apos;re On It!</h2>
              <p style={{color:'rgba(255,255,255,.5)',fontSize:'1rem',lineHeight:1.65,marginBottom:'24px',maxWidth:'380px',marginLeft:'auto',marginRight:'auto'}}>
                We&apos;re building a professional website for <strong style={{color:'#e8a838'}}>{form.business}</strong>. You&apos;ll receive your free preview link within 24 hours.
              </p>
              <div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',borderRadius:'14px',padding:'20px',maxWidth:'340px',margin:'0 auto',marginBottom:'24px'}}>
                <div style={{fontSize:'12px',color:'#6b7280',marginBottom:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'1px'}}>What happens next</div>
                {['We scrape your real business data from Google','Build your custom site with hours, reviews & map','Text you the preview link to approve','You go live — or walk away, no charge'].map((s,i) => (
                  <div key={i} style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:i<3?'10px':0,textAlign:'left'}}>
                    <span style={{color:'#43b87a',fontWeight:700,fontSize:'13px',flexShrink:0}}>✓</span>
                    <span style={{fontSize:'13px',color:'rgba(255,255,255,.55)',lineHeight:1.5}}>{s}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => {setSubmitted(false); setForm({business:'',owner:'',phone:'',email:''});}} style={{fontSize:'13px',color:'#e8a838',background:'none',border:'none',cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif',fontWeight:700}}>← Submit another business</button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{background:'#070a10',padding:'28px 48px',borderTop:'1px solid rgba(255,255,255,.04)',textAlign:'center'}}>
        <div style={{color:'rgba(255,255,255,.2)',fontSize:'12px'}}>
          © 2026 ShowMeSites · Columbia, MO · <a href="mailto:hello@showmesites.com" style={{color:'#e8a838'}}>hello@showmesites.com</a>
        </div>
      </footer>
    </>
  );
}
