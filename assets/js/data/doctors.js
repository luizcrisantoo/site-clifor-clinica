/* ============================================================
   CLIFOR Olinda — js/data/doctors.js
   Lista completa de profissionais + categorias de abas.

   Para adicionar/remover um médico, basta incluir ou excluir
   um objeto neste array — nenhum outro arquivo precisa mudar.

   Campos:
     name     : nome completo
     role     : título/profissão
     sub      : subespecialidade (null se não houver)
     reg      : número de registro (CRM, CREFITO, etc.)
     category : 'ortopedistas' | 'fisioterapeutas' | 'outros'
     group    : grupo dentro da aba (só ortopedistas; null para os demais)
     photo    : nome do arquivo dentro de assets/img/ (null se não houver)
   ============================================================ */
'use strict';

/* ---------- Categorias de abas ----------
   A ordem aqui é a ordem de exibição no site.
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
    role: 'Médico Ortopedista', sub: 'Coluna', reg: 'CRM 23337',
    category: 'ortopedistas', group: 'Coluna',
    photo: 'foto-lucas-sales.png',
  },
  {
    name: 'Antônio Reinaldo',
    role: 'Médico Ortopedista', sub: 'Coluna', reg: 'CRM 22150',
    category: 'ortopedistas', group: 'Coluna',
    photo: 'foto-antonio-reinaldo.png',
  },
  {
    name: 'Márcio Crisanto',
    role: 'Médico Ortopedista', sub: 'Especialista em Coluna', reg: 'CRM 12253',
    category: 'ortopedistas', group: 'Coluna',
    photo: 'foto-marcio-crisanto.png',
  },

  /* ========== ORTOPEDISTAS — Joelho ========== */
  {
    name: 'Fábio Guimarães',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 11244',
    category: 'ortopedistas', group: 'Joelho',
    photo: 'foto-fabio-guimaraes.png',
  },
  {
    name: 'Leonardo Monteiro',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 16119',
    category: 'ortopedistas', group: 'Joelho',
    photo: 'foto-leonardo-monteiro.png',
  },
  {
    name: 'Diego Pires',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 19864',
    category: 'ortopedistas', group: 'Joelho',
    photo: 'foto-diego-pires.png',
  },
  {
    name: 'Augusto Neto',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 10619',
    category: 'ortopedistas', group: 'Joelho',
    photo: null,
  },
  {
    name: 'Mario Alves',
    role: 'Médico Ortopedista', sub: 'Joelho', reg: 'CRM 17178',
    category: 'ortopedistas', group: 'Joelho',
    photo: null,
  },

  /* ========== ORTOPEDISTAS — Pé e Tornozelo ========== */
  {
    name: 'Fernandes Arteiro',
    role: 'Médico Ortopedista', sub: 'Pé e Tornozelo', reg: 'CRM 11072',
    category: 'ortopedistas', group: 'Pé e Tornozelo',
    photo: 'foto-fernandes-arteiro.png',
  },
  {
    name: 'Gabriel Monteiro',
    role: 'Médico Ortopedista', sub: 'Pé e Tornozelo', reg: 'CRM 18412',
    category: 'ortopedistas', group: 'Pé e Tornozelo',
    photo: 'foto-gabriel-monteiro.png',
  },
  {
    name: 'Sandrelli Araújo',
    role: 'Médico Ortopedista', sub: 'Pé', reg: 'CRM 11057',
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
    name: 'Clarissa Monteiro',
    role: 'Médica Ortopedista', sub: 'Cirurgia do Pé e Tornozelo', reg: 'CRM 36585',
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

  /* ========== ORTOPEDISTAS — Ombro e Cotovelo ========== */
  {
    name: 'Fábio Neumann',
    role: 'Médico Ortopedista', sub: 'Ombro e Cotovelo', reg: 'CRM 14368',
    category: 'ortopedistas', group: 'Ombro e Cotovelo',
    photo: 'foto-fabio-neumann.png',
  },
  {
    name: 'Ricardo Barreto',
    role: 'Médico Ortopedista', sub: 'Ombro e Cotovelo', reg: 'CRM 16306',
    category: 'ortopedistas', group: 'Ombro e Cotovelo',
    photo: null,
  },

  /* ========== ORTOPEDISTAS — Acupuntura ========== */
  {
    name: 'Luiz Eduardo',
    role: 'Médico Ortopedista', sub: 'Acupuntura', reg: 'CRM 22434',
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
    role: 'Psicóloga', sub: null, reg: 'CRP 218702',
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
    name: 'Márcio Henrick',
    role: 'Radiologista', sub: null, reg: 'CRTR/PE 01563',
    category: 'outros', group: null,
    photo: 'foto-marcio-henrick.png',
  },
];
