/* =============================================================
   CITY DOMINO - MODAL BANTUAN ASLI & 4 STEP SANDBOX
   Terintegrasi dengan citydomino_i18n.js
   ============================================================= */
const tutState = {
  initialized: false,
  currentStep: 1,
  isCompleted: false,
  selectedPoolIdx: null,
  selectedHandIdx: null,
  poolCards: [],
  handCards: []
};

function openHelpModal() {
  if (typeof hideComboBalloon === 'function') hideComboBalloon();
  if (typeof hideAspirationBalloon === 'function') hideAspirationBalloon();
  if (typeof hideScoreBalloon === 'function') hideScoreBalloon();
  const modal = document.getElementById('help-modal');
  if (modal) modal.style.display = 'flex';
  if (!tutState.initialized) {
    tutState.initialized = true;
    loadTutStep(1);
  }
}

function closeHelpModal() {
  const modal = document.getElementById('help-modal');
  if (modal) modal.style.display = 'none';
}

function switchHelpTab(tabKey) {
  const tabTut = document.getElementById('tab-btn-tut');
  const tabRules = document.getElementById('tab-btn-rules');
  const paneTut = document.getElementById('pane-tutorial');
  const paneRules = document.getElementById('pane-rules');
  if (!tabTut ||!tabRules ||!paneTut ||!paneRules) return;

  if (tabKey === 'tutorial') {
    tabTut.classList.add('active');
    tabRules.classList.remove('active');
    paneTut.classList.add('active');
    paneRules.classList.remove('active');
  } else {
    tabRules.classList.add('active');
    tabTut.classList.remove('active');
    paneRules.classList.add('active');
    paneTut.classList.remove('active');
  }
}

function getTutHappiness() {
  const tr = (k, fb) => (typeof t === 'function'? t(k): fb);
  if (tutState.currentStep === 1 || tutState.currentStep === 2) {
    return { label: tr('help_happy_100', '😊 100% Warga Senang'), class: 'happy-safe' };
  }
  if (tutState.currentStep === 3) {
    const hasOneTop = tutState.poolCards.some(c => c.topVal === 1);
    if (hasOneTop) {
      return { label: tr('help_happy_75', '😊 75% Warga Puas (+50%)'), class: 'happy-safe' };
    }
    return { label: tr('help_happy_25', '⚠️ 25% Krisis (Butuh 1)'), class: 'happy-danger' };
  }
  return { label: tr('help_happy_100_prosper', '😊 100% Sejahtera'), class: 'happy-safe' };
}

