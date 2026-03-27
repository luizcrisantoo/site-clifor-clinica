/* ============================================================
   CLIFOR Olinda — js/main.js
   Orquestrador principal: renderização + event delegation.

   DEPENDE DE (carregados antes no HTML, nesta ordem):
     js/data/clinic.js
     js/data/doctors.js
     js/data/agreements.js
     js/data/chatbot-flows.js
     js/lib/whatsapp.js
     js/lib/chatbot.js

   Responsabilidades:
     - Preencher dinamicamente links do WhatsApp
     - Renderizar estatísticas do hero
     - Renderizar tabs e cards da equipe
     - Renderizar lista de convênios
     - Gerenciar eventos da página (sem onclick no HTML)
     - Gerenciar a UI do chatbot
   ============================================================ */

/* ============================================================
   1. RENDERIZAÇÃO — WhatsApp links
   Todos os elementos com data-wa-key recebem o href correto,
   gerado por buildWALink() em lib/whatsapp.js.
   ============================================================ */
function renderWALinks() {
  document.querySelectorAll('[data-wa-key]').forEach(function (el) {
    el.href = buildWALink(el.dataset.waKey);
  });
}

/* ============================================================
   2. RENDERIZAÇÃO — Estatísticas do Hero
   ============================================================ */
function renderStats() {
  var container = document.getElementById('hero-stats');
  if (!container) return;

  container.innerHTML = CLINIC.stats.map(function (s) {
    return '<div class="stat"><strong>' + s.value + '</strong><span>' + s.label + '</span></div>';
  }).join('');
}

/* ============================================================
   3. RENDERIZAÇÃO — Equipe (tabs + cards)
   ============================================================ */

/* Definição das abas. A ordem aqui é a ordem de exibição. */
var TEAM_CATEGORIES = [
  { key: 'ortopedistas',    label: 'Ortopedistas',          grouped: true  },
  { key: 'fisioterapeutas', label: 'Fisioterapeutas',       grouped: false },
  { key: 'outros',          label: 'Outras Especialidades', grouped: false },
];

/**
 * Gera o HTML de um card de profissional.
 * @param {Object} doc - objeto do array DOCTORS
 * @returns {string}
 */
function renderDoctorCard(doc) {
  /* Iniciais: primeiras letras das duas primeiras palavras do nome */
  var initials = doc.name
    .split(' ')
    .slice(0, 2)
    .map(function (n) { return n.charAt(0); })
    .join('');

  var subHtml = doc.sub
    ? '<div class="sub">' + doc.sub + '</div>'
    : '';

  return [
    '<div class="t-card">',
    '  <div class="t-photo">',
    '    <img src="assets/' + doc.photo + '" alt="' + doc.role + ' ' + doc.name + '"',
    '         loading="lazy"',
    '         onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">',
    '    <div class="t-avatar" style="display:none">' + initials + '</div>',
    '  </div>',
    '  <div class="t-info">',
    '    <h3>' + doc.name + '</h3>',
    '    <div class="role">' + doc.role + '</div>',
    subHtml,
    '    <div class="reg">' + doc.reg + '</div>',
    '  </div>',
    '</div>',
  ].join('\n');
}

/**
 * Gera o HTML de um painel de aba, agrupando por subespecialidade
 * quando grouped:true (ortopedistas).
 */
function renderPanel(cat) {
  var docs = DOCTORS.filter(function (d) { return d.category === cat.key; });

  if (!cat.grouped) {
    return '<div class="team-grid">' + docs.map(renderDoctorCard).join('') + '</div>';
  }

  /* Para ortopedistas: agrupa por campo "group", mantendo a ordem de inserção */
  var seen   = [];
  var groups = [];
  docs.forEach(function (d) {
    if (d.group && seen.indexOf(d.group) === -1) {
      seen.push(d.group);
      groups.push(d.group);
    }
  });

  return groups.map(function (groupName) {
    var groupDocs = docs.filter(function (d) { return d.group === groupName; });
    return [
      '<div class="team-group">',
      '  <div class="team-group-title">' + groupName + '</div>',
      '  <div class="team-grid">' + groupDocs.map(renderDoctorCard).join('') + '</div>',
      '</div>',
    ].join('\n');
  }).join('\n');
}

