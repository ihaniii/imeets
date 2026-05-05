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
const SAMPLE = [
  { id:'1', title:'Team Weekly Sync', date:'اليوم', time:'10:00 ص', duration:'45 د', color:'#4361EE', transcript:'صباح الخير. Sprint 12 عند ٨٥٪.', summary:{ overview:'تقدم السبرينت ومراجعة التصميم.', keyPoints:['Sprint 12 عند ٨٥٪','مراجعة الخميس'], actions:['تحديث Jira'], next:['متابعة العائق'] }},
  { id:'2', title:'عرض Acme Corp', date:'اليوم', time:'٢:٣٠ م', duration:'٣٠ د', color:'#059669', transcript:'العميل أعجبه الواجهة.', summary:{ overview:'إعجاب بالواجهة وموافقة على المرحلة الثانية.', keyPoints:['إعجاب بالواجهة','الميزانية موافق عليها'], actions:['إرسال الاقتراح'], next:['الاقتراح قبل الجمعة'] }},
  { id:'3', title:'خارطة طريق Q3', date:'أمس', time:'١١:٠٠ ص', duration:'٦٠ د', color:'#7B2FBE', transcript:'AI أولوية Q3.', summary:{ overview:'تخطيط Q3: AI وتأجيل الجوال.', keyPoints:['AI أولوية Q3','الجوال للـ Q4'], actions:['إنهاء المواصفات'], next:['مراجعة الاثنين'] }},
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
  const [meetings, setMeetings] = useState(SAMPLE);
  const [sel, setSel] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [wave, setWave] = useState(Array(28).fill(4));
  const [chatInput, setChatInput] = useState('');
  const [chatMsgs, setChatMsgs] = useState<any[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [panel, setPanel] = useState<'transcript'|'summary'|'chat'>('transcript');
  const [showMenu, setShowMenu] = useState(false);
  const [recordVideo, setRecordVideo] = useState(false);
  const [videoRecorder, setVideoRecorder] = useState<any>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (status==='recording') waveRef.current = setInterval(() => setWave(Array(28).fill(0).map(()=>Math.random()*48+4)), 85);
    else { clearInterval(waveRef.current); setWave(Array(28).fill(4)); }
    return () => clearInterval(waveRef.current);
  }, [status]);

  useEffect(() => {
    if (status==='recording') timerRef.current = setInterval(()=>setTimer(t=>t+1), 1000);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [status]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:'smooth' }); }, [chatMsgs]);

  const initRecog = useCallback(() => {
    const SR = (window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
    if (!SR) return null;
    const r = new SR();
    r.continuous=true; r.interimResults=true; r.lang='ar-SA';
    r.onresult=(e:any)=>{
      let fin=txRef.current, int='';
      for(let i=e.resultIndex;i<e.results.length;i++){
        if(e.results[i].isFinal) fin+=e.results[i][0].transcript+' ';
        else int=e.results[i][0].transcript;
      }
      txRef.current=fin; setTranscript(fin); setInterim(int);
    };
    r.onerror=(e:any)=>{ if(e.error!=='no-speech') console.error(e); };
    return r;
  },[]);

  const startRec = async () => {
    setSel(null); setSummary(null); setTranscript(''); setInterim('');
    txRef.current=''; setTimer(0); setTitle('اجتماع جديد');
    setChatMsgs([]); setPanel('transcript'); setVideoReady(false);
    videoChunksRef.current=[];

    if (recordVideo) {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({ video:{ frameRate:30 }, audio:true });
        const micStream = await navigator.mediaDevices.getUserMedia({ audio:{ echoCancellation:true, noiseSuppression:true } as any });
        const audioCtx = new AudioContext();
        const dest = audioCtx.createMediaStreamDestination();
        const displayAudio = displayStream.getAudioTracks();
        if (displayAudio.length>0) {
          const ds = audioCtx.createMediaStreamSource(new MediaStream(displayAudio));
          ds.connect(dest);
        }
        const ms = audioCtx.createMediaStreamSource(micStream);
        ms.connect(dest);
        const combined = new MediaStream([...displayStream.getVideoTracks(),...dest.stream.getTracks()]);
        const mimeType = MediaRecorder.isTypeSupported('video/mp4')?'video/mp4':'video/webm;codecs=vp9';
        const recorder = new MediaRecorder(combined,{ mimeType, videoBitsPerSecond:500000, audioBitsPerSecond:64000 });
        recorder.ondataavailable=(e)=>{ if(e.data.size>0) videoChunksRef.current.push(e.data); };
        recorder.onstop=()=>{
          const blob=new Blob(videoChunksRef.current,{type:mimeType});
          const url=URL.createObjectURL(blob);
          const a=document.createElement('a');
          a.href=url; a.download=`${videoTitleRef.current||'meeting'}-${new Date().toISOString().slice(0,10)}.${mimeType.includes('mp4')?'mp4':'webm'}`;
          document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
          setVideoReady(true);
        };
        recorder.start(1000);
        setVideoRecorder(recorder);
        displayStream.getVideoTracks()[0].onended=()=>{ recorder.stop(); micStream.getTracks().forEach((t:any)=>t.stop()); };
      } catch(e) { console.log('Video cancelled'); }
    }

    try { streamRef.current=await navigator.mediaDevices.getUserMedia({audio:true}); } catch(e){}
    const r=initRecog(); if(r){recogRef.current=r;r.start();}
    setStatus('recording');
  };

  const stopRec = async () => {
    videoTitleRef.current=title; videoRecorder?.stop();
    setStatus('processing'); recogRef.current?.stop();
    streamRef.current?.getTracks().forEach((t:any)=>t.stop());
    const tx=txRef.current||transcript;
    if(!tx.trim()){setStatus('idle');return;}
    setProcessing(true);
    try {
      const res=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,
          system:'Meeting assistant. Return ONLY valid JSON.',
          messages:[{role:'user',content:`Analyze:\n{"overview":"2-3 sentences","keyPoints":["p1"],"actions":["a1"],"next":["n1"]}\nTranscript: ${tx}`}]})
      });
      const d=await res.json();
      const parsed=JSON.parse((d.content?.find((b:any)=>b.type==='text')?.text||'{}').replace(/```json|```/g,'').trim());
      setSummary(parsed);
      const nm={id:Date.now().toString(),title,date:'اليوم',time:new Date().toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit'}),duration:`${Math.floor(timer/60)}د ${timer%60}ث`,color:COLORS[meetings.length%COLORS.length],transcript:tx,summary:parsed};
      setMeetings(p=>[nm,...p]); setSel(nm); setPanel('summary');
    } catch(e){setSummary({overview:'تعذّر الاتصال.',keyPoints:[],actions:[],next:[]});}
    setProcessing(false); setStatus('done');
  };

  const pick=(m:any)=>{setSel(m);setTranscript(m.transcript||'');setSummary(m.summary);setStatus('done');setTimer(0);setChatMsgs([]);setPanel('summary');setShowMenu(false);};

  const sendChat=async()=>{
    if(!chatInput.trim()||chatLoading) return;
    const q=chatInput.trim(); setChatInput('');
    const tx=sel?.transcript||transcript;
    setChatMsgs(p=>[...p,{role:'user',text:q}]); setChatLoading(true);
    try {
      const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:600,
          system:`Meeting assistant. Answer in Arabic based on:\n${tx}`,messages:[{role:'user',content:q}]})});
      const d=await res.json();
      setChatMsgs(p=>[...p,{role:'assistant',text:d.content?.find((b:any)=>b.type==='text')?.text||'تعذّر.'}]);
    } catch(e){setChatMsgs(p=>[...p,{role:'assistant',text:'خطأ.'}]);}
    setChatLoading(false);
  };

  if(loading) return <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center',background:'#F0F4FF'}}><div style={{width:40,height:40,border:'3px solid #EEF2FF',borderTopColor:'#4361EE',borderRadius:'50%',animation:'spin .8s linear infinite'}}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  const isRec=status==='recording',isDone=status==='done',isIdle=status==='idle';
  const todayMs=meetings.filter(m=>m.date==='اليوم');
  const prevMs=meetings.filter(m=>m.date!=='اليوم');
  const userName=user?.user_metadata?.name||user?.email?.split('@')[0]||'مستخدم';

  return (
    <div dir="rtl" style={{display:'flex',flexDirection:'column',height:'100vh',background:'#F0F4FF',fontFamily:'"Plus Jakarta Sans",system-ui,sans-serif',color:'#0D1117',overflow:'hidden'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes recPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2);opacity:.6}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#D1D9F0;border-radius:4px}
        .mi:hover{background:#EEF2FF!important}
        .hbtn:hover{filter:brightness(1.08)}
        .chip:hover{background:#4361EE!important;color:#fff!important}
      `}</style>

      {/* TOP NAV */}
      <div style={{background:'#fff',borderBottom:'1px solid #EEF2FF',padding:'12px 16px',display:'flex',alignItems:'center',gap:10,flexShrink:0,boxShadow:'0 1px 12px rgba(67,97,238,.06)'}}>
        <Logo size={32}/>
        <span style={{fontSize:17,fontWeight:800,letterSpacing:'-.6px',background:'linear-gradient(135deg,#4361EE,#7B2FBE)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',flex:1}}>iMeets</span>
        {isRec&&<div style={{display:'flex',alignItems:'center',gap:6,background:'#FFF0F0',padding:'5px 12px',borderRadius:20,border:'1px solid #FFD0D0'}}>
          <div style={{width:7,height:7,background:'#EF4444',borderRadius:'50%',animation:'recPulse 1s infinite'}}/>
          <span style={{fontSize:12,color:'#DC2626',fontWeight:600}}>{fmt(timer)}</span>
        </div>}
        <button onClick={()=>setShowMenu(v=>!v)} style={{width:36,height:36,borderRadius:10,border:'1.5px solid #EEF2FF',background:'#F8FAFF',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>☰</button>
      </div>

      {/* SLIDE MENU */}
      {showMenu&&(
        <div style={{position:'fixed',inset:0,zIndex:200,display:'flex'}} onClick={()=>setShowMenu(false)}>
          <div style={{width:'80%',maxWidth:300,background:'#fff',height:'100%',display:'flex',flexDirection:'column',boxShadow:'4px 0 24px rgba(67,97,238,.12)',animation:'fadeUp .2s ease'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'20px 16px 14px',borderBottom:'1px solid #F0F4FF'}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#4361EE,#7B2FBE)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,fontWeight:800,color:'#fff'}}>{userName[0]?.toUpperCase()}</div>
                <div>
                  <p style={{fontSize:13,fontWeight:700,color:'#0D1117',margin:0}}>{userName}</p>
                  <p style={{fontSize:11,color:'#9AAAC8',margin:0}}>{user?.email}</p>
                </div>
              </div>
              {/* Video toggle */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',borderRadius:11,background:'#F8FAFF',border:'1.5px solid #EEF2FF'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span>🎥</span>
                  <div>
                    <p style={{fontSize:12,fontWeight:600,color:'#0D1117',margin:0}}>تسجيل الفيديو</p>
                    <p style={{fontSize:10,color:'#9AAAC8',margin:0}}>للتدريب والأرشفة</p>
                  </div>
                </div>
                <button onClick={()=>setRecordVideo(v=>!v)} style={{width:42,height:24,borderRadius:12,border:'none',background:recordVideo?'linear-gradient(135deg,#4361EE,#7B2FBE)':'#E2E8F5',cursor:'pointer',position:'relative',transition:'all .25s',flexShrink:0}}>
                  <div style={{position:'absolute',top:3,right:recordVideo?3:'auto',left:recordVideo?'auto':3,width:18,height:18,borderRadius:'50%',background:'#fff',transition:'all .25s',boxShadow:'0 1px 4px rgba(0,0,0,.15)'}}/>
                </button>
              </div>
            </div>
            <div style={{flex:1,overflowY:'auto',padding:'10px 10px'}}>
              {[{label:'اليوم',items:todayMs},{label:'سابقاً',items:prevMs}].map(g=>g.items.length>0&&(
                <div key={g.label}>
                  <div style={{padding:'8px 10px 4px',fontSize:9,color:'#B8C4DC',letterSpacing:2.5,fontWeight:700}}>{g.label}</div>
                  {g.items.map((m:any)=>(
                    <div key={m.id} className="mi" onClick={()=>pick(m)} style={{padding:'10px 12px',borderRadius:10,cursor:'pointer',marginBottom:2,background:sel?.id===m.id?'#EEF2FF':'transparent',borderRight:`3px solid ${sel?.id===m.id?m.color:'transparent'}`,transition:'all .15s'}}>
                      <p style={{fontSize:12.5,fontWeight:600,color:sel?.id===m.id?'#0D1117':'#3D5080',margin:'0 0 2px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{m.title}</p>
                      <p style={{fontSize:10.5,color:'#9AAAC8',margin:0}}>{m.time} · {m.duration}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{padding:'14px 16px',borderTop:'1px solid #F0F4FF'}}>
              <button onClick={async()=>{await supabase.auth.signOut();window.location.href='/login';}} style={{width:'100%',padding:'11px',borderRadius:11,border:'1.5px solid #FECDD3',background:'#FFF0F2',color:'#EF4444',cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:'inherit'}}>🚪 تسجيل الخروج</button>
            </div>
          </div>
        </div>
      )}

      {/* WAVEFORM */}
      {isRec&&<div style={{padding:'12px 16px',background:'linear-gradient(135deg,#EEF2FF,#F5EEFF)',borderBottom:'1px solid #E8EDF8',display:'flex',alignItems:'center',justifyContent:'center',gap:8,flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:2,height:44}}>{wave.map((h,i)=><div key={i} style={{width:3,height:`${h}px`,borderRadius:3,transition:'height .08s ease',background:'linear-gradient(to top,#4361EE,#7B2FBE)'}}/>)}</div>
        <span style={{fontSize:10,color:'#7B2FBE',fontWeight:700,letterSpacing:2}}>REC</span>
      </div>}

      {status==='processing'&&<div style={{padding:'10px',background:'#FFFBEB',borderBottom:'1px solid #FEF3C7',display:'flex',alignItems:'center',justifyContent:'center',gap:8,flexShrink:0}}>
        <div style={{width:13,height:13,border:'2px solid #FDE68A',borderTopColor:'#F59E0B',borderRadius:'50%',animation:'spin .7s linear infinite'}}/>
        <span style={{fontSize:12,color:'#92400E',fontWeight:600}}>جارٍ التحليل...</span>
      </div>}

      {videoReady&&<div style={{padding:'10px 16px',background:'#ECFDF5',borderBottom:'1px solid #A7F3D0',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
        <span>🎥</span><span style={{fontSize:13,color:'#059669',fontWeight:600}}>تم حفظ الفيديو ✓</span>
      </div>}

      {/* MAIN CONTENT */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>

        {/* IDLE */}
        {isIdle&&<div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20,padding:24,textAlign:'center',animation:'fadeUp .4s ease'}}>
          <div style={{animation:'float 4s ease-in-out infinite'}}><Logo size={72}/></div>
          <div>
            <h2 style={{fontSize:22,fontWeight:800,color:'#0D1117',marginBottom:8}}>ابدأ تسجيل اجتماعك</h2>
            <p style={{fontSize:14,color:'#6B7FA3',lineHeight:1.7}}>صوت + نص + ملخص AI{recordVideo?' + فيديو 🎥':''}</p>
          </div>
          <button onClick={startRec} style={{padding:'16px 40px',borderRadius:16,border:'none',background:'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',fontWeight:700,fontSize:16,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 6px 22px rgba(67,97,238,.35)',width:'100%',maxWidth:320}}>
            {recordVideo?'🎥 ابدأ مع الفيديو':'🎙 ابدأ التسجيل'}
          </button>
          {/* Recent meetings */}
          {meetings.length>0&&<div style={{width:'100%',maxWidth:400}}>
            <p style={{fontSize:11,color:'#9AAAC8',letterSpacing:2,marginBottom:10}}>آخر الاجتماعات</p>
            {meetings.slice(0,3).map((m:any)=>(
              <div key={m.id} className="mi" onClick={()=>pick(m)} style={{padding:'12px',borderRadius:12,background:'#fff',border:'1.5px solid #EEF2FF',marginBottom:8,cursor:'pointer',display:'flex',alignItems:'center',gap:10,textAlign:'right',transition:'all .15s'}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${m.color}18`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="2"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:13,fontWeight:600,color:'#0D1117',margin:'0 0 2px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{m.title}</p>
                  <p style={{fontSize:11,color:'#9AAAC8',margin:0}}>{m.date} · {m.time}</p>
                </div>
                <span style={{color:'#9AAAC8',fontSize:16}}>›</span>
              </div>
            ))}
          </div>}
        </div>}

        {/* ACTIVE/DONE */}
        {!isIdle&&<>
          {/* Meeting title */}
          <div style={{padding:'12px 16px',background:'#fff',borderBottom:'1px solid #EEF2FF',flexShrink:0}}>
            {isRec
              ?<input autoFocus value={title} onChange={e=>setTitle(e.target.value)} placeholder="عنوان الاجتماع..." style={{fontSize:15,fontWeight:700,color:'#0D1117',background:'transparent',border:'none',outline:'none',fontFamily:'inherit',width:'100%'}}/>
              :<div>
                <h1 style={{fontSize:15,fontWeight:700,color:'#0D1117',margin:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{sel?.title||'اجتماع جديد'}</h1>
                {sel&&<p style={{fontSize:11,color:'#9AAAC8',margin:'2px 0 0'}}>{sel.date} · {sel.time} · {sel.duration}</p>}
              </div>
            }
          </div>

          {/* Tabs */}
          <div style={{display:'flex',background:'#fff',borderBottom:'1px solid #EEF2FF',flexShrink:0}}>
            {[{id:'transcript',l:'المحضر'},{id:'summary',l:'الملخص'},{id:'chat',l:'AI Chat'}].map(t=>(
              <button key={t.id} onClick={()=>setPanel(t.id as any)} style={{flex:1,padding:'11px 8px',border:'none',background:'transparent',color:panel===t.id?'#4361EE':'#6B7FA3',fontWeight:panel===t.id?700:500,fontSize:13,cursor:'pointer',fontFamily:'inherit',borderBottom:`2px solid ${panel===t.id?'#4361EE':'transparent'}`,transition:'all .2s'}}>
                {t.l}
              </button>
            ))}
          </div>

          {/* Content panels */}
          <div style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>

            {/* TRANSCRIPT */}
            {panel==='transcript'&&<div style={{flex:1,overflowY:'auto',padding:'16px',fontFamily:'monospace',fontSize:13,lineHeight:2,color:'#3D5080'}}>
              {isRec&&<div style={{display:'flex',alignItems:'center',gap:6,marginBottom:12}}>
                <span style={{fontSize:9,color:'#EF4444',background:'#FFF0F0',padding:'3px 9px',borderRadius:20,border:'1px solid #FFD0D0',fontWeight:700,animation:'blink 1.5s infinite'}}>● مباشر</span>
              </div>}
              {(transcript||interim)
                ?<><span style={{color:'#2D3748'}}>{transcript}</span>{interim&&<span style={{color:'#9AAAC8',fontStyle:'italic'}}>{interim}</span>}</>
                :<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60%',opacity:.35,gap:10}}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9AAAC8" strokeWidth="1.5"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                  <p style={{fontSize:14,color:'#9AAAC8',textAlign:'center'}}>تكلّم والمحضر يظهر هنا</p>
                </div>
              }
            </div>}

            {/* SUMMARY */}
            {panel==='summary'&&<div style={{flex:1,overflowY:'auto',padding:'16px'}}>
              {processing&&<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60%',gap:14}}>
                <div style={{position:'relative',width:40,height:40}}>
                  <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'2.5px solid #EEF2FF',borderTopColor:'#4361EE',animation:'spin .8s linear infinite'}}/>
                </div>
                <p style={{fontSize:13,color:'#9AAAC8'}}>جارٍ التحليل...</p>
              </div>}
              {!processing&&!summary&&<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60%',opacity:.35,gap:10}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4361EE" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <p style={{fontSize:13,color:'#6B7FA3',textAlign:'center'}}>الملخص يظهر بعد التسجيل</p>
              </div>}
              {summary&&<>
                <div style={{background:'linear-gradient(135deg,#4361EE,#7B2FBE)',borderRadius:14,padding:'14px',marginBottom:16}}>
                  <p style={{fontSize:11,color:'rgba(255,255,255,.7)',letterSpacing:1.5,marginBottom:6}}>CLAUDE AI · الملخص</p>
                  <p style={{fontSize:14,color:'#fff',lineHeight:1.8,margin:0}}>{summary.overview}</p>
                </div>
                {[{k:'keyPoints',l:'النقاط الرئيسية',c:'#4361EE',bg:'#EEF2FF',i:'◆'},{k:'actions',l:'مهام العمل',c:'#7B2FBE',bg:'#F5EEFF',i:'⚡'},{k:'next',l:'الخطوات التالية',c:'#059669',bg:'#ECFDF5',i:'→'}].map((s:any)=>summary[s.k]?.length>0&&(
                  <div key={s.k} style={{background:'#fff',borderRadius:12,border:'1.5px solid #EEF2FF',padding:'14px',marginBottom:12}}>
                    <span style={{fontSize:10,background:s.bg,color:s.c,padding:'2px 10px',borderRadius:20,fontWeight:700}}>{s.i} {s.l}</span>
                    {summary[s.k].map((x:string,j:number)=><div key={j} style={{display:'flex',gap:8,marginTop:10}}><div style={{width:5,height:5,borderRadius:'50%',background:s.c,marginTop:7,flexShrink:0}}/><p style={{fontSize:13.5,lineHeight:1.75,color:'#2D3748',margin:0}}>{x}</p></div>)}
                  </div>
                ))}
                <div style={{display:'flex',gap:8,marginTop:4}}>
                  <button onClick={async()=>{await fetch('/api/send-summary',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({to:user?.email,name:userName,title:sel?.title||'اجتماع',summary})});alert('تم الإرسال ✅');}} style={{flex:1,padding:'12px',borderRadius:11,border:'none',background:'linear-gradient(135deg,#059669,#047857)',color:'#fff',cursor:'pointer',fontSize:13,fontWeight:700,fontFamily:'inherit'}}>📧 إرسال للبريد</button>
                  <button onClick={()=>{const t=`# ${sel?.title}\n\n${summary.overview}\n\n## النقاط\n${summary.keyPoints?.map((p:string)=>`- ${p}`).join('\n')}\n\n## المهام\n${summary.actions?.map((a:string)=>`- ${a}`).join('\n')}`;navigator.clipboard.writeText(t);alert('تم النسخ ✅');}} style={{padding:'12px 16px',borderRadius:11,border:'1.5px solid #EEF2FF',background:'#fff',color:'#4361EE',cursor:'pointer',fontSize:13,fontWeight:700,fontFamily:'inherit'}}>⎘</button>
                </div>
              </>}
            </div>}

            {/* CHAT */}
            {panel==='chat'&&<>
              <div style={{flex:1,overflowY:'auto',padding:'12px',display:'flex',flexDirection:'column',gap:10}}>
                {chatMsgs.length===0&&<div style={{textAlign:'center',padding:'32px 16px',opacity:.5}}>
                  <div style={{fontSize:28,marginBottom:10}}>💬</div>
                  <p style={{fontSize:13,color:'#6B7FA3',marginBottom:14}}>اسأل Claude عن الاجتماع</p>
                  {['ما أهم القرارات؟','من المسؤول؟','لخّص المهام'].map(q=>(
                    <button key={q} className="chip" onClick={()=>setChatInput(q)} style={{display:'block',width:'100%',padding:'10px 14px',borderRadius:10,border:'1.5px solid #EEF2FF',background:'#fff',color:'#6B7FA3',cursor:'pointer',fontSize:13,fontFamily:'inherit',textAlign:'right',marginBottom:8,transition:'all .15s'}}>{q}</button>
                  ))}
                </div>}
                {chatMsgs.map((m:any,i:number)=>(
                  <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-start':'flex-end'}}>
                    <div style={{maxWidth:'85%',padding:'10px 14px',borderRadius:14,background:m.role==='user'?'#EEF2FF':'#fff',border:`1px solid ${m.role==='user'?'#C7D2F8':'#EEF2FF'}`,fontSize:13.5,lineHeight:1.8,color:'#2D3748',direction:'rtl',textAlign:'right'}}>
                      {m.role==='assistant'&&<span style={{fontSize:10,color:'#7B2FBE',fontWeight:700,display:'block',marginBottom:4}}>✦ iMeets AI</span>}
                      {m.text}
                    </div>
                  </div>
                ))}
                {chatLoading&&<div style={{display:'flex',justifyContent:'flex-end'}}><div style={{padding:'10px 14px',borderRadius:14,background:'#fff',border:'1px solid #EEF2FF',display:'flex',gap:5}}>{[0,.15,.3].map(d=><div key={d} style={{width:7,height:7,borderRadius:'50%',background:'#9AAAC8',animation:`blink 1s ${d}s infinite`}}/>)}</div></div>}
                <div ref={chatEndRef}/>
              </div>
              <div style={{padding:'10px 12px',borderTop:'1px solid #EEF2FF',background:'#fff',flexShrink:0}}>
                <div style={{display:'flex',gap:8,background:'#F8FAFF',border:'1.5px solid #EEF2FF',borderRadius:12,padding:'8px 8px 8px 12px',alignItems:'center'}}>
                  <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&sendChat()} placeholder="اسأل عن الاجتماع..." style={{flex:1,border:'none',outline:'none',fontSize:14,color:'#0D1117',fontFamily:'inherit',background:'transparent',direction:'rtl'}}/>
                  <button onClick={sendChat} disabled={chatLoading||!chatInput.trim()} style={{width:36,height:36,borderRadius:10,border:'none',background:chatInput.trim()?'#4361EE':'#EEF2FF',cursor:chatInput.trim()?'pointer':'default',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all .15s'}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={chatInput.trim()?'#fff':'#9AAAC8'} strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                  </button>
                </div>
              </div>
            </>}
          </div>

          {/* BOTTOM BAR */}
          <div style={{padding:'10px 16px',borderTop:'1px solid #EEF2FF',background:'#fff',display:'flex',gap:8,flexShrink:0}}>
            {isRec&&<button onClick={stopRec} style={{flex:1,padding:'12px',borderRadius:12,border:'1.5px solid #FECDD3',background:'#FFF0F2',color:'#EF4444',cursor:'pointer',fontSize:14,fontWeight:700,fontFamily:'inherit'}}>⬛ إيقاف وتحليل</button>}
            {isDone&&<>
              <button onClick={startRec} style={{flex:1,padding:'12px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#4361EE,#7B2FBE)',color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700,fontFamily:'inherit',boxShadow:'0 3px 12px rgba(67,97,238,.3)'}}>+ تسجيل جديد</button>
              <button onClick={()=>setShowMenu(true)} style={{padding:'12px 16px',borderRadius:12,border:'1.5px solid #EEF2FF',background:'#fff',color:'#6B7FA3',cursor:'pointer',fontSize:14,fontFamily:'inherit'}}>☰</button>
            </>}
          </div>
        </>}
      </div>
    </div>
  );
}
