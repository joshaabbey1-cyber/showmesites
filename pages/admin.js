import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { businesses } from '../data/businesses';

const PASSWORD = 'showme2026';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === PASSWORD) { setAuthed(true); setError(false); }
    else { setError(true); }
  };

  if (!authed) {
    return (
      <>
        <Head><title>Admin — ShowMeSites</title>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        </Head>
        <style jsx global>{`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Plus Jakarta Sans',sans-serif;background:#0a0a14;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh}`}</style>
        <form onSubmit={handleLogin} style={{textAlign:'center',maxWidth:'360px',padding:'20px'}}>
          <div style={{fontSize:'40px',marginBottom:'16px'}}>🔒</div>
          <h2 style={{fontSize:'1.3rem',marginBottom:'8px'}}>Admin Access</h2>
          <p style={{fontSize:'13px',color:'#6b7280',marginBottom:'24px'}}>Enter password to view portfolio</p>
          <input type="password" value={pass} onChange={(e) => {setPass(e.target.value); setError(false);}}
            placeholder="Password" autoFocus
            style={{width:'100%',padding:'14px 18px',borderRadius:'12px',border:`1.5px solid ${error?'#ef4444':'rgba(255,255,255,.08)'}`,background:'rgba(255,255,255,.04)',color:'#fff',fontSize:'14px',outline:'none',fontFamily:'Plus Jakarta Sans,sans-serif',marginBottom:'12px'}}
          />
          {error && <div style={{color:'#ef4444',fontSize:'12px',marginBottom:'12px'}}>Wrong password</div>}
          <button type="submit" style={{width:'100%',padding:'14px',borderRadius:'12px',border:'none',cursor:'pointer',background:'linear-gradient(135deg,#e8a838,#d49a2e)',color:'#0a0a14',fontWeight:800,fontSize:'14px',fontFamily:'Plus Jakarta Sans,sans-serif'}}>Unlock →</button>
        </form>
      </>
    );
  }

  const cats = [...new Set(businesses.map(b => b.category))];
  const filtered = filter === 'all' ? businesses : businesses.filter(b => b.category === filter);
  const totalReviews = businesses.reduce((s,b) => s + b.reviews, 0);
  const avgRating = (businesses.reduce((s,b) => s + b.rating, 0) / businesses.length).toFixed(1);

  return (
    <>
      <Head><title>Portfolio — ShowMeSites Admin</title>
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
          <span style={{fontWeight:700,fontSize:'17px',color:'#fff'}}>ShowMeSites</span>
          <span style={{padding:'4px 10px',borderRadius:'6px',background:'rgba(239,68,68,.1)',color:'#ef4444',fontSize:'10px',fontWeight:800,letterSpacing:'.5px'}}>ADMIN</span>
        </div>
        <button onClick={() => setAuthed(false)} style={{color:'#6b7280',fontSize:'13px',fontWeight:600,padding:'8px 18px',borderRadius:'100px',border:'1px solid rgba(255,255,255,.08)',background:'none',cursor:'pointer'}}>🔒 Lock</button>
      </nav>

      {/* ── STATS ── */}
      <div style={{padding:'32px 48px 0'}}>
        <h1 style={{fontSize:'1.8rem',color:'#fff',marginBottom:'24px'}}>📊 Command Center</h1>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'12px',marginBottom:'32px'}}>
          {[
            {val:businesses.length,label:'Total Sites',icon:'🌐',color:'rgba(232,168,56,.08)'},
            {val:avgRating,label:'Avg Rating',icon:'⭐',color:'rgba(234,179,8,.08)'},
            {val:totalReviews.toLocaleString(),label:'Total Reviews',icon:'💬',color:'rgba(67,184,122,.08)'},
            {val:`$${businesses.length * 29}`,label:'Potential MRR',icon:'💰',color:'rgba(99,102,241,.08)'},
            {val:cats.length,label:'Categories',icon:'📂',color:'rgba(239,68,68,.08)'},
          ].map((s,i) => (
            <div key={i} style={{background:s.color,border:'1px solid rgba(255,255,255,.04)',borderRadius:'14px',padding:'20px',textAlign:'center'}}>
              <div style={{fontSize:'22px',marginBottom:'8px'}}>{s.icon}</div>
              <div style={{fontSize:'1.5rem',fontWeight:800,color:'#fff',fontFamily:'DM Serif Display,serif'}}>{s.val}</div>
              <div style={{fontSize:'11px',color:'#6b7280',fontWeight:600,textTransform:'uppercase',letterSpacing:'.5px'}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── FILTER ── */}
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
          <button onClick={() => setFilter('all')} style={{padding:'8px 16px',borderRadius:'100px',border:'none',cursor:'pointer',background:filter==='all'?'#e8a838':'rgba(255,255,255,.04)',color:filter==='all'?'#0a0a14':'#9ca3af',fontWeight:700,fontSize:'12px',fontFamily:'Plus Jakarta Sans,sans-serif'}}>All ({businesses.length})</button>
          {cats.map(c => {
            const count = businesses.filter(b => b.category === c).length;
            return (
              <button key={c} onClick={() => setFilter(c)} style={{padding:'8px 16px',borderRadius:'100px',border:'none',cursor:'pointer',background:filter===c?'#e8a838':'rgba(255,255,255,.04)',color:filter===c?'#0a0a14':'#9ca3af',fontWeight:700,fontSize:'12px',fontFamily:'Plus Jakarta Sans,sans-serif'}}>{c} ({count})</button>
            );
          })}
        </div>

        {/* ── BUSINESS GRID ── */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:'14px',paddingBottom:'60px'}}>
          {filtered.map(biz => (
            <div key={biz.slug} style={{background:'#111122',border:'1px solid rgba(255,255,255,.05)',borderRadius:'14px',overflow:'hidden'}}>
              <div style={{height:'140px',position:'relative',overflow:'hidden'}}>
                <img src={biz.heroImg} alt={biz.name} style={{width:'100%',height:'100%',objectFit:'cover',opacity:.5}}/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(17,17,34,.95) 0%,transparent 60%)'}}/>
                <div style={{position:'absolute',bottom:'12px',left:'16px',display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{fontSize:'22px'}}>{biz.icon}</span>
                  <div>
                    <div style={{fontSize:'15px',fontWeight:700,color:'#fff'}}>{biz.name}</div>
                    <div style={{fontSize:'11px',color:'rgba(255,255,255,.4)'}}>{biz.category}</div>
                  </div>
                </div>
              </div>
              <div style={{padding:'16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                    <span style={{color:'#e8a838',fontSize:'13px'}}>{'★'.repeat(Math.round(biz.rating))}</span>
                    <span style={{fontSize:'13px',fontWeight:700,color:'#e8a838'}}>{biz.rating}</span>
                    <span style={{fontSize:'11px',color:'#4b5563'}}>({biz.reviews})</span>
                  </div>
                </div>
                <div style={{fontSize:'12px',color:'#6b7280',marginBottom:'14px'}}>{biz.address}</div>
                <div style={{display:'flex',gap:'8px'}}>
                  <Link href={`/site/${biz.slug}`}>
                    <span style={{flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'6px',padding:'10px',borderRadius:'10px',background:'rgba(232,168,56,.08)',border:'1px solid rgba(232,168,56,.12)',color:'#e8a838',fontSize:'12px',fontWeight:700,cursor:'pointer'}}>👁️ Preview</span>
                  </Link>
                  <button onClick={() => {navigator.clipboard.writeText(`https://showmesites.vercel.app/site/${biz.slug}`);}} style={{flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'6px',padding:'10px',borderRadius:'10px',background:'rgba(67,184,122,.08)',border:'1px solid rgba(67,184,122,.12)',color:'#6ee7a8',fontSize:'12px',fontWeight:700,cursor:'pointer',fontFamily:'Plus Jakarta Sans,sans-serif'}}>📋 Copy Link</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
