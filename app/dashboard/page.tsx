'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

const Logo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4361EE"/><stop offset="100%" stopColor="#7B2FBE"/></linearGradient>
      <linearGradient id="dg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff"/><stop offset="100%" stopColor="#E0E8FF"/></linearGradient>
    </defs>
    <rect width="400" height="400" rx="90" fill="url(#dg1)"/>
    <rect x="152" y="48" width="96" height="148" rx="48" fill="url(#dg2)"/>
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

const fmt = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
const COLORS = ['#4361EE','#7B2FBE','#059669','#DC2626','#D97706','#0891B2'];

const SAMPLE_MEETINGS = [
  { id:'1', title:'Team Weekly Sync', date:'اليوم', time:'10:00 ص', duration:'45 د', color:'#4361EE', transcript:'صباح الخير الجميع. نبدأ بتحديث السبرينت — وصلنا ٨٥٪ من sprint 12.', summary:{ overview:'اجتماع أسبوعي: تقدم السبرينت ومراجعة التصميم.', keyPoints:['Sprint 12 عند ٨٥٪','مراجعة التصميم الخميس'], actions:['تحديث Jira','إرسال الأصول'], next:['متابعة العائق'] }},
  { id:'2', title:'عرض Acme Corp', date:'اليوم', time:'٢:٣٠ م', duration:'٣٠ د', color:'#059669', transcript:'شكراً لانضمامكم. العميل أعجبه الواجهة الجديدة.', summary:{ overview:'عرض Acme: إعجاب بالواجهة وموافقة على المرحلة الثانية.', keyPoints:['إعجاب بالواجهة','الميزانية موافق عليها'], actions:['إرسال الاقتراح'], next:['الاقتراح قبل الجمعة'] }},
  { id:'3', title:'خارطة طريق Q3', date:'أمس', time:'١١:٠٠ ص', duration:'٦٠ د', color:'#7B2FBE', transcript:'أولويتنا الأولى ميزات الذكاء الاصطناعي.', summary:{ overview:'تخطيط Q3: تقديم AI وتأجيل الجوال.', keyPoints:['AI أولوية Q3','الجوال للـ Q4'], actions:['إنهاء المواصفات'], next:['مراجعة الاثنين'] }},
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'idle'|'recording'|'processing'|'done'>('idle');
  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [meetings, setMeetings] = useState(SAMPLE_MEETINGS);
  const [sel, setSel] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [wave, setWave] = useState(Array(36).fill(4));
  const [chatInput, setChatInput] = useState('');
  const [chatMsgs, setChatMsgs] = useState<any[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [panel, setPanel] = useState<'summary'|'chat'>('summary');
  const [showProfile, setShowProfile] = useState(false);
  const [recordVideo, setRecordVideo] = useState(false);
  const [videoRecorder, setVideoRecorder] = useState<any>(null);
  const [videoReady, setVideoReady] = useState(false);

  const recogRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const waveRef = useRef<any>(null);
  const txRef = useRef('');
  const streamRef = useRef<any>(null);
  const chatEndRef = useRef<any>(null);
  const videoChunksRef = useRef<any[]>([]);
  const videoTitleRef = useRef('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/login';
      else { setUser(data.user); setLoading(false); }
    });
  }, []);

  useEffect(() => {
    if (status === 'recording') waveRef.current = setInterval(() => setWave(Array(36).fill(0).map(() => Math.random()*52+4)), 85);
    else { clearInterval(waveRef.current); setWave(Array(36).fill(4)); }
    return () => clearInterval(waveRef.current);
  }, [status]);

  useEffect(() => {
    if (status === 'recording') timerRef.current = setInterval(() => setTimer(t => t+1), 1000);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [status]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMsgs]);

  const initRecog = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return null;
    const r = new SR();
    r.continuous = true; r.interimResults = true; r.lang = 'ar-SA';
    r.onresult = (e: any) => {
      let fin = txRef.current, int = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) fin += e.results[i][0].transcript + ' ';
        else int = e.results[i][0].transcript;
      }
      txRef.current = fin; setTranscript(fin); setInterim(int);
    };
    r.onerror = (e: any) => { if (e.error !== 'no-speech') console.error(e); };
    return r;
  }, []);

  const startRec = async () => {
    setSel(null); setSummary(null); setTranscript(''); setInterim('');
    txRef.current = ''; setTimer(0); setTitle('اجتماع جديد');
    setChatMsgs([]); setPanel('summary'); setVideoReady(false);
    videoChunksRef.current = [];

    // Video recording
    if (recordVideo) {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 30 }, audio: true });
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
        const audioCtx = new AudioContext();
        const dest = audioCtx.createMediaStreamDestination();
        const displayAudio = displayStream.getAudioTracks();
        if (displayAudio.length > 0) {
          const displaySource = audioCtx.createMediaStreamSource(new MediaStream(displayAudio));
          displaySource.connect(dest);
        }
        const micSource = audioCtx.createMediaStreamSource(micStream);
        micSource.connect(dest);
        const combinedStream = new MediaStream([...displayStream.getVideoTracks(), ...dest.stream.getTracks()]);
        const recorder = new MediaRecorder(displayStream, { mimeType: 'video/webm;codecs=vp9' });
        recorder.ondataavailable = (e) => { if (e.data.size > 0) videoChunksRef.current.push(e.data); };
        recorder.onstop = () => {
          const mType = videoChunksRef.current[0]?.type || 'video/webm'; const blob = new Blob(videoChunksRef.current, { type: mType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const ext = mType.includes('mp4') ? 'mp4' : 'webm'; a.download = `${videoTitleRef.current || 'meeting'}-${new Date().toISOString().slice(0,10)}.${ext}`;
          document.body.appendChild(a); a.click();
          document.body.removeChild(a); URL.revokeObjectURL(url);
          setVideoReady(true);
        };
        recorder.start(1000);
        setVideoRecorder(recorder);
        displayStream.getVideoTracks()[0].onended = () => { recorder.stop(); micStream.getTracks().forEach(t => t.stop()); };
      } catch(e) { console.log('Video capture cancelled'); }
    }

    try { streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch(e) {}
    const r = initRecog();
    if (r) { recogRef.current = r; r.start(); }
    setStatus('recording');
  };

  const stopRec = async () => {
    videoTitleRef.current = title;
    videoRecorder?.stop();
    setStatus('processing');
    recogRef.current?.stop();
    streamRef.current?.getTracks().forEach((t: any) => t.stop());
    const tx = txRef.current || transcript;
    if (!tx.trim()) { setStatus('idle'); return; }
    setProcessing(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 1000,
          system: 'You are a meeting assistant. Return ONLY valid JSON, no markdown.',
          messages: [{ role: 'user', content: `Analyze this meeting transcript:\n{"overview":"2-3 sentences","keyPoints":["p1","p2"],"actions":["a1"],"next":["n1"]}\nTranscript: ${tx}` }]
        })
      });
      const d = await res.json();
      const parsed = JSON.parse((d.content?.find((b: any) => b.type === 'text')?.text || '{}').replace(/```json|```/g,'').trim());
      setSummary(parsed);
      const color = COLORS[meetings.length % COLORS.length];
      const nm = { id: Date.now().toString(), title, date: 'اليوم', time: new Date().toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'}), duration: `${Math.floor(timer/60)}د ${timer%60}ث`, color, transcript: tx, summary: parsed };
      setMeetings(p => [nm,...p]); setSel(nm);
    } catch(e) { setSummary({ overview:'تعذّر الاتصال.', keyPoints:[], actions:[], next:[] }); }
    setProcessing(false); setStatus('done');
  };

  const pick = (m: any) => { setSel(m); setTranscript(m.transcript||''); setSummary(m.summary); setStatus('done'); setTimer(0); setChatMsgs([]); };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const q = chatInput.trim(); setChatInput('');
    const tx = sel?.transcript || transcript;
    setChatMsgs(p => [...p, { role:'user', text: q }]); setChatLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 600, system: `أنت مساعد اجتماعات. أجب بالعربية بناءً على المحضر:\n${tx}`, messages: [{ role: 'user', content: q }] })
      });
      const d = await res.json();
      setChatMsgs(p => [...p, { role:'assistant', text: d.content?.find((b:any)=>b.type==='text')?.text||'تعذّر الإجابة.' }]);
    } catch(e) { setChatMsgs(p => [...p, { role:'assistant', text:'خطأ في الاتصال.' }]); }
    setChatLoading(false);
  };

  if (loading) return (
    <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center',background:'#F0F4FF'}}>
      <div style={{width:40,height:40,border:'3px solid #EEF2FF',borderTopColor:'#4361EE',borderRadius:'50%',animation:'spin .8s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const isRec = status==='recording', isDone = status==='done', isIdle = status==='idle';
  const todayMs = meetings.filter(m=>m.date==='اليوم');
  const prevMs = meetings.filter(m=>m.date!=='اليوم');
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'مستخدم';

  return (
    <div dir="rtl" style={{display:'flex',height:'100vh',background:'#F0F4FF',fontFamily:'"Plus Jakarta Sans",system-ui,sans-serif',color:'#0D1117',overflow:'hidden'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes recPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2);opacity:.6}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#D1D9F0;border-radius:4px}
        .mi:hover{background:#EEF2FF!important}
        .hbtn:hover{filter:brightness(1.08);transform:translateY(-1px)}
        .chip:hover{background:#4361EE!important;color:#fff!important}
        .toggle:hover{opacity:.85}
      `}</style>

      {/* SIDEBAR */}
      <div style={{width:260,flexShrink:0,background:'#fff',borderLeft:'1px solid #EEF2FF',display:'flex',flexDirection:'column',boxShadow:'2px 0 20px rgba(67,97,238,.06)'}}>
        <div style={{padding:'20px 16px 16px',borderBottom:'1px solid #F0F4FF'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
            <Logo size={36}/>
            <span style={{fontSize:18,fontWeight:800,letterSpacing:'-.6px',background:'linear-gradient(135deg,#4361EE,#7B2FBE)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>iMeets</span>
          </div>
          <div style={{position:'relative'}}>
            <button onClick={()=>setShowProfile(v=>!v)} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:12,background:'#F8FAFF',border:'1.5px solid #EEF2FF',cursor:'pointer',fontFamily:'inherit',textAlign:'right'}}>
              <div style={{width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#4361EE,#7B2FBE)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:800,color:'#fff',flexShrink:0}}>{userName[0]?.toUpperCase()}</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:13,fontWeight:700,color:'#0D1117',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',margin:0}}>{userName}</p>
                <p style={{fontSize:10.5,color:'#9AAAC8',margin:0}}>خطة مجانية</p>
              </div>
              <span style={{color:'#C4CFDF',fontSize:12}}>⌄</span>
            </button>
            {showProfile&&(
              <div style={{position:'absolute',top:'100%',right:0,left:0,background:'#fff',border:'1.5px solid #EEF2FF',borderRadius:12,marginTop:4,boxShadow:'0 8px 24px rgba(67,97,238,.1)',zIndex:100,overflow:'hidden',animation:'fadeUp .15s ease'}}>
                <div style={{padding:'12px 14px 8px',borderBottom:'1px solid #F0F4FF'}}>
                  <p style={{fontSize:11.5,color:'#0D1117',fontWeight:700,margin:'0 0 2px'}}>{userName}</p>
                  <p style={{fontSize:10.5,color:'#9AAAC8',margin:0}}>{user?.email}</p>
                </div>
                <button onClick={async()=>{await supabase.auth.signOut();window.location.href='/login';}} style={{width:'100%',display:'flex',alignItems:'center',gap:9,padding:'10px 14px',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontSize:12.5,color:'#EF4444',textAlign:'right'}}>
                  🚪 تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Video toggle */}
        <div style={{padding:'12px 14px',borderBottom:'1px solid #F0F4FF'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',borderRadius:11,background:'#F8FAFF',border:'1.5px solid #EEF2FF'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:16}}>🎥</span>
              <div>
                <p style={{fontSize:12,fontWeight:600,color:'#0D1117',margin:0}}>تسجيل الفيديو</p>
                <p style={{fontSize:10,color:'#9AAAC8',margin:0}}>للتدريب والأرشفة</p>
              </div>
            </div>
            <button className="toggle" onClick={()=>setRecordVideo(v=>!v)} style={{width:42,height:24,borderRadius:12,border:'none',background:recordVideo?'linear-gradient(135deg,#4361EE,#7B2FBE)':'#E2E8F5',cursor:'pointer',position:'relative',transition:'all .25s',flexShrink:0}}>
              <div style={{position:'absolute',top:3,right:recordVideo?3:'auto',left:recordVideo?'auto':3,width:18,height:18,borderRadius:'50%',background:'#fff',transition:'all .25s',boxShadow:'0 1px 4px rgba(0,0,0,.15)'}}/>
            </button>
          </div>
          {recordVideo&&<p style={{fontSize:10.5,color:'#4361EE',marginTop:6,textAlign:'center',fontWeight:500}}>✓ سيُحفظ الفيديو على جهازك تلقائياً</p>}
        </div>

        {/* Record button */}
        <div style={{padding:'12px 14px'}}>
          <button className="hbtn" onClick={isRec?stopRec:startRec} disabled={status==='processing'} style={{width:'100%',padding:'12px',borderRadius:12,border:'none',cursor:'pointer',background:isRec?'linear-gradient(135deg,#EF4444,#B91C1C)':'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',fontWeight:700,fontSize:13.5,display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:'inherit',boxShadow:isRec?'0 4px 16px rgba(239,68,68,.35)':'0 4px 16px rgba(67,97,238,.35)',transition:'all .2s'}}>
            {isRec?<><div style={{width:10,height:10,background:'#fff',borderRadius:2}}/>إيقاف وتحليل</>:<><div style={{width:8,height:8,background:'#fff',borderRadius:'50%'}}/>تسجيل جديد</>}
          </button>
        </div>

        {/* Meetings list */}
        <div style={{flex:1,overflowY:'auto',padding:'0 8px 12px'}}>
          {[{label:'اليوم',items:todayMs},{label:'سابقاً',items:prevMs}].map(g=>g.items.length>0&&(
            <div key={g.label} style={{marginBottom:8}}>
              <div style={{padding:'8px 10px 4px',fontSize:9,color:'#B8C4DC',letterSpacing:2.5,fontWeight:700}}>{g.label}</div>
              {g.items.map((m:any)=>(
                <div key={m.id} className="mi" onClick={()=>pick(m)} style={{padding:'10px 12px',borderRadius:10,cursor:'pointer',marginBottom:2,background:sel?.id===m.id?'#EEF2FF':'transparent',borderRight:`3px solid ${sel?.id===m.id?m.color:'transparent'}`,transition:'all .15s'}}>
                  <div style={{display:'flex',alignItems:'center',gap:9}}>
                    <div style={{width:30,height:30,borderRadius:9,background:`${m.color}18`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="2"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{fontSize:12.5,fontWeight:600,color:sel?.id===m.id?'#0D1117':'#3D5080',margin:'0 0 2px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{m.title}</p>
                      <p style={{fontSize:10.5,color:'#9AAAC8',margin:0}}>{m.time} · {m.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{padding:'12px 16px',borderTop:'1px solid #F0F4FF',background:'#FAFBFF',display:'flex',gap:16}}>
          {[{n:meetings.length,l:'إجمالي'},{n:todayMs.length,l:'اليوم'},{n:'مجاني',l:'الخطة'}].map(s=>(
            <div key={s.l}><div style={{fontSize:13,fontWeight:800,color:'#4361EE'}}>{s.n}</div><div style={{fontSize:9,color:'#9AAAC8',letterSpacing:1,marginTop:1}}>{s.l}</div></div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}} onClick={()=>showProfile&&setShowProfile(false)}>
        <div style={{padding:'14px 24px',background:'#fff',borderBottom:'1px solid #EEF2FF',display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
          <div style={{flex:1,minWidth:0}}>
            {isRec?<input autoFocus value={title} onChange={e=>setTitle(e.target.value)} placeholder="عنوان الاجتماع..." style={{fontSize:16,fontWeight:700,color:'#0D1117',background:'transparent',border:'none',outline:'none',fontFamily:'inherit',letterSpacing:'-.3px',width:'100%'}}/>
            :<h1 style={{fontSize:16,fontWeight:700,color:isIdle?'#C8D4EE':'#0D1117',letterSpacing:'-.3px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{sel?.title||(isIdle?`مرحباً، ${userName} 👋`:'اجتماع جديد')}</h1>}
            {sel&&!isRec&&<p style={{fontSize:11,color:'#9AAAC8',marginTop:2}}>{sel.date} · {sel.time} · {sel.duration}</p>}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            {isRec&&recordVideo&&<div style={{display:'flex',alignItems:'center',gap:6,background:'#FEF2F2',padding:'5px 12px',borderRadius:20,border:'1px solid #FCA5A5'}}>
              <span style={{fontSize:13}}>🎥</span>
              <span style={{fontSize:11,color:'#DC2626',fontWeight:600}}>يسجل الفيديو</span>
            </div>}
            {isRec&&<div style={{display:'flex',alignItems:'center',gap:8,background:'#FFF0F0',padding:'6px 14px',borderRadius:20,border:'1px solid #FFD0D0'}}>
              <div style={{width:7,height:7,background:'#EF4444',borderRadius:'50%',animation:'recPulse 1s infinite'}}/>
              <span style={{fontSize:13,color:'#DC2626',fontWeight:600}}>{fmt(timer)}</span>
            </div>}
            {isDone&&<div style={{display:'flex',gap:6}}>
              <button onClick={()=>setPanel('summary')} style={{padding:'7px 14px',borderRadius:9,border:`1.5px solid ${panel==='summary'?'#4361EE':'#E2E8F5'}`,background:panel==='summary'?'#EEF2FF':'transparent',color:panel==='summary'?'#4361EE':'#6B7FA3',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all .15s'}}>ملخص</button>
              <button onClick={()=>setPanel('chat')} style={{padding:'7px 14px',borderRadius:9,border:`1.5px solid ${panel==='chat'?'#7B2FBE':'#E2E8F5'}`,background:panel==='chat'?'#F5EEFF':'transparent',color:panel==='chat'?'#7B2FBE':'#6B7FA3',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all .15s'}}>✦ AI Chat</button>
            </div>}
          </div>
        </div>

        {isRec&&<div style={{padding:'16px 24px',background:'linear-gradient(135deg,#EEF2FF,#F5EEFF)',borderBottom:'1px solid #E8EDF8',display:'flex',alignItems:'center',justifyContent:'center',gap:10,flexShrink:0,animation:'fadeUp .3s ease'}}>
          <div style={{display:'flex',alignItems:'center',gap:2.5,height:56}}>{wave.map((h,i)=><div key={i} style={{width:3,height:`${h}px`,borderRadius:3,transition:'height .08s ease',background:`linear-gradient(to top,#4361EE,#7B2FBE)`}}/>)}</div>
          <span style={{fontSize:10,color:'#7B2FBE',fontWeight:700,letterSpacing:2}}>REC</span>
        </div>}

        {status==='processing'&&<div style={{padding:'12px',background:'#FFFBEB',borderBottom:'1px solid #FEF3C7',display:'flex',alignItems:'center',justifyContent:'center',gap:8,flexShrink:0}}>
          <div style={{width:14,height:14,border:'2px solid #FDE68A',borderTopColor:'#F59E0B',borderRadius:'50%',animation:'spin .7s linear infinite'}}/>
          <span style={{fontSize:12,color:'#92400E',fontWeight:600}}>جارٍ التحليل بـ Claude AI...</span>
        </div>}

        {videoReady&&<div style={{padding:'10px 24px',background:'#ECFDF5',borderBottom:'1px solid #A7F3D0',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
          <span style={{fontSize:14}}>🎥</span>
          <span style={{fontSize:13,color:'#059669',fontWeight:600}}>تم حفظ الفيديو على جهازك بنجاح ✓</span>
        </div>}

        <div style={{flex:1,display:'flex',overflow:'hidden'}}>
          {isIdle&&<div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:28,padding:32,animation:'fadeUp .4s ease'}}>
            <div style={{animation:'float 4s ease-in-out infinite'}}><Logo size={80}/></div>
            <div style={{textAlign:'center'}}>
              <h2 style={{fontSize:24,fontWeight:800,color:'#0D1117',marginBottom:10,letterSpacing:'-.5px'}}>ابدأ تسجيل اجتماعك</h2>
              <p style={{fontSize:14,color:'#6B7FA3',lineHeight:1.75}}>صوت + نص + ملخص AI {recordVideo?'+ فيديو 🎥':''}</p>
            </div>
            {recordVideo&&<div style={{padding:'14px 20px',borderRadius:14,background:'linear-gradient(135deg,#EEF2FF,#F5EEFF)',border:'1.5px solid #C7D2F8',textAlign:'center',maxWidth:380}}>
              <p style={{fontSize:13,color:'#4361EE',fontWeight:600,marginBottom:4}}>🎥 وضع التدريب مفعّل</p>
              <p style={{fontSize:12,color:'#6B7FA3',lineHeight:1.6}}>سيُسجَّل الفيديو وينزّل تلقائياً على جهازك بعد انتهاء الاجتماع</p>
            </div>}
            <button className="hbtn" onClick={startRec} style={{padding:'14px 40px',borderRadius:14,border:'none',background:'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',fontWeight:700,fontSize:15,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 6px 22px rgba(67,97,238,.35)',transition:'all .2s'}}>
              {recordVideo?'🎥 ابدأ التسجيل مع الفيديو':'ابدأ التسجيل الآن'}
            </button>
          </div>}

          {!isIdle&&<>
            <div style={{flex:1,display:'flex',flexDirection:'column',background:'#fff',borderLeft:'1px solid #EEF2FF',minWidth:0}}>
              <div style={{padding:'11px 20px',borderBottom:'1px solid #F0F4FF',display:'flex',alignItems:'center',gap:9,flexShrink:0}}>
                <span style={{fontSize:9,letterSpacing:3,color:'#9AAAC8',fontWeight:700}}>المحضر</span>
                {isRec&&<span style={{fontSize:9,color:'#EF4444',background:'#FFF0F0',padding:'3px 9px',borderRadius:20,border:'1px solid #FFD0D0',fontWeight:700,animation:'blink 1.5s infinite'}}>● مباشر</span>}
                {isDone&&transcript&&<button onClick={()=>navigator.clipboard.writeText(transcript)} style={{marginRight:'auto',padding:'4px 11px',borderRadius:7,border:'1.5px solid #EEF2FF',background:'transparent',color:'#6B7FA3',cursor:'pointer',fontSize:11,fontFamily:'inherit'}}>نسخ</button>}
              </div>
              <div style={{flex:1,overflowY:'auto',padding:'18px 20px',fontFamily:'monospace',fontSize:13,lineHeight:2,color:'#3D5080'}}>
                {(transcript||interim)?<><span style={{color:'#2D3748'}}>{transcript}</span>{interim&&<span style={{color:'#9AAAC8',fontStyle:'italic'}}>{interim}</span>}</>
                :<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',opacity:.35,gap:10}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9AAAC8" strokeWidth="1.5"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                  <p style={{fontSize:13,color:'#9AAAC8',textAlign:'center',lineHeight:1.7}}>تكلّم والمحضر يظهر هنا</p>
                </div>}
              </div>
            </div>

            <div style={{width:320,flexShrink:0,display:'flex',flexDirection:'column',background:'#FAFBFF',borderLeft:'1px solid #EEF2FF'}}>
              {panel==='summary'&&<>
                <div style={{padding:'11px 18px',borderBottom:'1px solid #F0F4FF',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                  <span style={{fontSize:9,letterSpacing:3,color:'#9AAAC8',fontWeight:700}}>الملخص</span>
                  <div style={{marginRight:'auto',background:'#EEF2FF',padding:'2px 9px',borderRadius:20,fontSize:9,color:'#4361EE',fontWeight:700,border:'1px solid #C7D2F8'}}>Claude AI</div>
                </div>
                <div style={{flex:1,overflow:'hidden'}}>
                  {processing&&<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:14}}>
                    <div style={{position:'relative',width:40,height:40}}>
                      <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'2.5px solid #EEF2FF',borderTopColor:'#4361EE',animation:'spin .8s linear infinite'}}/>
                      <div style={{position:'absolute',inset:7,borderRadius:'50%',border:'2px solid #F0E8FF',borderTopColor:'#7B2FBE',animation:'spin .55s linear infinite reverse'}}/>
                    </div>
                    <p style={{fontSize:12,color:'#9AAAC8',fontWeight:500}}>جارٍ التحليل...</p>
                  </div>}
                  {!processing&&!summary&&<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',opacity:.35,gap:10}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    <p style={{fontSize:12,color:'#6B7FA3',textAlign:'center',lineHeight:1.7}}>الملخص يظهر بعد التسجيل</p>
                  </div>}
                  {summary&&<div style={{padding:'18px',overflowY:'auto',height:'100%'}}>
                    <p style={{fontSize:13,lineHeight:1.85,color:'#3D5080',marginBottom:18,paddingBottom:14,borderBottom:'1px solid #F0F4FF'}}>{summary.overview}</p>
                    {[{k:'keyPoints',l:'النقاط',c:'#4361EE',bg:'#EEF2FF',i:'◆'},{k:'actions',l:'المهام',c:'#7B2FBE',bg:'#F5EEFF',i:'⚡'},{k:'next',l:'التالي',c:'#059669',bg:'#ECFDF5',i:'→'}].map(s=>summary[s.k]?.length>0&&(
                      <div key={s.k} style={{marginBottom:16}}>
                        <span style={{fontSize:9.5,background:s.bg,color:s.c,padding:'2px 10px',borderRadius:20,fontWeight:700}}>{s.i} {s.l}</span>
                        {summary[s.k].map((x:string,j:number)=><div key={j} style={{display:'flex',gap:8,marginTop:8}}><div style={{width:4,height:4,borderRadius:'50%',background:s.c,marginTop:8,flexShrink:0}}/><p style={{fontSize:12.5,lineHeight:1.75,color:'#2D3748',margin:0}}>{x}</p></div>)}
                      </div>
                    ))}
                    <button onClick={()=>{const t=`# ${sel?.title||'اجتماع'}\n\n${summary.overview}\n\n## النقاط\n${summary.keyPoints?.map((p:string)=>`- ${p}`).join('\n')}\n\n## المهام\n${summary.actions?.map((a:string)=>`- ${a}`).join('\n')}`;navigator.clipboard.writeText(t);}} style={{width:'100%',padding:'9px',borderRadius:10,border:'1.5px solid #EEF2FF',background:'#fff',color:'#4361EE',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:'inherit',marginTop:8}}>⎘ نسخ التقرير</button>
                  </div>}
                </div>
              </>}

              {panel==='chat'&&<>
                <div style={{padding:'11px 18px',borderBottom:'1px solid #F0F4FF',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                  <span style={{fontSize:9,letterSpacing:3,color:'#9AAAC8',fontWeight:700}}>AI CHAT</span>
                  <div style={{marginRight:'auto',background:'#F5EEFF',padding:'2px 9px',borderRadius:20,fontSize:9,color:'#7B2FBE',fontWeight:700,border:'1px solid #E0C8FF'}}>✦ Claude</div>
                </div>
                <div style={{flex:1,overflowY:'auto',padding:'12px',display:'flex',flexDirection:'column',gap:10}}>
                  {chatMsgs.length===0&&<div style={{textAlign:'center',padding:'28px 12px',opacity:.5}}>
                    <div style={{fontSize:22,marginBottom:8}}>💬</div>
                    <p style={{fontSize:12,color:'#6B7FA3',lineHeight:1.7,marginBottom:14}}>اسأل Claude عن الاجتماع</p>
                    {['ما أهم القرارات؟','من المسؤول عن التسليمات؟','لخّص المهام'].map(q=>(
                      <button key={q} className="chip" onClick={()=>setChatInput(q)} style={{display:'block',width:'100%',padding:'7px 11px',borderRadius:9,border:'1.5px solid #EEF2FF',background:'#fff',color:'#6B7FA3',cursor:'pointer',fontSize:11.5,fontFamily:'inherit',textAlign:'right',marginBottom:6,transition:'all .15s'}}>{q}</button>
                    ))}
                  </div>}
                  {chatMsgs.map((m:any,i:number)=>(
                    <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-start':'flex-end',animation:'fadeUp .2s ease'}}>
                      <div style={{maxWidth:'88%',padding:'9px 12px',borderRadius:12,background:m.role==='user'?'#EEF2FF':'#fff',border:`1px solid ${m.role==='user'?'#C7D2F8':'#EEF2FF'}`,fontSize:12.5,lineHeight:1.8,color:'#2D3748',direction:'rtl',textAlign:'right'}}>
                        {m.role==='assistant'&&<span style={{fontSize:9.5,color:'#7B2FBE',fontWeight:700,display:'block',marginBottom:3}}>✦ iMeets AI</span>}
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {chatLoading&&<div style={{display:'flex',justifyContent:'flex-end'}}><div style={{padding:'9px 13px',borderRadius:12,background:'#fff',border:'1px solid #EEF2FF',display:'flex',gap:4}}>{[0,.15,.3].map(d=><div key={d} style={{width:6,height:6,borderRadius:'50%',background:'#9AAAC8',animation:`blink 1s ${d}s infinite`}}/>)}</div></div>}
                  <div ref={chatEndRef}/>
                </div>
                <div style={{padding:'10px',borderTop:'1px solid #F0F4FF',flexShrink:0}}>
                  <div style={{display:'flex',gap:7,background:'#fff',border:'1.5px solid #EEF2FF',borderRadius:11,padding:'7px 7px 7px 10px',alignItems:'center'}}>
                    <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&sendChat()} placeholder="اسأل عن الاجتماع..." style={{flex:1,border:'none',outline:'none',fontSize:12.5,color:'#0D1117',fontFamily:'inherit',background:'transparent',direction:'rtl'}}/>
                    <button onClick={sendChat} disabled={chatLoading||!chatInput.trim()} style={{width:30,height:30,borderRadius:8,border:'none',background:chatInput.trim()?'#4361EE':'#EEF2FF',cursor:chatInput.trim()?'pointer':'default',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all .15s'}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={chatInput.trim()?'#fff':'#9AAAC8'} strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                    </button>
                  </div>
                </div>
              </>}
            </div>
          </>}
        </div>

        {!isIdle&&<div style={{padding:'10px 24px',borderTop:'1px solid #EEF2FF',display:'flex',alignItems:'center',gap:9,background:'#fff',flexShrink:0}}>
          {isRec&&<button className="hbtn" onClick={stopRec} style={{padding:'8px 18px',borderRadius:9,border:'1.5px solid #FECDD3',background:'#FFF0F2',color:'#EF4444',cursor:'pointer',fontSize:12.5,fontWeight:600,fontFamily:'inherit',transition:'all .18s'}}>⬛ إيقاف وتحليل</button>}
          <button className="hbtn" onClick={async()=>{await fetch("/api/send-summary",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:user?.email,name:userName,title:sel?.title||"اجتماع",summary})});alert("تم إرسال الملخص لبريدك ✅");}} style={{padding:"9px 18px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#059669,#047857)",color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",transition:"all .18s"}}>📧 إرسال للبريد</button>
            {isDone&&<button className="hbtn" onClick={startRec} style={{padding:'8px 18px',borderRadius:9,border:'none',background:'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',cursor:'pointer',fontSize:12.5,fontWeight:700,fontFamily:'inherit',boxShadow:'0 3px 12px rgba(67,97,238,.3)',transition:'all .18s'}}>+ تسجيل جديد</button>}
        </div>}
      </div>
    </div>
  );
}
