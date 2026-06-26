/* ============================================================
   CLIFOR Olinda — js/data/doctors.js
   Lista completa de profissionais + categorias de abas.

   Para adicionar/remover um médico, basta incluir ou excluir
   um objeto neste array — nenhum outro arquivo precisa mudar.

   Campos:
     name     : nome completo
     role     : título/profissão
     sub      : subespecialidade (null se não houver)
     reg      : número de registro (CRM, etc.)
     category : 'ortopedistas'
     group    : subespecialidade (Coluna, Joelho, etc.)
     photo    : nome do arquivo dentro de assets/img/equipe/ (null se não houver)
   ============================================================ */
'use strict';

/* ---------- Categorias de abas ----------
   A ordem aqui é a ordem de exibição no site.
   grouped:true agrupa os cards por subespecialidade. */
CLIFOR.teamCategories = [
  { key: 'ortopedistas', label: 'Ortopedistas', grouped: true },
];

/* ---------- Profissionais ---------- */
CLIFOR.doctors = [

  /* ========== ORTOPEDISTAS — Coluna ========== */
  {
    name: 'Antônio Reinaldo',
    role: 'Médico Ortopedista', sub: 'Coluna', reg: 'CRM 22150',
    category: 'ortopedistas', group: 'Coluna',
    photo: 'foto-antonio-reinaldo.png',
  },
  {
    name: 'Lucas Sales',
    role: 'Médico Ortopedista', sub: 'Coluna', reg: 'CRM 23337',
    category: 'ortopedistas', group: 'Coluna',
    photo: 'foto-lucas-sales.png',
  },
  {
    name: 'Márcio Crisanto',
    role: 'Médico Ortopedista', sub: 'Coluna', reg: 'CRM 12253',
    category: 'ortopedistas', group: 'Coluna',
    photo: 'foto-marcio-crisanto.png',
  },

  /* ========== ORTOPEDISTAS — Joelho ========== */
  {
    name: 'Augusto Neto',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 10619',
    category: 'ortopedistas', group: 'Joelho',
    photo: null,
  },
  {
    name: 'Thiago Cintra',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 18418',
    category: 'ortopedistas', group: 'Joelho',
    photo: null,
  },
  {
    name: 'Fábio Guimarães',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 11244',
    category: 'ortopedistas', group: 'Joelho',
    photo: 'foto-fabio-guimaraes.png',
  },
  {
    name: 'Bruno Torban',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 26817',
    category: 'ortopedistas', group: 'Joelho',
    photo: null,
  },
  {
    name: 'Leonardo Monteiro',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 16119',
    category: 'ortopedistas', group: 'Joelho',
    photo: 'foto-leonardo-monteiro.png',
  },
  {
    name: 'Mario Alves',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 17178',
    category: 'ortopedistas', group: 'Joelho',
    photo: null,
  },

  /* ========== ORTOPEDISTAS — Ombro e Cotovelo ========== */
  {
    name: 'Felipe Fragoso',
    role: 'Médico Ortopedista', sub: 'Ombro', reg: 'CRM 26180',
    category: 'ortopedistas', group: 'Ombro e Cotovelo',
    photo: null,
  },
  {
    name: 'Ricardo Barreto',
    role: 'Médico Ortopedista', sub: 'Ombro e Cotovelo', reg: 'CRM 16306',
    category: 'ortopedistas', group: 'Ombro e Cotovelo',
    photo: null,
  },
  {
    name: 'Fábio Neumann',
    role: 'Médico Ortopedista', sub: 'Ombro', reg: 'CRM 14368',
    category: 'ortopedistas', group: 'Ombro e Cotovelo',
    photo: 'foto-fabio-neumann.png',
  },

  /* ========== ORTOPEDISTAS — Pé e Tornozelo ========== */
  {
    name: 'Sandrelli Araújo',
    role: 'Médico Ortopedista', sub: 'Pé e Tornozelo', reg: 'CRM 11057',
    category: 'ortopedistas', group: 'Pé e Tornozelo',
    photo: 'foto-sandrelli-araujo.png',
  },
  {
    name: 'Marilia Lima',
    role: 'Médica Ortopedista', sub: 'Pé e Tornozelo', reg: 'CRM 23640',
    category: 'ortopedistas', group: 'Pé e Tornozelo',
    photo: 'foto-marilia-lima.png',
  },
  {
    name: 'Fernandes Arteiro',
    role: 'Médico Ortopedista', sub: 'Pé e Tornozelo', reg: 'CRM 11072',
    category: 'ortopedistas', group: 'Pé e Tornozelo',
    photo: 'foto-fernandes-arteiro.png',
  },
  {
    name: 'Clarissa Monteiro',
    role: 'Médica Ortopedista', sub: 'Pé e Tornozelo', reg: 'CRM 36585',
    category: 'ortopedistas', group: 'Pé e Tornozelo',
    photo: 'foto-clarissa-monteiro.png',
  },

  /* ========== ORTOPEDISTAS — Quadril ========== */
  {
    name: 'Alessandro Nunes',
    role: 'Médico Ortopedista', sub: 'Quadril', reg: 'CRM 17435',
    category: 'ortopedistas', group: 'Quadril',
    photo: 'foto-alessandro-nunes.png',
  },

  /* ========== ORTOPEDISTAS — Mão ========== */
  {
    name: 'André Pires',
    role: 'Médico Ortopedista', sub: 'Mão', reg: 'CRM 22725',
    category: 'ortopedistas', group: 'Mão',
    photo: 'foto-andre-pires.png',
  },
];
