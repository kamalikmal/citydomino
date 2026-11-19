/* =============================================================
   CITY DOMINO - STATE UTAMA, RENDER UI & KONTROL PEMAIN
   Terintegrasi dengan citydomino_i18n.js
   ============================================================= */

const state = {
  specialCard: null,
  pools: {
    left: [],
    center: [],
    right: []
  },
  hand: [],
  timerDeck: [],
  policy: null,
  round: 1,
  stepInRound: 0,
  totalActionsDone: 0,
  selectedPoolTile: null,
  selectedHandTile: null,
  isDiscardPhase: false,
  history: null,
  activeWildPicker: null,
  activeBalloonComboId: null,
  activeAspirationDistrict: null,
  activeScoreDistrict: null
};

function initGame() {
  const fullDeck = buildDeck();

  // 1 kartu non-kembar sebagai kartu khusus
  const specialIdx = fullDeck.findIndex(c =>!c.isDouble);
  state.specialCard = fullDeck.splice(specialIdx, 1)[0];

  // Tandai kartu dengan petak wild angka (warna tetap asli)
  fullDeck.forEach(card => {
    if (card.topVal === state.specialCard.topVal && card.topCol === state.specialCard.topCol) {
      card.topIsWild = true;
    }
    if (card.botVal === state.specialCard.topVal && card.botCol === state.specialCard.topCol) {
      card.botIsWild = true;
    }
  });

  // Bagikan ke 3 Distrik (15 kartu masing-masing)
  state.pools.left = fullDeck.splice(0, 15);
  state.pools.center = fullDeck.splice(0, 15);
  state.pools.right = fullDeck.splice(0, 15);

  // Tangan Pemain & Deck Fase (masing-masing 5 kartu)
  state.hand = fullDeck.splice(0, 5);
  state.timerDeck = fullDeck.splice(0, 5);

  // Pilih Kebijakan Master Plan
  state.policy = POLICIES[Math.floor(Math.random() * POLICIES.length)];

  state.round = 1;
  state.stepInRound = 0;
  state.totalActionsDone = 0;
  state.selectedPoolTile = null;
  state.selectedHandTile = null;
  state.isDiscardPhase = false;
  state.history = null;
  state.activeWildPicker = null;
  state.activeBalloonComboId = null;
  state.activeAspirationDistrict = null;
  state.activeScoreDistrict = null;

  hideComboBalloon();
  hideAspirationBalloon();
  hideScoreBalloon();
  switchMpTab('cards');
  updateActiveDistrictClass();
  renderAll();
}

function renderRouteAndStats() {
  const rContainer = document.getElementById('route-container');
  const routeLabelText = typeof t === 'function'? t('route_label'): 'Rute Pembangunan:';
  rContainer.innerHTML = `<span class="route-label">${routeLabelText}</span>`;
  const stepNames = getCurrentRouteLabels();
  const routeKeys = getCurrentRouteKeys();

  routeKeys.forEach((stepKey, idx) => {
    const node = document.createElement('div');
    node.className = `step-node ${idx === state.stepInRound? 'active': ''} ${idx < state.stepInRound? 'done': ''}`;
    node.innerText = stepNames[idx];
    rContainer.appendChild(node);
  });

  const phaseIndicatorText = typeof t === 'function'
? t('phase_indicator', { cur: state.round, max: 6 })
: `Phase ${state.round}/6`;
  document.getElementById('round-indicator').innerText = phaseIndicatorText;
}

