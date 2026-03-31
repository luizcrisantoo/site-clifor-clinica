/* ============================================================
   CLIFOR Olinda — js/data/doctors.js
   Lista completa de profissionais + categorias de abas.

   Para adicionar/remover um medico, basta incluir ou excluir
   um objeto neste array — nenhum outro arquivo precisa mudar.

   Campos:
     name     : nome completo
     role     : titulo/profissao
     sub      : subespecialidade (null se nao houver)
     reg      : numero de registro (CRM, CREFITO, etc.)
     category : 'ortopedistas' | 'fisioterapeutas' | 'outros'
     group    : grupo dentro da aba (so ortopedistas; null para os demais)
     photo    : nome do arquivo dentro de assets/img/ (null se nao houver)
   ============================================================ */
'use strict';

/* ---------- Categorias de abas ----------
   A ordem aqui e a ordem de exibicao no site.
   grouped:true agrupa os cards por subespecialidade. */
CLIFOR.teamCategories = [
  { key: 'ortopedistas',    label: 'Ortopedistas',          grouped: true  },
  { key: 'fisioterapeutas', label: 'Fisioterapeutas',       grouped: false },
  { key: 'outros',          label: 'Outras Especialidades', grouped: false },
];

/* ---------- Profissionais ---------- */
CLIFOR.doctors = [

  /* ========== ORTOPEDISTAS — Coluna ========== */
  {
    name: 'Lucas Sales',
    role: 'M\u00e9dico Ortopedista', sub: 'Coluna', reg: 'CRM 23337',
    category: 'ortopedistas', group: 'Coluna',
    photo: 'foto-lucas-sales.png',
  },
  {
    name: 'Ant\u00f4nio Reinaldo',
    role: 'M\u00e9dico Ortopedista', sub: 'Coluna', reg: 'CRM 22150',
    category: 'ortopedistas', group: 'Coluna',
    photo: 'foto-antonio-reinaldo.png',
  },
  {
    name: 'M\u00e1rcio Crisanto',
    role: 'M\u00e9dico Ortopedista', sub: 'Especialista em Coluna', reg: 'CRM 12253',
    category: 'ortopedistas', group: 'Coluna',
    photo: 'foto-marcio-crisanto.png',
  },

  /* ========== ORTOPEDISTAS — Joelho ========== */
  {
    name: 'F\u00e1bio Guimar\u00e3es',
    role: 'M\u00e9dico Ortopedista', sub: 'Joelho', reg: 'CRM 11244',
    category: 'ortopedistas', group: 'Joelho',
    photo: 'foto-fabio-guimaraes.png',
  },
  {
    name: 'Leonardo Monteiro',
    role: 'M\u00e9dico Ortopedista', sub: 'Joelho', reg: 'CRM 16119',
    category: 'ortopedistas', group: 'Joelho',
    photo: 'foto-leonardo-monteiro.png',
  },
  {
    name: 'Diego Pires',
    role: 'M\u00e9dico Ortopedista', sub: 'Joelho', reg: 'CRM 19864',
    category: 'ortopedistas', group: 'Joelho',
    photo: 'foto-diego-pires.png',
  },
  {
    name: 'Augusto Neto',
    role: 'M\u00e9dico Ortopedista', sub: 'Joelho', reg: 'CRM 10619',
    category: 'ortopedistas', group: 'Joelho',
    photo: null,
  },
  {
    name: 'Mario Alves',
    role: 'M\u00e9dico Ortopedista', sub: 'Joelho', reg: 'CRM 17178',
    category: 'ortopedistas', group: 'Joelho',
    photo: null,
  },

  /* ========== ORTOPEDISTAS — Pe e Tornozelo ========== */
  {
    name: 'Fernandes Arteiro',
    role: 'M\u00e9dico Ortopedista', sub: 'P\u00e9 e Tornozelo', reg: 'CRM 11072',
    category: 'ortopedistas', group: 'P\u00e9 e Tornozelo',
    photo: 'foto-fernandes-arteiro.png',
  },
  {
    name: 'Gabriel Monteiro',
    role: 'M\u00e9dico Ortopedista', sub: 'P\u00e9 e Tornozelo', reg: 'CRM 18412',
    category: 'ortopedistas', group: 'P\u00e9 e Tornozelo',
    photo: 'foto-gabriel-monteiro.png',
  },
  {
    name: 'Sandrelli Ara\u00fajo',
    role: 'M\u00e9dico Ortopedista', sub: 'P\u00e9', reg: 'CRM 11057',
    category: 'ortopedistas', group: 'P\u00e9 e Tornozelo',
    photo: 'foto-sandrelli-araujo.png',
  },
  {
    name: 'Marilia Lima',
    role: 'M\u00e9dica Ortopedista', sub: 'P\u00e9 e Tornozelo', reg: 'CRM 23640',
    category: 'ortopedistas', group: 'P\u00e9 e Tornozelo',
    photo: 'foto-marilia-lima.png',
  },
  {
    name: 'Clarissa Monteiro',
    role: 'M\u00e9dica Ortopedista', sub: 'Cirurgia do P\u00e9 e Tornozelo', reg: 'CRM 36585',
    category: 'ortopedistas', group: 'P\u00e9 e Tornozelo',
    photo: 'foto-clarissa-monteiro.png',
  },

  /* ========== ORTOPEDISTAS — Quadril ========== */
  {
    name: 'Alessandro Nunes',
    role: 'M\u00e9dico Ortopedista', sub: 'Quadril', reg: 'CRM 17435',
    category: 'ortopedistas', group: 'Quadril',
    photo: 'foto-alessandro-nunes.png',
  },

  /* ========== ORTOPEDISTAS — Mao ========== */
  {
    name: 'Andr\u00e9 Pires',
    role: 'M\u00e9dico Ortopedista', sub: 'M\u00e3o', reg: 'CRM 22725',
    category: 'ortopedistas', group: 'M\u00e3o',
    photo: 'foto-andre-pires.png',
  },

  /* ========== ORTOPEDISTAS — Ombro e Cotovelo ========== */
  {
    name: 'F\u00e1bio Neumann',
    role: 'M\u00e9dico Ortopedista', sub: 'Ombro e Cotovelo', reg: 'CRM 14368',
    category: 'ortopedistas', group: 'Ombro e Cotovelo',
    photo: 'foto-fabio-neumann.png',
  },
  {
    name: 'Ricardo Barreto',
    role: 'M\u00e9dico Ortopedista', sub: 'Ombro e Cotovelo', reg: 'CRM 16306',
    category: 'ortopedistas', group: 'Ombro e Cotovelo',
    photo: null,
  },

  /* ========== ORTOPEDISTAS — Acupuntura ========== */
  {
    name: 'Luiz Eduardo',
    role: 'M\u00e9dico Ortopedista', sub: 'Acupuntura', reg: 'CRM 22434',
    category: 'ortopedistas', group: 'Acupuntura',
    photo: null,
  },

  /* ========== FISIOTERAPEUTAS ========== */
  {
    name: 'Hebert Botelho',
    role: 'Fisioterapeuta', sub: null, reg: 'CREFITO 267801-F',
    category: 'fisioterapeutas', group: null,
    photo: 'foto-herbet-botelho.png',
  },
  {
    name: 'Jamerson Alves',
    role: 'Fisioterapeuta', sub: null, reg: 'CREFITO 216874-F',
    category: 'fisioterapeutas', group: null,
    photo: null,
  },
  {
    name: 'Maria Catarina',
    role: 'Fisioterapeuta', sub: null, reg: 'CREFITO 282777-F',
    category: 'fisioterapeutas', group: null,
    photo: null,
  },

  /* ========== OUTRAS ESPECIALIDADES ========== */
  {
    name: 'Adjane Leite',
    role: 'Psic\u00f3loga', sub: null, reg: 'CRP 218702',
    category: 'outros', group: null,
    photo: 'foto-adjane-leite.png',
  },
  {
    name: 'Eutimia Alves',
    role: 'Nutricionista', sub: null, reg: 'CRN 84',
    category: 'outros', group: null,
    photo: null,
  },
  {
    name: 'Fernanda Maria',
    role: 'Nutricionista', sub: null, reg: 'CRN 3448',
    category: 'outros', group: null,
    photo: null,
  },
  {
    name: 'M\u00e1rcio Henrick',
    role: 'Radiologista', sub: null, reg: 'CRTR/PE 01563',
    category: 'outros', group: null,
    photo: 'foto-marcio-henrick.png',
  },
];
