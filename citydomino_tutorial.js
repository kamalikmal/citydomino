/* =============================================================
   CITY DOMINO - SIMULASI ON-RAILS MENGGUNAKAN ENGINE & UI ASLI GAME
   Terintegrasi dengan citydomino_i18n.js
   ============================================================= */
(function (window) {
  const TUTORIAL_POLICY = {
    get name() {
      return typeof t === 'function'? t('tut_policy_name'): 'Rencana Metropolitan';
    },
    rawName: 'Rencana Metropolitan',
    active: ['straight_flush', 'five_kind', 'four_kind', 'full_house', 'three_kind', 'two_pair'],
    fav: { left: 3, center: 3, right: 3 }
  };

  function makeCard(id, topVal, topCol, botVal, botCol) {
    return {
      id: id,
      set: (topCol === 'blue' || topCol === 'green')? 1: 2,
      topVal: topVal,
      topCol: topCol,
      botVal: botVal,
      botCol: botCol,
      topIsWild: false,
      botIsWild: false,
      isDouble: (topVal === botVal)
    };
  }

  function createScriptedData() {
    return {
      // Kartu khusus: Sisi atas [4 Amber] = Wild (⭐), Sisi bawah [3 Blue] = Bonus (+3)
      specialCard: makeCard(999, 4, 'amber', 3, 'blue'),
      pools: {
        left: [
          // Baris 1
          makeCard(101, 6, 'green', 3, 'blue'),
          makeCard(102, 6, 'blue',  4, 'green'),
          makeCard(103, 2, 'amber', 5, 'red'),
          makeCard(104, 6, 'red',   3, 'blue'),
          makeCard(105, 6, 'amber', 4, 'green'),
          // Baris 2
          makeCard(106, 0, 'green', 1, 'blue'),
          makeCard(107, 3, 'blue',  2, 'amber'),
          makeCard(108, 4, 'red',   5, 'green'),
          makeCard(109, 0, 'amber', 2, 'red'),
          makeCard(110, 3, 'green', 5, 'blue'),
          // Baris 3
          makeCard(111, 3, 'red',   5, 'green'),
          makeCard(112, 4, 'blue',  2, 'blue'),
          makeCard(113, 5, 'amber', 3, 'amber'),
          makeCard(114, 4, 'green', 6, 'red'),
          makeCard(115, 2, 'red',   4, 'green')
        ],
        center: [
          // Baris 1
          makeCard(201, 3, 'blue',  4, 'green'),
          makeCard(202, 3, 'green', 4, 'amber'),
          makeCard(203, 1, 'red',   5, 'blue'),
          makeCard(204, 3, 'amber', 2, 'red'),
          makeCard(205, 3, 'red',   2, 'green'),
          // Baris 2
          makeCard(206, 6, 'green', 1, 'blue'),
          makeCard(207, 6, 'blue',  1, 'green'),
          makeCard(208, 6, 'amber', 5, 'amber'),
          makeCard(209, 6, 'red',   5, 'red'),
          makeCard(210, 2, 'blue',  1, 'amber'),
          // Baris 3
          makeCard(211, 6, 'green', 1, 'red'),
          makeCard(212, 6, 'red',   1, 'blue'),
          makeCard(213, 2, 'amber', 5, 'green'),
          makeCard(214, 2, 'blue',  5, 'amber'),
          makeCard(215, 3, 'green', 0, 'blue')
        ],
        right: [
          // Baris 1
          makeCard(301, 5, 'red',   1, 'blue'),
          makeCard(302, 5, 'blue',  1, 'green'),
          makeCard(303, 3, 'amber', 4, 'red'),
          makeCard(304, 5, 'green', 1, 'amber'),
          makeCard(305, 2, 'amber', 1, 'red'),
          // Baris 2
          makeCard(306, 3, 'blue',  4, 'green'),
          makeCard(307, 3, 'green', 4, 'amber'),
          makeCard(308, 0, 'red',   6, 'blue'),
          makeCard(309, 3, 'amber', 6, 'green'),
          makeCard(310, 0, 'blue',  6, 'red'),
          // Baris 3
          makeCard(311, 3, 'red',   4, 'blue'),
          makeCard(312, 3, 'amber', 4, 'green'),
          makeCard(313, 3, 'green', 4, 'amber'),
          makeCard(314, 0, 'blue',  1, 'red'),
          makeCard(315, 0, 'amber', 6, 'green')
        ]
      },
      hand: [
        makeCard(401, 1, 'green', 6, 'amber'),
        // Kartu 2: Sisi atas 4 amber otomatis menjadi Wild ⭐
        Object.assign(makeCard(402, 4, 'amber', 5, 'red'), { topIsWild: true }),
        // Kartu 3: Sisi atas 3 blue otomatis mendapat bonus +3
        makeCard(403, 3, 'blue',  4, 'green'),
        makeCard(404, 0, 'green', 0, 'blue'),
        makeCard(405, 5, 'red',   2, 'amber')
      ],
      timerDeck: [
        makeCard(501, 6, 'amber', 5, 'blue'),
        makeCard(502, 4, 'blue',  1, 'green'),
        makeCard(503, 2, 'green', 3, 'blue'),
        makeCard(504, 0, 'red',   6, 'amber'),
        makeCard(505, 5, 'blue',  4, 'green')
      ]
    };
  }

  let isTutorialActive = false;
  let currentStepIdx = 0;
  let activeSpotlightTarget = null;
  let activeSpotlightEls = [];
  let isAdvancingStep = false;
  let shields = [];
  let highlightedDomIds = [];
  let highlightedWinningHalves = [];
  let savedRenderFns = null;

  function syncTutorialDomHooks() {
    if (!isTutorialActive) return;

    const districtMap = [
      { key: 'left', prefix: 'west' },
      { key: 'center', prefix: 'mid' },
      { key: 'right', prefix: 'east' }
    ];

    districtMap.forEach(({ key, prefix }) => {
      const gridEl = document.getElementById(`grid-${key}`);
      if (!gridEl) return;

      const rows = gridEl.querySelectorAll('.domino-row-pair');
      rows.forEach((rowEl, rIdx) => {
        rowEl.id = `tut-row-${key}-${rIdx}`;
      });

      const allDoms = gridEl.querySelectorAll('.domino');
      allDoms.forEach((domEl, idx) => {
        const rIdx = Math.floor(idx / 5);
        const cIdx = idx % 5;
        domEl.id = `tut-${prefix}-${rIdx}-${cIdx}`;
      });
    });

    const handContainer = document.getElementById('hand-cards-container');
    if (handContainer) {
      const wraps = handContainer.querySelectorAll('.hand-domino-wrapper');
      wraps.forEach((wrapEl, idx) => {
        wrapEl.id = `tut-hand-wrap-${idx}`;
        const domEl = wrapEl.querySelector('.domino');
        if (domEl) domEl.id = `tut-hand-card-${idx}`;
        const rotBtn = wrapEl.querySelector('.btn-rotate-mini');
        if (rotBtn) rotBtn.id = `tut-hand-rot-${idx}`;
      });
    }
  }

  function installRenderHooks() {
    if (savedRenderFns) return;
    savedRenderFns = {
      renderPools: window.renderPools,
      renderHand: window.renderHand,
      renderMasterPlan: window.renderMasterPlan,
      renderAll: window.renderAll
    };

    window.renderPools = function () {
      const res = savedRenderFns.renderPools.apply(this, arguments);
      syncTutorialDomHooks();
      return res;
    };

    window.renderHand = function () {
      const res = savedRenderFns.renderHand.apply(this, arguments);
      syncTutorialDomHooks();
      return res;
    };

    window.renderMasterPlan = function () {
      const res = savedRenderFns.renderMasterPlan.apply(this, arguments);
      syncTutorialDomHooks();
      return res;
    };

    window.renderAll = function () {
      const res = savedRenderFns.renderAll.apply(this, arguments);
      syncTutorialDomHooks();
      return res;
    };
  }

  function restoreRenderHooks() {
    if (!savedRenderFns) return;
    window.renderPools = savedRenderFns.renderPools;
    window.renderHand = savedRenderFns.renderHand;
    window.renderMasterPlan = savedRenderFns.renderMasterPlan;
    window.renderAll = savedRenderFns.renderAll;
    savedRenderFns = null;
  }

  function clearAllHighlights() {
    highlightedDomIds.forEach(id => {
      const el = (typeof id === 'string')? document.getElementById(id): id;
      if (el) {
        el.classList.remove('tut-combo-highlight');
        el.classList.remove('tutorial-target-highlight');
        el.classList.remove('tut-pos-rel');
        el.classList.remove('tut-button-pulse');
      }
    });
    highlightedDomIds = [];

    highlightedWinningHalves.forEach(el => {
      if (el) el.classList.remove('tut-winning-num');
    });
    highlightedWinningHalves = [];
  }

  function highlightRowWithWinningNumbers(prefix, rowIdx, targetHalf, matchVal) {
    clearAllHighlights();
    syncTutorialDomHooks();
    for (let c = 0; c < 5; c++) {
      const id = `tut-${prefix}-${rowIdx}-${c}`;
      const dom = document.getElementById(id);
      if (dom) {
        dom.classList.add('tut-combo-highlight');
        highlightedDomIds.push(id);

        if (targetHalf === 'both') {
          const halves = dom.querySelectorAll('.domino-half');
          halves.forEach(h => {
            h.classList.add('tut-winning-num');
            highlightedWinningHalves.push(h);
          });
        } else {
          const idxHalf = targetHalf === 'top'? 0: 1;
          const halfEl = dom.querySelectorAll('.domino-half')[idxHalf];
          if (halfEl) {
            const numSpan = halfEl.querySelector('.domino-num');
            if (numSpan && (matchVal === undefined || parseInt(numSpan.textContent, 10) === matchVal)) {
              halfEl.classList.add('tut-winning-num');
              highlightedWinningHalves.push(halfEl);
            }
          }
        }
      }
    }
  }

  function clearClickShields() {
    shields.forEach(el => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });
    shields = [];
  }

  function renderClickShields(rect) {
    clearClickShields();
    const overlay = document.getElementById('tutorial-overlay');
    if (!overlay) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (!rect) {
      const full = document.createElement('div');
      full.className = 'tut-click-shield';
      full.style.inset = '0';
      overlay.insertBefore(full, overlay.firstChild);
      shields.push(full);
      return;
    }

    const pad = 4;
    const top = Math.max(0, rect.top - pad);
    const left = Math.max(0, rect.left - pad);
    const right = Math.min(vw, rect.right + pad);
    const bottom = Math.min(vh, rect.bottom + pad);

    const boxes = [
      { t: 0, l: 0, w: vw, h: top },
      { t: bottom, l: 0, w: vw, h: Math.max(0, vh - bottom) },
      { t: top, l: 0, w: left, h: bottom - top },
      { t: top, l: right, w: Math.max(0, vw - right), h: bottom - top }
    ];

    boxes.forEach(b => {
      if (b.w <= 0 || b.h <= 0) return;
      const div = document.createElement('div');
      div.className = 'tut-click-shield';
      div.style.top = `${b.t}px`;
      div.style.left = `${b.l}px`;
      div.style.width = `${b.w}px`;
      div.style.height = `${b.h}px`;
      overlay.insertBefore(div, overlay.firstChild);
      shields.push(div);
    });
  }

  function getSpotlightRect(target) {
    if (!target) return null;
    const els = Array.isArray(target)? target.filter(Boolean): [target];
    if (els.length === 0) return null;

    let minLeft = Infinity;
    let minTop = Infinity;
    let maxRight = -Infinity;
    let maxBottom = -Infinity;

    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.left < minLeft) minLeft = r.left;
      if (r.top < minTop) minTop = r.top;
      if (r.right > maxRight) maxRight = r.right;
      if (r.bottom > maxBottom) maxBottom = r.bottom;
    });

    if (minLeft === Infinity) return null;
    return {
      left: minLeft,
      top: minTop,
      right: maxRight,
      bottom: maxBottom,
      width: maxRight - minLeft,
      height: maxBottom - minTop
    };
  }

  function positionSpotlightAndDialog(target) {
    const cutout = document.getElementById('tutorial-spotlight-cutout');
    const dialog = document.getElementById('tutorial-dialog');
    if (!cutout ||!dialog) return;

    const step = STEPS[currentStepIdx];
    const rect = getSpotlightRect(target);

    if (step && step.dialogPosition === 'top') {
      if (rect) {
        const pad = 6;
        cutout.setAttribute('x', Math.max(0, rect.left - pad));
        cutout.setAttribute('y', Math.max(0, rect.top - pad));
        cutout.setAttribute('width', rect.width + pad * 2);
        cutout.setAttribute('height', rect.height + pad * 2);
        renderClickShields(rect);
      } else {
        cutout.setAttribute('width', '0');
        cutout.setAttribute('height', '0');
        renderClickShields(null);
      }
      dialog.style.position = 'fixed';
      dialog.style.top = '24px';
      dialog.style.bottom = 'auto';
      dialog.style.left = '50%';
      dialog.style.transform = 'translateX(-50%)';
      return;
    }

    if (!rect) {
      cutout.setAttribute('width', '0');
      cutout.setAttribute('height', '0');
      renderClickShields(null);
      dialog.style.top = '50%';
      dialog.style.left = '50%';
      dialog.style.transform = 'translate(-50%, -50%)';
      return;
    }

    const pad = 6;
    cutout.setAttribute('x', Math.max(0, rect.left - pad));
    cutout.setAttribute('y', Math.max(0, rect.top - pad));
    cutout.setAttribute('width', rect.width + pad * 2);
    cutout.setAttribute('height', rect.height + pad * 2);
    renderClickShields(rect);

    const dialogW = 360;
    const dialogH = dialog.offsetHeight || 180;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 12;

    let top = rect.bottom + gap;
    let left = rect.left + (rect.width / 2) - (dialogW / 2);

    if (top + dialogH > vh - 12) {
      if (rect.right + gap + dialogW <= vw - 12) {
        top = Math.max(12, Math.min(vh - dialogH - 12, rect.top));
        left = rect.right + gap;
      } else if (rect.left - dialogW - gap >= 12) {
        top = Math.max(12, Math.min(vh - dialogH - 12, rect.top));
        left = rect.left - dialogW - gap;
      } else {
        top = Math.max(12, rect.top - dialogH - gap);
      }
    }

    left = Math.max(12, Math.min(vw - dialogW - 12, left));
    top = Math.max(12, Math.min(vh - dialogH - 12, top));

    dialog.style.top = `${top}px`;
    dialog.style.left = `${left}px`;
    dialog.style.transform = 'none';
  }

  function setThreeDistrictsBright(enable) {
    ['left', 'center', 'right'].forEach(k => {
      const pool = document.getElementById(`pool-${k}`);
      if (pool) {
        if (enable) pool.classList.add('tut-force-bright');
        else pool.classList.remove('tut-force-bright');
      }
    });
  }

  const STEPS = [
    // -------------------------------------------------------------
    // LANGKAH 1: PENGENALAN DISTRIK & RUTE PEMBANGUNAN
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 1, max: 24 }): 'Langkah 1/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_1_text')
: 'Tugasmu adalah merancang <strong>3 Distrik Kota</strong>: <strong>Westfall</strong> (kiri), <strong>Midvale</strong> (tengah), dan <strong>Eastgate</strong> (kanan) yang masing-masing terisi penuh 15 domino (3 baris).<br><br>' +
            'Pembangunan tiap fase mengikuti rute berurutan di header atas: dimulai dari <strong>Westfall ➔ Eastgate ➔ Midvale</strong>. Pada fase genap, urutannya berputar menjadi <strong>Eastgate ➔ Westfall ➔ Midvale</strong>.';
      },
      spotlightResolver: () => [
        document.getElementById('route-container') || document.querySelector('.route-container'),
        document.getElementById('pool-left'),
        document.getElementById('pool-center'),
        document.getElementById('pool-right')
      ].filter(Boolean),
      mode: 'button',
      get buttonText() { return typeof t === 'function'? t('tut_step_1_btn'): 'Pelajari Master Plan ➔'; },
      onStart: () => {
        setThreeDistrictsBright(true);
        const rc = document.getElementById('route-container') || document.querySelector('.route-container');
        if (rc) {
          rc.classList.add('tut-pos-rel', 'tutorial-target-highlight');
          highlightedDomIds.push(rc.id || 'route-container');
        }
        ['left', 'center', 'right'].forEach(k => {
          const p = document.getElementById(`pool-${k}`);
          if (p) {
            p.classList.add('tutorial-target-highlight');
            highlightedDomIds.push(`pool-${k}`);
          }
        });
      },
      onComplete: () => {
        setThreeDistrictsBright(false);
        clearAllHighlights();
        if (typeof updateActiveDistrictClass === 'function') updateActiveDistrictClass();
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 2: PENGENALAN MASTER PLAN (TARGET POIN POKER)
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 2, max: 24 }): 'Langkah 2/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_2_text')
: '<strong>Master Plan Kota (Kotak ke-4):</strong><br>' +
            'Kolom ini menampilkan 6 kontrak kombinasi target kota yang aktif di sesi ini. Susunan yang terbentuk di baris distrik akan menghasilkan poin murni sesuai kontrak:<br>' +
            '<div class="tut-combos-table">' +
              '<div class="tut-combo-item"><span class="c-name">⭐ Str. Flush</span><span class="c-pts">40 pt</span></div>' +
              '<div class="tut-combo-item"><span class="c-name">👑 Five Kind</span><span class="c-pts">30 pt</span></div>' +
              '<div class="tut-combo-item"><span class="c-name">💎 Four Kind</span><span class="c-pts">25 pt</span></div>' +
              '<div class="tut-combo-item"><span class="c-name">🏠 Full House</span><span class="c-pts">20 pt</span></div>' +
              '<div class="tut-combo-item"><span class="c-name">🔷 Three Kind</span><span class="c-pts">15 pt</span></div>' +
              '<div class="tut-combo-item"><span class="c-name">👥 Two Pair</span><span class="c-pts">10 pt</span></div>' +
            '</div>' +
            'Klik kartu kombinasi di kotak Master Plan untuk melihat balon penjelasan aturan skornya!';
      },
      spotlightResolver: () => document.querySelector('.master-plan-box') || document.getElementById('master-plan'),
      mode: 'button',
      get buttonText() { return typeof t === 'function'? t('tut_step_2_btn'): 'Cek Kepuasan Warga ➔'; },
      allowComboClicks: true,
      onComplete: () => {
        if (typeof window.hideComboBalloon === 'function') window.hideComboBalloon();
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 3: INTERAKSI BADGE KEPUASAN WARGA (HAPPINESS)
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 3, max: 24 }): 'Langkah 3/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_3_text')
: 'Selain Master Plan, ada syarat <strong>Kepuasan Warga</strong>. Di Westfall, kepuasan masih 75%. Klik badge <strong>😊 75%</strong> di header Westfall untuk melihat aspirasi warga!';
      },
      spotlightId: 'happy-left',
      clickId: 'happy-left',
      pulseId: 'happy-left',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 4: SPOTLIGHT BALON ASPIRASI + BADGE HAPPINESS
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 4, max: 24 }): 'Langkah 4/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_4_text')
: 'Balon aspirasi warga muncul tepat di bawah badge kepuasan. Kebutuhan <strong>Ekologi (0, 1, 6)</strong> saat ini baru 8/10 (-2). Jika mencapai 10 petak, kepuasan naik menjadi <strong>100% Warga Senang</strong>.';
      },
      spotlightResolver: () => [
        document.getElementById('happy-left'),
        document.getElementById('aspiration-balloon')
      ].filter(Boolean),
      mode: 'button',
      get buttonText() { return typeof t === 'function'? t('tut_step_4_btn'): 'Paham, Cek Skor ➔'; },
      allowBalloonInteraction: true,
      onComplete: () => {
        if (typeof window.hideAspirationBalloon === 'function') window.hideAspirationBalloon();
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 5: INTERAKSI ANGKA SKOR DISTRIK
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 5, max: 24 }): 'Langkah 5/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_5_text')
: 'Klik angka skor di header Westfall untuk melihat rincian kalkulasi poin poker saat ini!';
      },
      spotlightId: 'score-left',
      clickId: 'score-left',
      pulseId: 'score-left',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 6: SPOTLIGHT BALON RINCIAN SKOR + TOMBOL SKOR
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 6, max: 24 }): 'Langkah 6/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_6_text')
: 'Rumus skor akhir: <strong>Poin Master Plan × % Kepuasan Warga</strong>.<br><br>Sekarang mari kita praktikkan: penuhi Ekologi sekaligus bentuk <strong>Five of a Kind</strong> di Baris 1 Westfall!';
      },
      spotlightResolver: () => [
        document.getElementById('score-left'),
        document.getElementById('score-balloon')
      ].filter(Boolean),
      mode: 'button',
      get buttonText() { return typeof t === 'function'? t('tut_step_6_btn'): 'Mulai Menukar ➔'; },
      allowBalloonInteraction: true,
      onComplete: () => {
        if (typeof window.hideScoreBalloon === 'function') window.hideScoreBalloon();
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 7: PUTAR KARTU TANGAN [1|6] MENJADI [6|1]
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 7, max: 24 }): 'Langkah 7/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_7_text')
: 'Perhatikan kartu tangan pertama <strong>[1|6]</strong>. Klik tombol <strong>🔄 Putar</strong> yang menyala di bawahnya agar angka <strong>6</strong> pindah ke atas menjadi <strong>[6|1]</strong>.';
      },
      spotlightId: 'tut-hand-wrap-0',
      clickId: 'tut-hand-rot-0',
      pulseId: 'tut-hand-rot-0',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 8: PILIH KARTU TANGAN [6|1]
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 8, max: 24 }): 'Langkah 8/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_8_text')
: 'Klik kartu tangan <strong>[6|1]</strong> yang baru kamu putar untuk memilihnya.';
      },
      spotlightId: 'tut-hand-card-0',
      clickId: 'tut-hand-card-0',
      pulseId: 'tut-hand-card-0',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 9: PILIH PETAK TARGET DI BARIS 1 WESTFALL
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 9, max: 24 }): 'Langkah 9/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_9_text')
: 'Perhatikan Baris 1 Westfall: ada empat angka 6 di atas. Klik kartu petak ke-3 <strong>[2|5]</strong> yang berkedip menyala untuk ditukar!';
      },
      spotlightId: 'tut-row-left-0',
      clickId: 'tut-west-0-2',
      pulseId: 'tut-west-0-2',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 10: EKSEKUSI TUKAR (RUTE: WESTFALL ➔ EASTGATE)
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 10, max: 24 }): 'Langkah 10/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_10_text')
: 'Lihat indikator rute di header atas: <strong>Westfall ➔ Eastgate ➔ Midvale</strong>. Tombol aksi kini bertuliskan <strong>Tukar (Next: Eastgate)</strong>. Klik tombol ini!';
      },
      spotlightId: 'btn-action',
      clickId: 'btn-action',
      pulseId: 'btn-action',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 11: EVALUASI DISTRIK WESTFALL
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 11, max: 24 }): 'Langkah 11/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_11_text')
: 'Bagus! Westfall kini memiliki susunan <strong>Flush 6</strong> (semua angka 6). Perhatikan skor dan status kebahagiaan warga yang melonjak!';
      },
      spotlightResolver: () => {
        const row = document.getElementById('tut-row-left-0') || document.getElementById('pool-left');
        const header = document.querySelector('#pool-left.pool-header-actions') || document.querySelectorAll('.pool-header-actions')[0];
        return [header, row].filter(Boolean);
      },
      dialogPosition: 'bottom',
      mode: 'button',
      get buttonText() { return typeof t === 'function'? t('tut_step_11_btn'): 'Lanjut ke Kartu Wild ➔'; },
      clickResolver: () => document.getElementById('tut-row-left-0') || document.getElementById('pool-left'),
      onStart: () => {
        highlightRowWithWinningNumbers('west', 0, 'top', 6);
        const header = document.querySelector('#pool-left.pool-header-actions') || document.querySelectorAll('.pool-header-actions')[0];
        if (header) {
          header.classList.add('tut-pos-rel', 'tutorial-target-highlight');
          highlightedDomIds.push(header);
        }
      },
      onComplete: () => {
        clearAllHighlights();
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 12: PENGENALAN WILD DARI KARTU KHUSUS [4|3]
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 12, max: 24 }): 'Langkah 12/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_12_text')
: 'Perhatikan <strong>Kotak Kartu Khusus [4|3]</strong> di kanan atas! Sisi atas <strong>[4⭐]</strong> menentukan angka <strong>Wild</strong>. Setiap kartu berangka 4 amber otomatis memiliki tanda <strong>⭐</strong>, seperti kartu tangan keduamu <strong>[4⭐|5]</strong>.<br><br>Klik petak <strong>⭐</strong> pada kartu tangan tersebut untuk menentukan angkanya terlebih dahulu!';
      },
      spotlightResolver: () => {
        const specialSec = document.querySelector('.special-section');
        const col6 = specialSec? specialSec.closest('.panel,.pool-column, div'): null;
        const panelHeader = col6? col6.querySelector('.panel-header-simple'): document.querySelector('.panel-header-simple');
        const handCard = document.getElementById('tut-hand-card-1');

        return [
          panelHeader,
          specialSec,
          handCard
        ].filter(Boolean);
      },
      clickResolver: () => {
        const card = document.getElementById('tut-hand-card-1');
        if (!card) return null;
        return card.querySelector('.domino-half.is-wild') || card;
      },
      pulseId: 'tut-hand-card-1',
      mode: 'click',
      onComplete: () => {
        if (typeof window.openWildPicker === 'function' && state && state.hand && state.hand[1]) {
          window.openWildPicker(state.hand[1], 'topVal', true);
        }
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 13: GANTI ANGKA 4 MENJADI 2 DI WILD PICKER
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 13, max: 24 }): 'Langkah 13/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_13_text')
: 'Di jendela Wild Picker, ubah angka 4 menjadi <strong>2</strong> untuk melengkapi susunan Full House (tiga 5 dan dua 2) di Eastgate nanti!';
      },
      spotlightResolver: () => document.getElementById('wild-modal') || document.querySelector('.wild-modal-content'),
      dialogPosition: 'top',
      mode: 'click',
      clickResolver: () => {
        return Array.from(document.querySelectorAll('.btn-wild-opt')).find(btn => {
          const sp = btn.querySelector('span');
          return (sp? sp.textContent.trim(): btn.textContent.trim()) === '2';
        }) || document.getElementById('wild-picker-options');
      },
      onStart: () => {
        const modal = document.getElementById('wild-modal');
        if (!modal || modal.style.display!== 'flex') {
          if (typeof window.openWildPicker === 'function' && state && state.hand && state.hand[1]) {
            window.openWildPicker(state.hand[1], 'topVal', true);
          }
        }
        
        // Cari tombol angka 2 dan berikan efek denyut kuning terang
        const opt2 = Array.from(document.querySelectorAll('.btn-wild-opt')).find(btn => {
          const sp = btn.querySelector('span');
          return (sp? sp.textContent.trim(): btn.textContent.trim()) === '2';
        });

        if (opt2) {
          opt2.classList.add('tut-button-pulse');
          opt2.style.borderColor = '#facc15';
          opt2.style.boxShadow = '0 0 14px rgba(250, 204, 21, 0.85)';
        }
      },
      onComplete: () => {
        const opt2 = Array.from(document.querySelectorAll('.btn-wild-opt')).find(btn => {
          const sp = btn.querySelector('span');
          return (sp? sp.textContent.trim(): btn.textContent.trim()) === '2';
        });
        if (opt2) {
          opt2.classList.remove('tut-button-pulse');
          opt2.style.borderColor = '';
          opt2.style.boxShadow = '';
        }

        if (state && state.hand && state.hand[1]) {
          state.hand[1].topVal = 2;
        }
        if (typeof window.closeWildPicker === 'function') {
          window.closeWildPicker();
        }
        if (typeof window.renderAll === 'function') {
          window.renderAll();
        }
        syncTutorialDomHooks();
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 14: PILIH KARTU TANGAN [2|5]
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 14, max: 24 }): 'Langkah 14/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_14_text')
: 'Kartu tanganmu kini sudah bernilai <strong>[2|5]</strong>. Klik kontraktor tersebut untuk memilihnya!';
      },
      spotlightId: 'tut-hand-card-1',
      clickId: 'tut-hand-card-1',
      pulseId: 'tut-hand-card-1',
      mode: 'click',
      onStart: () => {
        // Nonaktifkan sementara buka modal agar klik pada angka 2 tidak membuka modal lagi
        if (typeof window.openWildPicker === 'function') {
          window._tempWildPickerBackup = window.openWildPicker;
          window.openWildPicker = () => {};
        }

        // Matikan pointer-events paruh kartu agar klik membubble langsung ke kartu tangan utama
        const card = document.getElementById('tut-hand-card-1');
        if (card) {
          card.querySelectorAll('.domino-half').forEach(half => {
            half.style.pointerEvents = 'none';
          });
        }
      },
      onComplete: () => {
        if (window._tempWildPickerBackup) {
          window.openWildPicker = window._tempWildPickerBackup;
          delete window._tempWildPickerBackup;
        }

        const card = document.getElementById('tut-hand-card-1');
        if (card) {
          card.querySelectorAll('.domino-half').forEach(half => {
            half.style.pointerEvents = '';
          });
        }

        if (state) {
          state.selectedHandTile = 1;
        }
        if (typeof window.closeWildPicker === 'function') {
          window.closeWildPicker();
        }
        if (typeof window.renderHand === 'function') {
          window.renderHand();
        }
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 15: TUKAR KE PETAK KE-3 EASTGATE
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 15, max: 24 }): 'Langkah 15/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_15_text')
: 'Lihat Baris 1 Eastgate: sudah ada angka 5 dan 2 di atas. Klik kartu petak ke-3 <strong>[3|4]</strong> yang berkedip menyala untuk ditukar dengan [2|5]!';
      },
      spotlightId: 'pool-right',
      clickId: 'tut-east-0-2',
      pulseId: 'tut-east-0-2',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 16: EKSEKUSI TUKAR (RUTE: EASTGATE ➔ MIDVALE)
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 16, max: 24 }): 'Langkah 16/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_16_text')
: 'Rute berikutnya menuju Midvale. Klik tombol <strong>Tukar (Next: Midvale)</strong>.';
      },
      spotlightId: 'btn-action',
      clickId: 'btn-action',
      pulseId: 'btn-action',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 17: EVALUASI FULL HOUSE EASTGATE
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 17, max: 24 }): 'Langkah 17/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_17_text')
: '<div class="tut-winning-badge">🎉 HASIL TUKAR BARIS 1:</div><br>' +
            '• Baris atas Eastgate sukses membentuk <strong>Full House (Tiga 5 & Dua 2)</strong>! Poin: <strong>+20 pt</strong>.<br>' +
            '• Nilai 2 dan 5 masuk pilar <strong>Bisnis (2, 5, 6)</strong>, menaikkan kepuasan warga Eastgate menjadi <strong>😊 100%</strong>!';
      },
      spotlightResolver: () => {
        const row = document.getElementById('tut-row-right-0') || document.getElementById('pool-right');
        const header = document.querySelector('#pool-right.pool-header-actions') || document.querySelectorAll('.pool-header-actions')[2];
        return [header, row].filter(Boolean);
      },
      mode: 'button',
      get buttonText() { return typeof t === 'function'? t('tut_step_17_btn'): 'Lanjut ke Midvale ➔'; },
      clickResolver: () => document.getElementById('tut-row-right-0') || document.getElementById('pool-right'),
      onStart: () => {
        highlightRowWithWinningNumbers('east', 0, 'top');
        const header = document.querySelector('#pool-right.pool-header-actions') || document.querySelectorAll('.pool-header-actions')[2];
        if (header) {
          header.classList.add('tut-pos-rel', 'tutorial-target-highlight');
          highlightedDomIds.push(header);
        }
      },
      onComplete: () => {
        clearAllHighlights();
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 18: KARTU BONUS EKSTRA [+3]
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 18, max: 24 }): 'Langkah 18/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_18_text')
: 'Sekarang lihat sisi bawah Kartu Khusus: <strong>[+3 | 3]</strong>. Setiap petak angka 3 biru yang masuk ke kombo sah akan memberi <strong>Bonus +3 Poin Ekstra</strong>!<br><br>Perhatikan kartu tanganmu <strong>[3|4]</strong> yang memiliki tag emas <strong>+3</strong>. Klik kartu ini!';
      },
      spotlightResolver: () => [
        document.getElementById('special-card-render'),
        document.getElementById('tut-hand-card-2')
      ].filter(Boolean),
      clickId: 'tut-hand-card-2',
      pulseId: 'tut-hand-card-2',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 19: PILIH PETAK KE-3 MIDVALE
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 19, max: 24 }): 'Langkah 19/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_19_text')
: 'Lihat Baris 1 Midvale: sudah ada empat angka 3 di atas dan angka 4 & 2 di bawah. Klik kartu petak ke-3 <strong>[1|5]</strong> yang berkedip menyala!';
      },
      spotlightId: 'pool-center',
      clickId: 'tut-mid-0-2',
      pulseId: 'tut-mid-0-2',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 20: EKSEKUSI TUKAR (RUTE: MENUJU DECK)
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 20, max: 24 }): 'Langkah 20/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_20_text')
: 'Semua distrik telah ditata. Klik tombol <strong>Tukar (Next: Bursa)</strong>.';
      },
      spotlightId: 'btn-action',
      clickId: 'btn-action',
      pulseId: 'btn-action',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 21: EVALUASI KOMBO GANDA MIDVALE
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 21, max: 24 }): 'Langkah 21/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_21_text')
: '<div class="tut-winning-badge">🎉 HASIL TUKAR BARIS 1:</div><br>' +
            '• <strong>KOMBO GANDA!</strong> Baris atas membentuk <strong>Five of a Kind (3-3-3-3-3)</strong> senilai <strong>+30 pt</strong>!<br>' +
            '• Baris bawah melengkapi <strong>Full House (Tiga 4 & Dua 2)</strong> senilai <strong>+20 pt</strong>!<br>' +
            '• <strong>Bonus Kartu Khusus:</strong> Petak [3] biru menyumbang tambahan <strong>+3 poin ekstra</strong>!<br>' +
            '• Midvale resmi mencapai status <strong>😊 100%</strong>!';
      },
      spotlightResolver: () => {
        const row = document.getElementById('tut-row-center-0') || document.getElementById('pool-center');
        const header = document.querySelector('#pool-center.pool-header-actions') || document.querySelectorAll('.pool-header-actions')[1];
        return [header, row].filter(Boolean);
      },
      mode: 'button',
      get buttonText() { return typeof t === 'function'? t('tut_step_21_btn'): 'Masuk Akhir Fase ➔'; },
      clickResolver: () => document.getElementById('tut-row-center-0') || document.getElementById('pool-center'),
      onStart: () => {
        highlightRowWithWinningNumbers('mid', 0, 'both');
        const header = document.querySelector('#pool-center.pool-header-actions') || document.querySelectorAll('.pool-header-actions')[1];
        if (header) {
          header.classList.add('tut-pos-rel', 'tutorial-target-highlight');
          highlightedDomIds.push(header);
        }
      },
      onComplete: () => {
        clearAllHighlights();
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 22: TAHAP AKHIR FASE (PILIH SISA KARTU TANGAN)
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 22, max: 24 }): 'Langkah 22/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_22_text')
: '<strong>Tahap Akhir Fase:</strong> Ketiga distrik selesai ditata. Kartu di <strong>Bursa Rekanan</strong> tersimpan tertutup. Klik kartu tangan <strong>[5|2]</strong> yang menyala untuk ditukar dengan kartu teratas Bursa Rekanan!';
      },
      spotlightId: 'tut-hand-card-4',
      clickId: 'tut-hand-card-4',
      pulseId: 'tut-hand-card-4',
      mode: 'click'
    },

    // -------------------------------------------------------------
    // LANGKAH 23: BUANG & AMBIL DECK FASE
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 23, max: 24 }): 'Langkah 23/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_23_text')
: 'Klik tombol <strong>Buang & Ambil Bursa</strong> untuk menarik kartu tertutup dari Bursa Rekanan.';
      },
      spotlightResolver: () => {
        const timerSec = document.querySelector('.timer-section') || document.getElementById('timer-section');
        const btnAction = document.getElementById('btn-action');
        return [timerSec, btnAction].filter(Boolean);
      },
      clickId: 'btn-action',
      pulseId: 'btn-action',
      mode: 'click',
      onStart: () => {
        const timerSec = document.querySelector('.timer-section') || document.getElementById('timer-section');
        if (timerSec) {
          timerSec.classList.add('tut-pos-rel', 'tutorial-target-highlight');
          highlightedDomIds.push(timerSec);
        }
      },
      onComplete: () => {
        clearAllHighlights();
      }
    },

    // -------------------------------------------------------------
    // LANGKAH 24: HASIL DECK & RANGKUMAN SIMULASI
    // -------------------------------------------------------------
    {
      get badge() { return typeof t === 'function'? t('tut_step_badge', { cur: 24, max: 24 }): 'Langkah 24/24'; },
      get text() {
        return typeof t === 'function'
? t('tut_step_24_text')
: '<div class="tut-winning-badge">🔄 BURSA REKANAN TERBUKA:</div><br>' +
            '• Kartu tangan lama <strong>[5|2]</strong> berhasil ditukar menjadi kartu baru dari Bursa Rekanan: <strong>[6|5]</strong>!<br>' +
            '• Nilai <strong>6</strong> dan <strong>5</strong> merupakan amunisi bernilai tinggi untuk distrik Ekologi & Bisnis di Fase 2.<br>' +
            '• Klik tombol di bawah untuk melihat rangkuman hasil simulasi kotamu!';
      },
      spotlightId: 'tut-hand-card-4',
      mode: 'button',
      get buttonText() { return typeof t === 'function'? t('tut_step_24_btn'): 'Lihat Evaluasi Akhir ➔'; },
      onStart: () => {
        const dom = document.getElementById('tut-hand-card-4');
        if (dom) {
          dom.classList.add('tut-combo-highlight');
          highlightedDomIds.push('tut-hand-card-4');
        }
      },
      onComplete: () => {
        clearAllHighlights();
      }
    }
  ];

  function resolveElementByIdOrFallback(id) {
    if (!id) return null;
    syncTutorialDomHooks();
    let el = document.getElementById(id);
    if (el) return el;

    const match = id.match(/^tut-(west|mid|east)-(\d+)-(\d+)$/);
    if (match) {
      const prefixToKey = { west: 'left', mid: 'center', east: 'right' };
      const gridEl = document.getElementById(`grid-${prefixToKey[match[1]]}`);
      if (gridEl) {
        const doms = gridEl.querySelectorAll('.domino');
        const idx = parseInt(match[2], 10) * 5 + parseInt(match[3], 10);
        if (doms[idx]) {
          doms[idx].id = id;
          return doms[idx];
        }
      }
    }
    return null;
  }

  function resolveStepClickElement(step) {
    if (!step) return null;
    if (typeof step.clickResolver === 'function') {
      try {
        return step.clickResolver();
      } catch (err) {
        return null;
      }
    }
    if (step.clickId) return document.getElementById(step.clickId);
    if (step.spotlightId) return document.getElementById(step.spotlightId);
    return null;
  }

  function handleTutorialGlobalClick(e) {
    if (!isTutorialActive) return;

    if (
      e.target.closest('#tutorial-dialog') || 
      e.target.closest('#tutorial-finish-modal')
    ) {
      return;
    }

    const step = STEPS[currentStepIdx];
    if (!step) return;

    // Tangani klik di dalam modal Wild Picker (Langkah 13 / Index 12)
    if (e.target.closest('#wild-modal')) {
      const wildOpt = e.target.closest('.btn-wild-opt');
      if (wildOpt && currentStepIdx === 12) {
        if (isAdvancingStep) return;
        isAdvancingStep = true;
        setTimeout(() => {
          isAdvancingStep = false;
          if (!isTutorialActive) return;
          if (typeof step.onComplete === 'function') {
            step.onComplete();
          }
          executeStep(currentStepIdx + 1);
        }, 40);
      }
      return;
    }

    if (step.allowComboClicks) {
      if (e.target.closest('.combo-card') || e.target.closest('#combo-balloon')) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (step.allowBalloonInteraction) {
      if (e.target.closest('#aspiration-balloon') || e.target.closest('#score-balloon')) {
        return;
      }
    }

    if (step.mode === 'click') {
      const clickEl = resolveStepClickElement(step);
      if (clickEl && clickEl.contains(e.target)) {
        if (isAdvancingStep) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        isAdvancingStep = true;
        setTimeout(() => {
          isAdvancingStep = false;
          if (!isTutorialActive) return;
          if (typeof step.onComplete === 'function') {
            step.onComplete();
          }
          executeStep(currentStepIdx + 1);
        }, 0);
        return;
      }
    }

    e.preventDefault();
    e.stopPropagation();
  }

  function executeStep(index) {
    if (index >= STEPS.length) {
      finishTutorial();
      return;
    }

    currentStepIdx = index;
    const step = STEPS[index];

    activeSpotlightEls.forEach(el => {
      if (el) {
        el.classList.remove('tutorial-target-highlight');
        el.classList.remove('tut-pos-rel');
      }
    });
    activeSpotlightEls = [];
    activeSpotlightTarget = null;

    clearAllHighlights();

    if (index!== 1 && typeof window.hideComboBalloon === 'function') window.hideComboBalloon();
    if (index!== 3 && typeof window.hideAspirationBalloon === 'function') window.hideAspirationBalloon();
    if (index!== 5 && typeof window.hideScoreBalloon === 'function') window.hideScoreBalloon();

    if (typeof step.onStart === 'function') {
      step.onStart();
    }

    syncTutorialDomHooks();

    const badgeEl = document.getElementById('tutorial-step-badge');
    const textEl = document.getElementById('tutorial-dialog-text');
    const nextBtn = document.getElementById('btn-tutorial-next');

    if (badgeEl) badgeEl.textContent = step.badge;
    if (textEl) textEl.innerHTML = step.text;

    let resolved = null;
    if (typeof step.spotlightResolver === 'function') {
      resolved = step.spotlightResolver();
    } else if (step.spotlightId) {
      resolved = resolveElementByIdOrFallback(step.spotlightId);
    }

    const els = Array.isArray(resolved)? resolved.filter(Boolean): (resolved? [resolved]: []);
    activeSpotlightEls = els;
    activeSpotlightTarget = Array.isArray(resolved)? els: (els[0] || null);

    if (els.length > 0) {
      els.forEach(el => {
        const compPos = window.getComputedStyle(el).position;
        if (compPos === 'static') {
          el.classList.add('tut-pos-rel');
        }
        el.classList.add('tutorial-target-highlight');
      });

      positionSpotlightAndDialog(activeSpotlightTarget);

      if (step.pulseId) {
        const pulseTarget = resolveElementByIdOrFallback(step.pulseId);
        if (pulseTarget) {
          if (pulseTarget.tagName.toLowerCase() === 'button') {
            pulseTarget.classList.add('tut-button-pulse');
          } else {
            const compPos = window.getComputedStyle(pulseTarget).position;
            if (compPos === 'static') pulseTarget.classList.add('tut-pos-rel');
            pulseTarget.classList.add('tutorial-target-highlight');
          }
          highlightedDomIds.push(step.pulseId);
        }
      }

      const defaultNextText = typeof t === 'function'? t('btn_next_general'): 'Lanjut ➔';
      if (step.mode === 'click') {
        if (nextBtn) nextBtn.classList.add('hidden');
      } else if (nextBtn) {
        nextBtn.textContent = step.buttonText || defaultNextText;
        nextBtn.classList.remove('hidden');
      }
    } else {
      positionSpotlightAndDialog(null);
      const defaultNextText = typeof t === 'function'? t('btn_next_general'): 'Lanjut ➔';
      if (nextBtn) {
        nextBtn.textContent = step.buttonText || defaultNextText;
        nextBtn.classList.remove('hidden');
      }
    }
  }

  function finishTutorial() {
    clearAllHighlights();
    clearClickShields();
    setThreeDistrictsBright(false);

    if (window._tempWildPickerBackup) {
      window.openWildPicker = window._tempWildPickerBackup;
      delete window._tempWildPickerBackup;
    }

    if (typeof window.hideAspirationBalloon === 'function') window.hideAspirationBalloon();
    if (typeof window.hideScoreBalloon === 'function') window.hideScoreBalloon();
    if (typeof window.hideComboBalloon === 'function') window.hideComboBalloon();

    activeSpotlightEls.forEach(el => {
      if (el) {
        el.classList.remove('tutorial-target-highlight');
        el.classList.remove('tut-pos-rel');
      }
    });
    activeSpotlightEls = [];
    activeSpotlightTarget = null;

    const cutout = document.getElementById('tutorial-spotlight-cutout');
    if (cutout) {
      cutout.setAttribute('width', '0');
      cutout.setAttribute('height', '0');
    }

    const dialog = document.getElementById('tutorial-dialog');
    if (dialog) dialog.classList.add('hidden');

    const evalLeft = window.evaluatePool(state.pools.left, 'left');
    const evalRight = window.evaluatePool(state.pools.right, 'right');
    const evalCenter = window.evaluatePool(state.pools.center, 'center');
    const totalPts = evalLeft.total + evalRight.total + evalCenter.total;
    const ptsSuffix = typeof t === 'function'? t('points_suffix'): 'Poin';

    const finishModal = document.getElementById('tutorial-finish-modal');
    if (finishModal) {
      const scoreEl = finishModal.querySelector('.tutorial-score-val');
      if (scoreEl) scoreEl.textContent = `${totalPts} ${ptsSuffix}`;
      finishModal.classList.remove('hidden');
    }
  }

  function exitTutorial() {
    isTutorialActive = false;
    isAdvancingStep = false;
    document.body.classList.remove('tutorial-active');

    if (window._tempWildPickerBackup) {
      window.openWildPicker = window._tempWildPickerBackup;
      delete window._tempWildPickerBackup;
    }

    clearAllHighlights();
    clearClickShields();
    setThreeDistrictsBright(false);
    restoreRenderHooks();

    activeSpotlightEls.forEach(el => {
      if (el) {
        el.classList.remove('tutorial-target-highlight');
        el.classList.remove('tut-pos-rel');
      }
    });
    activeSpotlightEls = [];
    activeSpotlightTarget = null;

    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');
    }

    const dialog = document.getElementById('tutorial-dialog');
    if (dialog) dialog.classList.remove('hidden');

    const finishModal = document.getElementById('tutorial-finish-modal');
    if (finishModal) finishModal.classList.add('hidden');

    if (typeof window.restartGame === 'function') {
      window.restartGame();
    } else if (typeof window.initGame === 'function') {
      window.initGame();
    }
  }

  window.CityDominoTutorial = {
    start: function () {
      const data = createScriptedData();
      isTutorialActive = true;
      isAdvancingStep = false;
      document.body.classList.add('tutorial-active');

      installRenderHooks();

      state.specialCard = data.specialCard;
      state.pools.left = data.pools.left;
      state.pools.center = data.pools.center;
      state.pools.right = data.pools.right;
      state.hand = data.hand;
      state.timerDeck = data.timerDeck;
      state.policy = TUTORIAL_POLICY;
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

      if (typeof window.hideComboBalloon === 'function') window.hideComboBalloon();
      if (typeof window.hideAspirationBalloon === 'function') window.hideAspirationBalloon();
      if (typeof window.hideScoreBalloon === 'function') window.hideScoreBalloon();
      if (typeof window.switchMpTab === 'function') window.switchMpTab('cards');
      if (typeof window.updateActiveDistrictClass === 'function')window.updateActiveDistrictClass();
      if (typeof window.renderAll === 'function') window.renderAll();

      const overlay = document.getElementById('tutorial-overlay');
      if (overlay) {
        overlay.classList.remove('hidden');
        overlay.setAttribute('aria-hidden', 'false');
      }

      const dialog = document.getElementById('tutorial-dialog');
      if (dialog) dialog.classList.remove('hidden');

      const finishModal = document.getElementById('tutorial-finish-modal');
      if (finishModal) finishModal.classList.add('hidden');

      executeStep(0);
    },
    exit: exitTutorial
  };

  document.addEventListener('click', handleTutorialGlobalClick, true);

  document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('btn-tutorial-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const step = STEPS[currentStepIdx];
        if (step && typeof step.onComplete === 'function') {
          step.onComplete();
        }
        executeStep(currentStepIdx + 1);
      });
    }

    const skipBtn = document.getElementById('btn-skip-tutorial');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        exitTutorial();
      });
    }

    const startRealBtn = document.getElementById('btn-tutorial-start-real');
    if (startRealBtn) {
      startRealBtn.addEventListener('click', () => {
        exitTutorial();
      });
    }

    window.addEventListener('resize', () => {
      if (!isTutorialActive) return;
      const overlay = document.getElementById('tutorial-overlay');
      if (overlay &&!overlay.classList.contains('hidden')) {
        positionSpotlightAndDialog(activeSpotlightTarget);
      }
    });
  });
})(window);