function createDominoElement(card, isPoolTile = false, poolKey = null, poolIdx = null) {
  const dom = document.createElement('div');
  dom.className = 'domino';

  const isTopBonus = card.topVal === state.specialCard.botVal && card.topCol === state.specialCard.botCol;
  const isBotBonus = card.botVal === state.specialCard.botVal && card.botCol === state.specialCard.botCol;
  const wildTooltipText = typeof t === 'function'? t('wild_tooltip'): 'Wild Angka: Klik untuk ganti angka';

  // Half Atas
  const topHalf = document.createElement('div');
  topHalf.className = `domino-half c-${card.topCol}${card.topIsWild? ' is-wild': ''}`;
  topHalf.innerHTML = `
    ${getBuildingSvg(card.topVal, 17)}
    <span class="domino-num">${card.topVal}</span>
    ${card.topIsWild? '<span class="super-wild-tag">⭐</span>': ''}
    ${isTopBonus? '<span class="bonus-target-tag">+3</span>': ''}
  `;
  if (card.topIsWild) {
    topHalf.title = wildTooltipText;
    topHalf.onclick = (e) => {
      e.stopPropagation();
      openWildPicker(card, 'topVal');
    };
  }

  // Half Bawah
  const botHalf = document.createElement('div');
  botHalf.className = `domino-half c-${card.botCol}${card.botIsWild? ' is-wild': ''}`;
  botHalf.innerHTML = `
    ${getBuildingSvg(card.botVal, 17)}
    <span class="domino-num">${card.botVal}</span>
    ${card.botIsWild? '<span class="super-wild-tag">⭐</span>': ''}
    ${isBotBonus? '<span class="bonus-target-tag">+3</span>': ''}
  `;
  if (card.botIsWild) {
    botHalf.title = wildTooltipText;
    botHalf.onclick = (e) => {
      e.stopPropagation();
      openWildPicker(card, 'botVal');
    };
  }

  dom.appendChild(topHalf);
  dom.appendChild(botHalf);

  if (isPoolTile) {
    if (state.selectedPoolTile && state.selectedPoolTile.poolKey === poolKey && state.selectedPoolTile.index === poolIdx) {
      dom.classList.add('selected-tile');
    }
    dom.onclick = () => onPoolTileClick(poolKey, poolIdx);
  }

  return dom;
}

function renderPools() {
  const ptsSuffix = typeof t === 'function'? t('points_suffix'): 'poin';

  ['left', 'center', 'right'].forEach(poolKey => {
    const poolEl = document.getElementById(`grid-${poolKey}`);
    poolEl.innerHTML = '';

    const evalData = evaluatePool(state.pools[poolKey], poolKey);
    const dHappy = evalData.happiness.happyScore;

    const scoreEl = document.getElementById(`score-${poolKey}`);
    scoreEl.innerText = `${evalData.total} ${ptsSuffix}`;

    const happyBadge = document.getElementById(`happy-${poolKey}`);
    const happyClass = dHappy >= 70? 'happy-safe': (dHappy >= 50? 'happy-warn': 'happy-danger');
    const happyEmoji = dHappy >= 70? '😊': (dHappy >= 50? '😐': '⚠️');

    happyBadge.className = `district-happy-badge ${happyClass}`;
    happyBadge.innerText = `${happyEmoji} ${dHappy}%`;

    for (let r = 0; r < 3; r++) {
      const rowPair = document.createElement('div');
      rowPair.className = 'domino-row-pair';

      const track = document.createElement('div');
      track.className = 'domino-tiles-track';

      for (let c = 0; c < 5; c++) {
        const idx = r * 5 + c;
        const card = state.pools[poolKey][idx];
        const dom = createDominoElement(card, true, poolKey, idx);
        track.appendChild(dom);
      }

      rowPair.appendChild(track);

      const sidebar = document.createElement('div');
      sidebar.className = 'row-score-sidebar';

      const topBadge = document.createElement('div');
      topBadge.className = `line-score-badge ${evalData.lines[r].top.points > 0? 'has-score': ''}`;
      topBadge.innerHTML = `<span>${evalData.lines[r].top.comboName}</span><span class="line-score-pts">${evalData.lines[r].top.points}</span>`;

      const botBadge = document.createElement('div');
      botBadge.className = `line-score-badge ${evalData.lines[r].bot.points > 0? 'has-score': ''}`;
      botBadge.innerHTML = `<span>${evalData.lines[r].bot.comboName}</span><span class="line-score-pts">${evalData.lines[r].bot.points}</span>`;

      sidebar.appendChild(topBadge);
      sidebar.appendChild(botBadge);
      rowPair.appendChild(sidebar);

      poolEl.appendChild(rowPair);
    }
  });
}

