export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    // Validação simples
    if (!body.name || !body.email || !body.message) {
      return new Response(JSON.stringify({ error: "Dados incompletos" }), { status: 400 });
    }

    // AQUI ENTRA A INTEGRAÇÃO COM O RESEND (E-mail Service)
    // Se tiver a chave configurada, ele tenta enviar.
    if (env.RESEND_API_KEY) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Comtipo Site <onboarding@resend.dev>', // Ou seu domínio verificado
          to: 'marllondesousafreire@gmail.com', // Seu e-mail pessoal
          subject: `Nova mensagem de ${body.name}`,
          html: `<p><strong>Nome:</strong> ${body.name}</p>
                 <p><strong>Email:</strong> ${body.email}</p>
                 <p><strong>Mensagem:</strong><br/>${body.message}</p>`
        })
      });
      
      if (!resendResponse.ok) {
        throw new Error("Falha no Resend");
      }
    }

    // Resposta de Sucesso para o Frontend
    return new Response(JSON.stringify({ message: "Enviado!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}