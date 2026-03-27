/* ============================================================
   CLIFOR Olinda — js/data/chatbot-flows.js
   Define os fluxos do chatbot: palavras-chave e respostas.

   DEPENDE DE: clinic.js e agreements.js (carregados antes no HTML)

   Para editar uma resposta do chatbot, altere apenas o campo
   "response" do fluxo correspondente.
   Para adicionar um novo tópico, acrescente um objeto ao array.
   ============================================================ */

const CHATBOT_FLOWS = [

  {
    id:       'equipe',
    label:    'Nossa equipe',        /* texto exibido no botão de atalho */
    keywords: ['médic', 'doutor', 'doctor', 'equipe', 'profissional', 'especialista'],
    response: 'Nossa equipe conta com 25 profissionais: médicos ortopedistas (coluna, joelho, pé, quadril, mão, ombro e acupuntura), fisioterapeutas, nutricionistas, psicóloga e radiologista. Veja a aba "Equipe" para conhecer cada um.',
  },

  {
    id:       'horarios',
    label:    'Horários',
    keywords: ['horário', 'hora', 'funciona', 'aberto', 'atende', 'funcionamento', 'domingo'],
    /* response como função para ler os dados de clinic.js em tempo de execução */
    response: function () {
      var lines = CLINIC.hours.map(function (h) {
        return h.day + ': ' + h.time;
      });
      return lines.join('\n') + '\n\nTelefone: ' + CLINIC.phone.label;
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
    /* response como função para ler AGREEMENTS em tempo de execução */
    response: function () {
      return 'Aceitamos os seguintes convênios:\n\n' + AGREEMENTS.join(' · ') + '\n\nTambém atendemos particular.';
    },
  },

];

/* ---- Resposta de fallback (quando nenhum fluxo bate) ----
   O campo hasLink:true instrui o chatbot a exibir um botão
   "Falar no WhatsApp" logo abaixo do texto. */
const CHATBOT_FALLBACK = {
  text:    'Não consegui identificar sua dúvida com segurança. Para um atendimento mais rápido, fale diretamente com nossa equipe:',
  hasLink: true,
};