function renderSpecialCardAndTimer() {
  const spCard = state.specialCard;
  const spContainer = document.getElementById('special-card-render');
  spContainer.innerHTML = '';

  const dom = document.createElement('div');
  dom.className = 'special-card-frame';

  const top = document.createElement('div');
  top.className = `domino-half c-${spCard.topCol}`;
  top.innerHTML = `
    ${getBuildingSvg(spCard.topVal, 15)}
    <span class="domino-num">${spCard.topVal}</span>
    <span class="super-wild-tag">⭐</span>
  `;

  const bot = document.createElement('div');
  bot.className = `domino-half c-${spCard.botCol}`;
  bot.innerHTML = `
    ${getBuildingSvg(spCard.botVal, 15)}
    <span class="domino-num">${spCard.botVal}</span>
    <span class="bonus-target-tag">+3</span>
  `;

  dom.appendChild(top);
  dom.appendChild(bot);
  spContainer.appendChild(dom);

  const timerContainer = document.getElementById('timer-slots-container');
  timerContainer.innerHTML = '';
  const totalTimerSlots = 5;
  const sisa = state.timerDeck.length;
  const availText = typeof t === 'function'? t('timer_available'): 'Tersedia';

  document.getElementById('timer-slots-label').innerText = `${sisa}/5 ${availText}`;

  for (let i = 0; i < totalTimerSlots; i++) {
    const slot = document.createElement('div');
    if (i < sisa) {
      slot.className = 'timer-slot-card has-card';
      slot.innerText = typeof t === 'function'? t('timer_card_label', { num: i + 1 }): `Kartu ${i + 1}`;
    } else {
      slot.className = 'timer-slot-card';
      slot.innerText = '✓';
    }
    timerContainer.appendChild(slot);
  }
}

function renderHand() {
  const container = document.getElementById('hand-cards-container');
  container.innerHTML = '';
  const rotateBtnText = typeof t === 'function'? t('btn_rotate'): '🔄 Putar';

  state.hand.forEach((card, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'hand-domino-wrapper';

    const dom = createDominoElement(card);
    if (state.selectedHandTile === idx) {
      dom.classList.add('selected-tile');
    }

    dom.onclick = () => onHandTileClick(idx);

    if (!state.isDiscardPhase) {
      dom.ondblclick = (e) => {
        e.stopPropagation();
        flipHandCard(idx);
      };

      const rotBtn = document.createElement('button');
      rotBtn.className = 'btn-rotate-mini';
      rotBtn.innerText = rotateBtnText;
      rotBtn.onclick = (e) => {
        e.stopPropagation();
        flipHandCard(idx);
      };
      wrap.appendChild(dom);
      wrap.appendChild(rotBtn);
    } else {
      wrap.appendChild(dom);
    }

    container.appendChild(wrap);
  });
}

function renderMasterPlan() {
  document.getElementById('policy-name').innerText = state.policy.name;
  const grid = document.getElementById('mp-grid');
  grid.innerHTML = '';
  const ptsSuffix = typeof t === 'function'? t('points_suffix'): 'poin';

  state.policy.active.forEach(comboId => {
    const c = MASTER_COMBOS[comboId];
    const card = document.createElement('div');
    card.className = `combo-card ${state.activeBalloonComboId === comboId? 'active-balloon': ''}`;

    const meta = document.createElement('div');
    meta.className = 'combo-meta';
    meta.innerHTML = `<span class="combo-name">${c.name}</span><span class="combo-pts">${c.pts} ${ptsSuffix}</span>`;

    const strip = document.createElement('div');
    strip.className = 'combo-strip';
    c.pattern.forEach(pip => {
      const p = document.createElement('div');
      p.className = `combo-pip c-${pip.col}`;
      
      const iconSvg = getBuildingSvg(pip.val, 12);
      p.innerHTML = `
        ${iconSvg}
        <span>${pip.val}</span>
      `;
      strip.appendChild(p);
    });

    card.appendChild(meta);
    card.appendChild(strip);

    card.onclick = (e) => {
      e.stopPropagation();
      toggleComboBalloon(card, comboId);
    };

    grid.appendChild(card);
  });
}

function renderAll() {
  renderRouteAndStats();
  renderPools();
  renderSpecialCardAndTimer();
  renderHand();
  renderMasterPlan();
  updateActionBtn();
}

