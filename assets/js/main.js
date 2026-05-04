/* ============================================================
   CLIFOR Olinda — js/main.js
   Orquestrador principal: renderizacao + event delegation.

   DEPENDE DE (carregados antes no HTML, nesta ordem):
     js/config.js            (namespace CLIFOR)
     js/data/clinic.js
     js/data/doctors.js
     js/data/agreements.js
     js/data/chatbot-flows.js
     js/components/whatsapp.js
     js/components/chatbot.js

   Responsabilidades:
     - Preencher dinamicamente links do WhatsApp
     - Renderizar estatisticas do hero
     - Renderizar tabs e cards da equipe
     - Renderizar lista de convenios
     - Renderizar rodape (horarios a partir de clinic.js)
     - Gerar Schema.org dinamicamente
     - Gerenciar eventos da pagina (sem onclick no HTML)
     - Gerenciar a UI do chatbot
   ============================================================ */
'use strict';

/* ============================================================
   0. ALIASES LOCAIS — leitura limpa, sem poluir window
   ============================================================ */
const CLINIC          = CLIFOR.clinic;
const DOCTORS         = CLIFOR.doctors;
const AGREEMENTS      = CLIFOR.agreements;
const TEAM_CATEGORIES = CLIFOR.teamCategories;
const CHATBOT_FLOWS   = CLIFOR.chatbotFlows;
const buildWALink     = CLIFOR.buildWALink;
const resolveResponse = CLIFOR.resolveResponse;

/* ============================================================
   0.1 UTILITARIO — escapeHtml
   Previne XSS ao inserir dados via innerHTML.
   ============================================================ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================================
   1. RENDERIZACAO — WhatsApp links
   Todos os elementos com data-wa-key recebem o href correto,
   gerado por buildWALink() em components/whatsapp.js.
   ============================================================ */
function renderWALinks() {
  document.querySelectorAll('[data-wa-key]').forEach(function (el) {
    el.href = buildWALink(el.dataset.waKey);
  });
}

/* ============================================================
   2. RENDERIZACAO — Estatisticas do Hero
   ============================================================ */
function renderStats() {
  const container = document.getElementById('hero-stats');
  if (!container) return;

  container.innerHTML = CLINIC.stats.map(function (s) {
    return `<div class="stat"><strong>${escapeHtml(s.value)}</strong><span>${escapeHtml(s.label)}</span></div>`;
  }).join('');
}

/* ============================================================
   3. RENDERIZACAO — Equipe (tabs + cards)
   ============================================================ */

/**
 * Gera o HTML de um card de profissional.
 * @param {Object} doc - objeto do array DOCTORS
 * @returns {string}
 */
function renderDoctorCard(doc) {
  /* Iniciais: primeiras letras das duas primeiras palavras do nome */
  const initials = doc.name
    .split(' ')
    .slice(0, 2)
    .map(function (n) { return n.charAt(0); })
    .join('');

  const subHtml = doc.sub
    ? `<div class="sub">${escapeHtml(doc.sub)}</div>`
    : '';

  /* Foto: sem onerror inline — evento registrado apos renderizacao */
  const photoHtml = doc.photo
    ? `<img src="assets/img/${escapeHtml(doc.photo)}" alt="${escapeHtml(doc.name)}, ${escapeHtml(doc.role)}" loading="lazy" data-fallback>` +
      `<div class="t-avatar" style="display:none">${escapeHtml(initials)}</div>`
    : `<div class="t-avatar">${escapeHtml(initials)}</div>`;

  return [
    '<div class="t-card">',
    '  <div class="t-photo">',
    `    ${photoHtml}`,
    '  </div>',
    '  <div class="t-info">',
    `    <h3>${escapeHtml(doc.name)}</h3>`,
    `    <div class="role">${escapeHtml(doc.role)}</div>`,
    subHtml,
    `    <div class="reg">${escapeHtml(doc.reg)}</div>`,
    '  </div>',
    '</div>',
  ].join('\n');
}

/**
 * Gera o HTML de um painel de aba, agrupando por subespecialidade
 * quando grouped:true (ortopedistas).
 */
