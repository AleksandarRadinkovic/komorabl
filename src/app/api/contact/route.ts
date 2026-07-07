import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const sanitizeLine = (value: unknown) =>
  typeof value === 'string' ? value.replace(/[\r\n]+/g, ' ').trim() : '';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = sanitizeLine(body.name);
    const email = sanitizeLine(body.email);
    const phone = sanitizeLine(body.phone);
    const subject = sanitizeLine(body.subject);
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Nedostaju obavezna polja.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL_TO || process.env.SMTP_USER,
      subject: `[Kontakt forma] ${subject}`,
      text: `Ime: ${name}\nEmail: ${email}\nTelefon: ${phone || '-'}\n\nPoruka:\n${message}`,
      html: `
        <p><strong>Ime:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone || '-')}</p>
        <p><strong>Poruka:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json({ error: 'Slanje poruke nije uspjelo.' }, { status: 500 });
  }
}
