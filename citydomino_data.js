/* -------------------------------------------------------------
   DATA REFERENSI & KONSTANTA (CITY DOMINO)
   Terintegrasi dengan citydomino_i18n.js
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
  straight_flush: {
    id: 'straight_flush',
    get name() { return typeof t === 'function'? t('combo_straight_flush'): 'Straight Flush'; },
    pts: 50,
    get desc() { return typeof t === 'function'? t('combo_straight_flush_desc'): '5 angka berurutan TANPA putus DAN kelimanya memiliki 1 warna sama persis.'; },
    pattern: [
      { val: '1', col: 'blue' }, { val: '2', col: 'blue' }, { val: '3', col: 'blue' }, { val: '4', col: 'blue' }, { val: '5', col: 'blue' }
    ]
  },
  five_kind: {
    id: 'five_kind',
    get name() { return typeof t === 'function'? t('combo_five_kind'): 'Five of a Kind'; },
    pts: 45,
    get desc() { return typeof t === 'function'? t('combo_five_kind_desc'): '5 domino di baris memiliki angka sama persis (warna bebas). Contoh: 5-5-5-5-5.'; },
    pattern: [
      { val: '5', col: 'blue' }, { val: '5', col: 'green' }, { val: '5', col: 'amber' }, { val: '5', col: 'red' }, { val: '5', col: 'blue' }
    ]
  },
  four_kind: {
    id: 'four_kind',
    get name() { return typeof t === 'function'? t('combo_four_kind'): 'Four of a Kind'; },
    pts: 40,
    get desc() { return typeof t === 'function'? t('combo_four_kind_desc'): '4 domino memiliki angka yang sama di satu baris (warna bebas, 1 sisa bebas).'; },
    pattern: [
      { val: '4', col: 'amber' }, { val: '4', col: 'green' }, { val: '4', col: 'red' }, { val: '4', col: 'blue' }, { val: '•', col: 'blue' }
    ]
  },
  full_house: {
    id: 'full_house',
    get name() { return typeof t === 'function'? t('combo_full_house'): 'Full House'; },
    pts: 35,
    get desc() { return typeof t === 'function'? t('combo_full_house_desc'): 'Kombinasi 3 angka kembar + 2 angka kembar lain pada satu baris (warna bebas).'; },
    pattern: [
      { val: '3', col: 'green' }, { val: '3', col: 'blue' }, { val: '3', col: 'red' }, { val: '6', col: 'amber' }, { val: '6', col: 'green' }
    ]
  },
  straight: {
    id: 'straight',
    get name() { return typeof t === 'function'? t('combo_straight'): 'Straight'; },
    pts: 30,
    get desc() { return typeof t === 'function'? t('combo_straight_desc'): '5 angka berurutan tanpa putus (misal: 2-3-4-5-6). Warna kartu boleh campur.'; },
    pattern: [
      { val: '2', col: 'blue' }, { val: '3', col: 'amber' }, { val: '4', col: 'green' }, { val: '5', col: 'red' }, { val: '6', col: 'blue' }
    ]
  },
  flush: {
    id: 'flush',
    get name() { return typeof t === 'function'? t('combo_flush'): 'Flush'; },
    pts: 20,
    get desc() { return typeof t === 'function'? t('combo_flush_desc'): 'Semua 5 petak di satu baris memiliki warna latar yang sama persis (angka bebas).'; },
    pattern: [
      { val: '•', col: 'green' }, { val: '•', col: 'green' }, { val: '•', col: 'green' }, { val: '•', col: 'green' }, { val: '•', col: 'green' }
    ]
  },
  two_pair: {
    id: 'two_pair',
    get name() { return typeof t === 'function'? t('combo_two_pair'): 'Two Pair'; },
    pts: 25,
    get desc() { return typeof t === 'function'? t('combo_two_pair_desc'): 'Ada 2 pasang angka kembar yang berbeda (misal sepasang 1 dan sepasang 5).'; },
    pattern: [
      { val: '1', col: 'blue' }, { val: '1', col: 'red' }, { val: '5', col: 'green' }, { val: '5', col: 'amber' }, { val: '•', col: 'blue' }
    ]
  },
  color_boat: {
    id: 'color_boat',
    get name() { return typeof t === 'function'? t('combo_color_boat'): 'Color Boat'; },
    pts: 15,
    get desc() { return typeof t === 'function'? t('combo_color_boat_desc'): '3 petak berwarna sama + 2 petak warna sama lainnya (misal: 3 biru & 2 merah).'; },
    pattern: [
      { val: '•', col: 'blue' }, { val: '•', col: 'blue' }, { val: '•', col: 'blue' }, { val: '•', col: 'red' }, { val: '•', col: 'red' }
    ]
  },
  three_kind: {
    id: 'three_kind',
    get name() { return typeof t === 'function'? t('combo_three_kind'): 'Three of a Kind'; },
    pts: 10,
    get desc() { return typeof t === 'function'? t('combo_three_kind_desc'): 'Ada 3 angka kembar sama di satu baris (warna bebas, 2 kartu lainnya bebas).'; },
    pattern: [
      { val: '2', col: 'red' }, { val: '2', col: 'blue' }, { val: '2', col: 'green' }, { val: '•', col: 'amber' }, { val: '•', col: 'blue' }
    ]
  },
  one_pair: {
    id: 'one_pair',
    get name() { return typeof t === 'function'? t('combo_one_pair'): 'One Pair'; },
    pts: 5,
    get desc() { return typeof t === 'function'? t('combo_one_pair_desc'): 'Minimal terdapat 1 pasang angka kembar sama di baris (warna bebas).'; },
    pattern: [
      { val: '6', col: 'amber' }, { val: '6', col: 'blue' }, { val: '•', col: 'green' }, { val: '•', col: 'red' }, { val: '•', col: 'blue' }
    ]
  }
};

const POLICIES = [
  {
    id: 'metropolis_klasik',
    rawName: 'Metropolis Klasik',
    get name() { return typeof t === 'function'? t('policy_metropolis_klasik'): this.rawName; },
    fav: { left: 1, center: 5, right: 4 },
    active: ['five_kind', 'four_kind', 'full_house', 'two_pair', 'three_kind', 'one_pair']
  },
  {
    id: 'taman_ekologis',
    rawName: 'Taman Ekologis',
    get name() { return typeof t === 'function'? t('policy_taman_ekologis'): this.rawName; },
    fav: { left: 0, center: 6, right: 3 },
    active: ['straight_flush', 'full_house', 'straight', 'flush', 'two_pair', 'color_boat']
  },
  {
    id: 'kawasan_terpadu',
    rawName: 'Kawasan Terpadu',
    get name() { return typeof t === 'function'? t('policy_kawasan_terpadu'): this.rawName; },
    fav: { left: 2, center: 5, right: 3 },
    active: ['five_kind', 'four_kind', 'straight', 'flush', 'two_pair', 'three_kind']
  },
  {
    id: 'zona_harmoni',
    rawName: 'Zona Harmoni',
    get name() { return typeof t === 'function'? t('policy_zona_harmoni'): this.rawName; },
    fav: { left: 0, center: 1, right: 4 },
    active: ['straight_flush', 'four_kind', 'straight', 'flush', 'color_boat', 'three_kind']
  },
  {
    id: 'distrik_simetris',
    rawName: 'Distrik Simetris',
    get name() { return typeof t === 'function'? t('policy_distrik_simetris'): this.rawName; },
    fav: { left: 4, center: 2, right: 4 },
    active: ['four_kind', 'full_house', 'straight', 'two_pair', 'color_boat', 'one_pair']
  },
  {
    id: 'master_urban_2026',
    rawName: 'Master Urban 2026',
    get name() { return typeof t === 'function'? t('policy_master_urban_2026'): this.rawName; },
    fav: { left: 6, center: 5, right: 2 },
    active: ['five_kind', 'straight_flush', 'full_house', 'flush', 'color_boat', 'one_pair']
  },
  {
    id: 'pusat_riset',
    rawName: 'Pusat Riset',
    get name() { return typeof t === 'function'? t('policy_pusat_riset'): this.rawName; },
    fav: { left: 3, center: 6, right: 5 },
    active: ['five_kind', 'straight_flush', 'four_kind', 'flush', 'three_kind', 'one_pair']
  },
  {
    id: 'koridor_hijau',
    rawName: 'Koridor Hijau',
    get name() { return typeof t === 'function'? t('policy_koridor_hijau'): this.rawName; },
    fav: { left: 0, center: 1, right: 0 },
    active: ['straight_flush', 'full_house', 'straight', 'flush', 'color_boat', 'three_kind']
  },
  {
    id: 'smart_transit',
    rawName: 'Smart Transit',
    get name() { return typeof t === 'function'? t('policy_smart_transit'): this.rawName; },
    fav: { left: 2, center: 4, right: 3 },
    active: ['five_kind', 'full_house', 'straight', 'flush', 'two_pair', 'one_pair']
  },
  {
    id: 'blok_modular',
    rawName: 'Blok Modular',
    get name() { return typeof t === 'function'? t('policy_blok_modular'): this.rawName; },
    fav: { left: 4, center: 3, right: 1 },
    active: ['straight_flush', 'four_kind', 'full_house', 'two_pair', 'color_boat', 'three_kind']
  },
  {
    id: 'megapolitan',
    rawName: 'Megapolitan',
    get name() { return typeof t === 'function'? t('policy_megapolitan'): this.rawName; },
    fav: { left: 5, center: 6, right: 5 },
    active: ['five_kind', 'straight_flush', 'straight', 'flush', 'two_pair', 'three_kind']
  },
  {
    id: 'kampung_kompak',
    rawName: 'Kampung Kompak',
    get name() { return typeof t === 'function'? t('policy_kampung_kompak'): this.rawName; },
    fav: { left: 1, center: 2, right: 3 },
    active: ['four_kind', 'full_house', 'straight', 'color_boat', 'three_kind', 'one_pair']
  }
];