function renderPanel(cat) {
  const docs = DOCTORS.filter(function (d) { return d.category === cat.key; });

  if (!cat.grouped) {
    return `<div class="team-grid">${docs.map(renderDoctorCard).join('')}</div>`;
  }

  /* Para ortopedistas: agrupa por campo "group", mantendo a ordem de insercao */
  const seen   = new Set();
  const groups = [];
  docs.forEach(function (d) {
    if (d.group && !seen.has(d.group)) {
      seen.add(d.group);
      groups.push(d.group);
    }
  });

  return groups.map(function (groupName) {
    const groupDocs = docs.filter(function (d) { return d.group === groupName; });
    return [
      '<div class="team-group">',
      `  <div class="team-group-title">${escapeHtml(groupName)}</div>`,
      `  <div class="team-grid">${groupDocs.map(renderDoctorCard).join('')}</div>`,
      '</div>',
    ].join('\n');
  }).join('\n');
}

/**
 * Registra fallback de imagem via addEventListener (compativel com CSP).
 * Substitui o antigo onerror inline.
 */
function setupImageFallbacks() {
  document.querySelectorAll('.t-photo img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      const avatar = img.nextElementSibling;
      if (avatar) avatar.style.display = 'flex';
    });
  });
}

function renderTeam() {
  const tabsContainer   = document.getElementById('team-tabs');
  const panelsContainer = document.getElementById('team-panels');
  if (!tabsContainer || !panelsContainer) return;

  /* Tabs */
  tabsContainer.innerHTML = TEAM_CATEGORIES.map(function (cat, i) {
    const count    = DOCTORS.filter(function (d) { return d.category === cat.key; }).length;
    const isActive = (i === 0) ? ' active' : '';
    return [
      `<button class="team-tab${isActive}" data-tab="${escapeHtml(cat.key)}"`,
      `  role="tab" aria-selected="${i === 0 ? 'true' : 'false'}"`,
      `  aria-controls="panel-${escapeHtml(cat.key)}">`,
      `${escapeHtml(cat.label)} <span class="badge">${count}</span>`,
      '</button>',
    ].join(' ');
  }).join('');

  /* Paineis */
  panelsContainer.innerHTML = TEAM_CATEGORIES.map(function (cat, i) {
    const isActive = (i === 0) ? ' active' : '';
    return [
      `<div class="team-panel${isActive}" id="panel-${escapeHtml(cat.key)}"`,
      '     role="tabpanel">',
      renderPanel(cat),
      '</div>',
    ].join('\n');
  }).join('\n');

  /* Registra fallbacks de imagem apos inserir no DOM */
  setupImageFallbacks();
}

function switchTab(tabKey) {
  document.querySelectorAll('.team-tab').forEach(function (t) {
    const isThis = (t.dataset.tab === tabKey);
    t.classList.toggle('active', isThis);
    t.setAttribute('aria-selected', isThis ? 'true' : 'false');
  });
  document.querySelectorAll('.team-panel').forEach(function (p) {
    p.classList.toggle('active', p.id === 'panel-' + tabKey);
  });
}

/* ============================================================
   4. RENDERIZACAO — Convenios
   ============================================================ */
function renderAgreements() {
  const container = document.getElementById('agreements-list');
  if (!container) return;

  container.innerHTML = AGREEMENTS.map(function (a) {
    return `<span class="plan-tag">${escapeHtml(a)}</span>`;
  }).join('');
}

/* ============================================================
   5. RENDERIZACAO — Rodape (horarios a partir de clinic.js)
   Elimina duplicacao: os horarios sao mantidos apenas em
   clinic.js e renderizados aqui, igual as demais secoes.
   ============================================================ */
function renderFooter() {
  const hoursContainer = document.getElementById('footer-hours');
  if (!hoursContainer) return;

  hoursContainer.innerHTML = CLINIC.hours.map(function (h) {
    const style = h.closed ? ' style="color:#ef5350"' : '';
    return `<span${style}>${escapeHtml(h.day)}: ${escapeHtml(h.time)}</span>`;
  }).join('<br>');
}

/* ============================================================
   5.1 RENDERIZACAO — Schema.org (gerado a partir de clinic.js)
   Elimina duplicacao: o JSON-LD e montado a partir de CLINIC,
   evitando dados hardcoded no HTML.
   ============================================================ */
function injectSchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    'name': CLINIC.name,
    'description': CLINIC.fullName + ' em ' + CLINIC.address.city + '-' + CLINIC.address.state,
    'telephone': CLINIC.phone.href.replace('tel:', ''),
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': CLINIC.address.street,
      'addressLocality': CLINIC.address.city,
      'addressRegion': CLINIC.address.state,
      'postalCode': CLINIC.address.cep,
      'addressCountry': 'BR',
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '07:00', 'closes': '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '07:00', 'closes': '12:00',
      },
    ],
    'sameAs': [CLINIC.instagram.url],
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/* ============================================================
   6. UI DO CHATBOT
   ============================================================ */

