'use client';
import { useState } from 'react';

export default function Home() {
  const [lang, setLang] = useState('ar');
  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{fontFamily:'sans-serif',background:'#F0F4FF',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20}}>
      <div style={{display:'flex',gap:8,background:'#fff',border:'1.5px solid #EEF2FF',borderRadius:10,padding:4}}>
        <button onClick={()=>setLang('ar')} style={{padding:'8px 16px',borderRadius:8,border:'none',background:lang==='ar'?'linear-gradient(135deg,#4361EE,#7B2FBE)':'transparent',color:lang==='ar'?'#fff':'#6B7FA3',fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>العربية</button>
        <button onClick={()=>setLang('en')} style={{padding:'8px 16px',borderRadius:8,border:'none',background:lang==='en'?'linear-gradient(135deg,#4361EE,#7B2FBE)':'transparent',color:lang==='en'?'#fff':'#6B7FA3',fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>English</button>
      </div>
      <h1 style={{fontSize:48,fontWeight:800,color:'#4361EE'}}>{lang==='ar'?'مرحباً بك في iMeets':'Welcome to iMeets'}</h1>
      <p style={{fontSize:18,color:'#6B7FA3'}}>{lang==='ar'?'سجّل اجتماعاتك بالذكاء الاصطناعي':'Record your meetings with AI'}</p>
      <a href="/login" style={{padding:'14px 32px',borderRadius:12,background:'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',fontWeight:700,fontSize:16,textDecoration:'none'}}>{lang==='ar'?'ابدأ مجاناً':'Get started free'}</a>
    </div>
  );
}