function toggleDistrictAspiration(event, poolKey) {
  event.stopPropagation();
  hideComboBalloon();
  hideScoreBalloon();

  const balloon = document.getElementById('aspiration-balloon');
  if (state.activeAspirationDistrict === poolKey) {
    hideAspirationBalloon();
    return;
  }

  state.activeAspirationDistrict = poolKey;
  const evalData = evaluateDistrictHappiness(state.pools[poolKey], poolKey);
  const titleMap = {
    left: typeof t === 'function'? t('district_westfall'): 'Westfall',
    center: typeof t === 'function'? t('district_midvale'): 'Midvale',
    right: typeof t === 'function'? t('district_eastgate'): 'Eastgate'
  };

  const aspTitleText = typeof t === 'function'
? t('aspiration_title', { name: titleMap[poolKey] })
: `Aspirasi ${titleMap[poolKey]}`;
  document.getElementById('aspirasi-title').innerText = aspTitleText;

  const contentEl = document.getElementById('aspirasi-content');
  contentEl.innerHTML = '';

  let html = '<div class="aspirasi-req-list">';
  evalData.reqs.forEach(r => {
    const cls = r.ok? 'req-ok': 'req-need';
    const icon = r.ok? '✓': '⚠️';
    const note = r.ok? 'OK': `-${r.target - r.cur}`;
    html += `
      <div class="aspirasi-req-row ${cls}">
        <span>${icon} ${r.name}</span>
        <span class="aspirasi-req-val">${r.cur}/${r.target} (${note})</span>
      </div>`;
  });

  if (evalData.isHappy) {
    const satTitle = typeof t === 'function'? t('aspiration_satisfied'): '😊 Warga senang (100% Puas)';
    const satSub = typeof t === 'function'? t('aspiration_all_met'): 'Semua kebutuhan 4/4 terpenuhi';
    html += `<div class="aspirasi-satisfied">${satTitle}<div style="font-size:0.63rem; color:#94a3b8; margin-top:3px;">${satSub}</div></div>`;
  }
  html += '</div>';
  contentEl.innerHTML = html;

  const targetEl = event.currentTarget;
  const rect = targetEl.getBoundingClientRect();
  const balloonWidth = 235;

  let left = rect.right - balloonWidth;
  if (left < 10) left = 10;
  if (left + balloonWidth > window.innerWidth - 10) {
    left = window.innerWidth - balloonWidth - 10;
  }

  balloon.style.left = `${left}px`;
  balloon.style.display = 'flex';

  const balloonHeight = balloon.offsetHeight || 120;
  const spaceBelow = window.innerHeight - rect.bottom;

  if (spaceBelow > balloonHeight + 10) {
    balloon.style.top = `${rect.bottom + 8}px`;
    balloon.classList.remove('arrow-bottom');
  } else {
    balloon.style.top = `${rect.top - balloonHeight - 8}px`;
    balloon.classList.add('arrow-bottom');
  }
}

function hideAspirationBalloon() {
  state.activeAspirationDistrict = null;
  const balloon = document.getElementById('aspiration-balloon');
  if (balloon) balloon.style.display = 'none';
}

function toggleDistrictScoreBalloon(event, poolKey) {
  event.stopPropagation();
  hideComboBalloon();
  hideAspirationBalloon();

  const balloon = document.getElementById('score-balloon');
  if (state.activeScoreDistrict === poolKey) {
    hideScoreBalloon();
    return;
  }

  state.activeScoreDistrict = poolKey;
  const evalData = evaluatePool(state.pools[poolKey], poolKey);
  const titleMap = {
    left: typeof t === 'function'? t('district_westfall'): 'Westfall',
    center: typeof t === 'function'? t('district_midvale'): 'Midvale',
    right: typeof t === 'function'? t('district_eastgate'): 'Eastgate'
  };

  const scoreTitleText = typeof t === 'function'
? t('score_balloon_title', { name: titleMap[poolKey] })
: `Skor ${titleMap[poolKey]}`;
  document.getElementById('score-balloon-title').innerText = scoreTitleText;
  const contentEl = document.getElementById('score-balloon-content');

  const raw = evalData.rawScore;
  const happy = evalData.happiness.happyScore;
  const total = evalData.total;
  const ptsSuffix = typeof t === 'function'? t('points_suffix'): 'poin';

  const lblMpScore = typeof t === 'function'? t('score_master_plan'): 'Skor Master Plan:';
  const lblHappyLevel = typeof t === 'function'? t('happiness_level'): 'Tingkat Kebahagiaan:';
  const lblScoreCalc = typeof t === 'function'? t('score_calc_label'): 'Skor:';

  contentEl.innerHTML = `
    <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#cbd5e1;">
      <span>${lblMpScore}</span>
      <b style="color:#ffffff;">${raw} ${ptsSuffix}</b>
    </div>
    <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#cbd5e1;">
      <span>${lblHappyLevel}</span>
      <b style="color:${happy >= 70? '#34d399': (happy >= 50? '#fbbf24': '#f87171')};">${happy}%</b>
    </div>
    <div style="border-top:1px solid #1e293b; margin-top:3px; padding-top:4px; font-size:0.67rem; color:#94a3b8; line-height:1.35;">
      <b style="color:var(--highlight);">${lblScoreCalc}</b> ${raw} ${ptsSuffix} × ${happy}% = <b style="color:var(--accent); font-size:0.75rem;">${total} ${ptsSuffix}</b>
    </div>
  `;

  const targetEl = event.currentTarget;
  const rect = targetEl.getBoundingClientRect();
  const balloonWidth = 220;

  let left = rect.right - balloonWidth;
  if (left < 10) left = 10;
  if (left + balloonWidth > window.innerWidth - 10) {
    left = window.innerWidth - balloonWidth - 10;
  }

  balloon.style.left = `${left}px`;
  balloon.style.display = 'flex';

  const balloonHeight = balloon.offsetHeight || 80;
  const spaceBelow = window.innerHeight - rect.bottom;

  if (spaceBelow > balloonHeight + 10) {
    balloon.style.top = `${rect.bottom + 8}px`;
    balloon.classList.remove('arrow-bottom');
  } else {
    balloon.style.top = `${rect.top - balloonHeight - 8}px`;
    balloon.classList.add('arrow-bottom');
  }
}