/**
 * Adiciona uma mensagem a janela do chat.
 * @param {string}  text    - texto da mensagem
 * @param {boolean} isUser  - true = bolha do usuario
 * @param {boolean} hasLink - true = exibir botao "Falar no WhatsApp"
 */
function addMessage(text, isUser, hasLink) {
  const box    = document.getElementById('cp-msgs');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'cp-msg ' + (isUser ? 'user' : 'bot');

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerText = text; /* innerText evita XSS */

  /* Fallback -> botao de WhatsApp clicavel dentro da bolha */
  if (!isUser && hasLink) {
    const br  = document.createElement('br');
    const br2 = document.createElement('br');
    const btn = document.createElement('a');
    btn.href        = buildWALink('chatbot');
    btn.target      = '_blank';
    btn.rel         = 'noopener';
    btn.className   = 'chat-wa-link';
    btn.textContent = 'Falar no WhatsApp';
    bubble.appendChild(br);
    bubble.appendChild(br2);
    bubble.appendChild(btn);
  }

  msgDiv.appendChild(bubble);
  box.appendChild(msgDiv);
  box.scrollTop = box.scrollHeight;
}

/** Processa o clique em um botao de atalho (quick reply). */
function handleQuickReply(btn) {
  const key  = btn.dataset.quickReply;
  const flow = CHATBOT_FLOWS.find(function (f) { return f.id === key; });
  if (!flow) return;

  addMessage(btn.textContent.trim(), true, false);

  /* Desabilita todos os atalhos para evitar cliques duplicados */
  btn.closest('.cp-quick').querySelectorAll('.qr-btn').forEach(function (b) {
    b.disabled = true;
  });

  const response = (typeof flow.response === 'function') ? flow.response() : flow.response;
  setTimeout(function () { addMessage(response, false, false); }, 400);
}

/** Processa o envio de mensagem livre. */
function sendChatMessage() {
  const inp = document.getElementById('cp-inp');
  const txt = inp.value.trim();
  if (!txt) return;

  addMessage(txt, true, false);
  inp.value = '';

  const result = resolveResponse(txt);
  setTimeout(function () { addMessage(result.text, false, result.hasLink); }, 400);
}

/* ============================================================
   7. EVENT DELEGATION
   Todos os eventos interativos da pagina estao aqui.
   O HTML NAO usa atributos onclick.
   ============================================================ */
function setupEventDelegation() {
  document.addEventListener('click', function (e) {

    /* -- Menu mobile -- */
    if (e.target.closest('[data-action="toggle-nav"]')) {
      document.getElementById('header').classList.toggle('nav-open');
      return;
    }

    /* -- Fechar menu ao clicar em link de nav (mobile) -- */
    if (e.target.closest('nav a[href^="#"]')) {
      document.getElementById('header').classList.remove('nav-open');
    }

    /* -- Abrir/fechar chatbot -- */
    if (e.target.closest('[data-action="toggle-chat"]')) {
      document.getElementById('chat-popup').classList.toggle('open');
      return;
    }
    if (e.target.closest('[data-action="close-chat"]')) {
      document.getElementById('chat-popup').classList.remove('open');
      return;
    }

    /* -- Enviar mensagem no chat -- */
    if (e.target.closest('[data-action="send-chat"]')) {
      sendChatMessage();
      return;
    }

    /* -- Atalhos do chatbot (quick reply) -- */
    const qrBtn = e.target.closest('[data-quick-reply]');
    if (qrBtn) {
      handleQuickReply(qrBtn);
      return;
    }

    /* -- Trocar aba da equipe -- */
    const tabBtn = e.target.closest('[data-tab]');
    if (tabBtn && tabBtn.closest('#team-tabs')) {
      switchTab(tabBtn.dataset.tab);
      return;
    }

  });

  /* Enter para enviar no chat */
  const chatInput = document.getElementById('cp-inp');
  if (chatInput) {
    chatInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  /* Smooth scroll em links internos */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   8. INICIALIZACAO
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  renderWALinks();
  renderStats();
  renderTeam();
  renderAgreements();
  renderFooter();
  injectSchemaOrg();
  setupEventDelegation();
});