function renderTeam() {
  var tabsContainer   = document.getElementById('team-tabs');
  var panelsContainer = document.getElementById('team-panels');
  if (!tabsContainer || !panelsContainer) return;

  /* Tabs */
  tabsContainer.innerHTML = TEAM_CATEGORIES.map(function (cat, i) {
    var count = DOCTORS.filter(function (d) { return d.category === cat.key; }).length;
    var isActive = (i === 0) ? ' active' : '';
    return [
      '<button class="team-tab' + isActive + '" data-tab="' + cat.key + '"',
      '  role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '"',
      '  aria-controls="panel-' + cat.key + '">',
      cat.label + ' <span class="badge">' + count + '</span>',
      '</button>',
    ].join(' ');
  }).join('');

  /* Painéis */
  panelsContainer.innerHTML = TEAM_CATEGORIES.map(function (cat, i) {
    var isActive = (i === 0) ? ' active' : '';
    return [
      '<div class="team-panel' + isActive + '" id="panel-' + cat.key + '"',
      '     role="tabpanel">',
      renderPanel(cat),
      '</div>',
    ].join('\n');
  }).join('\n');
}

function switchTab(tabKey) {
  document.querySelectorAll('.team-tab').forEach(function (t) {
    var isThis = (t.dataset.tab === tabKey);
    t.classList.toggle('active', isThis);
    t.setAttribute('aria-selected', isThis ? 'true' : 'false');
  });
  document.querySelectorAll('.team-panel').forEach(function (p) {
    p.classList.toggle('active', p.id === 'panel-' + tabKey);
  });
}

/* ============================================================
   4. RENDERIZAÇÃO — Convênios
   ============================================================ */
function renderAgreements() {
  var container = document.getElementById('agreements-list');
  if (!container) return;

  container.innerHTML = AGREEMENTS.map(function (a) {
    return '<span class="plan-tag">' + a + '</span>';
  }).join('');
}

/* ============================================================
   5. UI DO CHATBOT
   ============================================================ */

/**
 * Adiciona uma mensagem à janela do chat.
 * @param {string}  text    - texto da mensagem
 * @param {boolean} isUser  - true = bolha do usuário
 * @param {boolean} hasLink - true = exibir botão de WhatsApp abaixo
 */
function addMessage(text, isUser, hasLink) {
  var box    = document.getElementById('cp-msgs');
  var msgDiv = document.createElement('div');
  msgDiv.className = 'cp-msg ' + (isUser ? 'user' : 'bot');

  var bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerText = text; /* innerText evita XSS */

  /* Fallback → botão de WhatsApp clicável dentro da bolha */
  if (!isUser && hasLink) {
    var br  = document.createElement('br');
    var br2 = document.createElement('br');
    var btn = document.createElement('a');
    btn.href      = buildWALink('chatbot');
    btn.target    = '_blank';
    btn.rel       = 'noopener';
    btn.className = 'chat-wa-link';
    btn.textContent = 'Falar no WhatsApp';
    bubble.appendChild(br);
    bubble.appendChild(br2);
    bubble.appendChild(btn);
  }

  msgDiv.appendChild(bubble);
  box.appendChild(msgDiv);
  box.scrollTop = box.scrollHeight;
}

/** Processa o clique em um botão de atalho (quick reply). */
function handleQuickReply(btn) {
  var key  = btn.dataset.quickReply;
  var flow = null;
  for (var i = 0; i < CHATBOT_FLOWS.length; i++) {
    if (CHATBOT_FLOWS[i].id === key) { flow = CHATBOT_FLOWS[i]; break; }
  }
  if (!flow) return;

  addMessage(btn.textContent.trim(), true, false);

  /* Desabilita todos os atalhos para evitar cliques duplicados */
  btn.closest('.cp-quick').querySelectorAll('.qr-btn').forEach(function (b) {
    b.disabled = true;
  });

  var response = (typeof flow.response === 'function') ? flow.response() : flow.response;
  setTimeout(function () { addMessage(response, false, false); }, 400);
}

/** Processa o envio de mensagem livre. */
function sendChatMessage() {
  var inp = document.getElementById('cp-inp');
  var txt = inp.value.trim();
  if (!txt) return;

  addMessage(txt, true, false);
  inp.value = '';

  var result = resolveResponse(txt);
  setTimeout(function () { addMessage(result.text, false, result.hasLink); }, 400);
}

/* ============================================================
   6. EVENT DELEGATION
   Todos os eventos interativos da página estão aqui.
   O HTML NÃO usa atributos onclick.
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
    var qrBtn = e.target.closest('[data-quick-reply]');
    if (qrBtn) {
      handleQuickReply(qrBtn);
      return;
    }

    /* -- Trocar aba da equipe -- */
    var tabBtn = e.target.closest('[data-tab]');
    if (tabBtn && tabBtn.closest('#team-tabs')) {
      switchTab(tabBtn.dataset.tab);
      return;
    }

  });

  /* Enter para enviar no chat */
  var chatInput = document.getElementById('cp-inp');
  if (chatInput) {
    chatInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  /* Smooth scroll em links internos */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   7. INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  renderWALinks();
  renderStats();
  renderTeam();
  renderAgreements();
  setupEventDelegation();
});
