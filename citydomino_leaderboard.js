/* =============================================================
   CITY DOMINO - INTEGRASI LEADERBOARD (PHP BACKEND)
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

  container.innerHTML = '<div class="lb-state-text">Memuat Top 5...</div>';

  fetch(LEADERBOARD_API + '?plan=' + encodeURIComponent(state.policy.name))
.then(function(res) {
      return res.json();
    })
.then(function(res) {
      if (res && res.status === 'success') {
        renderLeaderboardTable(res.data);
      } else {
        container.innerHTML = '<div class="lb-state-text">Gagal memuat peringkat.</div>';
      }
    })
.catch(function() {
      container.innerHTML = '<div class="lb-state-text">Offline / papan peringkat belum aktif.</div>';
    });
}

function renderLeaderboardTable(records) {
  const container = document.getElementById('lb-view-container');
  if (!records || records.length === 0) {
    container.innerHTML = '<div class="lb-state-text">Belum ada rekor.<br>Selesaikan permainan dan jadilah Walikota pertama!</div>';
    return;
  }

  let html = '<table class="lb-table">' +
    '<thead>' +
      '<tr>' +
        '<th class="col-rank">RANK</th>' +
        '<th class="col-name">NAMA</th>' +
        '<th class="col-score">TOTAL</th>' +
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
  const inputEl = document.getElementById('lb-player-name');
  const btnEl = document.getElementById('lb-submit-btn');
  const statusEl = document.getElementById('lb-submit-status');

  const nameVal = inputEl.value.trim();
  if (!nameVal) return;

  btnEl.disabled = true;
  inputEl.disabled = true;
  statusEl.style.display = 'block';
  statusEl.className = 'lb-submit-msg';
  statusEl.innerText = 'Menyimpan skor...';

  const payload = 'action=submit' +
    '&name=' + encodeURIComponent(nameVal) +
    '&plan=' + encodeURIComponent(state.policy.name) +
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
        statusEl.innerText = '✓ Berhasil dicatat ke Top 5!';
        switchMpTab('lb');
      } else {
        statusEl.className = 'lb-submit-msg error';
        statusEl.innerText = 'Gagal menyimpan: ' + (res.message || 'Error server');
        btnEl.disabled = false;
        inputEl.disabled = false;
      }
    })
.catch(function() {
      statusEl.className = 'lb-submit-msg error';
      statusEl.innerText = 'Gagal terhubung ke server leaderboard.';
      btnEl.disabled = false;
      inputEl.disabled = false;
    });
}