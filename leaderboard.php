<?php
/**
 * Backend Papan Peringkat City Domino
 * Kompatibel penuh dengan PHP 5.3+
 */

// Header CORS & Response JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Pre-flight request browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Lokasi penyimpanan file data
$dataFile = dirname(__FILE__). '/leaderboard.txt';

// Fungsi perbandingan untuk pengurutan skor tertinggi (PHP 5.3 safe)
function urutkanSkorDesc($a, $b) {
    if ($a['total'] == $b['total']) {
        return 0;
    }
    return ($a['total'] < $b['total'])? 1: -1;
}

// -----------------------------------------------------------------------------
// 1. AKSI SIMPAN SKOR (POST)
// -----------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name   = isset($_POST['name'])? trim($_POST['name']): '';
    $plan   = isset($_POST['plan'])? trim($_POST['plan']): '';
    $total  = isset($_POST['total'])? intval($_POST['total']): 0;
    $left   = isset($_POST['left'])? intval($_POST['left']): 0;
    $center = isset($_POST['center'])? intval($_POST['center']): 0;
    $right  = isset($_POST['right'])? intval($_POST['right']): 0;

    // Bersihkan karakter koma dan baris baru agar format CSV tidak rusak
    $name = str_replace(array(',', "\r", "\n", '"'), '', strip_tags($name));
    $plan = str_replace(array(',', "\r", "\n", '"'), '', strip_tags($plan));

    // Validasi input
    if ($name === '' || $plan === '') {
        echo json_encode(array(
            'status'  => 'error',
            'message' => 'Nama pemain dan Master Plan tidak boleh kosong.'
        ));
        exit;
    }

    if (strlen($name) > 20) {
        $name = substr($name, 0, 20);
    }

    $waktu = date('Y-m-d H:i:s');
    $barisBaru = $name. ','. $plan. ','. $total. ','. $left. ','. $center. ','. $right. ','. $waktu. "\n";

    // Simpan ke file teks dengan penguncian eksklusif (LOCK_EX)
    $fp = @fopen($dataFile, 'a');
    if (!$fp) {
        echo json_encode(array(
            'status'  => 'error',
            'message' => 'Server gagal membuka berkas penyimpanan.'
        ));
        exit;
    }

    if (flock($fp, LOCK_EX)) {
        fwrite($fp, $barisBaru);
        flock($fp, LOCK_UN);
        fclose($fp);

        echo json_encode(array(
            'status'  => 'success',
            'message' => 'Skor berhasil disimpan!'
        ));
    } else {
        fclose($fp);
        echo json_encode(array(
            'status'  => 'error',
            'message' => 'Gagal mengunci berkas penyimpanan.'
        ));
    }
    exit;
}

// -----------------------------------------------------------------------------
// 2. AKSI AMBIL DATA TOP 5 (GET)
// -----------------------------------------------------------------------------
$planFilter = isset($_GET['plan'])? trim($_GET['plan']): '';
$semuaData = array();

if (file_exists($dataFile)) {
    $fp = @fopen($dataFile, 'r');
    if ($fp) {
        if (flock($fp, LOCK_SH)) {
            while (($kolom = fgetcsv($fp, 1000, ','))!== false) {
                // Skema: Nama, MasterPlan, Total, Barat, Pusat, Timur, Waktu
                if (count($kolom) >= 6) {
                    $barisPlan = trim($kolom[1]);

                    // Saring berdasarkan Master Plan yang sedang aktif
                    if ($planFilter === '' || strcasecmp($barisPlan, $planFilter) === 0) {
                        $semuaData[] = array(
                            'name'   => trim($kolom[0]),
                            'plan'   => $barisPlan,
                            'total'  => intval($kolom[2]),
                            'left'   => intval($kolom[3]),
                            'center' => intval($kolom[4]),
                            'right'  => intval($kolom[5]),
                            'time'   => isset($kolom[6])? trim($kolom[6]): ''
                        );
                    }
                }
            }
            flock($fp, LOCK_UN);
        }
        fclose($fp);
    }
}

// Urutkan skor dari yang paling tinggi
usort($semuaData, 'urutkanSkorDesc');

// Ambil hanya 5 peringkat teratas
$top5 = array_slice($semuaData, 0, 5);

// Kirim hasil JSON
echo json_encode(array(
    'status' => 'success',
    'data'   => $top5
));
exit;