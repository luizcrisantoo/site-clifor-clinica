/* ============================================================
   CLIFOR Olinda — js/lib/whatsapp.js
   Gerador centralizado de links do WhatsApp.

   DEPENDE DE: clinic.js (CLINIC deve estar no escopo global)

   Uso:
     buildWALink('default')   → link para agendamento padrão
     buildWALink('convenios') → link com contexto de convênios
     buildWALink('chatbot')   → link quando chatbot não entende
   ============================================================ */

/**
 * Gera o link completo do WhatsApp com mensagem pré-preenchida.
 * @param {string} messageKey - chave em CLINIC.whatsapp.messages
 * @returns {string} URL wa.me completa
 */
function buildWALink(messageKey) {
  var msg = (CLINIC.whatsapp.messages[messageKey] !== undefined)
    ? CLINIC.whatsapp.messages[messageKey]
    : CLINIC.whatsapp.messages['default'];

  return 'https://wa.me/' + CLINIC.whatsapp.number + '?text=' + encodeURIComponent(msg);
}