function loadTutStep(stepNum) {
  tutState.currentStep = stepNum;
  tutState.isCompleted = false;
  tutState.selectedPoolIdx = null;
  tutState.selectedHandIdx = null;

  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`tut-dot-${i}`);
    if (dot) {
      if (i === stepNum) dot.classList.add('active');
      else dot.classList.remove('active');
    }
  }

  const fb = document.getElementById('tut-feedback');
  if (fb) fb.style.display = 'none';

  const titleEl = document.getElementById('tut-title');
  const descEl = document.getElementById('tut-desc');
  const statusEl = document.getElementById('tut-district-status');

  const overviewBox = document.getElementById('tut-overview-container');
  const districtBox = document.getElementById('tut-district-box');
  const handBox = document.getElementById('tut-hand-box');
  const tr = (k, fb) => (typeof t === 'function'? t(k): fb);

  if (stepNum === 1) {
    titleEl.innerText = tr('help_step_1_title', 'Langkah 1: Premis & Antarmuka Kota');
    descEl.innerHTML = tr(
      'help_step_1_desc',
      'Kamu adalah Walikota yang merancang 3 distrik selama 6 fase (total 18 aksi). Angka domino (0–6) mewakili zonasi kota. Capai target skor poker tertinggi dan jaga <b>Kebahagiaan Warga minimal 50%</b> agar kota tidak kolaps!'
    );
    overviewBox.style.display = 'flex';
    districtBox.style.display = 'none';
    handBox.style.display = 'none';
    tutState.poolCards = [];
    tutState.handCards = [];
    return;
  }

  overviewBox.style.display = 'none';
  districtBox.style.display = 'flex';

  if (stepNum === 2) {
    titleEl.innerText = tr('help_step_2_title', 'Langkah 2: Skor Poker & Tukar Kartu');
    descEl.innerHTML = tr(
      'help_step_2_desc',
      'Pilih kartu tangan <b>[4 | 0]</b>, lalu pilih kartu <b>[2 | 6]</b> di petak ke-5 untuk membentuk <b>Five of a Kind (4-4-4-4-4)</b> di baris atas!<div class="tut-click-tip">💡 <b>Info:</b> Angka skor di header distrik bisa kamu klik untuk melihat rincian kombinasi & perkalian skornya.</div>'
    );
    statusEl.innerText = tr('help_step_2_status', 'Target: Five of a Kind (+30 pt)');
    tutState.poolCards = [
      { topVal: 4, topCol: 'blue', botVal: 1, botCol: 'green', topIsWild: false, botIsWild: false },
      { topVal: 4, topCol: 'green', botVal: 2, botCol: 'red', topIsWild: false, botIsWild: false },
      { topVal: 4, topCol: 'amber', botVal: 3, botCol: 'blue', topIsWild: false, botIsWild: false },
      { topVal: 4, topCol: 'red', botVal: 5, botCol: 'green', topIsWild: false, botIsWild: false },
      { topVal: 2, topCol: 'blue', botVal: 6, botCol: 'red', topIsWild: false, botIsWild: false }
    ];
    tutState.handCards = [
      { topVal: 4, topCol: 'blue', botVal: 0, botCol: 'green', topIsWild: false, botIsWild: false }
    ];
  } else if (stepNum === 3) {
    titleEl.innerText = tr('help_step_3_title', 'Langkah 3: Putar Kartu & Kepuasan Warga');
    descEl.innerHTML = tr(
      'help_step_3_desc',
      'Distrik ini sedang krisis (Happiness <b>25%</b>) karena kekurangan Rumah Tapak (angka 1). Klik <b>🔄 Putar</b> pada kartu tangan agar angka 1 berada di atas, lalu tukar ke petak ke-3 untuk menaikkan kepuasan warga!<div class="tut-click-tip">💡 <b>Info:</b> Badge status kepuasan (😊/⚠️) bisa kamu klik untuk melihat zonasi apa saja yang dibutuhkan warga.</div>'
    );
    statusEl.innerText = tr('help_step_3_status', 'Target: Naikkan Happiness ≥ 50%');
    tutState.poolCards = [
      { topVal: 0, topCol: 'blue', botVal: 6, botCol: 'green', topIsWild: false, botIsWild: false },
      { topVal: 3, topCol: 'green', botVal: 4, botCol: 'red', topIsWild: false, botIsWild: false },
      { topVal: 5, topCol: 'amber', botVal: 2, botCol: 'blue', topIsWild: false, botIsWild: false },
      { topVal: 0, topCol: 'red', botVal: 3, botCol: 'green', topIsWild: false, botIsWild: false },
      { topVal: 6, topCol: 'blue', botVal: 0, botCol: 'red', topIsWild: false, botIsWild: false }
    ];
    tutState.handCards = [
      { topVal: 5, topCol: 'amber', botVal: 1, botCol: 'green', topIsWild: false, botIsWild: false }
    ];
  } else if (stepNum === 4) {
    titleEl.innerText = tr('help_step_4_title', 'Langkah 4: Kekuatan Bintang (Wild ⭐)');
    descEl.innerHTML = tr(
      'help_step_4_desc',
      'Petak ⭐ adalah Wild Angka. Klik petak ⭐ pada kartu ke-3, lalu pilih angka <b>3</b> pada jendela opsi untuk melengkapi <b>Straight Flush (1-2-3-4-5 Biru)</b>!'
    );
    statusEl.innerText = tr('help_step_4_status', 'Target: Ubah ⭐ jadi 3');
    tutState.poolCards = [
      { topVal: 1, topCol: 'blue', botVal: 2, botCol: 'green', topIsWild: false, botIsWild: false },
      { topVal: 2, topCol: 'blue', botVal: 3, botCol: 'red', topIsWild: false, botIsWild: false },
      { topVal: 0, topCol: 'blue', botVal: 4, botCol: 'green', topIsWild: true, botIsWild: false },
      { topVal: 4, topCol: 'blue', botVal: 5, botCol: 'red', topIsWild: false, botIsWild: false },
      { topVal: 5, topCol: 'blue', botVal: 6, botCol: 'green', topIsWild: false, botIsWild: false }
    ];
    tutState.handCards = [];
  }

  renderTutSandbox();
}

