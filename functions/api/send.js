// Localizado em functions/api/send.js
export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`, // Puxa a chave que você colou na Cloudflare
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Contato Comtipo <contato@comtipo.com>', // Já configurado com seu novo domínio
      to: 'comtipo.com@gmail.com',
      subject: 'Novo Contato do Site',
      html: `<p><strong>Nome:</strong> ${body.name}</p>
             <p><strong>Email:</strong> ${body.email}</p>
             <p><strong>Mensagem:</strong> ${body.message}</p>`,
    }),
  });

  return new Response(JSON.stringify({ success: res.ok }), {
    headers: { 'Content-Type': 'application/json' },
  });
}