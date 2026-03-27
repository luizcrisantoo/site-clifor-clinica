/* ============================================================
   CLIFOR Olinda — js/lib/chatbot.js
   Lógica PURA de resolução de resposta do chatbot.
   Não acessa o DOM — apenas recebe texto e retorna um objeto.

   DEPENDE DE: chatbot-flows.js (CHATBOT_FLOWS, CHATBOT_FALLBACK)

   Retorno de resolveResponse():
     {
       text:    string,  // texto a exibir na bolha
       hasLink: boolean  // true = exibir botão "Falar no WhatsApp"
     }
   ============================================================ */

/**
 * Remove acentos e converte para minúsculas para comparação normalizada.
 * @param {string} str
 * @returns {string}
 */
function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Resolve a resposta do chatbot a partir do texto digitado pelo usuário.
 * @param {string} userInput - texto livre digitado pelo paciente
 * @returns {{ text: string, hasLink: boolean }}
 */
function resolveResponse(userInput) {
  var input = normalizeText(userInput);

  for (var i = 0; i < CHATBOT_FLOWS.length; i++) {
    var flow = CHATBOT_FLOWS[i];

    var matched = flow.keywords.some(function (kw) {
      return input.includes(normalizeText(kw));
    });

    if (matched) {
      var text = (typeof flow.response === 'function')
        ? flow.response()
        : flow.response;

      return { text: text, hasLink: false };
    }
  }

  /* Nenhum fluxo correspondeu → fallback com link para WhatsApp */
  return {
    text:    CHATBOT_FALLBACK.text,
    hasLink: CHATBOT_FALLBACK.hasLink,
  };
}