function createTutDomino(card, isDistrict = false, idx = 0) {
  const dom = document.createElement('div');
  dom.className = 'domino';
  const wildTooltip = (typeof t === 'function')? t('wild_tooltip'): 'Wild Angka: Klik untuk ganti angka';

  const topHalf = document.createElement('div');
  topHalf.className = `domino-half c-${card.topCol}${card.topIsWild? ' is-wild': ''}`;
  topHalf.innerHTML = `
    ${getBuildingSvg(card.topVal, 17)}
    <span class="domino-num">${card.topVal}</span>
    ${card.topIsWild? '<span class="super-wild-tag">⭐</span>': ''}
  `;
  if (card.topIsWild) {
    topHalf.title = wildTooltip;
    topHalf.onclick = (e) => {
      e.stopPropagation();
      openWildPicker(card, 'topVal', true);
    };
  }

  const botHalf = document.createElement('div');
  botHalf.className = `domino-half c-${card.botCol}${card.botIsWild? ' is-wild': ''}`;
  botHalf.innerHTML = `
    ${getBuildingSvg(card.botVal, 17)}
    <span class="domino-num">${card.botVal}</span>
    ${card.botIsWild? '<span class="super-wild-tag">⭐</span>': ''}
  `;
  if (card.botIsWild) {
    botHalf.title = wildTooltip;
    botHalf.onclick = (e) => {
      e.stopPropagation();
      openWildPicker(card, 'botVal', true);
    };
  }

  dom.appendChild(topHalf);
  dom.appendChild(botHalf);

  if (isDistrict) {
    if (tutState.selectedPoolIdx === idx) {
      dom.classList.add('selected-tile');
    }
    dom.onclick = () => onTutDistrictTileClick(idx);
  } else {
    if (tutState.selectedHandIdx === idx) {
      dom.classList.add('selected-tile');
    }
    dom.onclick = () => onTutHandTileClick(idx);
  }

  return dom;
}