function hideScoreBalloon() {
  state.activeScoreDistrict = null;
  const balloon = document.getElementById('score-balloon');
  if (balloon) balloon.style.display = 'none';
}

function toggleComboBalloon(cardEl, comboId) {
  hideAspirationBalloon();
  hideScoreBalloon();
  const balloon = document.getElementById('combo-balloon');

  if (state.activeBalloonComboId === comboId) {
    hideComboBalloon();
    return;
  }

  state.activeBalloonComboId = comboId;
  const combo = MASTER_COMBOS[comboId];
  const ptsSuffix = typeof t === 'function'? t('points_suffix'): 'poin';

  document.getElementById('balloon-title').innerText = combo.name;
  document.getElementById('balloon-pts').innerText = `${combo.pts} ${ptsSuffix}`;
  document.getElementById('balloon-desc').innerText = combo.desc;

  const rect = cardEl.getBoundingClientRect();
  const balloonWidth = 250;
  let left = rect.left + (rect.width / 2) - 30;
  if (left + balloonWidth > window.innerWidth - 10) {
    left = window.innerWidth - balloonWidth - 10;
  }
  if (left < 10) left = 10;

  balloon.style.left = `${left}px`;
  balloon.style.display = 'flex';

  const balloonHeight = balloon.offsetHeight || 80;
  const spaceAbove = rect.top;

  if (spaceAbove > balloonHeight + 10) {
    balloon.style.top = `${rect.top - balloonHeight - 8}px`;
    balloon.classList.remove('arrow-top');
  } else {
    balloon.style.top = `${rect.bottom + 8}px`;
    balloon.classList.add('arrow-top');
  }

  renderMasterPlan();
}

function hideComboBalloon() {
  state.activeBalloonComboId = null;
  const balloon = document.getElementById('combo-balloon');
  if (balloon) balloon.style.display = 'none';
  const activeCard = document.querySelector('.combo-card.active-balloon');
  if (activeCard) activeCard.classList.remove('active-balloon');
}

window.addEventListener('click', (e) => {
  const balloonCombo = document.getElementById('combo-balloon');
  if (balloonCombo && balloonCombo.style.display === 'flex' &&!balloonCombo.contains(e.target)) {
    hideComboBalloon();
  }

  const balloonAsp = document.getElementById('aspiration-balloon');
  if (balloonAsp && balloonAsp.style.display === 'flex' &&!balloonAsp.contains(e.target)) {
    hideAspirationBalloon();
  }

  const balloonScore = document.getElementById('score-balloon');
  if (balloonScore && balloonScore.style.display === 'flex' &&!balloonScore.contains(e.target)) {
    hideScoreBalloon();
  }
});

