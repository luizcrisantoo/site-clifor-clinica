/* ============================================================
   CLIFOR Olinda — js/data/chatbot-flows.js
   Define os fluxos do chatbot: palavras-chave e respostas.

   DEPENDE DE: config.js, clinic.js e agreements.js (carregados antes)

   Para editar uma resposta do chatbot, altere apenas o campo
   "response" do fluxo correspondente.
   Para adicionar um novo tópico, acrescente um objeto ao array.
   ============================================================ */
'use strict';

CLIFOR.chatbotFlows = [

  {
    id:       'equipe',
    label:    'Nossa equipe',
    keywords: ['médic', 'doutor', 'doctor', 'equipe', 'profissional', 'especialista'],
    response: 'Nossa equipe conta com 25 profissionais: médicos ortopedistas (coluna, joelho, pé, quadril, mão, ombro e acupuntura), fisioterapeutas, nutricionistas, psicóloga e radiologista. Veja a aba "Equipe" para conhecer cada um.',
  },

  {
    id:       'horarios',
    label:    'Horários',
    keywords: ['horário', 'hora', 'funciona', 'aberto', 'atende', 'funcionamento', 'domingo'],
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
    response: 'Para agendar, clique no botão de WhatsApp na tela. Nossa equipe responde rápido e marca o melhor horário!',
  },

  {
    id:       'convenios',
    label:    'Convênios',
    keywords: ['plano', 'convênio', 'convenio', 'seguro', 'unimed', 'bradesco', 'aceita', 'particular'],
    response: function () {
      return 'Aceitamos os seguintes convênios:\n\n' + CLIFOR.agreements.join(' · ') + '\n\nTambém atendemos particular.';
    },
  },

];

/* ---- Resposta de fallback (quando nenhum fluxo bate) ----
   O campo hasLink:true instrui o chatbot a exibir um botão
   "Falar no WhatsApp" logo abaixo do texto. */
CLIFOR.chatbotFallback = {
  text:    'Não consegui identificar sua dúvida com segurança. Para um atendimento mais rápido, fale diretamente com nossa equipe:',
  hasLink: true,
};
