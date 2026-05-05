import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { to, name, title, summary } = await req.json();

  const html = `<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#F0F4FF;font-family:system-ui,sans-serif;direction:rtl"><table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden"><tr><td style="background:linear-gradient(135deg,#4361EE,#7B2FBE);padding:32px;text-align:center"><div style="font-size:32px">🎙</div><div style="font-size:24px;font-weight:800;color:#fff">iMeets</div></td></tr><tr><td style="padding:32px"><p style="color:#6B7FA3;margin:0 0 8px">مرحباً ${name} 👋</p><h1 style="font-size:20px;color:#0D1117;margin:0 0 16px">${title}</h1><p style="color:#3D5080;background:#F8FAFF;padding:14px;border-radius:12px;border-right:4px solid #4361EE;line-height:1.8">${summary.overview}</p>${summary.keyPoints?.length?`<p style="font-size:11px;font-weight:700;color:#4361EE;background:#EEF2FF;padding:3px 12px;border-radius:20px;display:inline-block;margin:16px 0 10px">◆ النقاط الرئيسية</p>${summary.keyPoints.map((p)=>`<p style="color:#2D3748;margin:0 0 6px">• ${p}</p>`).join('')}`:''}${summary.actions?.length?`<p style="font-size:11px;font-weight:700;color:#7B2FBE;background:#F5EEFF;padding:3px 12px;border-radius:20px;display:inline-block;margin:16px 0 10px">⚡ مهام العمل</p>${summary.actions.map((a)=>`<p style="color:#2D3748;margin:0 0 6px">☐ ${a}</p>`).join('')}`:''}${summary.next?.length?`<p style="font-size:11px;font-weight:700;color:#059669;background:#ECFDF5;padding:3px 12px;border-radius:20px;display:inline-block;margin:16px 0 10px">→ الخطوات التالية</p>${summary.next.map((n)=>`<p style="color:#2D3748;margin:0 0 6px">→ ${n}</p>`).join('')}`:''}
<div style="text-align:center;margin-top:24px"><a href="https://imeets.co/dashboard" style="background:linear-gradient(135deg,#4361EE,#7B2FBE);color:#fff;padding:12px 28px;border-radius:12px;text-decoration:none;font-weight:700">فتح في iMeets →</a></div></td></tr><tr><td style="background:#F8FAFF;padding:16px;text-align:center"><p style="color:#9AAAC8;font-size:12px;margin:0">iMeets · imeets.co</p></td></tr></table></td></tr></table></body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'iMeets <onboarding@resend.dev>', to: [to], subject: `ملخص اجتماع: ${title}`, html }),
  });

  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data }, { status: 400 });
  return NextResponse.json({ success: true });
}
