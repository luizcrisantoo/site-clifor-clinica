/* ============================================================
   CLIFOR Olinda — js/components/chatbot.js
   Lógica PURA de resolução de resposta do chatbot.
   Não acessa o DOM — apenas recebe texto e retorna um objeto.

   DEPENDE DE: chatbot-flows.js (CLIFOR.chatbotFlows, CLIFOR.chatbotFallback)

   Retorno de CLIFOR.resolveResponse():
     {
       text:    string,  // texto a exibir na bolha
       hasLink: boolean  // true = exibir botão "Falar no WhatsApp"
     }
   ============================================================ */
'use strict';

/**
 * Remove acentos e converte para minúsculas para comparação normalizada.
 * @param {string} str
 * @returns {string}
 */
CLIFOR.normalizeText = function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

/**
 * Resolve a resposta do chatbot a partir do texto digitado pelo usuário.
 * @param {string} userInput - texto livre digitado pelo paciente
 * @returns {{ text: string, hasLink: boolean }}
 */
CLIFOR.resolveResponse = function resolveResponse(userInput) {
  const normalize = CLIFOR.normalizeText;
  const input = normalize(userInput);

  const matched = CLIFOR.chatbotFlows.find(function (flow) {
    return flow.keywords.some(function (kw) {
      return input.includes(normalize(kw));
    });
  });

  if (matched) {
    const text = (typeof matched.response === 'function')
      ? matched.response()
      : matched.response;

    return { text: text, hasLink: false };
  }

  /* Nenhum fluxo correspondeu → fallback com link para WhatsApp */
  return {
    text:    CLIFOR.chatbotFallback.text,
    hasLink: CLIFOR.chatbotFallback.hasLink,
  };
};
