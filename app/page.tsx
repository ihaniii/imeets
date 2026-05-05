'use client';
import { useState, useEffect } from 'react';

const Logo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4361EE"/><stop offset="100%" stopColor="#7B2FBE"/></linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fff"/><stop offset="100%" stopColor="#E0E8FF"/></linearGradient>
    </defs>
    <rect width="400" height="400" rx="90" fill="url(#g1)"/>
    <rect x="152" y="48" width="96" height="148" rx="48" fill="url(#g2)"/>
    <line x1="162" y1="90" x2="238" y2="90" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="158" y1="110" x2="242" y2="110" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="156" y1="130" x2="244" y2="130" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="157" y1="150" x2="243" y2="150" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <line x1="160" y1="170" x2="240" y2="170" stroke="#4361EE" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
    <path d="M140 215 Q140 268 200 268 Q260 268 260 215" fill="none" stroke="rgba(255,255,255,.92)" strokeWidth="7" strokeLinecap="round"/>
    <line x1="200" y1="268" x2="200" y2="308" stroke="rgba(255,255,255,.92)" strokeWidth="7" strokeLinecap="round"/>
    <rect x="168" y="306" width="64" height="10" rx="5" fill="rgba(255,255,255,.92)"/>
    <path d="M126 168 Q114 200 126 232" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M102 150 Q85 200 102 250" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="4" strokeLinecap="round"/>
    <path d="M274 168 Q286 200 274 232" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M298 150 Q315 200 298 250" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const T: Record<string, Record<string, any>> = {
  ar: {
    dir: 'rtl',
    nav: { login: 'تسجيل الدخول', cta: 'ابدأ مجاناً' },
    hero: {
      badge: '🚀 الآن مع Claude AI 3.5 — أذكى تلخيص للاجتماعات',
      h1: ['اجتماعاتك تُسجَّل،', 'تُحلَّل، وتُلخَّص', 'بالذكاء الاصطناعي'],
      sub: 'iMeets يدخل اجتماعاتك في Zoom وGoogle Meet تلقائياً، يكتب كل كلمة، ويرسل لك ملخصاً احترافياً بالنقاط الرئيسية والمهام والقرارات — خلال ثوانٍ من انتهاء الاجتماع.',
      emailPh: 'أدخل بريدك الإلكتروني',
      startBtn: 'ابدأ مجاناً — لا بطاقة مطلوبة',
      sentBtn: '✓ سنتواصل معك قريباً!',
      watchBtn: 'شاهد كيف يعمل',
      social: 'انضم لـ +٥٠,٠٠٠ فريق حول العالم',
    },
    mockup: {
      title: 'Team Weekly Sync',
      live: 'مباشر',
      time: '00:24:13',
      speakers: [
        { name: 'أحمد', color: '#4361EE', text: 'نبدأ بتحديث السبرينت — وصلنا ٨٥٪ من المستهدف هذا الأسبوع.' },
        { name: 'سارة', color: '#7B2FBE', text: 'ممتاز! متى موعد مراجعة التصميم مع العميل؟' },
        { name: 'أحمد', color: '#4361EE', text: 'الخميس الساعة ٢ ظهراً. نحتاج الـ mockups جاهزة قبلها.' },
      ],
      summary: 'ملخص Claude AI',
      points: ['Sprint عند ٨٥٪ من الهدف', 'مراجعة التصميم الخميس ٢م', 'الـ mockups مطلوبة قبل الاجتماع'],
      actions: 'مهام العمل',
      actionItems: ['تجهيز mockups للعميل', 'تحديث تذاكر Jira'],
    },
    features: {
      title: 'كل ما تحتاجه في اجتماع واحد',
      sub: 'من التسجيل حتى التقرير النهائي — iMeets يتولى كل شيء حتى تركّز أنت على العمل الحقيقي',
      items: [
        { icon: '🎙', title: 'تسجيل تلقائي فوري', desc: 'iMeets يدخل اجتماعك تلقائياً بمجرد انضمامك. لا حاجة لأي إعداد أو ضغط زر. يعمل مع Zoom وGoogle Meet وMicrosoft Teams.', tag: 'Chrome Extension' },
        { icon: '📝', title: 'نسخ نصي بدقة ٩٨٪', desc: 'تقنية متقدمة تحول الصوت لنص بدقة استثنائية. يدعم العربية والإنجليزية و+٣٠ لغة، مع تمييز كامل لكل متحدث.', tag: '+٣٠ لغة' },
        { icon: '✦', title: 'تلخيص Claude AI', desc: 'بعد كل اجتماع، Claude يحلل المحضر كاملاً ويستخرج النقاط الرئيسية، قرارات الفريق، المهام المطلوبة، والخطوات التالية.', tag: 'Claude AI' },
        { icon: '💬', title: 'دردشة ذكية مع اجتماعاتك', desc: 'اسأل أي سؤال عن أي اجتماع: "من وعد بإرسال التقرير؟" أو "ما قررناه بخصوص الميزانية؟" — إجابات فورية من AI.', tag: 'AI Chat' },
        { icon: '🔊', title: 'تعرف تلقائي على المتحدثين', desc: 'iMeets يميّز بين أصوات المشاركين تلقائياً ويربط كل كلام بصاحبه. لا تكوين مسبق، لا تسميات يدوية.', tag: 'Speaker ID' },
        { icon: '📤', title: 'تصدير وتكامل مع أدواتك', desc: 'صدّر الملخص بصيغة PDF أو Word، أو أرسله مباشرة لـ Notion أو Slack أو Jira. كل شيء في مكانه الصحيح تلقائياً.', tag: 'Integrations' },
      ],
    },
    steps: {
      title: 'ثلاث خطوات — وأنت حر',
      sub: 'أبسط من أي أداة اجتماعات تستخدمتها في حياتك',
      items: [
        { n: '١', title: 'ثبّت الإضافة', desc: 'أضف iMeets لمتصفح Chrome في ٣٠ ثانية. يتعرف تلقائياً على Zoom وGoogle Meet وTeams.' },
        { n: '٢', title: 'انضم لاجتماعك', desc: 'iMeets يبدأ التسجيل والنسخ تلقائياً. أنت فقط تتحدث وتركز — نحن نتولى الباقي.' },
        { n: '٣', title: 'استلم ملخصك', desc: 'خلال ثوانٍ من انتهاء الاجتماع يصلك ملخص احترافي بالنقاط والمهام والقرارات.' },
      ],
    },
    testimonials: {
      title: 'يثق بنا قادة من أفضل الشركات',
      items: [
        { name: 'سلطان العتيبي', role: 'VP Product', company: 'Noon', text: 'قبل iMeets كنا نضيع ٣٠ دقيقة بعد كل اجتماع نكتب الملاحظات ونوزع المهام. الآن كل شيء يصلنا تلقائياً خلال ثوانٍ. وفّرنا أكثر من ١٠ ساعات أسبوعياً كفريق.', rating: 5, avatar: 'س', color: '#4361EE' },
        { name: 'نورة الشمري', role: 'CTO', company: 'Tamara', text: 'دقة التعرف على الأصوات مذهلة حقاً. يميّز بيني وبين ٨ أشخاص في نفس الاجتماع بدقة. الـ AI Chat غيّر طريقة عملي تماماً — أسأل عن قرار من شهر وأحصل على الإجابة فوراً.', rating: 5, avatar: 'ن', color: '#7B2FBE' },
        { name: 'فهد القحطاني', role: 'Founder & CEO', company: 'Foodics', text: 'أفضل استثمار لأدوات الإنتاجية عملناه. التكامل مع Notion وSlack يعني أن كل شيء يذهب لمكانه الصحيح تلقائياً. فريقنا بالكامل يعتمد عليه الآن.', rating: 5, avatar: 'ف', color: '#059669' },
        { name: 'ريم المطيري', role: 'COO', company: 'STC Pay', text: 'كنت أخشى تفويت تفاصيل مهمة في اجتماعات العملاء. الآن أنا واثقة ١٠٠٪ أن كل كلمة مسجلة ومحللة. iMeets منحني ثقة كاملة في كل اجتماع.', rating: 5, avatar: 'ر', color: '#DC2626' },
      ],
    },
    pricing: {
      title: 'سعر يناسب كل فريق',
      sub: 'ابدأ مجاناً واترقّ عندما تحتاج. لا عقود. لا مفاجآت.',
      plans: [
        { name: 'مجاني', price: '$0', period: '', desc: 'لاكتشاف iMeets', color: '#6B7FA3', features: ['٥ اجتماعات شهرياً', 'نسخ نصي أساسي', 'ملخص AI بسيط', '٣٠ دقيقة لكل اجتماع'], cta: 'ابدأ مجاناً', highlight: false },
        { name: 'احترافي', price: '$12', period: '/شهر', desc: 'للمحترفين والفرق الصغيرة', color: '#4361EE', badge: '🔥 الأكثر شيوعاً', features: ['اجتماعات غير محدودة', 'نسخ بدقة ٩٨٪ بـ +٣٠ لغة', 'تلخيص Claude AI متقدم', 'AI Chat ذكي', 'تعرف على المتحدثين', 'Chrome Extension', 'تصدير PDF/Word/Notion'], cta: 'جرّب ١٤ يوم مجاناً', highlight: true },
        { name: 'فريق', price: '$29', period: '/شهر', desc: 'للفرق والمؤسسات', color: '#7B2FBE', features: ['كل مميزات Pro', 'حتى ٢٥ مستخدم', 'لوحة إدارة الفريق', 'مشاركة الاجتماعات', 'تكامل Slack/Jira/Notion', 'تقارير الاستخدام', 'دعم ٢٤/٧ مخصص'], cta: 'تواصل معنا', highlight: false },
      ],
    },
    faq: {
      title: 'أسئلة شائعة',
      items: [
        { q: 'هل أحتاج بطاقة ائتمانية للبدء؟', a: 'لا إطلاقاً. الخطة المجانية لا تتطلب أي معلومات دفع. ابدأ الآن ببريدك الإلكتروني فقط.' },
        { q: 'كيف يدخل iMeets اجتماعاتي؟', a: 'من خلال إضافة Chrome. بعد التثبيت، يكتشف iMeets تلقائياً أي اجتماع تنضم إليه على Zoom أو Google Meet أو Teams ويبدأ العمل فوراً.' },
        { q: 'هل بياناتي آمنة ومشفرة؟', a: 'نعم. جميع البيانات مشفرة بتقنية AES-256. نحن لا نبيع بياناتك ولا نشاركها مع أي طرف ثالث. يمكنك حذف بياناتك في أي وقت.' },
        { q: 'ما هي اللغات المدعومة؟', a: 'iMeets يدعم أكثر من ٣٠ لغة بما فيها العربية والإنجليزية والفرنسية والإسبانية والألمانية واليابانية والمزيد. دعم العربية ممتاز ومحسّن خصيصاً.' },
        { q: 'هل يعمل مع Microsoft Teams؟', a: 'نعم! iMeets يعمل مع Zoom وGoogle Meet وMicrosoft Teams وأي منصة اجتماعات تعمل في المتصفح.' },
        { q: 'هل يمكنني إلغاء اشتراكي في أي وقت؟', a: 'بالطبع. إلغاء بضغطة واحدة من لوحة إعداداتك. لا عقود، لا غرامات، لا أسئلة.' },
      ],
    },
    cta: {
      title: 'ابدأ اجتماعك الأول\nمع iMeets اليوم',
      sub: 'أكثر من ٥٠,٠٠٠ فريق يوفّرون ساعات كل أسبوع.\nلا بطاقة ائتمانية. لا التزام. إلغاء في أي وقت.',
      btn: 'ابدأ مجاناً الآن',
    },
    footer: {
      tagline: 'سجّل. حوّل. لخّص. تلقائياً.',
      product: 'المنتج',
      company: 'الشركة',
      support: 'الدعم',
      productLinks: ['المميزات', 'الأسعار', 'Chrome Extension', 'الأمان والخصوصية'],
      companyLinks: ['من نحن', 'المدونة', 'وظائف', 'تواصل معنا'],
      supportLinks: ['مركز المساعدة', 'الوثائق', 'حالة الخدمة', 'سياسة الخصوصية'],
      copyright: '© 2025 iMeets · جميع الحقوق محفوظة',
    },
  },
  en: {
    dir: 'ltr',
    nav: { login: 'Sign in', cta: 'Get started free' },
    hero: {
      badge: '🚀 Now with Claude AI 3.5 — Smarter meeting intelligence',
      h1: ['Record, analyze, and', 'summarize your meetings', 'with AI'],
      sub: 'iMeets automatically joins your Zoom and Google Meet calls, transcribes every word, and delivers a professional summary with key points, action items, and decisions — seconds after your meeting ends.',
      emailPh: 'Enter your work email',
      startBtn: 'Start free — no credit card required',
      sentBtn: '✓ We will be in touch soon!',
      watchBtn: 'Watch how it works',
      social: 'Join 50,000+ teams worldwide',
    },
    mockup: {
      title: 'Team Weekly Sync',
      live: 'LIVE',
      time: '00:24:13',
      speakers: [
        { name: 'Ahmed', color: '#4361EE', text: 'Sprint update — we\'re at 85% of our weekly target.' },
        { name: 'Sarah', color: '#7B2FBE', text: 'Great! When is the design review with the client?' },
        { name: 'Ahmed', color: '#4361EE', text: 'Thursday at 2pm. We need mockups ready before then.' },
      ],
      summary: 'Claude AI Summary',
      points: ['Sprint at 85% of target', 'Design review Thursday 2pm', 'Mockups needed before meeting'],
      actions: 'Action Items',
      actionItems: ['Prepare mockups for client', 'Update Jira tickets'],
    },
    features: {
      title: 'Everything you need in one tool',
      sub: 'From recording to final report — iMeets handles it all so you can focus on real work',
      items: [
        { icon: '🎙', title: 'Automatic recording', desc: 'iMeets joins your meetings automatically. No setup, no button press. Works with Zoom, Google Meet, and Microsoft Teams out of the box.', tag: 'Chrome Extension' },
        { icon: '📝', title: '98% accurate transcription', desc: 'Advanced speech recognition converts audio to text with exceptional accuracy. Supports Arabic, English, and 30+ languages with full speaker identification.', tag: '30+ Languages' },
        { icon: '✦', title: 'Claude AI summaries', desc: 'After every meeting, Claude analyzes the full transcript and extracts key points, team decisions, required tasks, and next steps automatically.', tag: 'Claude AI' },
        { icon: '💬', title: 'AI Chat with your meetings', desc: 'Ask any question about any meeting: "Who promised to send the report?" or "What did we decide about the budget?" — instant answers from AI.', tag: 'AI Chat' },
        { icon: '🔊', title: 'Automatic speaker recognition', desc: 'iMeets distinguishes between all participants automatically and assigns each word to its speaker. No pre-configuration, no manual labeling.', tag: 'Speaker ID' },
        { icon: '📤', title: 'Export and integrate', desc: 'Export summaries as PDF or Word, or send directly to Notion, Slack, or Jira. Everything goes to the right place automatically.', tag: 'Integrations' },
      ],
    },
    steps: {
      title: 'Three steps and you\'re done',
      sub: 'Simpler than any meeting tool you\'ve ever used',
      items: [
        { n: '1', title: 'Install the extension', desc: 'Add iMeets to Chrome in 30 seconds. It automatically recognizes Zoom, Google Meet, and Teams.' },
        { n: '2', title: 'Join your meeting', desc: 'iMeets starts recording and transcribing automatically. You just talk and focus — we handle the rest.' },
        { n: '3', title: 'Get your summary', desc: 'Within seconds of your meeting ending, you receive a professional summary with points, tasks, and decisions.' },
      ],
    },
    testimonials: {
      title: 'Trusted by leaders at top companies',
      items: [
        { name: 'Sultan Al-Otaibi', role: 'VP Product', company: 'Noon', text: 'Before iMeets we wasted 30 minutes after every meeting writing notes and distributing tasks. Now everything arrives automatically within seconds. We save over 10 hours a week as a team.', rating: 5, avatar: 'S', color: '#4361EE' },
        { name: 'Noura Al-Shamri', role: 'CTO', company: 'Tamara', text: 'The speaker recognition accuracy is genuinely impressive. It distinguishes between 8 people in the same call perfectly. AI Chat completely changed how I work — I ask about a decision from last month and get the answer instantly.', rating: 5, avatar: 'N', color: '#7B2FBE' },
        { name: 'Fahad Al-Qahtani', role: 'Founder & CEO', company: 'Foodics', text: 'Best productivity investment we have made. The Notion and Slack integration means everything goes to the right place automatically. Our entire team relies on it now.', rating: 5, avatar: 'F', color: '#059669' },
        { name: 'Reem Al-Mutairi', role: 'COO', company: 'STC Pay', text: 'I used to worry about missing important details in client meetings. Now I am 100% confident that every word is recorded and analyzed. iMeets gave me complete confidence in every meeting.', rating: 5, avatar: 'R', color: '#DC2626' },
      ],
    },
    pricing: {
      title: 'Simple pricing for every team',
      sub: 'Start free and upgrade when you need. No contracts. No surprises.',
      plans: [
        { name: 'Free', price: '$0', period: '', desc: 'To explore iMeets', color: '#6B7FA3', features: ['5 meetings per month', 'Basic transcription', 'Simple AI summary', '30 min per meeting'], cta: 'Get started free', highlight: false },
        { name: 'Pro', price: '$12', period: '/month', desc: 'For professionals and small teams', color: '#4361EE', badge: '🔥 Most popular', features: ['Unlimited meetings', '98% accuracy in 30+ languages', 'Advanced Claude AI summaries', 'Smart AI Chat', 'Speaker recognition', 'Chrome Extension', 'Export PDF/Word/Notion'], cta: 'Try free for 14 days', highlight: true },
        { name: 'Team', price: '$29', period: '/month', desc: 'For teams and enterprises', color: '#7B2FBE', features: ['Everything in Pro', 'Up to 25 users', 'Team management dashboard', 'Meeting sharing', 'Slack/Jira/Notion integration', 'Usage analytics', 'Priority 24/7 support'], cta: 'Contact us', highlight: false },
      ],
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        { q: 'Do I need a credit card to start?', a: 'Not at all. The free plan requires no payment information. Start now with just your email address.' },
        { q: 'How does iMeets join my meetings?', a: 'Through the Chrome extension. After installation, iMeets automatically detects any meeting you join on Zoom, Google Meet, or Teams and starts working immediately.' },
        { q: 'Is my data safe and encrypted?', a: 'Yes. All data is encrypted with AES-256 technology. We never sell your data or share it with any third party. You can delete your data at any time.' },
        { q: 'What languages are supported?', a: 'iMeets supports over 30 languages including English, Arabic, French, Spanish, German, Japanese and more. Arabic support is excellent and specially optimized.' },
        { q: 'Does it work with Microsoft Teams?', a: 'Yes! iMeets works with Zoom, Google Meet, Microsoft Teams, and any meeting platform that runs in the browser.' },
        { q: 'Can I cancel my subscription at any time?', a: 'Absolutely. Cancel with one click from your settings dashboard. No contracts, no penalties, no questions asked.' },
      ],
    },
    cta: {
      title: 'Start your first meeting\nwith iMeets today',
      sub: 'Over 50,000 teams saving hours every week.\nNo credit card. No commitment. Cancel anytime.',
      btn: 'Get started free now',
    },
    footer: {
      tagline: 'Record. Transcribe. Summarize. Automatically.',
      product: 'Product',
      company: 'Company',
      support: 'Support',
      productLinks: ['Features', 'Pricing', 'Chrome Extension', 'Security & Privacy'],
      companyLinks: ['About us', 'Blog', 'Careers', 'Contact'],
      supportLinks: ['Help Center', 'Documentation', 'Status', 'Privacy Policy'],
      copyright: '© 2025 iMeets · All rights reserved',
    },
  },
};

