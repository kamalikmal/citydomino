/* =============================================================
   CITY DOMINO - ENGINE & LOGIKA ATURAN PERMAINAN
   Terintegrasi dengan citydomino_i18n.js
   ============================================================= */

function getCurrentRouteKeys() {
  return (state.round % 2 === 1)
? ['left', 'right', 'center']
: ['right', 'left', 'center'];
}

function getCurrentRouteLabels() {
  const west = typeof t === 'function'? t('district_westfall'): 'Westfall';
  const east = typeof t === 'function'? t('district_eastgate'): 'Eastgate';
  const mid = typeof t === 'function'? t('district_midvale'): 'Midvale';

  return (state.round % 2 === 1)
? [`1.${west}`, `2.${east}`, `3.${mid}`]
: [`1.${east}`, `2.${west}`, `3.${mid}`];
}

function buildDeck() {
  const deck = [];
  let uid = 1;

  // Set 1: Atas Biru, Bawah Hijau
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      deck.push({
        id: uid++,
        set: 1,
        topVal: i,
        topCol: 'blue',
        botVal: j,
        botCol: 'green',
        topIsWild: false,
        botIsWild: false,
        isDouble: (i === j)
      });
    }
  }

  // Set 2: Atas Amber, Bawah Merah
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      deck.push({
        id: uid++,
        set: 2,
        topVal: i,
        topCol: 'amber',
        botVal: j,
        botCol: 'red',
        topIsWild: false,
        botIsWild: false,
        isDouble: (i === j)
      });
    }
  }

  // Kocok Deck
  for (let k = deck.length - 1; k > 0; k--) {
    const r = Math.floor(Math.random() * (k + 1));
    [deck[k], deck[r]] = [deck[r], deck[k]];
  }
  return deck;
}

function checkCombo(cells, comboId) {
  const vals = cells.map(c => c.val).sort((a, b) => a - b);
  const cols = cells.map(c => c.col);

  const valCounts = {};
  vals.forEach(v => { valCounts[v] = (valCounts[v] || 0) + 1; });
  const countsArr = Object.values(valCounts).sort((a, b) => b - a);

  const colCounts = {};
  cols.forEach(c => { colCounts[c] = (colCounts[c] || 0) + 1; });
  const colCountsArr = Object.values(colCounts).sort((a, b) => b - a);

  const isFlush = (colCountsArr[0] === 5);
  const isStraight = (
    vals[1] === vals[0] + 1 &&
    vals[2] === vals[1] + 1 &&
    vals[3] === vals[2] + 1 &&
    vals[4] === vals[3] + 1
  );

  switch (comboId) {
    case 'five_kind':
      return { isValid: countsArr[0] === 5, participatingIndices: [0, 1, 2, 3, 4] };
    case 'straight_flush':
      return { isValid: (isStraight && isFlush), participatingIndices: [0, 1, 2, 3, 4] };
    case 'four_kind':
      return { isValid: countsArr[0] >= 4, participatingIndices: [0, 1, 2, 3, 4] };
    case 'full_house':
      return { isValid: (countsArr[0] === 3 && countsArr[1] === 2), participatingIndices: [0, 1, 2, 3, 4] };
    case 'flush':
      return { isValid: isFlush, participatingIndices: [0, 1, 2, 3, 4] };
    case 'straight':
      return { isValid: isStraight, participatingIndices: [0, 1, 2, 3, 4] };
    case 'color_boat':
      return { isValid: (colCountsArr[0] === 3 && colCountsArr[1] === 2), participatingIndices: [0, 1, 2, 3, 4] };
    case 'three_kind':
      return { isValid: countsArr[0] >= 3, participatingIndices: [0, 1, 2, 3, 4] };
    case 'two_pair':
      return { isValid: (countsArr[0] >= 2 && countsArr[1] >= 2), participatingIndices: [0, 1, 2, 3, 4] };
    case 'one_pair':
      return { isValid: countsArr[0] >= 2, participatingIndices: [0, 1, 2, 3, 4] };
    default:
      return { isValid: false, participatingIndices: [] };
  }
}

