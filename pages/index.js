import Head from 'next/head';
import { useState } from 'react';
import { businesses } from '../data/businesses';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const q = query.toLowerCase().trim();
    const match = businesses.find(b =>
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q)
    );
    if (match) { setResult(match); setNotFound(false); }
    else { setResult(null); setNotFound(true); }
  };

  return (
    <>
      <Head>
        <title>ShowMeSites — We Built Your Website</title>
        <meta name="description" content="We already built a professional website for your business. Search to see your free preview." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased;background:#0a0a14;color:#e5e5e5}
        h1,h2,h3{font-family:'DM Serif Display',serif;font-weight:400}
        a{text-decoration:none}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      `}</style>

      <nav style={{padding:'20px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,.04)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'34px',height:'34px',borderRadius:'9px',background:'linear-gradient(135deg,#e8a838,#d49a2e)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'16px',color:'#0a0a14'}}>S</div>
          <span style={{fontWeight:700,fontSize:'17px',color:'#fff',letterSpacing:'-0.3px'}}>ShowMeSites</span>
        </div>
        <a href="mailto:hello@showmesites.com" style={{color:'#9ca3af',fontSize:'13px',fontWeight:600,padding:'8px 18px',borderRadius:'100px',border:'1px solid rgba(255,255,255,.08)'}}>Contact Us</a>
      </nav>

      <section style={{minHeight:'92vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px 24px',textAlign:'center',position:'relative'}}>
        <div style={{position:'absolute',top:'30%',left:'50%',transform:'translate(-50%,-50%)',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(232,168,56,.07) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div style={{animation:'float 4s ease-in-out infinite',fontSize:'56px',marginBottom:'28px'}}>🌐</div>
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(67,184,122,.08)',border:'1px solid rgba(67,184,122,.15)',padding:'8px 20px',borderRadius:'100px',fontSize:'12px',fontWeight:700,color:'#6ee7a8',marginBottom:'28px',letterSpacing:'.5px'}}>
          ✨ Free preview ready for your business
        </div>
        <h1 style={{fontSize:'clamp(2.2rem,5.5vw,3.8rem)',color:'#fff',lineHeight:1.08,marginBottom:'18px',letterSpacing:'-1.5px',maxWidth:'650px'}}>
          We already built your <em style={{color:'#e8a838',fontStyle:'italic'}}>website</em>
        </h1>
        <p style={{color:'rgba(255,255,255,.4)',fontSize:'1.1rem',lineHeight:1.65,maxWidth:'440px',marginBottom:'44px'}}>
          Search for your business below to see your free professional website preview. No strings attached.
        </p>

        <form onSubmit={handleSearch} style={{width:'100%',maxWidth:'520px'}}>
          <div style={{display:'flex',gap:'10px'}}>
            <input type="text" value={query}
              onChange={(e) => { setQuery(e.target.value); setNotFound(false); setResult(null); }}
              placeholder="Type your business name..."
              style={{flex:1,padding:'18px 24px',borderRadius:'14px',border:'1.5px solid rgba(255,255,255,.08)',background:'rgba(255,255,255,.04)',color:'#fff',fontSize:'15px',outline:'none',fontFamily:'Plus Jakarta Sans,sans-serif'}}
            />
            <button type="submit" style={{padding:'18px 28px',borderRadius:'14px',border:'none',cursor:'pointer',background:'linear-gradient(135deg,#e8a838,#d49a2e)',color:'#0a0a14',fontWeight:800,fontSize:'14px',fontFamily:'Plus Jakarta Sans,sans-serif',whiteSpace:'nowrap'}}>Find My Site →</button>
          </div>
        </form>

        {result && (
          <div style={{marginTop:'32px',width:'100%',maxWidth:'520px'}}>
            <a href={`/site/${result.slug}`} style={{display:'flex',alignItems:'center',gap:'18px',padding:'20px 24px',background:'rgba(255,255,255,.04)',border:'1.5px solid rgba(232,168,56,.2)',borderRadius:'16px',textDecoration:'none',transition:'all .3s'}}>
              <div style={{width:'52px',height:'52px',borderRadius:'14px',background:'linear-gradient(135deg,rgba(232,168,56,.15),rgba(232,168,56,.05))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0}}>{result.icon}</div>
              <div style={{flex:1,textAlign:'left'}}>
                <div style={{fontSize:'16px',fontWeight:700,color:'#fff',marginBottom:'3px'}}>{result.name}</div>
                <div style={{fontSize:'13px',color:'#6b7280'}}>{result.category} · ⭐ {result.rating} ({result.reviews.toLocaleString()} reviews)</div>
              </div>
              <div style={{padding:'10px 20px',borderRadius:'100px',background:'linear-gradient(135deg,#e8a838,#d49a2e)',color:'#0a0a14',fontWeight:800,fontSize:'12.5px',whiteSpace:'nowrap',flexShrink:0}}>View Preview →</div>
            </a>
          </div>
        )}

        {notFound && (
          <div style={{marginTop:'32px',width:'100%',maxWidth:'520px',padding:'24px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',borderRadius:'16px',textAlign:'center'}}>
            <div style={{fontSize:'32px',marginBottom:'12px'}}>🔍</div>
            <div style={{fontSize:'15px',fontWeight:600,color:'#fff',marginBottom:'6px'}}>We haven&apos;t built your site yet</div>
            <p style={{fontSize:'13.5px',color:'#6b7280',lineHeight:1.6,marginBottom:'16px'}}>Want a free professional website? We&apos;ll build one and send you the preview within 24 hours.</p>
            <a href={`mailto:hello@showmesites.com?subject=Website for ${encodeURIComponent(query)}&body=Hi, I'd like a free website preview for my business: ${encodeURIComponent(query)}`} style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'12px 24px',borderRadius:'100px',background:'rgba(232,168,56,.1)',border:'1px solid rgba(232,168,56,.2)',color:'#e8a838',fontWeight:700,fontSize:'13px'}}>📧 Request a Free Preview</a>
          </div>
        )}

        <div style={{marginTop:'80px',display:'flex',gap:'40px',flexWrap:'wrap',justifyContent:'center'}}>
          {[{icon:'🏗️',text:'We build it for free'},{icon:'👁️',text:'You preview it here'},{icon:'⚡',text:'Activate for $29/mo'}].map((s,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{fontSize:'20px'}}>{s.icon}</span>
              <span style={{fontSize:'13px',color:'rgba(255,255,255,.35)',fontWeight:600}}>{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      <footer style={{background:'#070a10',padding:'28px 48px',borderTop:'1px solid rgba(255,255,255,.04)',textAlign:'center'}}>
        <div style={{color:'rgba(255,255,255,.2)',fontSize:'12px'}}>© 2026 ShowMeSites · Columbia, MO · <a href="mailto:hello@showmesites.com" style={{color:'#e8a838'}}>hello@showmesites.com</a></div>
      </footer>
    </>
  );
}
