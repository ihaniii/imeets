'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

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
    <line x1="162" y1="90"  x2="238" y2="90"  stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="158" y1="110" x2="242" y2="110" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="156" y1="130" x2="244" y2="130" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="157" y1="150" x2="243" y2="150" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="160" y1="170" x2="240" y2="170" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M140 215 Q140 268 200 268 Q260 268 260 215" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="7" strokeLinecap="round"/>
    <line x1="200" y1="268" x2="200" y2="308" stroke="rgba(255,255,255,0.92)" strokeWidth="7" strokeLinecap="round"/>
    <rect x="168" y="306" width="64" height="10" rx="5" fill="rgba(255,255,255,0.92)"/>
    <path d="M126 168 Q114 200 126 232" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M106 152 Q88 200 106 248" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="4" strokeLinecap="round"/>
    <path d="M274 168 Q286 200 274 232" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M294 152 Q312 200 294 248" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export default function Login() {
  const [mode, setMode] = useState<'login'|'signup'|'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<any>(null);
  const [showPwd, setShowPwd] = useState(false);

  const submit = async () => {
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) setError(error.message);
        else setSuccess('Reset link sent! Check your email ✅');
      } else if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError('Invalid email or password');
        else window.location.href = '/dashboard';
      } else {
        const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
        if (error) setError(error.message);
        else window.location.href = '/dashboard';
      }
    } catch(e) { setError('Something went wrong'); }
    setLoading(false);
  };

  if (user) return (
    <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center',background:'#F0F4FF',fontFamily:'"Plus Jakarta Sans",sans-serif'}}>
      <div style={{background:'#fff',borderRadius:24,padding:'48px',textAlign:'center',boxShadow:'0 12px 48px rgba(67,97,238,.12)',width:400}}>
        <div style={{marginBottom:20}}><Logo size={64}/></div>
        <h2 style={{fontSize:22,fontWeight:800,color:'#0D1117',marginBottom:8,letterSpacing:'-.5px'}}>Welcome back! 🎉</h2>
        <p style={{color:'#6B7FA3',marginBottom:28,fontSize:14}}>{user.email}</p>
        <div style={{background:'#F0F4FF',borderRadius:12,padding:'14px',marginBottom:24,fontSize:13,color:'#4361EE',fontWeight:600}}>
          iMeets is ready — start recording your meetings
        </div>
        <button onClick={async()=>{await supabase.auth.signOut();setUser(null);}} style={{padding:'10px 28px',borderRadius:10,border:'1.5px solid #EEF2FF',background:'transparent',color:'#EF4444',cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:'inherit'}}>
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div style={{display:'flex',height:'100vh',fontFamily:'"Plus Jakarta Sans",system-ui,sans-serif',overflow:'hidden'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes spin{to{transform:rotate(360deg)}}input:focus{border-color:#4361EE!important;background:#fff!important;outline:none}`}</style>

      {/* Left decorative panel */}
      <div style={{flex:1,background:'linear-gradient(145deg,#3451D1 0%,#7B2FBE 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:48,position:'relative',overflow:'hidden'}}>
        {[{w:320,t:'8%',l:'5%',o:.08},{w:200,t:'65%',l:'60%',o:.05},{w:150,t:'75%',l:'5%',o:.07}].map((c,i)=>(
          <div key={i} style={{position:'absolute',width:c.w,height:c.w,borderRadius:'50%',border:'1px solid rgba(255,255,255,.2)',top:c.t,left:c.l,opacity:c.o}}/>
        ))}
        <div style={{position:'relative',zIndex:1,textAlign:'center',color:'#fff',animation:'float 4s ease-in-out infinite'}}>
          <div style={{marginBottom:24}}><Logo size={88}/></div>
          <h1 style={{fontSize:38,fontWeight:800,letterSpacing:'-1px',marginBottom:12,lineHeight:1.1}}>iMeets</h1>
          <p style={{fontSize:15,opacity:.8,lineHeight:1.7,maxWidth:280}}>Record · Transcribe · Summarize with Claude AI</p>
        </div>
        <div style={{position:'relative',zIndex:1,display:'flex',flexDirection:'column',gap:12,marginTop:48,width:'100%',maxWidth:300}}>
          {[['🎙','Instant meeting recording'],['📝','Real-time transcription'],['✦','Claude AI summaries'],['💬','AI Chat about meetings']].map(([icon,text])=>(
            <div key={text as string} style={{display:'flex',alignItems:'center',gap:12,background:'rgba(255,255,255,.1)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,.15)',borderRadius:12,padding:'12px 16px'}}>
              <span style={{fontSize:17}}>{icon}</span>
              <span style={{fontSize:13.5,color:'#fff',fontWeight:500}}>{text as string}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div style={{width:460,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'48px 44px',background:'#fff',boxShadow:'-4px 0 40px rgba(67,97,238,.07)',overflowY:'auto'}}>
        <div style={{width:'100%',maxWidth:360}}>
          {/* Logo row */}
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:36}}>
            <Logo size={36}/>
            <span style={{fontSize:18,fontWeight:800,color:'#0D1117',letterSpacing:'-.6px'}}>iMeets</span>
          </div>

          <h2 style={{fontSize:24,fontWeight:800,color:'#0D1117',marginBottom:6,letterSpacing:'-.5px'}}>
            {mode==='login'?'Welcome back 👋':mode==='signup'?'Create your account 🎙':'Reset password'}
          </h2>
          <p style={{fontSize:13.5,color:'#6B7FA3',marginBottom:28,lineHeight:1.6}}>
            {mode==='login'?'Sign in to your iMeets account':mode==='signup'?'Start free — no credit card required':'Enter your email and we\'ll send a reset link'}
          </p>

          {error&&<div style={{padding:'11px 14px',borderRadius:10,background:'#FEF2F2',border:'1px solid #FCA5A5',color:'#DC2626',fontSize:13,marginBottom:18,fontWeight:500}}>{error}</div>}
          {success&&<div style={{padding:'11px 14px',borderRadius:10,background:'#ECFDF5',border:'1px solid #6EE7B7',color:'#059669',fontSize:13,marginBottom:18,fontWeight:500}}>{success}</div>}

          {mode==='signup'&&(
            <div style={{marginBottom:16}}>
              <label style={{display:'block',fontSize:12.5,fontWeight:600,color:'#3D5080',marginBottom:6}}>Full name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="John Smith" style={{width:'100%',padding:'12px 14px',borderRadius:11,border:'1.5px solid #E2E8F5',background:'#F8FAFF',fontSize:13.5,fontFamily:'inherit',color:'#0D1117',transition:'all .2s'}}/>
            </div>
          )}

          <div style={{marginBottom:16}}>
            <label style={{display:'block',fontSize:12.5,fontWeight:600,color:'#3D5080',marginBottom:6}}>Email address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" style={{width:'100%',padding:'12px 14px',borderRadius:11,border:'1.5px solid #E2E8F5',background:'#F8FAFF',fontSize:13.5,fontFamily:'inherit',color:'#0D1117',transition:'all .2s'}}/>
          </div>

          {mode!=='forgot'&&(
            <div style={{marginBottom:mode==='login'?8:22}}>
              <label style={{display:'block',fontSize:12.5,fontWeight:600,color:'#3D5080',marginBottom:6}}>Password</label>
              <div style={{position:'relative'}}>
                <input type={showPwd?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{width:'100%',padding:'12px 40px 12px 14px',borderRadius:11,border:'1.5px solid #E2E8F5',background:'#F8FAFF',fontSize:13.5,fontFamily:'inherit',color:'#0D1117',transition:'all .2s'}}/>
                <button onClick={()=>setShowPwd(v=>!v)} style={{position:'absolute',top:'50%',right:12,transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:14,opacity:.5}}>{showPwd?'🙈':'👁'}</button>
              </div>
            </div>
          )}

          {mode==='login'&&(
            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:22}}>
              <button onClick={()=>{setMode('forgot');setError('');setSuccess('');}} style={{background:'none',border:'none',color:'#4361EE',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Forgot password?</button>
            </div>
          )}

          <button onClick={submit} disabled={loading||!email||(mode!=='forgot'&&!password)} style={{width:'100%',padding:'13px',borderRadius:12,border:'none',background:loading||!email?'#C7D2F8':'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',fontWeight:700,fontSize:14,cursor:loading||!email?'not-allowed':'pointer',fontFamily:'inherit',marginBottom:20,boxShadow:loading||!email?'none':'0 4px 18px rgba(67,97,238,.3)',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            {loading
              ?<><div style={{width:16,height:16,border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin .7s linear infinite'}}/>{mode==='login'?'Signing in...':mode==='signup'?'Creating account...':'Sending...'}</>
              :mode==='login'?'Sign in →':mode==='signup'?'Create account →':'Send reset link'
            }
          </button>

          <p style={{textAlign:'center',fontSize:13,color:'#6B7FA3'}}>
            {mode==='login'&&<>Don't have an account? <button onClick={()=>{setMode('signup');setError('');setSuccess('');}} style={{background:'none',border:'none',color:'#4361EE',fontWeight:700,cursor:'pointer',fontFamily:'inherit',fontSize:13}}>Sign up free</button></>}
            {mode==='signup'&&<>Have an account? <button onClick={()=>{setMode('login');setError('');setSuccess('');}} style={{background:'none',border:'none',color:'#4361EE',fontWeight:700,cursor:'pointer',fontFamily:'inherit',fontSize:13}}>Sign in</button></>}
            {mode==='forgot'&&<button onClick={()=>{setMode('login');setError('');setSuccess('');}} style={{background:'none',border:'none',color:'#4361EE',fontWeight:700,cursor:'pointer',fontFamily:'inherit',fontSize:13}}>← Back to sign in</button>}
          </p>

          <p style={{textAlign:'center',fontSize:11,color:'#C4CFDF',marginTop:28}}>By signing up you agree to our <span style={{color:'#4361EE'}}>Terms</span> and <span style={{color:'#4361EE'}}>Privacy Policy</span></p>
        </div>
      </div>
    </div>
  );
}
