'use client';
import { useState } from 'react';

const Logo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lgbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4361EE"/><stop offset="100%" stopColor="#7B2FBE"/>
      </linearGradient>
      <linearGradient id="lgmic" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#E0E8FF"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="400" height="400" rx="80" fill="url(#lgbg)"/>
    <rect x="152" y="48" width="96" height="148" rx="48" fill="url(#lgmic)"/>
    <line x1="162" y1="90" x2="238" y2="90" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="158" y1="110" x2="242" y2="110" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="156" y1="130" x2="244" y2="130" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M140 215 Q140 268 200 268 Q260 268 260 215" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="7" strokeLinecap="round"/>
    <line x1="200" y1="268" x2="200" y2="308" stroke="rgba(255,255,255,0.92)" strokeWidth="7" strokeLinecap="round"/>
    <rect x="168" y="306" width="64" height="10" rx="5" fill="rgba(255,255,255,0.92)"/>
    <path d="M126 168 Q114 200 126 232" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M274 168 Q286 200 274 232" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

export default function Home() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const ar = lang === 'ar';

  return (
    <div dir={ar?'rtl':'ltr'} style={{fontFamily:'"Plus Jakarta Sans",system-ui,sans-serif',background:'#F0F4FF',color:'#0D1117',overflowX:'hidden'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}@keyframes grad{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.hov:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(67,97,238,.14)!important}a{text-decoration:none;color:inherit}`}</style>

      {/* NAV */}
      <nav style={{padding:'16px 6%',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(240,244,255,.93)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:100,borderBottom:'1px solid #E2E8F5'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Logo size={36}/>
          <span style={{fontSize:19,fontWeight:800,letterSpacing:'-.7px',background:'linear-gradient(135deg,#4361EE,#7B2FBE)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>iMeets</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{display:'flex',background:'#fff',border:'1.5px solid #EEF2FF',borderRadius:10,padding:3,gap:3}}>
            {(['ar','en'] as const).map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{padding:'6px 14px',borderRadius:8,border:'none',background:lang===l?'linear-gradient(135deg,#4361EE,#7B2FBE)':'transparent',color:lang===l?'#fff':'#6B7FA3',fontWeight:700,fontSize:12.5,cursor:'pointer',fontFamily:'inherit',transition:'all .2s'}}>
                {l==='ar'?'العربية':'English'}
              </button>
            ))}
          </div>
          <a href="/login" style={{padding:'9px 20px',borderRadius:10,border:'1.5px solid #E2E8F5',background:'#fff',color:'#3D5080',fontWeight:600,fontSize:13.5}}>{ar?'دخول':'Sign in'}</a>
          <a href="/login" style={{padding:'9px 22px',borderRadius:10,background:'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',fontWeight:700,fontSize:13.5,boxShadow:'0 4px 16px rgba(67,97,238,.3)'}}>{ar?'ابدأ مجاناً':'Get started'}</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:'100px 6% 80px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'10%',right:'5%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(67,97,238,.09) 0%,transparent 65%)',pointerEvents:'none'}}/>
        <div style={{display:'inline-block',marginBottom:28,animation:'float 4s ease-in-out infinite'}}><Logo size={96}/></div>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'#EEF2FF',border:'1px solid #C7D2F8',borderRadius:24,padding:'6px 16px',fontSize:12.5,color:'#4361EE',fontWeight:700,marginBottom:20}}>
          {ar?'🤖 مدعوم بـ Claude AI من Anthropic':'🤖 Powered by Claude AI from Anthropic'}
        </div>
        <h1 style={{fontSize:'clamp(36px,6vw,68px)',fontWeight:800,letterSpacing:'-2.5px',lineHeight:1.1,marginBottom:22,display:'block'}}>
          {ar?'اجتماعاتك تُسجَّل':'Your meetings,'}<br/>
          <span style={{background:'linear-gradient(135deg,#4361EE,#7B2FBE,#4361EE)',backgroundSize:'200%',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'grad 4s ease infinite'}}>
            {ar?'وتُلخَّص بالذكاء':'summarized by AI'}
          </span>
        </h1>
        <p style={{fontSize:'clamp(15px,2vw,18px)',color:'#6B7FA3',lineHeight:1.8,maxWidth:540,margin:'0 auto 40px'}}>
          {ar?'iMeets يسجّل Zoom وGoogle Meet، يحوّلهم لنص فوري، ويرسل لك ملخصاً ذكياً بعد كل اجتماع.':'iMeets records Zoom and Google Meet, transcribes in real-time, and sends you a smart summary after every meeting.'}
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:16}}>
          <div style={{display:'flex',background:'#fff',border:'1.5px solid #EEF2FF',borderRadius:14,overflow:'hidden',boxShadow:'0 4px 24px rgba(67,97,238,.1)'}}>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder={ar?'بريدك الإلكتروني':'Your email address'} style={{padding:'14px 20px',border:'none',outline:'none',fontSize:14,fontFamily:'inherit',width:240,background:'transparent',direction:ar?'rtl':'ltr',color:'#0D1117'}}/>
            <button onClick={()=>{if(email)setSent(true)}} style={{padding:'14px 24px',border:'none',background:'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'inherit',whiteSpace:'nowrap'}}>
              {sent?(ar?'✓ تم!':'✓ Done!'):(ar?'ابدأ مجاناً →':'Start free →')}
            </button>
          </div>
        </div>
        <p style={{fontSize:12.5,color:'#9AAAC8'}}>{ar?'لا بطاقة ائتمانية · مجاني للأبد · إلغاء في أي وقت':'No credit card · Free forever · Cancel anytime'}</p>
      </section>

      {/* STATS */}
      <section style={{padding:'60px 6%',background:'linear-gradient(135deg,#4361EE,#7B2FBE)'}}>
        <div style={{maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {(ar?[{n:'٥٠,٠٠٠+',l:'فريق'},{n:'٩٨٪',l:'دقة النسخ'},{n:'+٣٠',l:'لغة'},{n:'٢ س',l:'توفير أسبوعي'}]:[{n:'50K+',l:'Teams'},{n:'98%',l:'Accuracy'},{n:'30+',l:'Languages'},{n:'2hrs',l:'Saved/week'}]).map((s,i)=>(
            <div key={i} style={{textAlign:'center',padding:'20px 16px'}}>
              <div style={{fontSize:'clamp(26px,4vw,42px)',fontWeight:800,color:'#fff',letterSpacing:'-1.5px',marginBottom:6}}>{s.n}</div>
              <p style={{fontSize:13,color:'rgba(255,255,255,.7)'}}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{padding:'90px 6%',background:'#fff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:52}}>
            <h2 style={{fontSize:'clamp(26px,4vw,44px)',fontWeight:800,letterSpacing:'-1.2px',marginBottom:12}}>{ar?'كل ما تحتاجه':'Everything you need'}</h2>
            <p style={{fontSize:16,color:'#6B7FA3'}}>{ar?'من التسجيل حتى التلخيص — iMeets يتولى كل شيء':'From recording to summary — iMeets handles it all'}</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))',gap:18}}>
            {(ar?[
              {icon:'🎙',title:'تسجيل فوري',desc:'اضغط زر واحد — يعمل مع Zoom وGoogle Meet وTeams.',color:'#4361EE',bg:'#EEF2FF'},
              {icon:'📝',title:'نسخ فوري',desc:'الكلمات تظهر حرفاً بحرف — بالعربية والإنجليزية و+٣٠ لغة.',color:'#7B2FBE',bg:'#F5EEFF'},
              {icon:'✦',title:'تلخيص Claude AI',desc:'Claude يستخرج النقاط الرئيسية والمهام تلقائياً.',color:'#059669',bg:'#ECFDF5'},
              {icon:'💬',title:'AI Chat',desc:'اسأل عن أي شيء في الاجتماع — جواب فوري.',color:'#DC2626',bg:'#FEF2F2'},
              {icon:'🔊',title:'تعرف على المتحدثين',desc:'iMeets يميّز بين الأصوات تلقائياً.',color:'#D97706',bg:'#FFFBEB'},
              {icon:'📤',title:'تصدير وتكامل',desc:'صدّر PDF أو Word أو أرسله لـ Notion وSlack.',color:'#0891B2',bg:'#EFF6FF'},
            ]:[
              {icon:'🎙',title:'Instant recording',desc:'One click — works with Zoom, Google Meet & Teams.',color:'#4361EE',bg:'#EEF2FF'},
              {icon:'📝',title:'Real-time transcription',desc:'Words appear as you speak — in 30+ languages.',color:'#7B2FBE',bg:'#F5EEFF'},
              {icon:'✦',title:'Claude AI summary',desc:'Claude extracts key points and action items automatically.',color:'#059669',bg:'#ECFDF5'},
              {icon:'💬',title:'AI Chat',desc:'Ask anything about the meeting — instant answers.',color:'#DC2626',bg:'#FEF2F2'},
              {icon:'🔊',title:'Speaker recognition',desc:'iMeets identifies each speaker automatically.',color:'#D97706',bg:'#FFFBEB'},
              {icon:'📤',title:'Export & integrate',desc:'Export to PDF, Word, or send to Notion & Slack.',color:'#0891B2',bg:'#EFF6FF'},
            ]).map((f,i)=>(
              <div key={i} className="hov" style={{borderRadius:18,border:'1.5px solid #EEF2FF',background:'#fff',padding:26,transition:'all .25s',boxShadow:'0 4px 20px rgba(67,97,238,.05)'}}>
                <div style={{width:50,height:50,borderRadius:14,background:f.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:16}}>{f.icon}</div>
                <h3 style={{fontSize:16,fontWeight:800,letterSpacing:'-.3px',marginBottom:8,color:f.color}}>{f.title}</h3>
                <p style={{fontSize:13.5,color:'#6B7FA3',lineHeight:1.75}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'90px 6%',textAlign:'center',background:'linear-gradient(145deg,#4361EE,#7B2FBE)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-80,right:-80,width:400,height:400,borderRadius:'50%',background:'rgba(255,255,255,.07)'}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'inline-block',marginBottom:20,animation:'float 3s ease-in-out infinite'}}><Logo size={72}/></div>
          <h2 style={{fontSize:'clamp(26px,4vw,50px)',fontWeight:800,color:'#fff',letterSpacing:'-1.5px',lineHeight:1.15,marginBottom:16}}>
            {ar?'ابدأ اجتماعك الأول مع iMeets اليوم':'Start your first meeting with iMeets today'}
          </h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,.75)',lineHeight:1.75,marginBottom:32}}>
            {ar?'انضم لأكثر من ٥٠,٠٠٠ فريق يوفّرون ساعات أسبوعياً. لا بطاقة ائتمانية.':'Join 50,000+ teams saving hours every week. No credit card.'}
          </p>
          <a href="/login" style={{display:'inline-block',padding:'16px 40px',borderRadius:14,background:'#fff',color:'#4361EE',fontWeight:800,fontSize:16,boxShadow:'0 8px 32px rgba(0,0,0,.2)'}}>
            {ar?'ابدأ مجاناً — لا بطاقة مطلوبة':'Get started free — no card required'}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#0D1117',padding:'32px 6% 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
            <Logo size={32}/>
            <span style={{fontSize:17,fontWeight:800,color:'#fff'}}>iMeets</span>
            <span style={{fontSize:12,color:'#2A4060',marginRight:ar?8:0,marginLeft:ar?0:8}}>{ar?'© 2025 جميع الحقوق محفوظة':'© 2025 All rights reserved'}</span>
          </div>
          <div style={{borderTop:'1px solid #1E2D45',paddingTop:18,display:'flex',gap:20,fontSize:12.5,color:'#2A4060'}}>
            {(ar?['الخصوصية','الشروط','الدعم']:['Privacy','Terms','Support']).map(l=><span key={l} style={{cursor:'pointer'}}>{l}</span>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