function updateActiveDistrictClass() {
  const currentRoute = getCurrentRouteKeys();
  const activeDistrict = currentRoute[state.stepInRound];
  const handPanel = document.getElementById('hand-panel') || document.querySelector('.hand-panel-box');

  ['left', 'center', 'right'].forEach(k => {
    const el = document.getElementById(`pool-${k}`);
    if (el) {
      if (k === activeDistrict &&!state.isDiscardPhase) {
        el.classList.add('active-district');
      } else {
        el.classList.remove('active-district');
      }
    }
  });

  if (handPanel) {
    if (state.isDiscardPhase) {
      handPanel.classList.add('phase-discard');
    } else {
      handPanel.classList.remove('phase-discard');
    }
  }
}

function onPoolTileClick(poolKey, idx) {
  if (state.isDiscardPhase) return;
  const currentRoute = getCurrentRouteKeys();
  const activeDistrict = currentRoute[state.stepInRound];
  if (poolKey!== activeDistrict) return;

  if (state.selectedPoolTile && state.selectedPoolTile.poolKey === poolKey && state.selectedPoolTile.index === idx) {
    state.selectedPoolTile = null;
  } else {
    state.selectedPoolTile = { poolKey, index: idx };
  }
  renderPools();
  updateActionBtn();
}

function onHandTileClick(idx) {
  if (state.selectedHandTile === idx) {
    state.selectedHandTile = null;
  } else {
    state.selectedHandTile = idx;
  }
  renderHand();
  updateActionBtn();
}

function flipHandCard(idx) {
  const card = state.hand[idx];
  const tempVal = card.topVal;
  const tempCol = card.topCol;
  const tempWild = card.topIsWild;

  card.topVal = card.botVal;
  card.topCol = card.botCol;
  card.topIsWild = card.botIsWild;

  card.botVal = tempVal;
  card.botCol = tempCol;
  card.botIsWild = tempWild;

  renderHand();
}

function getNextTargetLabel() {
  const currentRoute = getCurrentRouteKeys();
  const nextStep = state.stepInRound + 1;
  const districtNameMap = {
    left: typeof t === 'function'? t('district_westfall'): 'Westfall',
    center: typeof t === 'function'? t('district_midvale'): 'Midvale',
    right: typeof t === 'function'? t('district_eastgate'): 'Eastgate'
  };
  
  if (nextStep < currentRoute.length) {
    return districtNameMap[currentRoute[nextStep]];
  } else {
    if (state.round < 6) {
      return typeof t === 'function'? t('btn_target_market'): 'Bursa';
    } else {
      return typeof t === 'function'? t('btn_target_finish'): 'Selesai';
    }
  }
}

function updateActionBtn() {
  const btn = document.getElementById('btn-action');
  const btnUndo = document.getElementById('btn-undo');
  const timerAlert = document.getElementById('timer-alert-box');

  btnUndo.disabled = (!state.history || state.isDiscardPhase);

  if (state.isDiscardPhase) {
    timerAlert.style.display = 'block';
    btn.innerText = typeof t === 'function'? t('btn_discard_draw'): 'Buang & Ambil Bursa';
    btn.disabled = (state.selectedHandTile === null);
  } else {
    timerAlert.style.display = 'none';
    const nextTarget = getNextTargetLabel();
    btn.innerText = typeof t === 'function'
? t('btn_swap', { target: nextTarget })
: `Tukar (Next: ${nextTarget})`;
    btn.disabled = (state.selectedPoolTile === null || state.selectedHandTile === null);
  }
}

function executeAction() {
  if (state.isDiscardPhase) {
    const handIdx = state.selectedHandTile;
    if (handIdx === null) return;

    const drawnCard = state.timerDeck.shift();
    state.hand[handIdx] = drawnCard;
    state.selectedHandTile = null;
    state.isDiscardPhase = false;

    if (state.round < 6) {
      state.round++;
      state.stepInRound = 0;
      updateActiveDistrictClass();
      renderAll();
    } else {
      endGame();
    }
    return;
  }

  if (!state.selectedPoolTile || state.selectedHandTile === null) return;

  const pKey = state.selectedPoolTile.poolKey;
  const pIdx = state.selectedPoolTile.index;
  const hIdx = state.selectedHandTile;

  state.history = {
    poolKey: pKey,
    poolIdx: pIdx,
    handIdx: hIdx,
    stepInRound: state.stepInRound,
    totalActionsDone: state.totalActionsDone
  };

  const tempCard = state.pools[pKey][pIdx];
  state.pools[pKey][pIdx] = state.hand[hIdx];
  state.hand[hIdx] = tempCard;

  state.selectedPoolTile = null;
  state.selectedHandTile = null;
  state.totalActionsDone++;
  state.stepInRound++;

  if (state.stepInRound >= 3) {
    if (state.round >= 6) {
      renderAll();
      endGame();
      return;
    } else {
      state.isDiscardPhase = true;
    }
  }

  updateActiveDistrictClass();
  renderAll();
}

