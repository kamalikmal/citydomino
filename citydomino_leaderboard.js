/* =============================================================
   CITY DOMINO - INTEGRASI LEADERBOARD (PHP BACKEND)
   Terintegrasi dengan citydomino_i18n.js
   ============================================================= */

const LEADERBOARD_API = 'http://fam.web.id:9093/mod/citydomino/leaderboard.php';

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#039;');
}

function switchMpTab(tab) {
  const btnMp = document.getElementById('tab-btn-mp');
  const btnLb = document.getElementById('tab-btn-lb');
  const paneMp = document.getElementById('pane-mp-cards');
  const paneLb = document.getElementById('pane-mp-lb');

  if (tab === 'cards') {
    btnMp.classList.add('active');
    btnLb.classList.remove('active');
    paneMp.classList.add('active');
    paneLb.classList.remove('active');
  } else {
    btnLb.classList.add('active');
    btnMp.classList.remove('active');
    paneLb.classList.add('active');
    paneMp.classList.remove('active');
    loadLeaderboard();
  }
}

function loadLeaderboard() {
  const container = document.getElementById('lb-view-container');
  if (!state.policy) return;

  const tr = (k, fb) => (typeof t === 'function'? t(k): fb);
  container.innerHTML = `<div class="lb-state-text">${tr('lb_loading', 'Memuat Top 5...')}</div>`;

  const planIdentifier = state.policy.rawName || state.policy.name;

  fetch(LEADERBOARD_API + '?plan=' + encodeURIComponent(planIdentifier))
.then(function(res) {
      return res.json();
    })
.then(function(res) {
      if (res && res.status === 'success') {
        renderLeaderboardTable(res.data);
      } else {
        container.innerHTML = `<div class="lb-state-text">${tr('lb_err_load', 'Gagal memuat peringkat.')}</div>`;
      }
    })
.catch(function() {
      container.innerHTML = `<div class="lb-state-text">${tr('lb_err_offline', 'Offline / papan peringkat belum aktif.')}</div>`;
    });
}

function renderLeaderboardTable(records) {
  const container = document.getElementById('lb-view-container');
  const tr = (k, fb) => (typeof t === 'function'? t(k): fb);

  if (!records || records.length === 0) {
    container.innerHTML = `<div class="lb-state-text">${tr('lb_empty', 'Belum ada rekor.<br>Selesaikan permainan dan jadilah Walikota pertama!')}</div>`;
    return;
  }

  const thRank = tr('lb_th_rank', 'RANK');
  const thName = tr('lb_th_name', 'NAMA');
  const thTotal = tr('lb_th_total', 'TOTAL');

  let html = '<table class="lb-table">' +
    '<thead>' +
      '<tr>' +
        '<th class="col-rank">' + thRank + '</th>' +
        '<th class="col-name">' + thName + '</th>' +
        '<th class="col-score">' + thTotal + '</th>' +
        '<th class="col-detail">WEST / MID / EAST</th>' +
      '</tr>' +
    '</thead>' +
    '<tbody>';

  records.forEach(function(r, idx) {
    const rankNum = idx + 1;
    const rankClass = rankNum <= 3? 'rank-' + rankNum: '';
    const safeName = escapeHtml(r.name);
    html += '<tr class="lb-row">' +
      '<td class="lb-cell rank ' + rankClass + '">' + rankNum + '</td>' +
      '<td class="lb-cell name" title="' + safeName + '">' + safeName + '</td>' +
      '<td class="lb-cell total">' + r.total + '</td>' +
      '<td class="lb-cell breakdown">' + r.left + ' / ' + r.center + ' / ' + r.right + '</td>' +
    '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function submitLeaderboardScore(e, total, left, center, right) {
  e.preventDefault();
  const tr = (k, fb) => (typeof t === 'function'? t(k): fb);
  const inputEl = document.getElementById('lb-player-name');
  const btnEl = document.getElementById('lb-submit-btn');
  const statusEl = document.getElementById('lb-submit-status');

  const nameVal = inputEl.value.trim();
  if (!nameVal) return;

  btnEl.disabled = true;
  inputEl.disabled = true;
  statusEl.style.display = 'block';
  statusEl.className = 'lb-submit-msg';
  statusEl.innerText = tr('lb_saving', 'Menyimpan skor...');

  const planIdentifier = state.policy.rawName || state.policy.name;

  const payload = 'action=submit' +
    '&name=' + encodeURIComponent(nameVal) +
    '&plan=' + encodeURIComponent(planIdentifier) +
    '&total=' + encodeURIComponent(total) +
    '&left=' + encodeURIComponent(left) +
    '&center=' + encodeURIComponent(center) +
    '&right=' + encodeURIComponent(right);

  fetch(LEADERBOARD_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: payload
  })
.then(function(res) {
      return res.json();
    })
.then(function(res) {
      if (res && res.status === 'success') {
        statusEl.className = 'lb-submit-msg success';
        statusEl.innerText = tr('lb_saved_success', '✓ Berhasil dicatat ke Top 5!');
        switchMpTab('lb');
      } else {
        statusEl.className = 'lb-submit-msg error';
        statusEl.innerText = tr('lb_save_fail', 'Gagal menyimpan: ') + (res.message || tr('lb_server_error', 'Error server'));
        btnEl.disabled = false;
        inputEl.disabled = false;
      }
    })
.catch(function() {
      statusEl.className = 'lb-submit-msg error';
      statusEl.innerText = tr('lb_conn_error', 'Gagal terhubung ke server leaderboard.');
      btnEl.disabled = false;
      inputEl.disabled = false;
    });
}