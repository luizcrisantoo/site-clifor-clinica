/* ============================================================
   CLIFOR Olinda — js/components/whatsapp.js
   Gerador centralizado de links do WhatsApp.

   DEPENDE DE: clinic.js (CLIFOR.clinic deve estar definido)

   Uso:
     CLIFOR.buildWALink('default')   -> link para agendamento padrao
     CLIFOR.buildWALink('convenios') -> link com contexto de convenios
     CLIFOR.buildWALink('chatbot')   -> link quando chatbot nao entende
   ============================================================ */
'use strict';

/**
 * Gera o link completo do WhatsApp com mensagem pre-preenchida.
 * @param {string} messageKey - chave em CLIFOR.clinic.whatsapp.messages
 * @returns {string} URL wa.me completa
 */
CLIFOR.buildWALink = function buildWALink(messageKey) {
  const wa = CLIFOR.clinic.whatsapp;
  const msg = (wa.messages[messageKey] !== undefined)
    ? wa.messages[messageKey]
    : wa.messages['default'];

  return 'https://wa.me/' + wa.number + '?text=' + encodeURIComponent(msg);
};
