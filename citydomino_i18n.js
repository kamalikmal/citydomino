// ==========================================================================
// CITY DOMINO - INTERNATIONALIZATION (i18n) ENGINE
// Berkas: citydomino_i18n.js
// ==========================================================================

const CITYDOMINO_TRANSLATIONS = {
  id: {
    // Homescreen & Navigasi
    app_title: 'CITY DOMINO',
    app_tagline: 'Rancang 3 distrik kota impianmu dengan strategi!',
    btn_play: 'Main Sekarang',
    btn_tutorial: 'Tutorial',
    btn_help: 'Bantuan & Aturan',
    btn_lb: 'Papan Skor',
    btn_exit: 'Keluar',
    btn_restart: 'Mulai Ulang',
    btn_resume: 'Lanjutkan',
    btn_settings: 'Pengaturan',

    // Status Bar & Header Game
    header_phase: 'Fase',
    phase_indicator: 'Fase {cur} / {max}',
    header_route: 'Rute Distrik',
    header_score: 'Total Skor',
    header_happiness: 'Kepuasan Rata-rata',
    special_card_title: 'Kartu Khusus',
    special_card_wild: 'Wild ⭐',
    special_card_bonus: 'Bonus Poin',
    timer_card_label: 'Proyek {num}',
    timer_available: 'Siap Alokasi',
    timer_slots_title: 'Depot Suplai Proyek',
    points_suffix: 'poin',

    // Tombol & Kontrol Gameplay
    btn_rotate: '🔄 Putar',
    btn_swap: 'Tukar Domino',
    btn_discard_draw: 'Buang & Ambil Bursa',
    btn_target_market: 'Bursa Rekanan',
    btn_target_finish: 'Selesai',
    wild_tooltip: 'Petak Bintang: Klik untuk ubah angka domino!',
    route_label: 'Rute',

    // Nama Distrik & Jalur
    district_westfall: 'Westfall',
    district_midvale: 'Midvale',
    district_eastgate: 'Eastgate',
    dist_westfall: 'Westfall',
    dist_midvale: 'Midvale',
    dist_eastgate: 'Eastgate',
    left: 'Westfall',
    center: 'Midvale',
    right: 'Eastgate',

    // Aspirasi Warga & Zonasi
    aspiration_title: 'Aspirasi Warga',
    aspiration_ecology: 'Ekologi',
    aspiration_residential: 'Hunian',
    aspiration_commerce: 'Bisnis',
    aspiration_satisfied: 'Terpenuhi',
    aspiration_all_met: 'Semua aspirasi terpenuhi',
    zone_eco_desc: 'RTH & Ekologi (Angka 0, 1, 6)',
    zone_res_desc: 'Hunian & Layanan (Angka 0, 3, 4)',
    zone_com_desc: 'Pusat Bisnis (Angka 2, 5, 6)',
    status_happy_met: 'Warga Senang',
    status_happy_unmet: 'Kebutuhan Belum Lengkap',
    happiness_target_warning: 'Distrik butuh minimal 50% di akhir game agar tidak kolaps!',
    score_balloon_title: 'Rincian Skor',
    score_master_plan: 'Master Plan',
    happiness_level: 'Kepuasan Warga',
    score_calc_label: 'Kalkulasi',

    // Master Plan & Poker Combos (ID)
    combo_straight_flush: 'Straight Flush',
    combo_straight_flush_desc: '5 angka berurutan TANPA putus DAN kelimanya memiliki 1 warna sama persis.',
    combo_five_kind: 'Five of a Kind',
    combo_five_kind_desc: '5 domino di baris memiliki angka sama persis (warna bebas). Contoh: 5-5-5-5-5.',
    combo_five_of_a_kind: 'Five of a Kind',
    combo_five_of_a_kind_desc: '5 domino di baris memiliki angka sama persis (warna bebas). Contoh: 5-5-5-5-5.',
    combo_four_kind: 'Four of a Kind',
    combo_four_kind_desc: '4 domino memiliki angka yang sama di satu baris (warna bebas, 1 sisa bebas).',
    combo_four_of_a_kind: 'Four of a Kind',
    combo_four_of_a_kind_desc: '4 domino memiliki angka yang sama di satu baris (warna bebas, 1 sisa bebas).',
    combo_full_house: 'Full House',
    combo_full_house_desc: 'Kombinasi 3 angka kembar + 2 angka kembar lain pada satu baris (warna bebas).',
    combo_straight: 'Straight',
    combo_straight_desc: '5 angka berurutan tanpa putus (misal: 2-3-4-5-6). Warna kartu boleh campur.',
    combo_flush: 'Flush',
    combo_flush_desc: 'Semua 5 petak di satu baris memiliki warna latar yang sama persis (angka bebas).',
    combo_color_flush: 'Flush Warna',
    combo_color_flush_desc: 'Semua 5 petak di satu baris memiliki warna latar yang sama persis (angka bebas).',
    combo_two_pair: 'Two Pair',
    combo_two_pair_desc: 'Ada 2 pasang angka kembar yang berbeda (misal sepasang 1 dan sepasang 5).',
    combo_color_boat: 'Color Boat',
    combo_color_boat_desc: '3 petak berwarna sama + 2 petak warna sama lainnya (misal: 3 biru & 2 merah).',
    combo_three_kind: 'Three of a Kind',
    combo_three_kind_desc: 'Ada 3 angka kembar sama di satu baris (warna bebas, 2 kartu lainnya bebas).',
    combo_three_of_a_kind: 'Three of a Kind',
    combo_three_of_a_kind_desc: 'Ada 3 angka kembar sama di satu baris (warna bebas, 2 kartu lainnya bebas).',
    combo_one_pair: 'One Pair',
    combo_one_pair_desc: 'Minimal terdapat 1 pasang angka kembar sama di baris (warna bebas).',
    combo_high_card: 'High Card',
    combo_high_card_desc: 'Tidak membentuk kombinasi khusus (hanya angka tertinggi).',

    // Kebijakan Tata Kota / Policies (ID)
    policy_metropolis_klasik: 'Metropolis Klasik',
    policy_taman_ekologis: 'Taman Ekologis',
    policy_kawasan_terpadu: 'Kawasan Terpadu',
    policy_zona_harmoni: 'Zona Harmoni',
    policy_distrik_simetris: 'Distrik Simetris',
    policy_master_urban_2026: 'Master Urban 2026',
    policy_pusat_riset: 'Pusat Riset',
    policy_koridor_hijau: 'Koridor Hijau',
    policy_smart_transit: 'Smart Transit',
    policy_blok_modular: 'Blok Modular',
    policy_megapolitan: 'Megapolitan',
    policy_kampung_kompak: 'Kampung Kompak',

    // Aksi & Kontrol Umum
    action_rotate: 'Putar',
    action_swap: 'Tukar Domino',
    action_confirm: 'Konfirmasi',
    action_cancel: 'Batal',
    action_next_phase: 'Lanjut Fase Berikutnya',
    action_draw_pool: 'Ambil Kartu',
    reserve_pool_title: 'Bursa Rekanan (Cadangan)',
    player_hand_title: 'Kartu Tangan Walikota',

    // Modal Evaluasi Akhir & Leaderboard (ID)
    modal_defeat_title: 'KOTA KOLAPS!',
    modal_defeat_desc: 'Salah satu distrik memiliki tingkat kepuasan warga di bawah batas minimum 50%.',
    modal_defeat_status: 'Kota Gagal Berkembang',
    modal_status_label: 'Status Akhir',
    modal_victory_title: 'KOTA SEJAHTERA!',
    modal_victory_desc: 'Semua distrik berhasil memenuhi target kepuasan warga di atas 50%.',
    modal_predicate_label: 'Predikat Walikota',
    rank_utopia: 'Utopia Modern (Legenda)',
    rank_metropolis: 'Metropolis Mandiri (Ahli)',
    rank_satellite: 'Kota Satelit (Terampil)',
    rank_developing: 'Kawasan Berkembang (Cukup)',
    rank_underdeveloped: 'Kawasan Tertinggal (Rendah)',
    lb_collapse_alert: '⚠️ Kota Kolaps — Skor kamu tidak dapat dicatat ke papan peringkat.',
    lb_record_title: '🏆 Rekor Baru Tercipta!',
    lb_name_placeholder: 'Ketik nama Walikota...',
    lb_btn_submit: 'Kirim Skor ke Leaderboard',

    // Modal Bantuan (Help Modal Tab 4 Langkah)
    tab_sandbox: 'Simulasi Cepat',
    tab_rules: 'Aturan Lengkap',
    help_modal_title: 'Buku Pedoman Tata Kota',
    help_happy_100: '😊 100% Warga Senang',
    help_happy_75: '😊 75% Warga Puas (+50%)',
    help_happy_25: '⚠️ 25% Krisis (Butuh 1)',
    help_happy_100_prosper: '😊 100% Sejahtera',
    help_step_1_title: 'Langkah 1: Premis & Antarmuka Kota',
    help_step_1_desc: 'Kamu adalah Walikota yang merancang 3 distrik selama 6 fase (total 18 aksi). Angka domino (0–6) mewakili zonasi kota. Capai target skor poker tertinggi dan jaga <b>Kebahagiaan Warga minimal 50%</b> agar kota tidak kolaps!',
    help_step_2_title: 'Langkah 2: Skor Poker & Tukar Kartu',
    help_step_2_desc: 'Pilih kartu tangan <b>[4 | 0]</b>, lalu pilih kartu <b>[2 | 6]</b> di petak ke-5 untuk membentuk <b>Five of a Kind (4-4-4-4-4)</b> di baris atas!<div class="tut-click-tip">💡 <b>Info:</b> Angka skor di header distrik bisa kamu klik untuk melihat rincian kombinasi & perkalian skornya.</div>',
    help_step_2_status: 'Target: Five of a Kind (+30 pt)',
    help_step_3_title: 'Langkah 3: Putar Kartu & Kepuasan Warga',
    help_step_3_desc: 'Distrik ini sedang krisis (Happiness <b>25%</b>) karena kekurangan Rumah Tapak (angka 1). Klik <b>🔄 Putar</b> pada kartu tangan agar angka 1 berada di atas, lalu tukar ke petak ke-3 untuk menaikkan kepuasan warga!<div class="tut-click-tip">💡 <b>Info:</b> Badge status kepuasan (😊/⚠️) bisa kamu klik untuk melihat zonasi apa saja yang dibutuhkan warga.</div>',
    help_step_3_status: 'Target: Naikkan Happiness ≥ 50%',
    help_step_4_title: 'Langkah 4: Kekuatan Bintang (Wild ⭐)',
    help_step_4_desc: 'Petak ⭐ adalah Wild Angka. Klik petak ⭐ pada kartu ke-3, lalu pilih angka <b>3</b> pada jendela opsi untuk melengkapi <b>Straight Flush (1-2-3-4-5 Biru)</b>!',
    help_step_4_status: 'Target: Ubah ⭐ jadi 3',
    help_step_2_fb_ok: '🎉 <b>Five of a Kind terbentuk (+30 pt)!</b> Baris atas dan bawah dinilai secara mandiri.',
    help_step_2_fb_fail: '⚠️ Belum Five of a Kind. Klik <b>↺ Ulangi</b> lalu tukar dengan petak ke-5 yang bernilai 2.',
    help_step_3_fb_ok: '🎉 <b>Happiness naik ke 75%!</b> Memutar kartu 180° memastikan zonasi yang dibutuhkan warga masuk ke posisi yang tepat. Ingat: minimal 50% di akhir game agar tidak kalah!',
    help_step_3_fb_fail: '⚠️ Angka 1 belum berada di atas (Happiness masih 25%). Klik <b>↺ Ulangi</b>, tekan 🔄 pada kartu tangan, lalu tukar ke petak ke-3.',
    help_step_4_fb_ok: '🎉 <b>Straight Flush 40 pt aktif!</b> Angka petak ⭐ bisa kamu ubah kapan saja tanpa memakan giliran aksi.',
    help_step_4_fail: '⚠️ Petak berubah jadi {val}. Klik ⭐ lagi lalu pilih angka <b>3</b> untuk melengkapi urutan Straight Flush (1-2-3-4-5).',
    help_btn_next_step_3: 'Lanjut ke Langkah 3 ➔',
    help_btn_next_step_4: 'Lanjut ke Langkah 4 ➔',
    help_btn_close_info: 'Tutup Info',
    help_btn_finish: 'Selesai & Mulai Main! 🚀',
    help_btn_ok: 'Oke',

    // =========================================================================
    // SIMULASI ON-RAILS 24 LANGKAH (citydomino_tutorial.js - ID)
    // =========================================================================
    tut_policy_name: 'Rencana Metropolitan',
    tut_step_badge: 'Langkah {cur}/{max}',
    btn_next_general: 'Lanjut ➔',

    tut_step_1_text: 'Tugasmu adalah merancang <strong>3 Distrik Kota</strong>: <strong>Westfall</strong> (kiri), <strong>Midvale</strong> (tengah), dan <strong>Eastgate</strong> (kanan) yang masing-masing terisi penuh 15 domino (3 baris).<br><br>Pembangunan tiap fase mengikuti rute berurutan di header atas: dimulai dari <strong>Westfall ➔ Eastgate ➔ Midvale</strong>. Pada fase genap, urutannya berputar menjadi <strong>Eastgate ➔ Westfall ➔ Midvale</strong>.',
    tut_step_1_btn: 'Pelajari Master Plan ➔',

    tut_step_2_text: '<strong>Master Plan Kota (Kotak ke-4):</strong><br>Kolom ini menampilkan 6 kontrak kombinasi target kota yang aktif di sesi ini. Susunan yang terbentuk di baris distrik akan menghasilkan poin murni sesuai kontrak:<br><div class="tut-combos-table"><div class="tut-combo-item"><span class="c-name">⭐ Str. Flush</span><span class="c-pts">40 pt</span></div><div class="tut-combo-item"><span class="c-name">👑 Five Kind</span><span class="c-pts">30 pt</span></div><div class="tut-combo-item"><span class="c-name">💎 Four Kind</span><span class="c-pts">25 pt</span></div><div class="tut-combo-item"><span class="c-name">🏠 Full House</span><span class="c-pts">20 pt</span></div><div class="tut-combo-item"><span class="c-name">🔷 Three Kind</span><span class="c-pts">15 pt</span></div><div class="tut-combo-item"><span class="c-name">👥 Two Pair</span><span class="c-pts">10 pt</span></div></div>Klik kartu kombinasi di kotak Master Plan untuk melihat balon penjelasan aturan skornya!',
    tut_step_2_btn: 'Cek Kepuasan Warga ➔',

    tut_step_3_text: 'Selain Master Plan, ada syarat <strong>Kepuasan Warga</strong>. Di Westfall, kepuasan masih 75%. Klik badge <strong>😊 75%</strong> di header Westfall untuk melihat aspirasi warga!',
    tut_step_4_text: 'Balon aspirasi warga muncul tepat di bawah badge kepuasan. Kebutuhan <strong>Ekologi (0, 1, 6)</strong> saat ini baru 8/10 (-2). Jika mencapai 10 petak, kepuasan naik menjadi <strong>100% Warga Senang</strong>.',
    tut_step_4_btn: 'Paham, Cek Skor ➔',
    tut_step_5_text: 'Klik angka skor di header Westfall untuk melihat rincian kalkulasi poin poker saat ini!',
    tut_step_6_text: 'Rumus skor akhir: <strong>Poin Master Plan × % Kepuasan Warga</strong>.<br><br>Sekarang mari kita praktikkan: penuhi Ekologi sekaligus bentuk <strong>Five of a Kind</strong> di Baris 1 Westfall!',
    tut_step_6_btn: 'Mulai Menukar ➔',

    tut_step_7_text: 'Perhatikan kartu tangan pertama <strong>[1|6]</strong>. Klik tombol <strong>🔄 Putar</strong> yang menyala di bawahnya agar angka <strong>6</strong> pindah ke atas menjadi <strong>[6|1]</strong>.',
    tut_step_8_text: 'Klik kartu tangan <strong>[6|1]</strong> yang baru kamu putar untuk memilihnya.',
    tut_step_9_text: 'Perhatikan Baris 1 Westfall: ada empat angka 6 di atas. Klik kartu petak ke-3 <strong>[2|5]</strong> yang berkedip menyala untuk ditukar!',
    tut_step_10_text: 'Lihat indikator rute di header atas: <strong>Westfall ➔ Eastgate ➔ Midvale</strong>. Tombol aksi kini bertuliskan <strong>Tukar (Next: Eastgate)</strong>. Klik tombol ini!',
    tut_step_11_text: 'Bagus! Westfall kini memiliki susunan <strong>Five of a Kind 6</strong>. Perhatikan skor dan status kebahagiaan warga yang melonjak!',
    tut_step_11_btn: 'Lanjut ke Kartu Wild ➔',

    tut_step_12_text: 'Perhatikan <strong>Kotak Kartu Khusus [4|3]</strong> di kanan atas! Sisi atas <strong>[4⭐]</strong> menentukan angka <strong>Wild</strong>. Setiap kartu berangka 4 amber otomatis memiliki tanda <strong>⭐</strong>, seperti kartu tangan keduamu <strong>[4⭐|5]</strong>.<br><br>Klik petak <strong>⭐</strong> pada kartu tangan tersebut untuk menentukan angkanya terlebih dahulu!',
    tut_step_13_text: 'Di jendela Wild Picker, ubah angka 4 menjadi <strong>2</strong> untuk melengkapi susunan Full House (tiga 5 dan dua 2) di Eastgate nanti!',
    tut_step_14_text: 'Kartu tanganmu kini sudah bernilai <strong>[2|5]</strong>. Klik kartu tersebut untuk memilihnya!',
    tut_step_15_text: 'Lihat Baris 1 Eastgate: sudah ada angka 5 dan 2 di atas. Klik kartu petak ke-3 <strong>[3|4]</strong> yang berkedip menyala untuk ditukar dengan [2|5]!',
    tut_step_16_text: 'Rute berikutnya menuju Midvale. Klik tombol <strong>Tukar (Next: Midvale)</strong>.',
    tut_step_17_text: '<div class="tut-winning-badge">🎉 HASIL TUKAR BARIS 1:</div><br>• Baris atas Eastgate sukses membentuk <strong>Full House (Tiga 5 & Dua 2)</strong>! Poin: <strong>+20 pt</strong>.<br>• Nilai 2 dan 5 masuk pilar <strong>Bisnis (2, 5, 6)</strong>, menaikkan kepuasan warga Eastgate menjadi <strong>😊 100%</strong>!',
    tut_step_17_btn: 'Lanjut ke Midvale ➔',

    tut_step_18_text: 'Sekarang lihat sisi bawah Kartu Khusus: <strong>[+3 | 3]</strong>. Setiap petak angka 3 biru yang masuk ke kombo sah akan memberi <strong>Bonus +3 Poin Ekstra</strong>!<br><br>Perhatikan kartu tanganmu <strong>[3|4]</strong> yang memiliki tag emas <strong>+3</strong>. Klik kartu ini!',
    tut_step_19_text: 'Lihat Baris 1 Midvale: sudah ada empat angka 3 di atas dan angka 4 & 2 di bawah. Klik kartu petak ke-3 <strong>[1|5]</strong> yang berkedip menyala!',
    tut_step_20_text: 'Semua distrik telah ditata. Klik tombol <strong>Tukar (Next: Bursa)</strong>.',
    tut_step_21_text: '<div class="tut-winning-badge">🎉 HASIL TUKAR BARIS 1:</div><br>• <strong>KOMBO GANDA!</strong> Baris atas membentuk <strong>Five of a Kind (3-3-3-3-3)</strong> senilai <strong>+30 pt</strong>!<br>• Baris bawah melengkapi <strong>Full House (Tiga 4 & Dua 2)</strong> senilai <strong>+20 pt</strong>!<br>• <strong>Bonus Kartu Khusus:</strong> Petak [3] biru menyumbang tambahan <strong>+3 poin ekstra</strong>!<br>• Midvale resmi mencapai status <strong>😊 100%</strong>!',
    tut_step_21_btn: 'Masuk Akhir Fase ➔',

    tut_step_22_text: '<strong>Tahap Akhir Fase:</strong> Ketiga distrik selesai ditata. Kartu di <strong>Bursa Rekanan</strong> tersimpan tertutup. Klik kartu tangan <strong>[5|2]</strong> yang menyala untuk ditukar dengan kartu teratas Bursa Rekanan!',
    tut_step_23_text: 'Klik tombol <strong>Buang & Ambil Bursa</strong> untuk menarik kartu tertutup dari Bursa Rekanan.',
    tut_step_24_text: '<div class="tut-winning-badge">🔄 BURSA REKANAN TERBUKA:</div><br>• Kartu tangan lama <strong>[5|2]</strong> berhasil ditukar menjadi kartu baru dari Bursa Rekanan: <strong>[6|5]</strong>!<br>• Nilai <strong>6</strong> dan <strong>5</strong> merupakan amunisi bernilai tinggi untuk distrik Ekologi & Bisnis di Fase 2.<br>• Klik tombol di bawah untuk melihat rangkuman hasil simulasi kotamu!',
    tut_step_24_btn: 'Lihat Evaluasi Akhir ➔',

    // Isi HTML Tab Full Rules (Aturan Lengkap)
    help_full_rules: `
      <div class="rules-scroll-content" style="padding: 10px 4px; color: #cbd5e1; font-size: 0.88rem; line-height: 1.55;">
        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
          <h4 style="margin: 0 0 6px 0; color: #38bdf8; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>🏛️</span> 1. Tujuan & Struktur Permainan
          </h4>
          <p style="margin: 0 0 6px 0;">
            Kamu adalah Walikota yang bertugas menata <strong>3 Distrik Kota</strong> (Westfall, Midvale, Eastgate) selama <strong>6 Fase</strong> (total 18 aksi). Masing-masing distrik menampung 15 kartu domino (3 baris × 5 kartu).
          </p>
          <p style="margin: 0;">
            Tiap ronde kamu menjalankan rute pembangunan bergantian antar distrik, lalu menukar sisa kartu tangan dengan <strong>Bursa Rekanan</strong> di akhir fase.
          </p>
        </div>

        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
          <h4 style="margin: 0 0 6px 0; color: #fbbf24; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>🎯</span> 2. Formula Skor & Master Plan
          </h4>
          <p style="margin: 0 0 8px 0;">
            Skor tiap distrik dihitung mandiri: baris atas dan baris bawah pada ketiga baris dinilai terpisah (total 6 jalur per distrik).
          </p>
          <div style="background: #0f172a; padding: 8px 10px; border-radius: 6px; border-left: 3px solid #fbbf24; font-family: monospace; font-size: 0.85rem; color: #f8fafc; margin-bottom: 8px;">
            Skor Akhir Distrik = (Total Poin Master Plan + Bonus Kartu Khusus) × % Kepuasan Warga
          </div>
          <p style="margin: 0 0 6px 0; font-size: 0.82rem; color: #94a3b8;">Daftar Kontrak Kombinasi:</p>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 0.8rem;">
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>⭐ Str. Flush</span><strong style="color: #38bdf8;">50 pt</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>👑 Five Kind</span><strong style="color: #38bdf8;">45 pt</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>💎 Four Kind</span><strong style="color: #38bdf8;">40 pt</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>🏠 Full House</span><strong style="color: #38bdf8;">35 pt</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>🔢 Straight</span><strong style="color: #38bdf8;">30 pt</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>🎨 Flush</span><strong style="color: #38bdf8;">20 pt</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>👥 Two Pair</span><strong style="color: #38bdf8;">25 pt</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>⛵ Color Boat</span><strong style="color: #38bdf8;">15 pt</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>🔷 Three Kind</span><strong style="color: #38bdf8;">10 pt</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>👀 One Pair</span><strong style="color: #38bdf8;">5 pt</strong></div>
          </div>
        </div>

        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
          <h4 style="margin: 0 0 6px 0; color: #4ade80; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>😊</span> 3. Kepuasan Warga & Zonasi Angka
          </h4>
          <p style="margin: 0 0 6px 0;">
            Angka domino (0–6) mewakili kebutuhan zonasi tata ruang kota:
          </p>
          <ul style="margin: 0 0 8px 18px; padding: 0; font-size: 0.83rem;">
            <li><strong style="color: #4ade80;">Ekologi & RTH (0, 1, 6):</strong> Ruang terbuka hijau dan cagar alam.</li>
            <li><strong style="color: #38bdf8;">Hunian & Layanan (0, 3, 4):</strong> Permukiman, rumah tapak, dan fasilitas umum.</li>
            <li><strong style="color: #f87171;">Pusat Bisnis (2, 5, 6):</strong> Kawasan komersial, bursa kerja, dan perkantoran.</li>
          </ul>
          <p style="margin: 0; font-size: 0.83rem; color: #fca5a5;">
            ⚠️ <strong>Syarat Kelulusan:</strong> Di akhir fase 6, setiap distrik wajib mencapai kepuasan minimal <strong>50%</strong>. Distrik di bawah 50% dinyatakan kolaps!
          </p>
        </div>

        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 12px;">
          <h4 style="margin: 0 0 6px 0; color: #c084fc; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>⭐</span> 4. Kartu Khusus & Bintang Wild
          </h4>
          <p style="margin: 0 0 6px 0;">Kartu Khusus di pojok kanan atas memberikan 2 keuntungan:</p>
          <ul style="margin: 0; padding-left: 18px; font-size: 0.83rem;">
            <li><strong>Paruh Atas (Wild ⭐):</strong> Angka dan warnanya menjadi kartu bintang Wild di tangan. Angkanya bebas kamu ubah kapan pun tanpa memakan giliran aksi!</li>
            <li><strong>Paruh Bawah (Bonus +Poin):</strong> Setiap kali angka & warnanya berhasil masuk ke kombo sah, kamu langsung mendapat poin ekstra.</li>
          </ul>
        </div>
      </div>
    `,

    // Evaluasi & Game Over
    game_over_title: 'Masa Jabatan Selesai',
    game_over_win: 'Kota Sukses Berkembang Pesat!',
    game_over_loss: 'Kota Mengalami Krisis & Kolaps!',
    game_over_btn_retry: 'Coba Lagi',
    game_over_btn_homescreen: 'Kembali ke Menu Utama',
    game_over_submit_score: 'Kirim Skor ke Leaderboard'
  },

  en: {
    // Homescreen & Navigation
    app_title: 'CITY DOMINO',
    app_tagline: 'Design 3 thriving city districts with tactics!',
    btn_play: 'Play Now',
    btn_tutorial: 'Tutorial',
    btn_help: 'Rules & Guide',
    btn_lb: 'Leaderboard',
    btn_exit: 'Exit',
    btn_restart: 'Restart Game',
    btn_resume: 'Resume',
    btn_settings: 'Settings',

    // Status Bar & Game Header
    header_phase: 'Phase',
    phase_indicator: 'Phase {cur} / {max}',
    header_route: 'District Route',
    header_score: 'Total Score',
    header_happiness: 'Avg Happiness',
    special_card_title: 'Special Tile',
    special_card_wild: 'Wild ⭐',
    special_card_bonus: 'Point Bonus',
    timer_card_label: 'Project {num}',
    timer_available: 'Ready',
    timer_slots_title: 'Project Supply Depot',
    points_suffix: 'pts',

    // Gameplay Buttons & Controls
    btn_rotate: '🔄 Rotate',
    btn_swap: 'Swap Domino',
    btn_discard_draw: 'Discard & Draw Supply',
    btn_target_market: 'Supply Depot',
    btn_target_finish: 'Finish',
    wild_tooltip: 'Star Pip: Click to change domino value!',
    route_label: 'Route',

    // District & Lane Names
    district_westfall: 'Westfall',
    district_midvale: 'Midvale',
    district_eastgate: 'Eastgate',
    dist_westfall: 'Westfall',
    dist_midvale: 'Midvale',
    dist_eastgate: 'Eastgate',
    left: 'Westfall',
    center: 'Midvale',
    right: 'Eastgate',

    // Citizen Aspirations & Zoning
    aspiration_title: 'Citizen Demands',
    aspiration_ecology: 'Ecology',
    aspiration_residential: 'Housing',
    aspiration_commerce: 'Business',
    aspiration_satisfied: 'Satisfied',
    aspiration_all_met: 'All citizen demands satisfied',
    zone_eco_desc: 'Parks & Reserves (Pip 0, 1, 6)',
    zone_res_desc: 'Residential & Services (Pip 0, 3, 4)',
    zone_com_desc: 'Commercial Hubs (Pip 2, 5, 6)',
    status_happy_met: 'Delighted Citizens',
    status_happy_unmet: 'Demands Incomplete',
    happiness_target_warning: 'Districts require at least 50% by game end to prevent collapse!',
    score_balloon_title: 'Score Breakdown',
    score_master_plan: 'Master Plan',
    happiness_level: 'Citizen Happiness',
    score_calc_label: 'Calculation',

    // Master Plan & Poker Combos (EN)
    combo_straight_flush: 'Straight Flush',
    combo_straight_flush_desc: '5 consecutive sequential numbers sharing the exact same background color.',
    combo_five_kind: 'Five of a Kind',
    combo_five_kind_desc: '5 tiles in the row sharing identical numbers (any color). E.g.: 5-5-5-5-5.',
    combo_five_of_a_kind: 'Five of a Kind',
    combo_five_of_a_kind_desc: '5 tiles in the row sharing identical numbers (any color). E.g.: 5-5-5-5-5.',
    combo_four_kind: 'Four of a Kind',
    combo_four_kind_desc: '4 tiles sharing the same number in one row (any color, 1 remaining tile free).',
    combo_four_of_a_kind: 'Four of a Kind',
    combo_four_of_a_kind_desc: '4 tiles sharing the same number in one row (any color, 1 remaining tile free).',
    combo_full_house: 'Full House',
    combo_full_house_desc: 'A combination of 3 matching numbers + 2 matching numbers in a single row.',
    combo_straight: 'Straight',
    combo_straight_desc: '5 consecutive numbers without gap (e.g., 2-3-4-5-6). Colors can be mixed.',
    combo_flush: 'Flush',
    combo_flush_desc: 'All 5 tiles in a row share the exact same background color (any numbers).',
    combo_color_flush: 'Color Flush',
    combo_color_flush_desc: 'All 5 tiles in a row share the exact same background color (any numbers).',
    combo_two_pair: 'Two Pair',
    combo_two_pair_desc: '2 distinct pairs of matching numbers (e.g., a pair of 1s and a pair of 5s).',
    combo_color_boat: 'Color Boat',
    combo_color_boat_desc: '3 tiles of one color + 2 tiles of another color (e.g., 3 blue & 2 red).',
    combo_three_kind: 'Three of a Kind',
    combo_three_kind_desc: '3 matching numbers in a single row (any color, 2 remaining tiles free).',
    combo_three_of_a_kind: 'Three of a Kind',
    combo_three_of_a_kind_desc: '3 matching numbers in a single row (any color, 2 remaining tiles free).',
    combo_one_pair: 'One Pair',
    combo_one_pair_desc: 'At least 1 pair of matching numbers in the row (any color).',
    combo_high_card: 'High Card',
    combo_high_card_desc: 'No special combo formed (highest single number evaluated).',

    // City Policies (EN)
    policy_metropolis_klasik: 'Classic Metropolis',
    policy_taman_ekologis: 'Ecological Park',
    policy_kawasan_terpadu: 'Integrated Zone',
    policy_zona_harmoni: 'Harmony Zone',
    policy_distrik_simetris: 'Symmetrical District',
    policy_master_urban_2026: 'Urban Master 2026',
    policy_pusat_riset: 'Research Center',
    policy_koridor_hijau: 'Green Corridor',
    policy_smart_transit: 'Smart Transit',
    policy_blok_modular: 'Modular Block',
    policy_megapolitan: 'Megapolitan',
    policy_kampung_kompak: 'Compact Village',

    // General Actions & Controls
    action_rotate: 'Rotate',
    action_swap: 'Swap Domino',
    action_confirm: 'Confirm',
    action_cancel: 'Cancel',
    action_next_phase: 'Advance Phase',
    action_draw_pool: 'Draw Domino',
    reserve_pool_title: 'Reserve Pool',
    player_hand_title: "Mayor's Hand",

    // End-Game Evaluation Modal & Leaderboard (EN)
    modal_defeat_title: 'CITY COLLAPSED!',
    modal_defeat_desc: 'At least one district dropped below the required 50% minimum citizen happiness.',
    modal_defeat_status: 'Development Failed',
    modal_status_label: 'Final Status',
    modal_victory_title: 'PROSPEROUS CITY!',
    modal_victory_desc: 'All districts successfully sustained citizen happiness above the 50% threshold.',
    modal_predicate_label: 'Mayoral Distinction',
    rank_utopia: 'Modern Utopia (Legend)',
    rank_metropolis: 'Thriving Metropolis (Expert)',
    rank_satellite: 'Satellite Hub (Skilled)',
    rank_developing: 'Developing Zone (Promising)',
    rank_underdeveloped: 'Struggling District (Needs Work)',
    lb_collapse_alert: '⚠️ City Collapsed — Score is not eligible for leaderboard recording.',
    lb_record_title: '🏆 New Record Achieved!',
    lb_name_placeholder: 'Enter Mayor name...',
    lb_btn_submit: 'Submit Score to Leaderboard',

    // Help Modal (4 Steps Tab)
    tab_sandbox: 'Quick Sandbox',
    tab_rules: 'Full Rules',
    help_modal_title: 'City Planning Handbook',
    help_happy_100: '😊 100% Citizens Delighted',
    help_happy_75: '😊 75% Citizens Satisfied (+50%)',
    help_happy_25: '⚠️ 25% Crisis (Needs 1)',
    help_happy_100_prosper: '😊 100% Prosperous',
    help_step_1_title: 'Step 1: Premise & City Interface',
    help_step_1_desc: 'You are the Mayor developing 3 districts across 6 phases (18 actions total). Domino pips (0–6) represent city zonings. Achieve high poker combo targets and keep <b>District Happiness at 50% or above</b> to prevent collapse!',
    help_step_2_title: 'Step 2: Poker Scoring & Card Swapping',
    help_step_2_desc: 'Select hand tile <b>[4 | 0]</b>, then click slot 5 <b>[2 | 6]</b> to form a <b>Five of a Kind (4-4-4-4-4)</b> on the top row!<div class="tut-click-tip">💡 <b>Tip:</b> Click any score number in the district header to inspect its combos & calculations.</div>',
    help_step_2_status: 'Target: Five of a Kind (+30 pts)',
    help_step_3_title: 'Step 3: Rotating Cards & Citizen Satisfaction',
    help_step_3_desc: 'This district is in crisis (Happiness <b>25%</b>) due to lacking Single-Family Homes (number 1). Click <b>🔄 Rotate</b> on your hand tile so pip 1 moves to the top, then swap it into slot 3!<div class="tut-click-tip">💡 <b>Tip:</b> Click the happiness badge (😊/⚠️) anytime to inspect citizen zoning demands.</div>',
    help_step_3_status: 'Target: Reach Happiness ≥ 50%',
    help_step_4_title: 'Step 4: Star Power (Wild ⭐)',
    help_step_4_desc: 'The ⭐ tile is a Number Wild. Click ⭐ on tile 3, then pick number <b>3</b> to complete the <b>Straight Flush (1-2-3-4-5 Blue)</b>!',
    help_step_4_status: 'Target: Change ⭐ to 3',
    help_step_2_fb_ok: '🎉 <b>Five of a Kind achieved (+30 pts)!</b> Top and bottom rows are evaluated independently.',
    help_step_2_fb_fail: '⚠️ Not yet Five of a Kind. Click <b>↺ Retry</b> and swap with slot 5 containing pip 2.',
    help_step_3_fb_ok: '🎉 <b>Happiness increased to 75%!</b> Rotating 180° aligns required zones into the target line. Minimum 50% is required at end of game to avoid collapse!',
    help_step_3_fb_fail: '⚠️ Pip 1 is not on top yet (Happiness still 25%). Click <b>↺ Retry</b>, rotate your hand card, and swap into slot 3.',
    help_step_4_fb_ok: '🎉 <b>Straight Flush 40 pts active!</b> ⭐ tiles can be changed anytime without spending an action turn.',
    help_step_4_fail: '⚠️ Tile changed to {val}. Click ⭐ again and choose <b>3</b> to finish the Straight Flush (1-2-3-4-5).',
    help_btn_next_step_3: 'Next to Step 3 ➔',
    help_btn_next_step_4: 'Next to Step 4 ➔',
    help_btn_close_info: 'Close Info',
    help_btn_finish: 'Finish & Play! 🚀',
    help_btn_ok: 'OK',

    // =========================================================================
    // 24-STEP ON-RAILS TUTORIAL (citydomino_tutorial.js - EN)
    // =========================================================================
    tut_policy_name: 'Metropolitan Plan',
    tut_step_badge: 'Step {cur}/{max}',
    btn_next_general: 'Next ➔',

    tut_step_1_text: 'Your goal is to develop <strong>3 City Districts</strong>: <strong>Westfall</strong> (left), <strong>Midvale</strong> (center), and <strong>Eastgate</strong> (right), each holding 15 dominoes (3 rows).<br><br>Construction each phase follows the route shown above: starting with <strong>Westfall ➔ Eastgate ➔ Midvale</strong>. In even phases, the order alternates to <strong>Eastgate ➔ Westfall ➔ Midvale</strong>.',
    tut_step_1_btn: 'Learn Master Plan ➔',

    tut_step_2_text: '<strong>City Master Plan (4th Column):</strong><br>This panel displays the 6 active combo contracts for this session. Arrangements formed in district rows yield raw points matching these contracts:<br><div class="tut-combos-table"><div class="tut-combo-item"><span class="c-name">⭐ Str. Flush</span><span class="c-pts">40 pts</span></div><div class="tut-combo-item"><span class="c-name">👑 Five Kind</span><span class="c-pts">30 pts</span></div><div class="tut-combo-item"><span class="c-name">💎 Four Kind</span><span class="c-pts">25 pts</span></div><div class="tut-combo-item"><span class="c-name">🏠 Full House</span><span class="c-pts">20 pts</span></div><div class="tut-combo-item"><span class="c-name">🔷 Three Kind</span><span class="c-pts">15 pts</span></div><div class="tut-combo-item"><span class="c-name">👥 Two Pair</span><span class="c-pts">10 pts</span></div></div>Click any combo card in the Master Plan to view its rule details!',
    tut_step_2_btn: 'Check Citizen Happiness ➔',

    tut_step_3_text: 'Alongside the Master Plan, you must satisfy <strong>Citizen Happiness</strong>. Westfall is currently at 75%. Click the <strong>😊 75%</strong> badge in Westfall header to inspect citizen aspirations!',
    tut_step_4_text: 'The citizen aspiration balloon appears below the badge. <strong>Ecology (0, 1, 6)</strong> demand is currently 8/10 (-2). Reaching 10 tiles will boost happiness to <strong>100% Delighted</strong>.',
    tut_step_4_btn: 'Understood, Check Score ➔',
    tut_step_5_text: 'Click the score value in the Westfall header to view the poker score calculation breakdown!',
    tut_step_6_text: 'Final district score formula: <strong>Master Plan Points × % Citizen Happiness</strong>.<br><br>Now let\'s practice: satisfy Ecology demands while forming a <strong>Five of a Kind</strong> on Row 1 of Westfall!',
    tut_step_6_btn: 'Start Swapping ➔',

    tut_step_7_text: 'Observe your first hand tile <strong>[1|6]</strong>. Click the glowing <strong>🔄 Rotate</strong> button below it so pip <strong>6</strong> flips to the top as <strong>[6|1]</strong>.',
    tut_step_8_text: 'Click the newly rotated <strong>[6|1]</strong> hand tile to select it.',
    tut_step_9_text: 'Look at Row 1 of Westfall: there are four 6s on top. Click the flashing 3rd tile <strong>[2|5]</strong> to swap!',
    tut_step_10_text: 'Check the route indicator at the top: <strong>Westfall ➔ Eastgate ➔ Midvale</strong>. The action button now reads <strong>Swap (Next: Eastgate)</strong>. Click this button!',
    tut_step_11_text: 'Great job! Westfall now holds a <strong>Five of a Kind 6s</strong>. Notice the massive boost in score and citizen happiness!',
    tut_step_11_btn: 'Next: Wild Cards ➔',

    tut_step_12_text: 'Notice the <strong>Special Tile [4|3]</strong> at top right! Top half <strong>[4⭐]</strong> grants the <strong>Wild</strong> trait. Any tile with pip 4 amber automatically features a <strong>⭐</strong>, like your second hand card <strong>[4⭐|5]</strong>.<br><br>Click the <strong>⭐</strong> pip on that hand card to choose its value first!',
    tut_step_13_text: 'In the Wild Picker modal, switch pip 4 to <strong>2</strong> to prepare for a Full House (three 5s and two 2s) in Eastgate later!',
    tut_step_14_text: 'Your hand tile is now <strong>[2|5]</strong>. Click it to select!',
    tut_step_15_text: 'Look at Row 1 of Eastgate: 5s and 2s already occupy the top row. Click the flashing 3rd tile <strong>[3|4]</strong> to swap with [2|5]!',
    tut_step_16_text: 'Next route destination is Midvale. Click the <strong>Swap (Next: Midvale)</strong> button.',
    tut_step_17_text: '<div class="tut-winning-badge">🎉 ROW 1 RESULT:</div><br>• Eastgate top row successfully completed a <strong>Full House (Three 5s & Two 2s)</strong>! Points: <strong>+20 pts</strong>.<br>• Numbers 2 and 5 fulfill the <strong>Business (2, 5, 6)</strong> pillar, boosting Eastgate happiness to <strong>😊 100%</strong>!',
    tut_step_17_btn: 'Advance to Midvale ➔',

    tut_step_18_text: 'Now check the bottom half of the Special Tile: <strong>[+3 | 3]</strong>. Every pip 3 blue included in a valid combo grants <strong>+3 Bonus Points</strong>!<br><br>Notice your hand card <strong>[3|4]</strong> bearing the golden <strong>+3</strong> tag. Click this card!',
    tut_step_19_text: 'Check Row 1 of Midvale: four 3s on top and 4 & 2 on the bottom. Click the flashing 3rd tile <strong>[1|5]</strong>!',
    tut_step_20_text: 'All districts have been developed. Click the <strong>Swap (Next: Supply)</strong> button.',
    tut_step_21_text: '<div class="tut-winning-badge">🎉 ROW 1 RESULT:</div><br>• <strong>DOUBLE COMBO!</strong> Top row forms a <strong>Five of a Kind (3-3-3-3-3)</strong> worth <strong>+30 pts</strong>!<br>• Bottom row completes a <strong>Full House (Three 4s & Two 2s)</strong> worth <strong>+20 pts</strong>!<br>• <strong>Special Bonus:</strong> Pip [3] blue contributes an additional <strong>+3 bonus pts</strong>!<br>• Midvale reaches <strong>😊 100%</strong> happiness!',
    tut_step_21_btn: 'Enter Phase End ➔',

    tut_step_22_text: '<strong>Phase Conclusion:</strong> All three districts have been built. Tiles in the <strong>Reserve Pool</strong> remain face-down. Click the highlighted hand tile <strong>[5|2]</strong> to swap with the top Reserve card!',
    tut_step_23_text: 'Click the <strong>Discard & Draw Supply</strong> button to draw a card from the Reserve Pool.',
    tut_step_24_text: '<div class="tut-winning-badge">🔄 RESERVE SUPPLY DRAWN:</div><br>• Previous hand tile <strong>[5|2]</strong> was exchanged for a fresh Reserve tile: <strong>[6|5]</strong>!<br>• Pips <strong>6</strong> and <strong>5</strong> provide high-value zoning fuel for Ecology & Commerce in Phase 2.<br>• Click the button below to view your final simulation evaluation!',
    tut_step_24_btn: 'View Final Evaluation ➔',

    // Full Rules HTML Tab Content
    help_full_rules: `
      <div class="rules-scroll-content" style="padding: 10px 4px; color: #cbd5e1; font-size: 0.88rem; line-height: 1.55;">
        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
          <h4 style="margin: 0 0 6px 0; color: #38bdf8; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>🏛️</span> 1. Premise & Game Loop
          </h4>
          <p style="margin: 0 0 6px 0;">
            You are the Mayor developing <strong>3 City Districts</strong> (Westfall, Midvale, Eastgate) across <strong>6 Phases</strong> (18 swap actions total). Each district holds 15 dominoes (3 rows × 5 tiles).
          </p>
          <p style="margin: 0;">
            Follow the construction route between districts each round, then exchange leftover hand tiles with the <strong>Reserve Pool</strong> at phase conclusion.
          </p>
        </div>

        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
          <h4 style="margin: 0 0 6px 0; color: #fbbf24; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>🎯</span> 2. Scoring & Master Plan
          </h4>
          <p style="margin: 0 0 8px 0;">
            District scoring is evaluated independently: top and bottom pip rows across all 3 grid rows are scored separately (6 scoring tracks per district).
          </p>
          <div style="background: #0f172a; padding: 8px 10px; border-radius: 6px; border-left: 3px solid #fbbf24; font-family: monospace; font-size: 0.85rem; color: #f8fafc; margin-bottom: 8px;">
            Final District Score = (Total Master Plan Points + Special Card Bonus) × % Citizen Happiness
          </div>
          <p style="margin: 0 0 6px 0; font-size: 0.82rem; color: #94a3b8;">Active Master Plan Contracts:</p>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; font-size: 0.8rem;">
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>⭐ Str. Flush</span><strong style="color: #38bdf8;">50 pts</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>👑 Five Kind</span><strong style="color: #38bdf8;">45 pts</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>💎 Four Kind</span><strong style="color: #38bdf8;">40 pts</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>🏠 Full House</span><strong style="color: #38bdf8;">35 pts</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>🔢 Straight</span><strong style="color: #38bdf8;">30 pts</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>🎨 Flush</span><strong style="color: #38bdf8;">20 pts</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>👥 Two Pair</span><strong style="color: #38bdf8;">25 pts</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>⛵ Color Boat</span><strong style="color: #38bdf8;">15 pts</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>🔷 Three Kind</span><strong style="color: #38bdf8;">10 pts</strong></div>
            <div style="background: #1e293b; padding: 4px 8px; border-radius: 4px; display: flex; justify-content: space-between;"><span>👀 One Pair</span><strong style="color: #38bdf8;">5 pts</strong></div>
          </div>
        </div>

        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
          <h4 style="margin: 0 0 6px 0; color: #4ade80; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>😊</span> 3. Citizen Happiness & Zoning
          </h4>
          <p style="margin: 0 0 6px 0;">
            Pip numbers (0–6) correlate directly to zoning requirements:
          </p>
          <ul style="margin: 0 0 8px 18px; padding: 0; font-size: 0.83rem;">
            <li><strong style="color: #4ade80;">Ecology & Parks (0, 1, 6):</strong> Green spaces, parks, and reserves.</li>
            <li><strong style="color: #38bdf8;">Residential & Services (0, 3, 4):</strong> Family homes, flats, and civic halls.</li>
            <li><strong style="color: #f87171;">Commerce & Business (2, 5, 6):</strong> Commercial avenues, markets, and offices.</li>
          </ul>
          <p style="margin: 0; font-size: 0.83rem; color: #fca5a5;">
            ⚠️ <strong>Survival Threshold:</strong> All districts must sustain at least <strong>50%</strong> happiness by phase 6 end to prevent collapse!
          </p>
        </div>

        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid #334155; border-radius: 8px; padding: 12px;">
          <h4 style="margin: 0 0 6px 0; color: #c084fc; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
            <span>⭐</span> 4. Special Cards & Wilds
          </h4>
          <p style="margin: 0 0 6px 0;">The Special Card at top right offers two strategic perks:</p>
          <ul style="margin: 0; padding-left: 18px; font-size: 0.83rem;">
            <li><strong>Top Half (Wild ⭐):</strong> Matching pip and color gains a star wild in hand. Change its value freely without spending turns!</li>
            <li><strong>Bottom Half (Bonus +Pts):</strong> Every matching pip included in a valid combo instantly earns extra bonus points.</li>
          </ul>
        </div>
      </div>
    `,

    // Game Over & Results
    game_over_title: 'Mayoral Term Concluded',
    game_over_win: 'City Flourished Successfully!',
    game_over_loss: 'City Collapsed Under Crisis!',
    game_over_btn_retry: 'Try Again',
    game_over_btn_homescreen: 'Back to Home',
    game_over_submit_score: 'Submit to Leaderboard'
  }
};

