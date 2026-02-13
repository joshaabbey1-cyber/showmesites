import Head from 'next/head';
import { useRouter } from 'next/router';
import { businesses } from '../data/businesses';

export default function Success() {
  const router = useRouter();
  const { slug } = router.query;
  const biz = businesses.find(b => b.slug === slug);

  return (
    <>
      <Head>
        <title>Welcome! Your site is live — SiteForge</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={{
        minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        background:'linear-gradient(135deg,#0a0a14 0%,#111125 100%)',fontFamily:'Plus Jakarta Sans,sans-serif',
        padding:'40px 20px',textAlign:'center',
      }}>
        <div style={{fontSize:'72px',marginBottom:'24px',animation:'bounce 1s ease-in-out infinite alternate'}}>🎉</div>
        <h1 style={{fontFamily:'DM Serif Display,serif',fontSize:'clamp(2rem,5vw,3.5rem)',color:'#fff',marginBottom:'16px'}}>
          You&apos;re <em style={{color:'#e8a838'}}>Live!</em>
        </h1>
        <p style={{color:'rgba(255,255,255,.5)',fontSize:'1.1rem',maxWidth:'480px',lineHeight:1.6,marginBottom:'36px'}}>
          {biz ? (
            <>Your website for <strong style={{color:'#fff'}}>{biz.name}</strong> is now active. Customers can find you online starting today.</>
          ) : (
            <>Your website is now active. Customers can find you online starting today.</>
          )}
        </p>

        <div style={{
          background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',
          borderRadius:'16px',padding:'32px 40px',maxWidth:'440px',width:'100%',marginBottom:'32px',
        }}>
          <div style={{fontSize:'12px',color:'#6b7280',fontWeight:700,textTransform:'uppercase',letterSpacing:'1px',marginBottom:'16px'}}>What happens next</div>
          {[
            {icon:'🌐',text:'Your site is live and indexed by Google within 48 hours'},
            {icon:'📱',text:'Mobile-responsive design works on all devices'},
            {icon:'🔄',text:"We'll keep your hours, reviews & info updated"},
            {icon:'📧',text:'You\'ll get a welcome email with your admin link'},
          ].map((item,i) => (
            <div key={i} style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:i<3?'14px':0,textAlign:'left'}}>
              <span style={{fontSize:'20px',flexShrink:0}}>{item.icon}</span>
              <span style={{color:'rgba(255,255,255,.65)',fontSize:'14px',lineHeight:1.5}}>{item.text}</span>
            </div>
          ))}
        </div>

        {slug && (
          <a href={`/site/${slug}`} style={{
            display:'inline-flex',alignItems:'center',gap:'10px',padding:'16px 32px',
            borderRadius:'100px',background:'linear-gradient(135deg,#e8a838,#d49a2e)',
            color:'#1a1a2e',textDecoration:'none',fontWeight:800,fontSize:'15px',
            boxShadow:'0 8px 24px rgba(232,168,56,.3)',
          }}>View Your Website →</a>
        )}
        
        <style jsx>{`@keyframes bounce{0%{transform:translateY(0)}100%{transform:translateY(-10px)}}`}</style>
      </div>
    </>
  );
}
