/* -------------------------------------------------------------
       DATA REFERENSI & KONSTANTA
    ------------------------------------------------------------- */
    const ROUTE = ['left', 'right', 'center', 'right', 'left', 'center'];

    // Generator Ikon Siluet Bangunan Vektor SVG (0 - 6)
    function getBuildingSvg(val, size = 17) {
      const icons = {
        0: `<svg class="building-icon" style="width:${size}px;height:${size}px;" viewBox="0 0 24 24"><path d="M12 2L7 8h2.5L5 13h3L6 18h4v4h4v-4h4l-2-5h3l-2.5-5H17L12 2z"/></svg>`,
        1: `<svg class="building-icon" style="width:${size}px;height:${size}px;" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z"/></svg>`,
        2: `<svg class="building-icon" style="width:${size}px;height:${size}px;" viewBox="0 0 24 24"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>`,
        3: `<svg class="building-icon" style="width:${size}px;height:${size}px;" viewBox="0 0 24 24"><path d="M4 3h16v18H4V3zm4 3H6v3h2V6zm0 5H6v3h2v-3zm0 5H6v3h2v-3zm5-10h-2v3h2V6zm0 5h-2v3h2v-3zm0 5h-2v3h2v-3zm5-10h-2v3h2V6zm0 5h-2v3h2v-3zm0 5h-2v3h2v-3z"/></svg>`,
        4: `<svg class="building-icon" style="width:${size}px;height:${size}px;" viewBox="0 0 24 24"><path d="M17 2H7a2 2 0 0 0-2 2v18h14V4a2 2 0 0 0-2-2zm-6 2h2v2h-2V4zm0 4h2v2h-2V8zm0 4h2v2h-2v-2zm-4-8h2v2H7V4zm0 4h2v2H7V8zm0 4h2v2H7v-2zm8 6h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2z"/></svg>`,
        5: `<svg class="building-icon" style="width:${size}px;height:${size}px;" viewBox="0 0 24 24"><path d="M19 9V4l-4-2H9L5 4v5H3v13h18V9h-2zm-6-5h2v2h-2V4zm-4 0h2v2H9V4zm-2 7h2v2H7v-2zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm6-8h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-8h-2v2h2v-2zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`,
        6: `<svg class="building-icon" style="width:${size}px;height:${size}px;" viewBox="0 0 24 24"><path d="M12 1L9 7h2v5H8l-2 9h12l-2-9h-3V7h2L12 1zm0 3.2L12.9 6h-1.8L12 4.2zM10 14h4l1 5H9l1-5z"/></svg>`
      };
      return icons[val]!== undefined? icons[val]: '';
    }

    const MASTER_COMBOS = {
      five_kind: {
        id: 'five_kind',
        name: 'Five of a Kind',
        pts: 40,
        desc: '5 domino di baris memiliki angka sama persis (warna bebas). Contoh: 5-5-5-5-5.',
        pattern: [
          { val: '5', col: 'blue' }, { val: '5', col: 'green' }, { val: '5', col: 'amber' }, { val: '5', col: 'red' }, { val: '5', col: 'blue' }
        ]
      },
      straight_flush: {
        id: 'straight_flush',
        name: 'Straight Flush',
        pts: 50,
        desc: '5 angka berurutan TANPA putus DAN kelimanya memiliki 1 warna sama persis.',
        pattern: [
          { val: '1', col: 'blue' }, { val: '2', col: 'blue' }, { val: '3', col: 'blue' }, { val: '4', col: 'blue' }, { val: '5', col: 'blue' }
        ]
      },
      four_kind: {
        id: 'four_kind',
        name: 'Four of a Kind',
        pts: 35,
        desc: '4 domino memiliki angka yang sama di satu baris (warna bebas, 1 sisa bebas).',
        pattern: [
          { val: '4', col: 'amber' }, { val: '4', col: 'green' }, { val: '4', col: 'red' }, { val: '4', col: 'blue' }, { val: '•', col: 'blue' }
        ]
      },
      full_house: {
        id: 'full_house',
        name: 'Full House',
        pts: 30,
        desc: 'Kombinasi 3 angka kembar + 2 angka kembar lain pada satu baris (warna bebas).',
        pattern: [
          { val: '3', col: 'green' }, { val: '3', col: 'blue' }, { val: '3', col: 'red' }, { val: '6', col: 'amber' }, { val: '6', col: 'green' }
        ]
      },
      flush: {
        id: 'flush',
        name: 'Flush',
        pts: 20,
        desc: 'Semua 5 petak di satu baris memiliki warna latar yang sama persis (angka bebas).',
        pattern: [
          { val: '•', col: 'green' }, { val: '•', col: 'green' }, { val: '•', col: 'green' }, { val: '•', col: 'green' }, { val: '•', col: 'green' }
        ]
      },
      straight: {
        id: 'straight',
        name: 'Straight',
        pts: 25,
        desc: '5 angka berurutan tanpa putus (misal: 2-3-4-5-6). Warna kartu boleh campur.',
        pattern: [
          { val: '2', col: 'blue' }, { val: '3', col: 'amber' }, { val: '4', col: 'green' }, { val: '5', col: 'red' }, { val: '6', col: 'blue' }
        ]
      },
      color_boat: {
        id: 'color_boat',
        name: 'Color Boat',
        pts: 10,
        desc: '3 petak berwarna sama + 2 petak warna sama lainnya (misal: 3 biru & 2 merah).',
        pattern: [
          { val: '•', col: 'blue' }, { val: '•', col: 'blue' }, { val: '•', col: 'blue' }, { val: '•', col: 'red' }, { val: '•', col: 'red' }
        ]
      },
      three_kind: {
        id: 'three_kind',
        name: 'Three of a Kind',
        pts: 7,
        desc: 'Ada 3 angka kembar sama di satu baris (warna bebas, 2 kartu lainnya bebas).',
        pattern: [
          { val: '2', col: 'red' }, { val: '2', col: 'blue' }, { val: '2', col: 'green' }, { val: '•', col: 'amber' }, { val: '•', col: 'blue' }
        ]
      },
      two_pair: {
        id: 'two_pair',
        name: 'Two Pair',
        pts: 15,
        desc: 'Ada 2 pasang angka kembar yang berbeda (misal sepasang 1 dan sepasang 5).',
        pattern: [
          { val: '1', col: 'blue' }, { val: '1', col: 'red' }, { val: '5', col: 'green' }, { val: '5', col: 'amber' }, { val: '•', col: 'blue' }
        ]
      },
      one_pair: {
        id: 'one_pair',
        name: 'One Pair',
        pts: 5,
        desc: 'Minimal terdapat 1 pasang angka kembar sama di baris (warna bebas).',
        pattern: [
          { val: '6', col: 'amber' }, { val: '6', col: 'blue' }, { val: '•', col: 'green' }, { val: '•', col: 'red' }, { val: '•', col: 'blue' }
        ]
      }
    };

    const POLICIES = [
      { name: "Metropolis Klasik", fav: { left: 1, center: 5, right: 4 }, active: ['five_kind', 'four_kind', 'full_house', 'straight', 'three_kind', 'one_pair'] },
      { name: "Taman Ekologis", fav: { left: 0, center: 6, right: 3 }, active: ['straight_flush', 'flush', 'color_boat', 'full_house', 'two_pair', 'one_pair'] },
      { name: "Kawasan Terpadu", fav: { left: 2, center: 5, right: 3 }, active: ['five_kind', 'straight_flush', 'four_kind', 'flush', 'straight', 'two_pair'] },
      { name: "Zona Harmoni", fav: { left: 0, center: 1, right: 4 }, active: ['straight_flush', 'full_house', 'flush', 'straight', 'color_boat', 'three_kind'] },
      { name: "Distrik Simetris", fav: { left: 4, center: 2, right: 4 }, active: ['four_kind', 'full_house', 'straight', 'color_boat', 'two_pair', 'one_pair'] },
      { name: "Master Urban 2026", fav: { left: 6, center: 5, right: 2 }, active: ['five_kind', 'straight_flush', 'flush', 'color_boat', 'three_kind', 'one_pair'] },
      { name: "Pusat Riset", fav: { left: 3, center: 6, right: 5 }, active: ['five_kind', 'four_kind', 'straight_flush', 'straight', 'two_pair', 'one_pair'] },
      { name: "Koridor Hijau", fav: { left: 0, center: 1, right: 0 }, active: ['straight_flush', 'flush', 'color_boat', 'straight', 'three_kind', 'two_pair'] },
      { name: "Smart Transit", fav: { left: 2, center: 4, right: 3 }, active: ['full_house', 'straight', 'flush', 'color_boat', 'two_pair', 'one_pair'] },
      { name: "Blok Modular", fav: { left: 4, center: 3, right: 1 }, active: ['four_kind', 'full_house', 'color_boat', 'three_kind', 'two_pair', 'one_pair'] },
      { name: "Megapolitan", fav: { left: 5, center: 6, right: 5 }, active: ['five_kind', 'straight_flush', 'four_kind', 'full_house', 'flush', 'straight'] },
      { name: "Desain Kompak", fav: { left: 1, center: 2, right: 3 }, active: ['straight', 'flush', 'color_boat', 'three_kind', 'two_pair', 'one_pair'] }
    ];