function undoAction() {
  if (!state.history || state.isDiscardPhase) return;

  const h = state.history;
  const tempCard = state.pools[h.poolKey][h.poolIdx];
  state.pools[h.poolKey][h.poolIdx] = state.hand[h.handIdx];
  state.hand[h.handIdx] = tempCard;

  state.stepInRound = h.stepInRound;
  state.totalActionsDone = h.totalActionsDone;
  state.history = null;
  state.selectedPoolTile = null;
  state.selectedHandTile = null;

  updateActiveDistrictClass();
  renderAll();
}

function openWildPicker(card, propKey, isTutorial = false) {
  hideComboBalloon();
  hideAspirationBalloon();
  hideScoreBalloon();
  state.activeWildPicker = { card, propKey, isTutorial };
  const container = document.getElementById('wild-picker-options');
  container.innerHTML = '';

  for (let v = 0; v <= 6; v++) {
    const btn = document.createElement('button');
    btn.className = 'btn-wild-opt';
    btn.innerHTML = `
      ${getBuildingSvg(v, 18)}
      <span>${v}</span>
    `;
    if (card[propKey] === v) {
      btn.style.borderColor = 'var(--accent)';
      btn.style.color = 'var(--accent)';
    }
    btn.onclick = () => {
      card[propKey] = v;
      closeWildPicker();
      if (isTutorial) {
        if (typeof onTutWildPicked === 'function') onTutWildPicked(v);
      } else {
        renderAll();
      }
    };
    container.appendChild(btn);
  }

  document.getElementById('wild-modal').style.display = 'flex';
}

function closeWildPicker() {
  state.activeWildPicker = null;
  document.getElementById('wild-modal').style.display = 'none';
}

