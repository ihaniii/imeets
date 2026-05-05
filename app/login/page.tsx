'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const Logo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4361EE"/><stop offset="100%" stopColor="#7B2FBE"/></linearGradient>
      <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff"/><stop offset="100%" stopColor="#E0E8FF"/></linearGradient>
    </defs>
    <rect width="400" height="400" rx="90" fill="url(#lg1)"/>
    <rect x="152" y="48" width="96" height="148" rx="48" fill="url(#lg2)"/>
    <line x1="162" y1="110" x2="238" y2="110" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="158" y1="130" x2="242" y2="130" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="156" y1="150" x2="244" y2="150" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M140 215 Q140 268 200 268 Q260 268 260 215" fill="none" stroke="rgba(255,255,255,.92)" strokeWidth="7" strokeLinecap="round"/>
    <line x1="200" y1="268" x2="200" y2="308" stroke="rgba(255,255,255,.92)" strokeWidth="7" strokeLinecap="round"/>
    <rect x="168" y="306" width="64" height="10" rx="5" fill="rgba(255,255,255,.92)"/>
    <path d="M126 168 Q114 200 126 232" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M274 168 Q286 200 274 232" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="5" strokeLinecap="round"/>
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

  if (user) { window.location.href = '/dashboard'; return null; }

  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFF', fontFamily:'"Plus Jakarta Sans",system-ui,sans-serif', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        input:focus{border-color:#4361EE!important;background:#fff!important;outline:none}
      `}</style>

      <div style={{ width:'100%', maxWidth:440, animation:'fadeUp .4s ease' }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'12px 20px', background:'#fff', borderRadius:16, boxShadow:'0 4px 20px rgba(67,97,238,.1)', border:'1px solid #EEF2FF' }}>
            <Logo size={36}/>
            <span style={{ fontSize:22, fontWeight:800, letterSpacing:'-.7px', background:'linear-gradient(135deg,#4361EE,#7B2FBE)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>iMeets</span>
          </div>
        </div>

        {/* Card */}
        <div style={{ background:'#fff', borderRadius:24, padding:'36px 32px', boxShadow:'0 8px 40px rgba(67,97,238,.1)', border:'1px solid #EEF2FF' }}>
          <h2 style={{ fontSize:24, fontWeight:800, color:'#0D1117', marginBottom:6, letterSpacing:'-.5px' }}>
            {mode==='login'?'Welcome back 👋':mode==='signup'?'Create account 🎙':'Reset password'}
          </h2>
          <p style={{ fontSize:14, color:'#6B7FA3', marginBottom:24, lineHeight:1.6 }}>
            {mode==='login'?'Sign in to your iMeets account':mode==='signup'?'Start free — no credit card required':'Enter your email for a reset link'}
          </p>

          {error&&<div style={{ padding:'11px 14px', borderRadius:10, background:'#FEF2F2', border:'1px solid #FCA5A5', color:'#DC2626', fontSize:13, marginBottom:16, fontWeight:500 }}>{error}</div>}
          {success&&<div style={{ padding:'11px 14px', borderRadius:10, background:'#ECFDF5', border:'1px solid #6EE7B7', color:'#059669', fontSize:13, marginBottom:16, fontWeight:500 }}>{success}</div>}

          {mode==='signup'&&(
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'#3D5080', marginBottom:6 }}>Full name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{ width:'100%', padding:'13px 14px', borderRadius:12, border:'1.5px solid #E2E8F5', background:'#F8FAFF', fontSize:14, fontFamily:'inherit', color:'#0D1117', transition:'all .2s' }}/>
            </div>
          )}

          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'#3D5080', marginBottom:6 }}>Email address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" style={{ width:'100%', padding:'13px 14px', borderRadius:12, border:'1.5px solid #E2E8F5', background:'#F8FAFF', fontSize:14, fontFamily:'inherit', color:'#0D1117', transition:'all .2s' }}/>
          </div>

          {mode!=='forgot'&&(
            <div style={{ marginBottom: mode==='login'?8:20 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'#3D5080', marginBottom:6 }}>Password</label>
              <div style={{ position:'relative' }}>
                <input type={showPwd?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{ width:'100%', padding:'13px 44px 13px 14px', borderRadius:12, border:'1.5px solid #E2E8F5', background:'#F8FAFF', fontSize:14, fontFamily:'inherit', color:'#0D1117', transition:'all .2s' }}/>
                <button onClick={()=>setShowPwd(v=>!v)} style={{ position:'absolute', top:'50%', right:12, transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, opacity:.5 }}>{showPwd?'🙈':'👁'}</button>
              </div>
            </div>
          )}

          {mode==='login'&&(
            <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
              <button onClick={()=>{setMode('forgot');setError('');setSuccess('');}} style={{ background:'none', border:'none', color:'#4361EE', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Forgot password?</button>
            </div>
          )}

          <button onClick={submit} disabled={loading||!email||(mode!=='forgot'&&!password)} style={{ width:'100%', padding:'14px', borderRadius:13, border:'none', background:loading||!email?'#C7D2F8':'linear-gradient(135deg,#4361EE,#7B2FBE)', color:'#fff', fontWeight:700, fontSize:15, cursor:loading||!email?'not-allowed':'pointer', fontFamily:'inherit', marginBottom:20, boxShadow:loading||!email?'none':'0 4px 18px rgba(67,97,238,.3)', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {loading
              ?<><div style={{ width:16, height:16, border:'2px solid rgba(255,255,255,.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin .7s linear infinite' }}/>Loading...</>
              :mode==='login'?'Sign in →':mode==='signup'?'Create account →':'Send reset link'
            }
          </button>

          <p style={{ textAlign:'center', fontSize:13.5, color:'#6B7FA3' }}>
            {mode==='login'&&<>No account? <button onClick={()=>{setMode('signup');setError('');setSuccess('');}} style={{ background:'none', border:'none', color:'#4361EE', fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:13.5 }}>Sign up free</button></>}
            {mode==='signup'&&<>Have account? <button onClick={()=>{setMode('login');setError('');setSuccess('');}} style={{ background:'none', border:'none', color:'#4361EE', fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:13.5 }}>Sign in</button></>}
            {mode==='forgot'&&<button onClick={()=>{setMode('login');setError('');setSuccess('');}} style={{ background:'none', border:'none', color:'#4361EE', fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:13.5 }}>← Back to sign in</button>}
          </p>
        </div>

        <p style={{ textAlign:'center', fontSize:12, color:'#C4CFDF', marginTop:20 }}>
          By signing up you agree to our <span style={{ color:'#9AAAC8' }}>Terms</span> & <span style={{ color:'#9AAAC8' }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
