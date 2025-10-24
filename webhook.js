module.exports = async (req, res) => {
  // GET: Verificação do webhook da Meta
  if (req.method === "GET") {
    const VERIFY_TOKEN = "GUARDIAO_WA_WEBHOOK_2025";
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log(`🔍 Verificação - Mode: ${mode}, Token: ${token}, Challenge: ${challenge}`);

    if (mode && token === VERIFY_TOKEN) {
      console.log("✅ Webhook verificado com sucesso!");
      return res.status(200).send(challenge);
    } else {
      console.log("❌ Token inválido ou modo incorreto");
      return res.status(403).send("Token inválido");
    }
  }

  // POST: Recebimento de mensagens
  if (req.method === "POST") {
    const body = req.body;

    if (body.object) {
      console.log("📩 Evento recebido:", JSON.stringify(body, null, 2));
      
      // Aqui você pode processar a mensagem
      // Por exemplo, salvar no Firebase Database ou chamar IA
      
      return res.status(200).send("EVENT_RECEIVED");
    } else {
      console.log("❌ Objeto não encontrado no body");
      return res.status(404).send("Objeto não encontrado");
    }
  }

  return res.status(405).send("Método não permitido");
};