function endGame() {
  hideComboBalloon();
  hideAspirationBalloon();
  hideScoreBalloon();

  const evalLeft = evaluatePool(state.pools.left, 'left');
  const evalCenter = evaluatePool(state.pools.center, 'center');
  const evalRight = evaluatePool(state.pools.right, 'right');

  const leftScore = evalLeft.total;
  const centerScore = evalCenter.total;
  const rightScore = evalRight.total;
  const totalScore = leftScore + centerScore + rightScore;

  const leftHappy = evalLeft.happiness.happyScore;
  const centerHappy = evalCenter.happiness.happyScore;
  const rightHappy = evalRight.happiness.happyScore;
  const ptsSuffix = typeof t === 'function'? t('points_suffix'): 'poin';

  document.getElementById('final-left-pts').innerText = `${leftScore} ${ptsSuffix}`;
  document.getElementById('final-center-pts').innerText = `${centerScore} ${ptsSuffix}`;
  document.getElementById('final-right-pts').innerText = `${rightScore} ${ptsSuffix}`;
  document.getElementById('final-total-pts').innerText = `${totalScore} ${ptsSuffix}`;

  const formatHappyStatus = (h) => {
    const color = h >= 70? '#34d399': (h >= 50? '#fbbf24': '#f87171');
    const icon = h >= 70? '😊': (h >= 50? '😐': '⚠️');
    return `<span style="color:${color}; font-weight:800;">${icon} ${h}%</span>`;
  };

  document.getElementById('final-left-happy').innerHTML = formatHappyStatus(leftHappy);
  document.getElementById('final-center-happy').innerHTML = formatHappyStatus(centerHappy);
  document.getElementById('final-right-happy').innerHTML = formatHappyStatus(rightHappy);

  const titleBox = document.getElementById('city-title-box');
  const modalTitle = document.getElementById('final-modal-title');
  const modalDesc = document.getElementById('final-modal-desc');
  const statusLabel = document.getElementById('city-status-label');
  const cityTitleEl = document.getElementById('city-title');
  const lbSection = document.getElementById('lb-submit-container');

  const nameWestfall = typeof t === 'function'? t('district_westfall'): 'Westfall';
  const nameMidvale = typeof t === 'function'? t('district_midvale'): 'Midvale';
  const nameEastgate = typeof t === 'function'? t('district_eastgate'): 'Eastgate';

  const failedDistricts = [];
  if (leftHappy < 50) failedDistricts.push(nameWestfall);
  if (centerHappy < 50) failedDistricts.push(nameMidvale);
  if (rightHappy < 50) failedDistricts.push(nameEastgate);

  if (failedDistricts.length > 0) {
    modalTitle.innerText = typeof t === 'function'? t('modal_defeat_title'): 'KOTA KOLAPS (KALAH)';
    modalTitle.style.color = '#f87171';
    modalDesc.innerHTML = typeof t === 'function'
? t('modal_defeat_desc', { districts: failedDistricts.join(', ') })
: `<b style="color:#f87171;">Kerusuhan Sosial Terjadi!</b> Warga di <b>${failedDistricts.join(', ')}</b> tidak puas (Happiness &lt; 50%). Kota dinyatakan gagal.`;
    titleBox.style.background = '#450a0a';
    titleBox.style.border = '1px solid #dc2626';
    statusLabel.innerText = typeof t === 'function'? t('modal_status_label'): 'Status Evaluasi:';
    cityTitleEl.innerText = typeof t === 'function'? t('modal_defeat_status'): 'Distrik Kolaps / Kerusuhan';
    cityTitleEl.style.color = '#f87171';

    const alertMsg = typeof t === 'function'
? t('lb_collapse_alert')
: '⚠️ <b>KOTA GAGAL:</b> Skor tidak dapat dicatat ke papan peringkat karena ada distrik dengan kebahagiaan &lt; 50%.';
    lbSection.innerHTML = `<div class="lb-collapse-alert">${alertMsg}</div>`;
  } else {
    modalTitle.innerText = typeof t === 'function'? t('modal_victory_title'): 'EVALUASI AKHIR KOTA';
    modalTitle.style.color = 'var(--accent)';
    modalDesc.innerText = typeof t === 'function'
? t('modal_victory_desc')
: 'Semua distrik berhasil memenuhi standar hidup warga (≥ 50%).';
    titleBox.style.background = '#1e293b';
    titleBox.style.border = 'none';
    statusLabel.innerText = typeof t === 'function'? t('modal_predicate_label'): 'Predikat Kota:';

    let title = typeof t === 'function'? t('rank_underdeveloped'): 'Desa Tertinggal';
    if (totalScore >= 180) title = typeof t === 'function'? t('rank_utopia'): 'Utopia Futuristik';
    else if (totalScore >= 140) title = typeof t === 'function'? t('rank_metropolis'): 'Metropolis Terencana';
    else if (totalScore >= 100) title = typeof t === 'function'? t('rank_satellite'): 'Kota Satelit Mandiri';
    else if (totalScore >= 60) title = typeof t === 'function'? t('rank_developing'): 'Kota Berkembang';

    cityTitleEl.innerText = title;
    cityTitleEl.style.color = '#facc15';

    const lbTitle = typeof t === 'function'? t('lb_record_title'): '🏆 Catat Rekor ke Papan Peringkat';
    const lbPlaceholder = typeof t === 'function'? t('lb_name_placeholder'): 'Nama walikota (maks 15 huruf)...';
    const lbBtn = typeof t === 'function'? t('lb_btn_submit'): 'Kirim';

    lbSection.innerHTML = `
      <div class="lb-submit-section">
        <div class="lb-submit-title">${lbTitle}</div>
        <form class="lb-submit-form" onsubmit="submitLeaderboardScore(event, ${totalScore}, ${leftScore}, ${centerScore}, ${rightScore})">
          <input type="text" id="lb-player-name" class="lb-name-input" placeholder="${lbPlaceholder}" maxlength="15" required autocomplete="off">
          <button type="submit" id="lb-submit-btn" class="lb-btn-send">${lbBtn}</button>
        </form>
        <div id="lb-submit-status" class="lb-submit-msg" style="display:none;"></div>
      </div>
    `;
  }

  document.getElementById('end-modal').style.display = 'flex';
}

function restartGame() {
  document.getElementById('end-modal').style.display = 'none';
  initGame();
}

window.onload = () => {
  if (typeof initI18n === 'function') {
    initI18n();
  } else {
    initGame();
  }
};