function renderTutSandbox() {
  const dRow = document.getElementById('tut-district-row');
  if (!dRow) return;
  dRow.innerHTML = '';

  const happyInfo = getTutHappiness();
  const happyBadge = document.getElementById('tut-happy-badge');
  if (happyBadge) {
    happyBadge.className = `district-happy-badge ${happyInfo.class}`;
    happyBadge.innerText = happyInfo.label;
  }

  const track = document.createElement('div');
  track.className = 'domino-tiles-track';
  tutState.poolCards.forEach((c, idx) => {
    track.appendChild(createTutDomino(c, true, idx));
  });
  dRow.appendChild(track);

  const topCells = tutState.poolCards.map(c => ({ val: c.topVal, col: c.topCol }));
  const botCells = tutState.poolCards.map(c => ({ val: c.botVal, col: c.botCol }));

  const evaluateTutLine = (cells) => {
    let bestScore = 0;
    let bestName = (typeof t === 'function')? t('combo_none'): 'Nihil';
    const allCombos = ['straight_flush', 'five_kind', 'four_kind', 'full_house', 'flush', 'straight', 'color_boat', 'three_kind', 'two_pair', 'one_pair'];
    for (const id of allCombos) {
      const match = checkCombo(cells, id);
      if (match.isValid) {
        if (MASTER_COMBOS[id].pts > bestScore) {
          bestScore = MASTER_COMBOS[id].pts;
          bestName = MASTER_COMBOS[id].name;
        }
      }
    }
    return { name: bestName, pts: bestScore };
  };

  const topEval = evaluateTutLine(topCells);
  const botEval = evaluateTutLine(botCells);

  const sidebar = document.createElement('div');
  sidebar.className = 'row-score-sidebar';

  const topBadge = document.createElement('div');
  topBadge.className = `line-score-badge ${topEval.pts > 0? 'has-score': ''}`;
  topBadge.innerHTML = `<span>${topEval.name}</span><span class="line-score-pts">${topEval.pts}</span>`;

  const botBadge = document.createElement('div');
  botBadge.className = `line-score-badge ${botEval.pts > 0? 'has-score': ''}`;
  botBadge.innerHTML = `<span>${botEval.name}</span><span class="line-score-pts">${botEval.pts}</span>`;

  sidebar.appendChild(topBadge);
  sidebar.appendChild(botBadge);
  dRow.appendChild(sidebar);

  const hRow = document.getElementById('tut-hand-row');
  hRow.innerHTML = '';
  const handBox = document.getElementById('tut-hand-box');

  if (tutState.currentStep === 4) {
    handBox.style.display = 'none';
  } else {
    handBox.style.display = 'flex';
    tutState.handCards.forEach((c, idx) => {
      const wrap = document.createElement('div');
      wrap.className = 'hand-domino-wrapper';

      const dom = createTutDomino(c, false, idx);
      dom.ondblclick = (e) => {
        e.stopPropagation();
        flipTutHandCard(idx);
      };

      const rotBtn = document.createElement('button');
      rotBtn.className = 'btn-rotate-mini';
      rotBtn.innerText = (typeof t === 'function')? t('btn_flip'): '🔄 Putar';
      rotBtn.onclick = (e) => {
        e.stopPropagation();
        flipTutHandCard(idx);
      };

      wrap.appendChild(dom);
      wrap.appendChild(rotBtn);
      hRow.appendChild(wrap);
    });
  }

  const btnAction = document.getElementById('btn-tut-action');
  if (btnAction) {
    btnAction.disabled = (tutState.selectedPoolIdx === null || tutState.selectedHandIdx === null || tutState.isCompleted);
  }
}

function onTutDistrictTileClick(idx) {
  if (tutState.isCompleted || tutState.currentStep === 4) return;
  tutState.selectedPoolIdx = (tutState.selectedPoolIdx === idx)? null: idx;
  renderTutSandbox();
}

function onTutHandTileClick(idx) {
  if (tutState.isCompleted) return;
  tutState.selectedHandIdx = (tutState.selectedHandIdx === idx)? null: idx;
  renderTutSandbox();
}

function flipTutHandCard(idx) {
  const card = tutState.handCards[idx];
  const tempVal = card.topVal;
  const tempCol = card.topCol;
  const tempWild = card.topIsWild;

  card.topVal = card.botVal;
  card.topCol = card.botCol;
  card.topIsWild = card.botIsWild;

  card.botVal = tempVal;
  card.botCol = tempCol;
  card.botIsWild = tempWild;

  renderTutSandbox();
}

