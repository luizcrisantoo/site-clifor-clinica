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
    ? `<img src="assets/img/equipe/${escapeHtml(doc.photo)}" alt="${escapeHtml(doc.name)}, ${escapeHtml(doc.role)}" loading="lazy" data-fallback>` +
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
 * Gera o HTML de um painel de aba.
 * - grouped:true (ortopedistas): mostra pills de subespecialidade,
 *   cards so aparecem ao clicar em uma pill.
 * - grouped:false: mostra cards direto.
 */
function renderPanel(cat) {
  const docs = DOCTORS.filter(function (d) { return d.category === cat.key; });

  if (!cat.grouped) {
    return `<div class="team-grid">${docs.map(renderDoctorCard).join('')}</div>`;
  }

  /* Para ortopedistas: extrai grupos unicos mantendo ordem */
  const seen   = new Set();
  const groups = [];
  docs.forEach(function (d) {
    if (d.group && !seen.has(d.group)) {
      seen.add(d.group);
      groups.push(d.group);
    }
  });

  /* Pills de subespecialidade */
  var pillsHtml = '<div class="sub-tabs">';
  groups.forEach(function (groupName) {
    var count = docs.filter(function (d) { return d.group === groupName; }).length;
    pillsHtml += `<button class="sub-tab" data-sub="${escapeHtml(groupName)}">${escapeHtml(groupName)} <span class="sub-badge">${count}</span></button>`;
  });
  pillsHtml += '</div>';

  /* Sub-paineis (um por grupo, todos ocultos inicialmente) */
  var subPanelsHtml = '<div class="sub-panels">';
  groups.forEach(function (groupName) {
    var groupDocs = docs.filter(function (d) { return d.group === groupName; });
    subPanelsHtml += `<div class="sub-panel" data-sub-panel="${escapeHtml(groupName)}">`;
    subPanelsHtml += `<div class="team-grid">${groupDocs.map(renderDoctorCard).join('')}</div>`;
    subPanelsHtml += '</div>';
  });
  subPanelsHtml += '</div>';

  /* Mensagem inicial */
  var hintHtml = '<p class="sub-hint" id="sub-hint">Selecione uma especialidade acima</p>';

  return pillsHtml + hintHtml + subPanelsHtml;
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
    var scaleClass = a.scale ? ' plan-logo-lg' : '';
    return [
      '<div class="plan-card">',
      '  <img class="plan-logo' + scaleClass + '" src="assets/img/convenios/' + escapeHtml(a.logo) + '" alt="' + escapeHtml(a.name) + '" loading="lazy">',
      '  <span class="plan-name">' + escapeHtml(a.name) + '</span>',
      '</div>',
    ].join('');
  }).join('');
}