export default function Home() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [count, setCount] = useState(0);
  const t = T[lang];
  const ar = lang === 'ar';

  useEffect(() => {
    const target = 50000;
    const step = Math.ceil(target / 60);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div dir={t.dir} style={{ fontFamily: '"Plus Jakarta Sans",system-ui,sans-serif', background: '#F8FAFF', color: '#0D1117', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes grad { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.9)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .hov:hover { transform:translateY(-5px)!important; box-shadow:0 20px 56px rgba(67,97,238,.13)!important; }
        .lang-btn:hover { background:#EEF2FF!important; color:#4361EE!important; }
        .nav-cta:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(67,97,238,.45)!important; }
        a { text-decoration:none; color:inherit; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:#C7D2F8; border-radius:4px; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ padding: '15px 6%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(248,250,255,.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(67,97,238,.1)', boxShadow: '0 1px 20px rgba(67,97,238,.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={36} />
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.7px', background: 'linear-gradient(135deg,#4361EE,#7B2FBE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>iMeets</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', background: '#F0F4FF', border: '1px solid #E2E8F5', borderRadius: 10, padding: 3, gap: 2 }}>
            {(['ar', 'en'] as const).map(l => (
              <button key={l} className="lang-btn" onClick={() => setLang(l)} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: lang === l ? 'linear-gradient(135deg,#4361EE,#7B2FBE)' : 'transparent', color: lang === l ? '#fff' : '#6B7FA3', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', letterSpacing: .5 }}>
                {l === 'ar' ? 'العربية' : 'English'}
              </button>
            ))}
          </div>
          <a href="/login" style={{ padding: '9px 20px', borderRadius: 10, border: '1.5px solid #E2E8F5', background: '#fff', color: '#3D5080', fontWeight: 600, fontSize: 13.5 }}>{t.nav.login}</a>
          <a href="/login" className="nav-cta" style={{ padding: '9px 22px', borderRadius: 10, background: 'linear-gradient(135deg,#4361EE,#7B2FBE)', color: '#fff', fontWeight: 700, fontSize: 13.5, boxShadow: '0 4px 16px rgba(67,97,238,.3)', transition: 'all .2s' }}>{t.nav.cta}</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: '90px 6% 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '5%', right: '3%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(67,97,238,.08) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '3%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(123,47,190,.06) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,rgba(67,97,238,.1),rgba(123,47,190,.1))', border: '1px solid rgba(67,97,238,.2)', borderRadius: 24, padding: '7px 18px', fontSize: 13, color: '#4361EE', fontWeight: 700, marginBottom: 24, backdropFilter: 'blur(8px)' }}>
            {t.hero.badge}
          </div>
          <div style={{ display: 'inline-block', marginBottom: 28, animation: 'float 4s ease-in-out infinite' }}><Logo size={88} /></div>
          <h1 style={{ fontSize: 'clamp(38px,6vw,76px)', fontWeight: 800, letterSpacing: '-2.5px', lineHeight: 1.08, marginBottom: 24, display: 'block' }}>
            {t.hero.h1[0]}<br />
            <span style={{ background: 'linear-gradient(135deg,#4361EE,#7B2FBE,#4361EE)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'grad 4s ease infinite' }}>{t.hero.h1[1]}</span><br />
            {t.hero.h1[2]}
          </h1>
          <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: '#5A6B84', lineHeight: 1.8, maxWidth: 600, margin: '0 auto 40px', fontWeight: 400 }}>
            {t.hero.sub}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ display: 'flex', background: '#fff', border: '1.5px solid #E2E8F5', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(67,97,238,.12)' }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder={t.hero.emailPh} style={{ padding: '15px 22px', border: 'none', outline: 'none', fontSize: 15, fontFamily: 'inherit', width: 280, background: 'transparent', direction: ar ? 'rtl' : 'ltr', color: '#0D1117' }} />
              <button onClick={() => { if (email) setSent(true); }} style={{ padding: '15px 26px', border: 'none', background: 'linear-gradient(135deg,#4361EE,#7B2FBE)', color: '#fff', fontWeight: 700, fontSize: 14.5, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all .2s' }}>
                {sent ? t.hero.sentBtn : t.hero.startBtn}
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 56 }}>
            <div style={{ display: 'flex' }}>
              {['#4361EE', '#7B2FBE', '#059669', '#DC2626', '#D97706'].map((c, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>{['أ', 'ن', 'ف', 'ر', 'خ'][i]}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 2 }}>{[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>)}</div>
            <span style={{ fontSize: 13.5, color: '#5A6B84', fontWeight: 500 }}>{t.hero.social}</span>
          </div>
        </div>

        {/* PRODUCT MOCKUP */}
        <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: '20px 20px 0 0', boxShadow: '0 -4px 60px rgba(67,97,238,.12), 0 0 0 1px rgba(67,97,238,.08)', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          <div style={{ background: '#F8FAFF', borderBottom: '1px solid #EEF2FF', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
            </div>
            <div style={{ flex: 1, background: '#EEF2FF', borderRadius: 6, padding: '4px 12px', fontSize: 11.5, color: '#9AAAC8', margin: '0 12px' }}>app.imeets.co</div>
          </div>
          <div style={{ display: 'flex', height: 340 }}>
            {/* Sidebar */}
            <div style={{ width: 200, borderLeft: '1px solid #F0F4FF', background: '#FAFBFF', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', marginBottom: 8 }}>
                <Logo size={26} />
                <span style={{ fontSize: 13, fontWeight: 800, color: '#0D1117' }}>iMeets</span>
              </div>
              {[t.mockup.title, ar ? 'عرض Acme Corp' : 'Acme Corp Demo', ar ? 'خارطة Q3' : 'Q3 Roadmap'].map((m, i) => (
                <div key={m} style={{ padding: '9px 10px', borderRadius: 9, background: i === 0 ? '#EEF2FF' : 'transparent', borderRight: i === 0 ? '3px solid #4361EE' : '3px solid transparent', transition: 'all .15s', cursor: 'pointer' }}>
                  <p style={{ fontSize: 11.5, fontWeight: 600, color: i === 0 ? '#0D1117' : '#6B7FA3', marginBottom: 2 }}>{m}</p>
                  <p style={{ fontSize: 10, color: '#B8C4DC' }}>{ar ? 'اليوم' : 'Today'}</p>
                </div>
              ))}
            </div>
            {/* Transcript */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderLeft: '1px solid #F0F4FF' }}>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid #F0F4FF', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0D1117' }}>{t.mockup.title}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 'auto', background: '#FFF0F0', padding: '3px 10px', borderRadius: 20 }}>
                  <div style={{ width: 6, height: 6, background: '#EF4444', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                  <span style={{ fontSize: 10.5, color: '#DC2626', fontWeight: 700 }}>{t.mockup.live}</span>
                  <span style={{ fontSize: 10.5, color: '#DC2626', fontFamily: 'monospace' }}>{t.mockup.time}</span>
                </div>
              </div>
              <div style={{ flex: 1, padding: '14px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {t.mockup.speakers.map((s: any, i: number) => (
                  <div key={i}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.name}</span>
                    <div style={{ marginTop: 4, padding: '9px 12px', borderRadius: 10, background: '#F8FAFF', border: '1px solid #EEF2FF', fontSize: 12.5, color: '#2D3748', lineHeight: 1.7 }}>{s.text}</div>
                  </div>
                ))}
                <div style={{ padding: '9px 12px', borderRadius: 10, background: '#F0F4FF', border: '1.5px dashed #C7D2F8', fontSize: 12.5, color: '#4361EE', animation: 'pulse 2s infinite' }}>
                  {ar ? 'يتحدث...' : 'Speaking...'}
                </div>
              </div>
            </div>
            {/* Summary */}
            <div style={{ width: 230, background: '#FAFBFF', borderLeft: '1px solid #F0F4FF', padding: '14px 14px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#9AAAC8', letterSpacing: 1.5 }}>{t.mockup.summary}</span>
                <div style={{ marginRight: 'auto', background: '#EEF2FF', padding: '2px 8px', borderRadius: 20, fontSize: 9, color: '#4361EE', fontWeight: 700 }}>Claude</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 9.5, background: '#EEF2FF', color: '#4361EE', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>◆ {ar ? 'نقاط رئيسية' : 'Key Points'}</span>
                </div>
                {t.mockup.points.map((p: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#4361EE', marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontSize: 11.5, color: '#2D3748', lineHeight: 1.6 }}>{p}</p>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 9.5, background: '#F5EEFF', color: '#7B2FBE', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>⚡ {t.mockup.actions}</span>
                </div>
                {t.mockup.actionItems.map((a: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#7B2FBE', marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontSize: 11.5, color: '#2D3748', lineHeight: 1.6 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS ── */}
      <section style={{ padding: '32px 0', background: '#fff', borderTop: '1px solid #EEF2FF', overflow: 'hidden' }}>
        <p style={{ textAlign: 'center', fontSize: 11.5, color: '#9AAAC8', fontWeight: 700, letterSpacing: 2.5, marginBottom: 18 }}>{ar ? 'يثق بنا أكثر من ٥٠,٠٠٠ فريق' : 'TRUSTED BY 50,000+ TEAMS WORLDWIDE'}</p>
        <div style={{ display: 'flex', animation: 'marquee 22s linear infinite', width: 'max-content' }}>
          {['Noon', 'STC', 'Tamara', 'Foodics', 'Tabby', 'Jahez', 'Unifonic', 'Salla', 'KPMG', 'PWC', 'Noon', 'STC', 'Tamara', 'Foodics', 'Tabby', 'Jahez', 'Unifonic', 'Salla', 'KPMG', 'PWC'].map((l, i) => (
            <div key={i} style={{ padding: '0 36px', fontSize: 15, fontWeight: 800, color: '#D1DCF0', whiteSpace: 'nowrap' }}>{l}</div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '72px 6%', background: 'linear-gradient(135deg,#4361EE 0%,#7B2FBE 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '20%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
          {[
            { n: ar ? `٥٠,٠٠٠+` : `${count.toLocaleString()}+`, l: ar ? 'فريق يستخدم iMeets' : 'Teams using iMeets' },
            { n: ar ? '٩٨٪' : '98%', l: ar ? 'دقة النسخ التلقائي' : 'Transcription accuracy' },
            { n: ar ? '+٣٠' : '30+', l: ar ? 'لغة مدعومة' : 'Languages supported' },
            { n: ar ? '٢ س+' : '2hrs+', l: ar ? 'توفير أسبوعي لكل فريق' : 'Saved per team per week' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '28px 20px' }}>
              <div style={{ fontSize: 'clamp(30px,4vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-2px', marginBottom: 8, lineHeight: 1 }}>{s.n}</div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', lineHeight: 1.5 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '100px 6%', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#EEF2FF', border: '1px solid #C7D2F8', borderRadius: 24, padding: '6px 18px', fontSize: 12.5, color: '#4361EE', fontWeight: 700, marginBottom: 18 }}>✦ {ar ? 'المميزات' : 'Features'}</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 14 }}>{t.features.title}</h2>
            <p style={{ fontSize: 17, color: '#5A6B84', maxWidth: 540, margin: '0 auto' }}>{t.features.sub}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
            {t.features.items.map((f: any, i: number) => (
              <div key={i} className="hov" style={{ borderRadius: 20, border: '1.5px solid #EEF2FF', background: '#fff', padding: '28px 26px', transition: 'all .25s', boxShadow: '0 4px 24px rgba(67,97,238,.06)', cursor: 'default', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 20, left: ar ? 'auto' : 20, right: ar ? 20 : 'auto' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: ['#4361EE','#7B2FBE','#059669','#DC2626','#D97706','#0891B2'][i], background: ['#EEF2FF','#F5EEFF','#ECFDF5','#FEF2F2','#FFFBEB','#EFF6FF'][i], padding: '3px 10px', borderRadius: 20 }}>{f.tag}</span>
                </div>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: ['#EEF2FF','#F5EEFF','#ECFDF5','#FEF2F2','#FFFBEB','#EFF6FF'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 20, marginTop: 28 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.4px', marginBottom: 10, color: ['#4361EE','#7B2FBE','#059669','#DC2626','#D97706','#0891B2'][i] }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#5A6B84', lineHeight: 1.8 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '100px 6%', background: 'linear-gradient(145deg,#EEF2FF,#F5EEFF)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.8)', border: '1px solid #C7D2F8', borderRadius: 24, padding: '6px 18px', fontSize: 12.5, color: '#4361EE', fontWeight: 700, marginBottom: 18 }}>⚡ {ar ? 'كيف يعمل' : 'How it works'}</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 14 }}>{t.steps.title}</h2>
            <p style={{ fontSize: 17, color: '#5A6B84' }}>{t.steps.sub}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {t.steps.items.map((s: any, i: number) => (
              <div key={i} style={{ background: '#fff', borderRadius: 22, padding: '36px 30px', boxShadow: '0 8px 40px rgba(67,97,238,.09)', border: '1px solid rgba(255,255,255,.8)', position: 'relative' }}>
                {i < 2 && <div style={{ position: 'absolute', top: 52, [ar ? 'left' : 'right']: -12, width: 24, height: 2, background: 'linear-gradient(90deg,#4361EE,#7B2FBE)', borderRadius: 2 }} />}
                <div style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg,#4361EE,#7B2FBE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 22, boxShadow: '0 4px 16px rgba(67,97,238,.3)' }}>{s.n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.5px', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14.5, color: '#5A6B84', lineHeight: 1.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS HIDDEN */}
      <section style={{ padding: '100px 6%', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFF0F0', border: '1px solid #FCA5A5', borderRadius: 24, padding: '6px 18px', fontSize: 12.5, color: '#DC2626', fontWeight: 700, marginBottom: 18 }}>❤️ {ar ? 'يقولون عنّا' : 'Customer stories'}</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, letterSpacing: '-1.5px' }}>{t.testimonials.title}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22 }}>
            {t.testimonials.items.map((tm: any, i: number) => (
              <div key={i} style={{ background: '#FAFBFF', borderRadius: 20, border: '1.5px solid #EEF2FF', padding: '28px', boxShadow: '0 4px 24px rgba(67,97,238,.06)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>{[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: '#F59E0B', fontSize: 15 }}>★</span>)}</div>
                <p style={{ fontSize: 14.5, color: '#2D3748', lineHeight: 1.85, marginBottom: 24, flex: 1, fontStyle: 'italic' }}>"{tm.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid #EEF2FF' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: `${tm.color}18`, border: `2.5px solid ${tm.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: tm.color, flexShrink: 0 }}>{tm.avatar}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0D1117', marginBottom: 3 }}>{tm.name}</p>
                    <p style={{ fontSize: 12, color: '#9AAAC8' }}>{tm.role} · <span style={{ color: tm.color, fontWeight: 600 }}>{tm.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '100px 6%', background: '#F8FAFF' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#EEF2FF', border: '1px solid #C7D2F8', borderRadius: 24, padding: '6px 18px', fontSize: 12.5, color: '#4361EE', fontWeight: 700, marginBottom: 18 }}>💳 {ar ? 'الأسعار' : 'Pricing'}</div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 14 }}>{t.pricing.title}</h2>
            <p style={{ fontSize: 17, color: '#5A6B84' }}>{t.pricing.sub}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {t.pricing.plans.map((p: any, i: number) => (
              <div key={i} style={{ borderRadius: 22, background: p.highlight ? 'linear-gradient(145deg,#4361EE,#7B2FBE)' : '#fff', border: p.highlight ? 'none' : '1.5px solid #EEF2FF', padding: '32px 28px', boxShadow: p.highlight ? '0 20px 60px rgba(67,97,238,.28)' : '0 4px 24px rgba(67,97,238,.06)', transform: p.highlight ? 'scale(1.04)' : 'scale(1)', position: 'relative' }}>
                {p.badge && <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#F59E0B,#EF4444)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 18px', borderRadius: 20, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(239,68,68,.3)' }}>{p.badge}</div>}
                <p style={{ fontSize: 12, fontWeight: 700, color: p.highlight ? 'rgba(255,255,255,.7)' : p.color, letterSpacing: 1.5, marginBottom: 8 }}>{p.name.toUpperCase()}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                  <span style={{ fontSize: 46, fontWeight: 800, color: p.highlight ? '#fff' : '#0D1117', letterSpacing: '-2px', lineHeight: 1 }}>{p.price}</span>
                  {p.period && <span style={{ fontSize: 14, color: p.highlight ? 'rgba(255,255,255,.65)' : '#9AAAC8' }}>{p.period}</span>}
                </div>
                <p style={{ fontSize: 13, color: p.highlight ? 'rgba(255,255,255,.65)' : '#9AAAC8', marginBottom: 24 }}>{p.desc}</p>
                <a href="/login" style={{ display: 'block', width: '100%', padding: '12px', borderRadius: 12, border: p.highlight ? '1.5px solid rgba(255,255,255,.3)' : `1.5px solid ${p.color}`, background: p.highlight ? 'rgba(255,255,255,.15)' : 'transparent', color: p.highlight ? '#fff' : p.color, fontWeight: 700, fontSize: 14, textAlign: 'center', marginBottom: 24, backdropFilter: p.highlight ? 'blur(8px)' : 'none', transition: 'all .2s' }}>{p.cta}</a>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {p.features.map((f: string, j: number) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: p.highlight ? 'rgba(255,255,255,.2)' : `${p.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: p.highlight ? '#fff' : p.color, flexShrink: 0, fontWeight: 700 }}>✓</div>
                      <span style={{ fontSize: 13, color: p.highlight ? 'rgba(255,255,255,.88)' : '#3D5080' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '100px 6%', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 52 }}>{t.faq.title}</h2>
          {t.faq.items.map((f: any, i: number) => (
            <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: '#F8FAFF', borderRadius: 16, border: '1.5px solid #EEF2FF', overflow: 'hidden', cursor: 'pointer', marginBottom: 12, transition: 'all .2s' }}>
              <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#0D1117' }}>{f.q}</span>
                <span style={{ color: '#9AAAC8', fontSize: 22, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .25s', flexShrink: 0 }}>⌄</span>
              </div>
              {openFaq === i && <div style={{ padding: '0 24px 20px', fontSize: 14.5, color: '#5A6B84', lineHeight: 1.85, borderTop: '1px solid #F0F4FF', paddingTop: 16 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 6%', textAlign: 'center', background: 'linear-gradient(145deg,#4361EE 0%,#7B2FBE 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -60, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', marginBottom: 24, animation: 'float 3.5s ease-in-out infinite' }}><Logo size={80} /></div>
          <h2 style={{ fontSize: 'clamp(28px,5vw,56px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 20, whiteSpace: 'pre-line' }}>{t.cta.title}</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.78)', lineHeight: 1.8, marginBottom: 40, whiteSpace: 'pre-line' }}>{t.cta.sub}</p>
          <a href="/login" style={{ display: 'inline-block', padding: '18px 48px', borderRadius: 16, background: '#fff', color: '#4361EE', fontWeight: 800, fontSize: 17, boxShadow: '0 12px 40px rgba(0,0,0,.2)', transition: 'all .2s', letterSpacing: '-.3px' }}>
            {t.cta.btn}
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#080D1A', padding: '60px 6% 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 52 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <Logo size={36} />
                <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-.7px' }}>iMeets</span>
              </div>
              <p style={{ fontSize: 14, color: '#3A5270', lineHeight: 1.8, maxWidth: 240 }}>{t.footer.tagline}</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                {['𝕏', 'in', '▶'].map((icon, i) => (
                  <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: '#0F1829', border: '1px solid #1E2D45', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#3A5270', cursor: 'pointer' }}>{icon}</div>
                ))}
              </div>
            </div>
            {[[t.footer.product, t.footer.productLinks], [t.footer.company, t.footer.companyLinks], [t.footer.support, t.footer.supportLinks]].map(([title, links]: any, i) => (
              <div key={i}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: 2, marginBottom: 18 }}>{title.toUpperCase()}</p>
                {links.map((link: string) => <p key={link} style={{ fontSize: 14, color: '#3A5270', marginBottom: 12, cursor: 'pointer', transition: 'color .15s' }}>{link}</p>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #0F1829', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 13, color: '#1E3050' }}>{t.footer.copyright}</p>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: '#F59E0B', fontSize: 13 }}>★</span>)}
              <span style={{ fontSize: 13, color: '#1E3050', marginRight: 8 }}> 4.9/5 · 2,400+ {ar ? 'تقييم' : 'reviews'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