function executeTutAction() {
  if (tutState.selectedPoolIdx === null || tutState.selectedHandIdx === null || tutState.isCompleted) return;

  const pIdx = tutState.selectedPoolIdx;
  const hIdx = tutState.selectedHandIdx;

  const tempCard = tutState.poolCards[pIdx];
  tutState.poolCards[pIdx] = tutState.handCards[hIdx];
  tutState.handCards[hIdx] = tempCard;

  tutState.selectedPoolIdx = null;
  tutState.selectedHandIdx = null;

  renderTutSandbox();

  const fb = document.getElementById('tut-feedback');
  const fbText = document.getElementById('tut-feedback-text');
  const btnNext = document.getElementById('btn-tut-next');
  btnNext.onclick = nextTutStep;
  const tr = (k, fbFallback) => (typeof t === 'function'? t(k): fbFallback);

  if (tutState.currentStep === 2) {
    const allFours = tutState.poolCards.every(c => c.topVal === 4);
    if (allFours) {
      tutState.isCompleted = true;
      fb.style.display = 'flex';
      fbText.innerHTML = tr('help_step_2_fb_ok', '🎉 <b>Five of a Kind terbentuk (+30 pt)!</b> Baris atas dan bawah dinilai secara mandiri.');
      btnNext.innerText = tr('help_btn_next_step_3', 'Lanjut ke Langkah 3 ➔');
    } else {
      fb.style.display = 'flex';
      fbText.innerHTML = tr('help_step_2_fb_fail', '⚠️ Belum Five of a Kind. Klik <b>↺ Ulangi</b> lalu tukar dengan petak ke-5 yang bernilai 2.');
      btnNext.innerText = tr('help_btn_close_info', 'Tutup Info');
      btnNext.onclick = () => { fb.style.display = 'none'; };
    }
  } else if (tutState.currentStep === 3) {
    if (tutState.poolCards[2].topVal === 1) {
      tutState.isCompleted = true;
      fb.style.display = 'flex';
      fbText.innerHTML = tr('help_step_3_fb_ok', '🎉 <b>Happiness naik ke 75%!</b> Memutar kartu 180° memastikan zonasi yang dibutuhkan warga masuk ke posisi yang tepat. Ingat: minimal 50% di akhir game agar tidak kalah!');
      btnNext.innerText = tr('help_btn_next_step_4', 'Lanjut ke Langkah 4 ➔');
    } else {
      fb.style.display = 'flex';
      fbText.innerHTML = tr('help_step_3_fb_fail', '⚠️ Angka 1 belum berada di atas (Happiness masih 25%). Klik <b>↺ Ulangi</b>, tekan 🔄 pada kartu tangan, lalu tukar ke petak ke-3.');
      btnNext.innerText = tr('help_btn_close_info', 'Tutup Info');
      btnNext.onclick = () => { fb.style.display = 'none'; };
    }
  }
}

function onTutWildPicked(val) {
  renderTutSandbox();
  const fb = document.getElementById('tut-feedback');
  const fbText = document.getElementById('tut-feedback-text');
  const btnNext = document.getElementById('btn-tut-next');
  const tr = (k, fbFallback, p) => (typeof t === 'function'? t(k, p): fbFallback);

  if (val === 3) {
    tutState.isCompleted = true;
    fb.style.display = 'flex';
    fbText.innerHTML = tr('help_step_4_fb_ok', '🎉 <b>Straight Flush 40 pt aktif!</b> Angka petak ⭐ bisa kamu ubah kapan saja tanpa memakan giliran aksi.');
    btnNext.innerText = tr('help_btn_finish', 'Selesai & Mulai Main! 🚀');
    btnNext.onclick = nextTutStep;
  } else {
    fb.style.display = 'flex';
    fbText.innerHTML = tr('help_step_4_fb_fail', `⚠️ Petak berubah jadi ${val}. Klik ⭐ lagi lalu pilih angka <b>3</b> untuk melengkapi urutan Straight Flush (1-2-3-4-5).`, { val });
    btnNext.innerText = tr('help_btn_ok', 'Oke');
    btnNext.onclick = () => { fb.style.display = 'none'; };
  }
}

function nextTutStep() {
  if (tutState.currentStep < 4) {
    loadTutStep(tutState.currentStep + 1);
  } else {
    closeHelpModal();
  }
}

function resetTutStep() {
  loadTutStep(tutState.currentStep);
}