(function () {
  let currentLanguage = localStorage.getItem('citydomino_lang') || 'id';

  function t(key, fallbackOrParams, params) {
    let fallback = typeof fallbackOrParams === 'string'? fallbackOrParams: null;
    let actualParams = typeof fallbackOrParams === 'object' && fallbackOrParams!== null? fallbackOrParams: params;

    const dict = CITYDOMINO_TRANSLATIONS[currentLanguage] || CITYDOMINO_TRANSLATIONS['id'];
    let val = dict[key];

    // Fallback normalisasi otomatis (contoh: four_kind <-> four_of_a_kind)
    if (val === undefined || val === null) {
      if (key.indexOf('_kind')!== -1 && key.indexOf('_of_a_kind') === -1) {
        val = dict[key.replace('_kind', '_of_a_kind')];
      } else if (key.indexOf('_of_a_kind')!== -1) {
        val = dict[key.replace('_of_a_kind', '_kind')];
      }
    }

    if (val === undefined || val === null) {
      val = fallback!== null? fallback: key;
    }

    if (actualParams && typeof actualParams === 'object') {
      let interpolated = String(val);
      Object.keys(actualParams).forEach(k => {
        interpolated = interpolated.replace(new RegExp(`\\{${k}\\}`, 'g'), actualParams[k]);
      });
      return interpolated;
    }

    return val;
  }

  function applyLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('citydomino_lang', lang);

    const dict = CITYDOMINO_TRANSLATIONS[lang] || CITYDOMINO_TRANSLATIONS['id'];

    // Update semua elemen yang memiliki atribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (val!== undefined && val!== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.innerHTML = val;
        }
      }
    });

    // Injeksi otomatis konten Aturan Lengkap ke tab rules
    const paneRules = document.getElementById('pane-rules');
    if (paneRules && dict.help_full_rules) {
      paneRules.innerHTML = dict.help_full_rules;
    }

    // Perbarui status aktif (highlight menyala) tombol bahasa
    const isEn = lang === 'en';
    const hsEn = document.getElementById('hs-lang-en');
    const hsId = document.getElementById('hs-lang-id');

    if (hsEn) hsEn.classList.toggle('active', isEn);
    if (hsId) hsId.classList.toggle('active',!isEn);

    // Untuk tombol header jika menampilkan teks bahasa tunggal
    document.querySelectorAll('.btn-lang-header.lang-curr').forEach(el => {
      el.textContent = lang.toUpperCase();
    });

    // Render ulang papan game jika instance game aktif
    if (typeof renderAll === 'function' && typeof state!== 'undefined' && state.pools) {
      renderAll();
    }
  }

  function toggleLanguage() {
    const nextLang = currentLanguage === 'id'? 'en': 'id';
    applyLanguage(nextLang);
  }

  function setLanguage(lang) {
    if (CITYDOMINO_TRANSLATIONS[lang]) {
      applyLanguage(lang);
    }
  }

  function getLanguage() {
    return currentLanguage;
  }

  // Daftarkan ke objek window global
  window.t = t;
  window.applyLanguage = applyLanguage;
  window.toggleLanguage = toggleLanguage;
  window.setLanguage = setLanguage;
  window.getLanguage = getLanguage;
  window.CITYDOMINO_TRANSLATIONS = CITYDOMINO_TRANSLATIONS;

  // Inisialisasi event listener saat DOM selesai dimuat
  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLanguage);
  });
})();