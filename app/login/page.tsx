'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState<any>(null);

  const submit = async () => {
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError('Invalid email or password');
        else setUser(data.user);
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error.message);
        else setSuccess('Account created! Check your email ✅');
      }
    } catch(e) { setError('An error occurred'); }
    setLoading(false);
  };

  if (user) return (
    <main style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#F0F4FF',fontFamily:'sans-serif'}}>
      <div style={{background:'#fff',borderRadius:20,padding:'40px 48px',textAlign:'center',boxShadow:'0 8px 32px rgba(67,97,238,.12)'}}>
        <div style={{fontSize:48,marginBottom:16}}>🎙</div>
        <h1 style={{fontSize:24,fontWeight:800,color:'#0D1117',marginBottom:8}}>Welcome to iMeets ✅</h1>
        <p style={{color:'#6B7FA3',marginBottom:24}}>{user.email}</p>
        <button onClick={async()=>{await supabase.auth.signOut();setUser(null);}} style={{padding:'10px 28px',borderRadius:10,border:'1px solid #EEF2FF',background:'transparent',color:'#EF4444',cursor:'pointer',fontSize:14,fontWeight:600}}>Sign out</button>
      </div>
    </main>
  );

  return (
    <main style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'#F0F4FF',fontFamily:'sans-serif'}}>
      <div style={{background:'#fff',borderRadius:20,padding:'40px',width:380,boxShadow:'0 8px 32px rgba(67,97,238,.12)'}}>
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{width:52,height:52,borderRadius:14,background:'linear-gradient(135deg,#4361EE,#7B2FBE)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,margin:'0 auto 12px'}}>🎙</div>
          <h1 style={{fontSize:22,fontWeight:800,color:'#0D1117',marginBottom:4}}>iMeets</h1>
          <p style={{fontSize:13,color:'#9AAAC8'}}>{mode==='login'?'Sign in to your account':'Create your free account'}</p>
        </div>
        {error&&<div style={{background:'#FEF2F2',border:'1px solid #FCA5A5',borderRadius:10,padding:'10px 14px',fontSize:13,color:'#DC2626',marginBottom:16}}>{error}</div>}
        {success&&<div style={{background:'#ECFDF5',border:'1px solid #6EE7B7',borderRadius:10,padding:'10px 14px',fontSize:13,color:'#059669',marginBottom:16}}>{success}</div>}
        <div style={{marginBottom:14}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#3D5080',marginBottom:6}}>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{width:'100%',padding:'11px 14px',borderRadius:10,border:'1.5px solid #EEF2FF',fontSize:13.5,outline:'none',fontFamily:'inherit',background:'#F8FAFF'}}/>
        </div>
        <div style={{marginBottom:22}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#3D5080',marginBottom:6}}>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{width:'100%',padding:'11px 14px',borderRadius:10,border:'1.5px solid #EEF2FF',fontSize:13.5,outline:'none',fontFamily:'inherit',background:'#F8FAFF'}}/>
        </div>
        <button onClick={submit} disabled={loading||!email||!password} style={{width:'100%',padding:'13px',borderRadius:12,border:'none',background:loading||!email||!password?'#C7D2F8':'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',fontWeight:700,fontSize:14,cursor:loading||!email||!password?'not-allowed':'pointer',fontFamily:'inherit',marginBottom:16}}>
          {loading?'Loading...':(mode==='login'?'Sign in →':'Create account →')}
        </button>
        <p style={{textAlign:'center',fontSize:13,color:'#6B7FA3'}}>
          {mode==='login'?'No account? ':'Have an account? '}
          <button onClick={()=>{setMode(mode==='login'?'signup':'login');setError('');setSuccess('');}} style={{background:'none',border:'none',color:'#4361EE',fontWeight:700,cursor:'pointer',fontFamily:'inherit',fontSize:13}}>
            {mode==='login'?'Sign up':'Sign in'}
          </button>
        </p>
      </div>
    </main>
  );
}
