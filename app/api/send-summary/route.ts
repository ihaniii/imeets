import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { to, name, title, summary, transcript } = await req.json();

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"/></head>
<body style="margin:0;padding:0;background:#F0F4FF;font-family:'Segoe UI',system-ui,sans-serif;direction:rtl">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F4FF;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(67,97,238,.1)">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#4361EE,#7B2FBE);padding:32px 40px;text-align:center">
          <table cellpadding="0" cellspacing="0" style="margin:0 auto">
            <tr><td align="center">
              <div style="background:rgba(255,255,255,.15);border-radius:16px;padding:12px 20px;display:inline-block;margin-bottom:16px">
                <span style="font-size:28px">🎙</span>
              </div>
              <div style="font-size:26px;font-weight:800;color:#fff;letter-spacing:-0.5px">iMeets</div>
              <div style="font-size:12px;color:rgba(255,255,255,.7);letter-spacing:2px;margin-top:4px">AI MEETING RECORDER</div>
            </td></tr>
          </table>
        </td></tr>
        <!-- Greeting -->
        <tr><td style="padding:32px 40px 0">
          <p style="font-size:15px;color:#6B7FA3;margin:0 0 8px">مرحباً ${name || 'مستخدم iMeets'} 👋</p>
          <h1 style="font-size:22px;font-weight:800;color:#0D1117;margin:0 0 6px;letter-spacing:-0.5px">ملخص اجتماعك جاهز</h1>
          <p style="font-size:14px;color:#9AAAC8;margin:0">${title}</p>
        </td></tr>
        <!-- Divider -->
        <tr><td style="padding:24px 40px 0"><div style="height:1px;background:#EEF2FF"></div></td></tr>
        <!-- Overview -->
        <tr><td style="padding:24px 40px 0">
          <p style="font-size:14px;color:#3D5080;line-height:1.8;background:#F8FAFF;border-radius:12px;padding:16px;border-right:4px solid #4361EE;margin:0">${summary.overview}</p>
        </td></tr>
        <!-- Key Points -->
        ${summary.keyPoints?.length ? `
        <tr><td style="padding:24px 40px 0">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <span style="font-size:11px;font-weight:700;color:#4361EE;background:#EEF2FF;padding:3px 12px;border-radius:20px">◆ النقاط الرئيسية</span>
          </div>
          ${summary.keyPoints.map((p: string) => `
            <div style="display:flex;gap:10px;margin-bottom:8px;align-items:flex-start">
              <div style="width:6px;height:6px;border-radius:50%;background:#4361EE;margin-top:7px;flex-shrink:0"></div>
              <p style="font-size:13.5px;color:#2D3748;line-height:1.7;margin:0">${p}</p>
            </div>
          `).join('')}
        </td></tr>` : ''}
        <!-- Action Items -->
        ${summary.actions?.length ? `
        <tr><td style="padding:20px 40px 0">
          <div style="margin-bottom:12px">
            <span style="font-size:11px;font-weight:700;color:#7B2FBE;background:#F5EEFF;padding:3px 12px;border-radius:20px">⚡ مهام العمل</span>
          </div>
          ${summary.actions.map((a: string) => `
            <div style="display:flex;gap:10px;margin-bottom:8px;align-items:flex-start">
              <div style="width:18px;height:18px;border-radius:5px;background:#F5EEFF;border:1.5px solid #E0C8FF;flex-shrink:0;margin-top:2px"></div>
              <p style="font-size:13.5px;color:#2D3748;line-height:1.7;margin:0">${a}</p>
            </div>
          `).join('')}
        </td></tr>` : ''}
        <!-- Next Steps -->
        ${summary.next?.length ? `
        <tr><td style="padding:20px 40px 0">
          <div style="margin-bottom:12px">
            <span style="font-size:11px;font-weight:700;color:#059669;background:#ECFDF5;padding:3px 12px;border-radius:20px">→ الخطوات التالية</span>
          </div>
          ${summary.next.map((n: string) => `
            <div style="display:flex;gap:10px;margin-bottom:8px;align-items:flex-start">
              <div style="width:6px;height:6px;border-radius:50%;background:#059669;margin-top:7px;flex-shrink:0"></div>
              <p style="font-size:13.5px;color:#2D3748;line-height:1.7;margin:0">${n}</p>
            </div>
          `).join('')}
        </td></tr>` : ''}
        <!-- CTA -->
        <tr><td style="padding:28px 40px">
          <div style="text-align:center">
            <a href="https://imeets.co/dashboard" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#4361EE,#7B2FBE);color:#fff;font-weight:700;font-size:14px;border-radius:12px;text-decoration:none;box-shadow:0 4px 16px rgba(67,97,238,.3)">
              فتح الاجتماع في iMeets →
            </a>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#F8FAFF;padding:20px 40px;text-align:center;border-top:1px solid #EEF2FF">
          <p style="font-size:12px;color:#9AAAC8;margin:0">تم الإرسال بواسطة <strong style="color:#4361EE">iMeets</strong> · <a href="https://imeets.co" style="color:#9AAAC8">imeets.co</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'iMeets <onboarding@resend.dev>',
      to: [to],
      subject: `ملخص اجتماع: ${title}`,
      html,
    }),
  });

  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data }, { status: 400 });
  return NextResponse.json({ success: true, id: data.id });
}
