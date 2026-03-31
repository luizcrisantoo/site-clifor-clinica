/* ============================================================
   CLIFOR Olinda — js/data/clinic.js
   FONTE UNICA para todos os dados da clinica.
   Para alterar telefone, endereco ou horarios, edite APENAS aqui.
   ============================================================ */
'use strict';

CLIFOR.clinic = {

  /* ---- Identificacao ---- */
  name:     'CLIFOR Olinda',
  fullName: 'Clinica de Ortopedia e Fisioterapia',
  crm:      'CRM 0927-PE',
  siteUrl:  'https://cliforolinda.com.br',

  /* ---- Contato ---- */
  phone: {
    label: '(81) 3429-6165',
    href:  'tel:+558134296165',
  },

  /* ---- WhatsApp ----
     Edite o numero e as mensagens de contexto aqui.
     O buildWALink() em components/whatsapp.js usa esses valores. */
  whatsapp: {
    number: '5581982379160',
    label:  '(81) 98237-9160',
    href:   'tel:+5581982379160',
    messages: {
      default:   'Ola! Gostaria de agendar uma consulta na CLIFOR Olinda.',
      convenios: 'Ola! Gostaria de saber sobre convenios aceitos na CLIFOR.',
      chatbot:   'Ola, vim pelo site da clinica e tenho uma duvida que o assistente nao conseguiu responder.',
    },
  },

  /* ---- Endereco ---- */
  address: {
    street:   'Praca Doze de Marco, 36',
    district: 'Bairro Novo',
    city:     'Olinda',
    state:    'PE',
    cep:      '53030-110',
    full:     'Praca Doze de Marco, 36, Bairro Novo, Olinda - PE, 53030-110',
  },

  /* ---- Horarios ---- */
  hours: [
    { day: 'Seg \u2014 Sex', time: '07:00 \u2013 22:00', closed: false },
    { day: 'S\u00e1bado',    time: '07:00 \u2013 12:00', closed: false },
    { day: 'Domingo',        time: 'Fechado',             closed: true  },
  ],

  /* ---- Redes sociais ---- */
  instagram: {
    handle: 'clifor.olinda',
    url:    'https://instagram.com/clifor.olinda',
  },

  /* ---- Estatisticas exibidas no Hero ---- */
  stats: [
    { value: '7+', label: 'Especialidades' },
    { value: '25', label: 'Profissionais'  },
    { value: '14', label: 'Convenios' },
  ],

};
