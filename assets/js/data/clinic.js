/* ============================================================
   CLIFOR Olinda — js/data/clinic.js
   FONTE ÚNICA para todos os dados da clínica.
   Para alterar telefone, endereço ou horários, edite APENAS aqui.
   ============================================================ */
'use strict';

CLIFOR.clinic = {

  /* ---- Identificação ---- */
  name:     'CLIFOR Olinda',
  fullName: 'Clínica de Ortopedia e Fisioterapia',
  crm:      'CRM 0927-PE',
  siteUrl:  'https://cliforolinda.com.br',

  /* ---- Contato ---- */
  phone: {
    label: '(81) 3429-6165',
    href:  'tel:+558134296165',
  },

  /* ---- WhatsApp ----
     Edite o número e as mensagens de contexto aqui.
     O buildWALink() em components/whatsapp.js usa esses valores. */
  whatsapp: {
    number: '5581982379160',
    label:  '(81) 98237-9160',
    href:   'tel:+5581982379160',
    messages: {
      default:   'Olá! Gostaria de agendar uma consulta na CLIFOR Olinda.',
      convenios: 'Olá! Gostaria de saber sobre convênios aceitos na CLIFOR.',
      chatbot:   'Olá, vim pelo site da clínica e tenho uma dúvida que o assistente não conseguiu responder.',
    },
  },

  /* ---- Endereço ---- */
  address: {
    street:   'Praça Doze de Março, 36',
    district: 'Bairro Novo',
    city:     'Olinda',
    state:    'PE',
    cep:      '53030-110',
    full:     'Praça Doze de Março, 36, Bairro Novo, Olinda - PE, 53030-110',
  },

  /* ---- Horários ---- */
  hours: [
    { day: 'Seg a Qui', time: '07:00 – 21:00', closed: false },
    { day: 'Sexta',     time: '07:00 – 20:00', closed: false },
    { day: 'Sábado',    time: 'Fechado',        closed: true  },
    { day: 'Domingo',   time: 'Fechado',        closed: true  },
  ],

  /* ---- Redes sociais ---- */
  instagram: {
    handle: 'clifor.olinda',
    url:    'https://instagram.com/clifor.olinda',
  },

  /* ---- Estatísticas exibidas no Hero ---- */
  stats: [
    { value: '7+', label: 'Especialidades' },
    { value: '24', label: 'Profissionais'  },
    { value: '14', label: 'Convênios'      },
  ],

};
