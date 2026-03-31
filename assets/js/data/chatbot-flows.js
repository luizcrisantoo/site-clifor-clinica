/* ============================================================
   CLIFOR Olinda — js/data/chatbot-flows.js
   Define os fluxos do chatbot: palavras-chave e respostas.

   DEPENDE DE: config.js, clinic.js e agreements.js (carregados antes)

   Para editar uma resposta do chatbot, altere apenas o campo
   "response" do fluxo correspondente.
   Para adicionar um novo topico, acrescente um objeto ao array.
   ============================================================ */
'use strict';

CLIFOR.chatbotFlows = [

  {
    id:       'equipe',
    label:    'Nossa equipe',
    keywords: ['m\u00e9dic', 'doutor', 'doctor', 'equipe', 'profissional', 'especialista'],
    response: 'Nossa equipe conta com 25 profissionais: m\u00e9dicos ortopedistas (coluna, joelho, p\u00e9, quadril, m\u00e3o, ombro e acupuntura), fisioterapeutas, nutricionistas, psic\u00f3loga e radiologista. Veja a aba "Equipe" para conhecer cada um.',
  },

  {
    id:       'horarios',
    label:    'Hor\u00e1rios',
    keywords: ['hor\u00e1rio', 'hora', 'funciona', 'aberto', 'atende', 'funcionamento', 'domingo'],
    response: function () {
      const clinic = CLIFOR.clinic;
      const lines = clinic.hours.map(function (h) {
        return h.day + ': ' + h.time;
      });
      return lines.join('\n') + '\n\nTelefone: ' + clinic.phone.label;
    },
  },

  {
    id:       'agendar',
    label:    'Como agendar?',
    keywords: ['agendar', 'consulta', 'marcar', 'appointment', 'agendamento', 'agenda'],
    response: 'Para agendar, clique no bot\u00e3o de WhatsApp na tela. Nossa equipe responde r\u00e1pido e marca o melhor hor\u00e1rio!',
  },

  {
    id:       'convenios',
    label:    'Conv\u00eanios',
    keywords: ['plano', 'conv\u00eanio', 'convenio', 'seguro', 'unimed', 'bradesco', 'aceita', 'particular'],
    response: function () {
      return 'Aceitamos os seguintes conv\u00eanios:\n\n' + CLIFOR.agreements.join(' \u00b7 ') + '\n\nTamb\u00e9m atendemos particular.';
    },
  },

];

/* ---- Resposta de fallback (quando nenhum fluxo bate) ----
   O campo hasLink:true instrui o chatbot a exibir um botao
   "Falar no WhatsApp" logo abaixo do texto. */
CLIFOR.chatbotFallback = {
  text:    'N\u00e3o consegui identificar sua d\u00favida com seguran\u00e7a. Para um atendimento mais r\u00e1pido, fale diretamente com nossa equipe:',
  hasLink: true,
};