/* ============================================================
   5. Schema.org — estatico no <head> do HTML para SEO.
   ============================================================ */

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

    /* -- Card de especialidade → rola para equipe + abre aba -- */
    var goTabCard = e.target.closest('[data-go-tab]');
    if (goTabCard) {
      var tabKey = goTabCard.dataset.goTab;
      switchTab(tabKey);

      /* Se tem sub-especialidade, clica na pill correspondente */
      var subKey = goTabCard.dataset.goSub;
      if (subKey) {
        var panel = document.getElementById('panel-' + tabKey);
        if (panel) {
          var pill = panel.querySelector('[data-sub="' + subKey + '"]');
          if (pill) pill.click();
        }
      }

      document.getElementById('equipe').scrollIntoView({ behavior: 'smooth' });
      return;
    }

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

    /* -- Trocar sub-aba (pill de subespecialidade) -- */
    const subBtn = e.target.closest('[data-sub]');
    if (subBtn && subBtn.closest('.sub-tabs')) {
      const subKey = subBtn.dataset.sub;
      const panel  = subBtn.closest('.team-panel');
      if (!panel) return;

      /* Ativa pill clicada */
      panel.querySelectorAll('.sub-tab').forEach(function (s) {
        s.classList.toggle('active', s.dataset.sub === subKey);
      });

      /* Esconde hint */
      var hint = panel.querySelector('.sub-hint');
      if (hint) hint.style.display = 'none';

      /* Mostra sub-painel correspondente */
      panel.querySelectorAll('.sub-panel').forEach(function (sp) {
        sp.classList.toggle('active', sp.dataset.subPanel === subKey);
      });

      /* Registra fallback de imagem no sub-painel recem exibido */
      var activeSubPanel = panel.querySelector('.sub-panel.active');
      if (activeSubPanel) {
        activeSubPanel.querySelectorAll('.t-photo img[data-fallback]').forEach(function (img) {
          if (!img.dataset.fallbackBound) {
            img.dataset.fallbackBound = '1';
            img.addEventListener('error', function () {
              img.style.display = 'none';
              var avatar = img.nextElementSibling;
              if (avatar) avatar.style.display = 'flex';
            });
          }
        });
      }
      return;
    }

    /* -- Play/pause video principal (mosaico) -- */
    if (e.target.closest('[data-action="play-video"]')) {
      var video = document.getElementById('video-principal');
      var playBtn = e.target.closest('[data-action="play-video"]');
      if (video) {
        video.play();
        playBtn.classList.add('hidden');
        video.addEventListener('ended', function () {
          playBtn.classList.remove('hidden');
        });
        video.addEventListener('pause', function () {
          playBtn.classList.remove('hidden');
        });
      }
      return;
    }

    /* -- Clicar no video principal para pausar -- */
    if (e.target.closest('.mosaic-main video')) {
      var vid = e.target.closest('video');
      if (!vid.paused) vid.pause();
      return;
    }

    /* -- Trocar video ao clicar em thumbnail do mosaico -- */
    var mosaicVid = e.target.closest('.mosaic-video');
    if (mosaicVid) {
      var videoSrc = mosaicVid.dataset.video;
      var poster   = mosaicVid.dataset.poster;
      var mainVid  = document.getElementById('video-principal');
      var mainBtn  = document.querySelector('.mosaic-play');
      if (mainVid && videoSrc) {
        mainVid.pause();
        mainVid.querySelector('source').src = videoSrc;
        mainVid.poster = poster || '';
        mainVid.load();
        if (mainBtn) mainBtn.classList.remove('hidden');
        document.getElementById('estrutura').scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    /* -- "Ver mais" do mosaico -- */
    if (e.target.closest('[data-action="show-more-estrutura"]')) {
      var extra = document.getElementById('mosaic-extra');
      if (extra) {
        extra.style.display = (extra.style.display === 'none') ? 'block' : 'none';
        var overlay = e.target.closest('.mosaic-more');
        if (overlay) {
          var txt = overlay.querySelector('.mosaic-overlay');
          if (txt) txt.textContent = (extra.style.display === 'none') ? '+5 fotos' : 'Ver menos';
        }
      }
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
/** Carrossel de avaliações */
function setupReviewsCarousel() {
  var carousel = document.getElementById('reviewsCarousel');
  if (!carousel) return;

  var track = carousel.querySelector('.reviews-track');
  var cards = track.querySelectorAll('.review-card');
  var prevBtn = document.getElementById('revPrev');
  var nextBtn = document.getElementById('revNext');
  var dotsContainer = document.getElementById('revDots');
  var counterEl = document.getElementById('revCounter');

  if (cards.length === 0) return;

  /* Quantos cards visíveis por vez (2 no desktop, 1 no mobile) */
  function getPerView() {
    return window.innerWidth <= 600 ? 1 : 2;
  }

  var currentIndex = 0;

  function getTotalPages() {
    return Math.ceil(cards.length / getPerView());
  }

  /* Renderiza dots */
  function renderDots() {
    var total = getTotalPages();
    dotsContainer.innerHTML = '';
    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.className = 'reviews-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Página ' + (i + 1));
      dot.dataset.page = i;
      dotsContainer.appendChild(dot);
    }
  }

  /* Move o track */
  function goTo(index) {
    var perView = getPerView();
    var totalPages = getTotalPages();
    if (index < 0) index = 0;
    if (index >= totalPages) index = totalPages - 1;
    currentIndex = index;

    /* Calcula a largura de um card + gap */
    var trackGap = parseInt(getComputedStyle(track).gap) || 16;
    var cardWidth = cards[0].offsetWidth + trackGap;
    var offset = currentIndex * perView * cardWidth;
    track.style.transform = 'translateX(-' + offset + 'px)';

    /* Atualiza botões */
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalPages - 1;

    /* Atualiza dots */
    dotsContainer.querySelectorAll('.reviews-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === currentIndex);
    });

    /* Atualiza contador */
    if (counterEl) {
      counterEl.textContent = (currentIndex + 1) + ' / ' + totalPages;
    }
  }

  /* Eventos */
  prevBtn.addEventListener('click', function () { goTo(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { goTo(currentIndex + 1); });
  dotsContainer.addEventListener('click', function (e) {
    var dot = e.target.closest('.reviews-dot');
    if (dot) goTo(parseInt(dot.dataset.page));
  });

  /* Suporte a swipe touch */
  var startX = 0;
  var isDragging = false;
  track.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    if (!isDragging) return;
    isDragging = false;
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(currentIndex + (diff > 0 ? 1 : -1));
    }
  }, { passive: true });

  /* Resize */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      renderDots();
      goTo(Math.min(currentIndex, getTotalPages() - 1));
    }, 150);
  });

  renderDots();
  goTo(0);
}

/** Lazy-load do iframe do Google Maps via IntersectionObserver. */
function setupLazyMap() {
  var mapFrame = document.getElementById('map-frame');
  if (!mapFrame) return;

  var iframe = mapFrame.querySelector('iframe[data-src]');
  if (!iframe) return;

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        iframe.src = iframe.dataset.src;
        iframe.style.display = 'block';
        var placeholder = document.getElementById('map-placeholder');
        if (placeholder) placeholder.style.display = 'none';
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(mapFrame);
  } else {
    /* Fallback para navegadores sem suporte */
    iframe.src = iframe.dataset.src;
    iframe.style.display = 'block';
    var placeholder = document.getElementById('map-placeholder');
    if (placeholder) placeholder.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderWALinks();
  renderStats();
  renderTeam();
  renderAgreements();
  setupEventDelegation();
  setupLazyMap();
  setupReviewsCarousel();
});