function evaluateLine(cells) {
  const wildCard = state.specialCard;
  const isTargetBonus = (c) => (c.val === wildCard.botVal && c.col === wildCard.botCol);

  let bestScore = 0;
  let bestComboName = typeof t === 'function'? t('combo_none'): 'Nihil';

  for (const comboId of state.policy.active) {
    const match = checkCombo(cells, comboId);
    if (match.isValid) {
      let bonusCount = 0;
      match.participatingIndices.forEach(idx => {
        if (isTargetBonus(cells[idx])) bonusCount++;
      });
      const totalPts = MASTER_COMBOS[comboId].pts + (bonusCount * 3);

      if (totalPts > bestScore) {
        bestScore = totalPts;
        bestComboName = MASTER_COMBOS[comboId].name;
      }
    }
  }

  return { comboName: bestComboName, points: bestScore };
}

function evaluateDistrictHappiness(poolCards, poolKey) {
  const vals = [];
  poolCards.forEach(c => {
    vals.push(c.topVal);
    vals.push(c.botVal);
  });

  const rthCount = vals.filter(v => v === 0 || v === 1 || v === 6).length;
  const srvCount = vals.filter(v => v === 0 || v === 3 || v === 4).length;
  const ecoCount = vals.filter(v => v === 2 || v === 5 || v === 6).length;
  const favVal = state.policy? state.policy.fav[poolKey]: null;
  const favCount = favVal!== null? vals.filter(v => v === favVal).length: 0;

  const hasRth = rthCount >= 10;
  const hasSrv = srvCount >= 10;
  const hasEco = ecoCount >= 10;
  const hasFav = favVal!== null? favCount >= 6: false;

  let happyScore = 0;
  if (hasRth) happyScore += 25;
  if (hasSrv) happyScore += 25;
  if (hasEco) happyScore += 25;
  if (hasFav) happyScore += 25;

  const nameRth = typeof t === 'function'? t('pillar_ecology'): 'Ekologi (0, 1, 6)';
  const nameSrv = typeof t === 'function'? t('pillar_residential'): 'Hunian (0, 3, 4)';
  const nameEco = typeof t === 'function'? t('pillar_business'): 'Bisnis (2, 5, 6)';
  const nameFav = typeof t === 'function'? t('pillar_trademark', { val: favVal }): `Trademark (${favVal})`;

  return {
    happyScore,
    isHappy: happyScore === 100,
    reqs: [
      { name: nameRth, cur: rthCount, target: 10, ok: hasRth },
      { name: nameSrv, cur: srvCount, target: 10, ok: hasSrv },
      { name: nameEco, cur: ecoCount, target: 10, ok: hasEco },
      { name: nameFav, cur: favCount, target: 6, ok: hasFav }
    ]
  };
}

function evaluatePool(poolCards, poolKey) {
  let rawPoolScore = 0;
  const linesInfo = [];

  for (let r = 0; r < 3; r++) {
    const topCells = [];
    const botCells = [];

    for (let c = 0; c < 5; c++) {
      const card = poolCards[r * 5 + c];
      topCells.push({ val: card.topVal, col: card.topCol });
      botCells.push({ val: card.botVal, col: card.botCol });
    }

    const topEval = evaluateLine(topCells);
    const botEval = evaluateLine(botCells);

    rawPoolScore += topEval.points;
    rawPoolScore += botEval.points;

    linesInfo.push({ top: topEval, bot: botEval });
  }

  const happyData = evaluateDistrictHappiness(poolCards, poolKey);
  const effectiveScore = Math.round(rawPoolScore * (happyData.happyScore / 100));

  return {
    total: effectiveScore,
    rawScore: rawPoolScore,
    lines: linesInfo,
    happiness: happyData
  };
}