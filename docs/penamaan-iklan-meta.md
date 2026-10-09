# Template penamaan iklan Meta — Halim Quran

Pakai ini setiap membuat kampanye, ad set, atau iklan baru, supaya laporan rapi dan UTM terbaca.

**Aturan umum**
- Pisahkan bagian dengan garis bawah `_`. Tanpa spasi.
- Nama produk dan tema pesan ditulis CamelCase: `WafaA7`, `YangDitunggu`.
- Rentang pakai tanda hubung: `20-55`.
- Tanggal cukup tahun-bulan `YYMM`: Oktober 2026 = `2610`.
- Versi iklan `v1`, `v2`, ...: naik kalau visual atau teksnya diganti, tapi tema pesannya sama.
- Nama kampanye dan nama iklan ikut terkirim ke UTM (`{{campaign.name}}`, `{{ad.name}}`), jadi **ganti nama kampanye dan ad set dulu, baru iklan**.

---

## 1. Kampanye

```
{OBJ}_{PRODUK}_{FUNNEL}_{YYMM}
```

| Bagian | Isi |
|---|---|
| `OBJ` | `TRF` Traffic · `SAL` Sales · `MSG` Pesan/WhatsApp · `ENG` Engagement · `AWR` Awareness · `LEA` Leads |
| `PRODUK` | `WafaA7` · `WafaA6Rsl` · `HuzaifiA5` · `ALL` (beberapa produk) · `CAT` (katalog) |
| `FUNNEL` | `TOF` audiens baru · `MOF` pernah berinteraksi · `BOF` retargeting (sudah lihat, keranjang, checkout) |
| `YYMM` | bulan kampanye dibuat |

Contoh: `TRF_WafaA7_TOF_2610` · `SAL_WafaA7_TOF_2611` · `SAL_CAT_BOF_2611`

## 2. Ad set

```
{AUD}_{USIA}_{LOK}_{GOAL}
```

| Bagian | Isi |
|---|---|
| `AUD` | `BRD` luas · `INT-{minat}` minat · `LAL-{sumber}-{persen}` lookalike · `RT-{sumber}-{hari}` retargeting |
| `USIA` | `20-55`; kalau dibatasi gender, `F25-45` atau `M25-45` |
| `LOK` | `ID` seluruh Indonesia · atau kode wilayah |
| `GOAL` | `LPV` landing page view · `LCK` klik tautan · `ATC` tambah ke keranjang · `IC` mulai checkout · `PUR` pembelian · `MSG` pesan |

Contoh: `BRD_20-55_ID_LPV` · `BRD_20-55_ID_IC` · `RT-ATC-14_20-55_ID_PUR`

## 3. Iklan (creative)

```
{FMT}_{TEMA}_{PRODUK}_{v#}
```

| Bagian | Isi |
|---|---|
| `FMT` | `VID` video · `IMG` gambar · `CRS` carousel · `UGC` video testimoni · `CAT` iklan katalog |
| `TEMA` | 1–2 kata inti pesan: `YangDitunggu`, `BalikLagi`, `UkirNama`, `Testimoni`, `Promo` |
| `PRODUK` | kode produk yang sama dengan kampanye |
| `v#` | versi |

Contoh: `VID_YangDitunggu_WafaA7_v1` · `CRS_UkirNama_WafaA7_v1` · `VID_UkirNama_WafaA7_v2`

---

## Sudah diterapkan (9 Okt 2026)

| Tingkat | Nama sekarang |
|---|---|
| Kampanye | `TRF_WafaA7_TOF_2610` |
| Ad set | `BRD_20-55_ID_LPV` |
| Iklan | `VID_YangDitunggu_WafaA7_v1` |
| Iklan | `VID_BalikLagi_WafaA7_v1` |
| Iklan | `CRS_UkirNama_WafaA7_v1` |

Kampanye lama di akun tetap memakai nama lama.

## Parameter URL (diisi di setiap iklan)

```
utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
```

Tambahan opsional untuk membedakan ad set: `&utm_term={{adset.name}}`.

## Daftar cek sebelum menerbitkan

1. Nama kampanye, ad set, dan iklan sesuai template.
2. Parameter URL (UTM) terisi.
3. Pixel: **Halim Quran Scalev** (1726278068703179).
4. Tautan tujuan mengarah ke halaman produk yang **ada stok**.
5. Materi hanya menampilkan warna yang ada stoknya.
6. Jangan ubah ad set yang sedang Learning; budget naik paling banyak 20–30% setiap 2–3 hari.
