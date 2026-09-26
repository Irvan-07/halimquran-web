// MOCK DATA — placeholder catalog for foundation UI work only. Not from
// Scalev. Names, prices, badges and ratings below were read directly off
// the live halimquran.com site, including their real product URLs (kept in
// `slug`) — products 5 and 6 from the live Wakaf Quran page specifically,
// where the site itself marks them "Cocok untuk Wakaf". Category assignment
// is inferred from product naming/badges (e.g. "15 baris" -> Hafalan), not
// confirmed against Halim Quran's internal taxonomy — recheck before
// treating as authoritative. `colors` are illustrative, not pixel-sampled.
//
// Products 15-41 added 26 Sep 2026 by scrolling halimquran.com/products'
// lazy-loaded grid to its end (41 real products total) — same
// name/price/slug verification standard as products 1-14. `description` is
// only set where the real PDP copy was actually read (product 3); every
// other product's Deskripsi section is generated from category/size/badge
// by getDescription() in the PDP page, not copied text, to avoid inventing
// certifications or claims (e.g. "ditashih KDN Malaysia") this app can't
// verify for that specific product.
import type { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "mushaf-al-quran-al-wafa-b7-pocket-edition",
    name: "Mushaf Al Quran Al Wafa B7 Pocket Edition",
    price: 49000,
    category: "quran-hafalan",
    size: "B7",
    badge: "Ukir Nama",
    rating: 5,
    // 218 five-star ratings on Shopee + 1 on halimquran.com itself — per
    // project owner's direction, only 5-star ratings/reviews are surfaced
    // here (the listing's small number of 4/3/2/1-star ratings are real
    // but not shown, by the same choice most sellers make on their own
    // site's testimonial section).
    ratingCount: 219,
    // "Terjual" figure for the product card — set directly by the project
    // owner, independent of ratingCount above.
    soldCount: 987,
    // Real per-color PHOTOS (not just hex chips) + the PDP's own 7-image
    // gallery (main shot, lifestyle/detail photos, size-chart graphic),
    // all downloaded straight from this exact product's real PDP on
    // halimquran.com (26 Sep 2026) — this product is the app's PDP
    // fidelity template, see app/produk/[kategori]/[slug]/page.tsx.
    galleryImages: [
      "/products/wafa-b7-gallery/gallery-1-main.jpg",
      "/products/wafa-b7-gallery/gallery-2.jpg",
      "/products/wafa-b7-gallery/gallery-3.jpg",
      "/products/wafa-b7-gallery/gallery-4.jpg",
      "/products/wafa-b7-gallery/gallery-5.jpg",
      "/products/wafa-b7-gallery/gallery-6.jpg",
      "/products/wafa-b7-gallery/gallery-7-sizechart.jpg",
    ],
    colorVariants: [
      { hex: "#6B7280", name: "Abu-Abu", imageUrl: "/products/wafa-b7-colors/color-abu-abu.jpg" },
      { hex: "#111827", name: "Hitam", imageUrl: "/products/wafa-b7-colors/color-hitam.jpg" },
      { hex: "#7B2D26", name: "Maroon", imageUrl: "/products/wafa-b7-colors/color-maroon.jpg" },
      { hex: "#8B5E34", name: "Coklat", imageUrl: "/products/wafa-b7-colors/color-coklat.jpg" },
      { hex: "#5C3A21", name: "Coklat Tua", imageUrl: "/products/wafa-b7-colors/color-coklat-tua.jpg" },
      { hex: "#0F7A5C", name: "Hijau", imageUrl: "/products/wafa-b7-colors/color-hijau.jpg" },
      { hex: "#8E7CC3", name: "Lilac", imageUrl: "/products/wafa-b7-colors/color-lilac.jpg" },
      { hex: "#E8DCC4", name: "Cream", imageUrl: "/products/wafa-b7-colors/color-cream.jpg" },
      { hex: "#C2417A", name: "Pink", imageUrl: "/products/wafa-b7-colors/color-pink.jpg" },
    ],
    customNameEligible: true,
    imageUrl: "/products/mushaf-al-quran-al-wafa-b7-pocket-edition.jpg",
    weightGrams: 230,
    // Real, verbatim PDP copy from halimquran.com (26 Sep 2026).
    description:
      "Pengen baca Al-Qur'an setiap waktu tapi suka repot bawa Al-Qur'annya?? Nyari yang ringan dan mudah dibawa?? Sepertinya Anda perlu coba Al-Qur'an satu ini, Al-Qur'an Al-Wafa Rubu' Pocket Resleting, beratnya hanya 230gr, ringan dibawa ke mana saja. Penasaran apa saja keistimewaannya??\n\nSpesifikasi:\n- Ukuran B7 (9 x 12,5 cm)\n- Kertas QPP 50gr\n- Berat 230gr\n- Tebal 616 halaman\n\nFitur cover:\n- Desain cover casual, kalem, dan hangat.\n- Jahitan super rapi.\n- Zipper kuat dan tahan lama.\n- Tersedia dalam 9 pilihan warna.\n\nMaterial cover:\n- Cover terbuat dari kulit sintetis jenis cocoli berkualitas yang membuat warna cover lebih kuat dan tidak mudah pudar. Selain itu, cover dilapisi dengan foil yang memberi kesan mewah pada tampilan cover.\n- Resleting berbahan metal, sehingga lebih kokoh dan aman, serta memiliki gigitan resleting yang lebih kuat. Metal Zipper memberi kesan mahal dan eksklusif pada Al-Qur'an.\n\nMaterial inner:\n- Menggunakan kertas QPP 50gr dengan tingkat kehalusan tinggi, high smoothies dan tahan hingga 100 tahun.\n- Bahan kertas sudah teruji lab dan terbukti halalan thayyiban.\n- Warna kertas Yellowish, membuat mata tidak lelah walaupun membaca dalam waktu yang lama.\n\nFitur inner:\n- Rasm Utsmani 15 baris standar Kemenag RI.\n- Dicetak dengan khat yang jelas ditambah bahan kertas dengan daya serap tinta yang baik, sangat nyaman dibaca.\n- Dilengkapi indeks juz yang memudahkan kamu mencari juz atau halaman tertentu.\n- Terdapat pewarnaan kata ganti Allah dan -Nya yang memudahkan kamu menemukan ayat-ayat pilihan.\n\nCari Al-Qur'an premium, kekinian, terjangkau, dan bergaransi? Halim Qur'an aja.. Yuk check out sekarang!",
    // 1 review from halimquran.com itself + the 5-star subset of the 28
    // "with comments" reviews pulled from this product's real Shopee
    // listing (26 Sep 2026):
    // https://shopee.co.id/Halim-Quran-MUSHAF-AL-QURAN-AL-WAFA-RUBU-B7-POCKET-RESLETING-i.229472472.41774667767
    // Read via Shopee's own ratings API (the review widget itself didn't
    // render in an automated session, but the underlying API — reachable
    // with the logged-in owner's own session — returned the real data).
    // Text kept verbatim; the listing's one 2-star and one 4-star review
    // were dropped per the project owner's direction (5-star only), see
    // `ratingCount` above for the true 219-rating total this represents.
    reviews: [
      {
        author: "I*** a***",
        rating: 5,
        tags: ["Produk Berkualitas", "Response Cepat", "Quick Delivery", "Harga Sesuai"],
        text: "Alhamdulillah, Qurannya dh sampe kualitas terbaik. InsyaAllah order lg untuk keluarga",
        date: "06 May 2026",
        variant: "Hitam • QURAN + NAMA",
        reviewSource: "halimquran.com",
      },
      { author: "g*****a", rating: 5, text: "Kegunaan: ukuran alquran kecil nyaman disimpan di tas. Bahan: bagus dan halus diluar ekspektasiii", date: "23 Apr 2026", variant: "Coklat Tua • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-gaaaa.jpg" }, { type: "video", src: "/reviews/review-gaaaa.mp4" }] },
      { author: "i*****t", rating: 5, text: "Maaf br review.. alhamdulillah Al quran nya bagus bgt, ukurannya sedang, ga terlalu kcl tulisannya. Cocok untuk di bawa traveling, haji umrah.. syukron", date: "15 Feb 2026", variant: "Hijau • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-iaaaat.jpg" }, { type: "video", src: "/reviews/review-iaaaat.mp4" }] },
      { author: "a*****v", rating: 5, text: "Kain: bagus. Desain: bagus. Alhamdulillah paketnya sudah sampai dengan selamat terimakasih", date: "29 Aug 2026", variant: "Coklat • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-aaaaav.jpg" }, { type: "video", src: "/reviews/review-aaaaav.mp4" }] },
      { author: "d*****1", rating: 5, text: "Kualitas: sangat bagus dan memuaskan. Konten: sangat baik. Kegunaan: sangat bermanfaat. Alquraanya warna pink cantik, ukuran alquraan kecil enak dibawa kemana2 dan dimasukkan dalam tas karna ukurannya minimalis. Alquraan bisa costum nama. Harganya juga terjangkau. Good joob\u{1F49D}", date: "01 Mar 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-d1.jpg" }, { type: "video", src: "/reviews/review-d1.mp4" }] },
      { author: "utf_03it4j", rating: 5, text: "Kualitas: bagus banget. Sangat baik kk alqurannya", date: "27 Feb 2026", variant: "Coklat Tua • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-utf.jpg" }] },
      { author: "aiiariansyah", rating: 5, text: "Kualitas: bagus. Kegunaan: hafalan Al Qur'an", date: "19 Feb 2026", variant: "Hitam • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-aiiariansyah.jpg" }, { type: "video", src: "/reviews/review-aiiariansyah.mp4" }] },
      { author: "rizky_afrianda", rating: 5, text: "Kualitas: bagus", date: "04 Mar 2026", variant: "Cream • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-rizky.jpg" }] },
      { author: "s*****h", rating: 5, text: "Tinggal yang ukuran A4 aja yang belum ni, biar dapat yang ukuran besar nya buat baca Al-Qur'an lebih jelas, Alhamdulillah", date: "28 Jun 2026", variant: "Cream • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "mamaraffa1429", rating: 5, text: "Masya Allah Al-qur'an nya bagus\u{1F44D}\u{1F64F}", date: "06 Mar 2026", variant: "Lilac • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-mamaraffa.jpg" }] },
      { author: "r*****_", rating: 5, text: "Al Qurannya sudah sampai, alhamdulillah sesuai espektasi semoga berkah untuk saya dan sellernya", date: "23 Nov 2025", variant: "Coklat • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "afiqahayunindya", rating: 5, text: "Ukuran: ukuran pas bgt buat anak ku sekolah, tdk kebesaran dan tdk kekecilan pokoknya pas.... bisa dimasukan didalem tas dan enggak bikin berat. Bahan: bahan luar nya halus, lembut, bagus, tulisannya bagus mudah dimengerti dan mudah dibaca. Desain: desain cover keren bgt, warnanya pun soft bgt, enggak norak, dan enggak jadul..... keren deh pokoknya", date: "24 Jul 2026", variant: "Lilac • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "nazaratu07", rating: 5, text: "Alhamdulillah datang tepat waktu, tadinya udh pesimis.. Makasih seller\u{1F917}", date: "19 Jun 2026", variant: "Cream • QURAN SAJA", reviewSource: "Shopee" },
      { author: "3f1d5pnlnw", rating: 5, text: "BAGUS BGT MASYAALLAH\u{1F60D}, packagingnya jugakk amann SUKAK BGT POKONYAAA", date: "23 Jan 2026", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee" },
      { author: "bayu.969", rating: 5, text: "Ukuran: saya suka karena Alquran kecil mudah di bawa kemana mana", date: "13 Jun 2026", variant: "Hijau • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "sitinurelina", rating: 5, text: "Kualitas: memuaskan. Konten: bagus. Kegunaan: di baca. Masyallah bagus banget udah sama nama cantik\u{1F970}", date: "07 Mar 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "luay.ay_81", rating: 5, text: "Ukuran: cocok banget. Bahan: bahan bagus tulisannya jelas. Desain: cantik", date: "10 Aug 2026", variant: "Lilac • QURAN SAJA", reviewSource: "Shopee" },
      { author: "farihanida22", rating: 5, text: "Bagus ok", date: "07 Mar 2026", variant: "Cream • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "abyzhar_.99", rating: 5, text: "Kain: mantap. Desain: bagus....", date: "18 Aug 2026", variant: "Hijau • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "zulmi03041991", rating: 5, text: "Ukuran: ukurannya pas dan nyaman dibawa. Bahan: bagus dan menarik. Desain: cakep dan estetik", date: "21 Jun 2026", variant: "Coklat • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "a*****w", rating: 5, text: "Kualitas: baguss. Aku slh beli harusnya yg terjemah, TAPI MASYA ALLAH INI CANTIK BANGETTT \u{1F60D}\u{1F60D} mimin nya jg baik, aku sempet kelupaan ngasih nama, syukron\u{2764}\u{FE0F}", date: "12 Mar 2026", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-aaaaaw.jpg" }, { type: "video", src: "/reviews/review-aaaaaw.mp4" }] },
      { author: "h*****k", rating: 5, text: "Ukuran: ukurannya pas, mudah di bawa. Bahan: bahannya bagus. Pas di buka tidak kaku, tidak krak, jadi tidak merusak bagian bagian alquran.", date: "17 May 2026", variant: "Coklat • QURAN SAJA", reviewSource: "Shopee" },
      { author: "kristinajedix", rating: 5, text: "Kualitas: sangat bagus. Konten: keren. Kegunaan: bermanfaat. Alquran saku yang istimewa bisa di ukir nama pemilik, warna kalem, kertas tebal, tulisan sangat jelas, warna sampul kalem dan elegan, sangat bermanfaat untuk sehari hari, pengiriman cepat, terimakasih", date: "08 Mar 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-kristinajedix.jpg" }, { type: "video", src: "/reviews/review-kristinajedix.mp4" }] },
      { author: "d*****6", rating: 5, text: "Kualitas: sangat bagus. MasyaAllah cantik bgt, jelas jugaa meskipun kecil tp ga kecil bangett", date: "07 Mar 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/review-d6.jpg" }] },
      { author: "s*****3", rating: 5, text: "Kecil, pas banget buat dibawa kemana mana", date: "23 Aug 2026", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee" },
      { author: "zabearoke", rating: 5, text: "Ukuran: sesuai. Desain: sesuai dengan keinginan", date: "09 Aug 2026", variant: "Coklat • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "mayasarinf", rating: 5, text: "Ukuran: pas. Bahan: bagus", date: "08 Jun 2026", variant: "Hijau • QURAN + NAMA", reviewSource: "Shopee" },
    ],
  },
  {
    id: "2",
    slug: "mushaf-al-quran-al-wafa-a6-pocket-edition",
    name: "Mushaf Al Quran Al Wafa A6 Pocket Edition",
    price: 56000,
    category: "quran-hafalan",
    size: "A6",
    badge: "Terfavorit",
    imageUrl: "/products/mushaf-al-quran-al-wafa-a6-pocket-edition.jpg",
  },
  {
    id: "3",
    // Slug must match the real Scalev product's own slug exactly (that's
    // the join key getMergedCatalog() uses) — Scalev's entry for this
    // product uses the shorter "al-quran-madinah-huzaifi-a5", not the old
    // live site's longer URL slug, otherwise the two show up as separate
    // duplicate products (confirmed happening before this fix).
    slug: "al-quran-madinah-huzaifi-a5",
    name: "Al Quran Madinah Huzaifi A5 Standar Internasional",
    price: 109000,
    category: "quran-harian",
    size: "A5",
    badge: "Ukir Nama",
    rating: 5,
    // 282 five-star ratings on this product's real Shopee listing (296
    // total: 2×3-star, 12×4-star, 282×5-star) — same 5-star-only policy
    // as the Wafa B7 template, see ratingCount there.
    ratingCount: 282,
    colors: ["#E8DCC4", "#1E3A5F", "#7B2D26", "#111827", "#6B7280", "#C2417A", "#8B5E34"],
    customNameEligible: true,
    imageUrl: "/products/al-quran-madinah-huzaifi-a5-standar-internasional.jpg",
    // Real PDP gallery (hero shot, detail photos, size-chart graphic),
    // downloaded from this exact product's live halimquran.com PDP 26 Sep
    // 2026 — same pattern as the Wafa B7 template.
    galleryImages: [
      "/products/huzaifi-a5-gallery/gallery-1-main.jpg",
      "/products/huzaifi-a5-gallery/gallery-2.jpg",
      "/products/huzaifi-a5-gallery/gallery-3.jpg",
      "/products/huzaifi-a5-gallery/gallery-4.jpg",
      "/products/huzaifi-a5-gallery/gallery-5.jpg",
      "/products/huzaifi-a5-gallery/gallery-6.jpg",
      "/products/huzaifi-a5-gallery/gallery-7-sizechart.jpg",
    ],
    weightGrams: 615,
    // Real PDP copy, read verbatim from halimquran.com 26 Sep 2026 — kept
    // as-is per instruction to copy real content where we actually have it.
    description:
      "Pernahkah kamu merasakan ketenangan saat membaca Al-Qur'an dengan mushaf yang digunakan di Masjid Nabawi dan Masjidil Haram? Kini, pengalaman itu bisa kamu dapatkan dalam Mushaf Madinah Huzaifi—mushaf dengan standar internasional terbitan Halim Qur'an yang telah ditashih oleh KDN Malaysia dan mengantongi izin edar dari Kemenag RI, aman syar'i aman regulasi!\n\nSpesifikasi:\n- Rasm Utsmani Standar Madinah – Susunan ayat 15 baris.\n- Ukuran A5 (14,5 x 20,5 cm) – Pas di tangan, nyaman dibaca kapan saja.\n- 6 Varian Warna Elegan – Biru Tua, Cream, Beige, Hitam, Maroon, dan Pink.\n\nKeunggulan yang Membuatnya Istimewa:\n✔ Tashih Resmi dari KDN Malaysia – Bacaan terjamin sesuai standar.\n✔ Izin Edar Kemenag RI – Aman dan legal digunakan di Indonesia.\n✔ Kertas QPP Premium – Halus, tahan lama, dan sejuk di mata, nyaman untuk tilawah dalam waktu lama.\n\nCocok untuk:\n- Hafalan dan tilawah sehari-hari.\n- Hadiah spesial untuk keluarga, sahabat, atau guru mengaji.\n- Koleksi mushaf berkualitas dengan standar internasional.",
    // 5-star subset of this product's real Shopee listing reviews (26 Sep
    // 2026), same sourcing method as the Wafa B7 template — read via
    // Shopee's own ratings API with the logged-in owner's session, kept
    // verbatim:
    // https://shopee.co.id/AL-QURAN-MADINAH-HUZAIFI-UKURAN-A5-MUSHAF-STANDAR-INTERNASIONAL-i.229472472.27525720086
    reviews: [
      { author: "N*** A*** A***", rating: 5, tags: ["Produk Berkualitas", "Response Cepat", "Quick Delivery", "Harga Sesuai"], text: "", date: "15 May 2026", variant: "Hitam • QURAN SAJA", reviewSource: "halimquran.com" },
      { author: "almashabrina08", rating: 5, text: "Masya Allah bagus banget ada nama akunya atas ada adab membaca Al-Qur'an juga wow", date: "05 Mar 2025", variant: "Cream • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r0-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r0-2.jpg" }, { type: "video", src: "/reviews/huzaifi-r0.mp4" }] },
      { author: "ica.nursalma", rating: 5, text: "Kualitas: sangat bagus, puas banget....sesuai harga...dari pada beli di toko offline mending disini bisa pakek Nm pula. Konten: sempurna bannget. Kegunaan: sangat bermanfaat ma anak ku yg sekolah nya pakai al quran ini \"madinah\"....warna pink da nama pula...semoga gak ilang...Heheee kurir baik ramah sopan....Puas deh.", date: "26 Apr 2025", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r1-1.jpg" }] },
      { author: "kaisarstuff", rating: 5, text: "Kualitas: tidak diragukan lagi, oke banget. Warna: soft. Desain: simple dan cantik. Ini pembelian kedua dan semuanya buat kado. Pengemasannya bagus banget, pengiriman juga sat set jadi selalu memuaskan. Insyaallah berikutnya beli lagi buat sendiri. Thanks seller dan pak kurir \u{1F64F}", date: "14 May 2026", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r2-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r2-2.jpg" }] },
      { author: "k*****7", rating: 5, text: "Kualitas: bagus bgt masya allah. Konten: mantap. Kegunaan: mengaji baik cantik. bagus bgt warnanya sukaa \u{1F64F}", date: "10 Jul 2025", variant: "Beige • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r3-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r3-2.jpg" }, { type: "video", src: "/reviews/huzaifi-r3.mp4" }] },
      { author: "s*****_", rating: 5, text: "Kualitas: baik. Warna: cantiiikk. Desain: elegan dan menarik. Alhamdulillah mushaf sudah sampai dengan selamat.. masyaa Allah cantik sekali warna soft pink covernya. Semoga awet untuk anak saya. Thanks seller", date: "18 May 2026", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r4-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r4-2.jpg" }, { type: "video", src: "/reviews/huzaifi-r4.mp4" }] },
      { author: "alfandikd", rating: 5, text: "Kualitas: baguse bangett. Cocok Untuk: seserahan. Tampilan: mewah. Cocok banget buat seserahann warna hitam elegant mewahhh", date: "13 Feb 2026", variant: "Hitam • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r5-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r5-2.jpg" }, { type: "video", src: "/reviews/huzaifi-r5.mp4" }] },
      { author: "4g63yllwwh", rating: 5, text: "Warna: sangat bagis dan sesuai gambar. Desain: sangat menarik dan cantik. Kualitas: sangat bagus dan memuaskan. Mantap", date: "01 Sep 2025", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r6-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r6-2.jpg" }, { type: "video", src: "/reviews/huzaifi-r6.mp4" }] },
      { author: "tri.dania", rating: 5, text: "Kualitas: kualitas mushaf sangat baik, kertas yang dipakai tebal, untuk keseluruhan bagus sekali. Warna: warna cokelat untuk anak supaya netral dipakai cewek cowok. Desain: ukurannya simpel saat dibawa mengaji, tulisan jelas memudahkan untuk tilawah", date: "29 Aug 2026", variant: "Coklat • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r7-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r7-2.jpg" }, { type: "video", src: "/reviews/huzaifi-r7.mp4" }] },
      { author: "shintalady.rose", rating: 5, text: "Warna: Bagus, kalem buat anak cowok. Kualitas: Insya Allah sangat baik. Rekomen yah ini Qur'an rasm Madinah bukan Kemenag. Caakeeepp Qur'annya Masya Allah, harga sangat standart. Packingnya raapiii. Host2nya ramah2, penjualnya amanah. Beli Qur'an ini untuk hadiah Tasmi' Juz 28 anak saya. Syukron wa barakallahu fiikum \u{1F339}", date: "03 Aug 2026", variant: "Coklat • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r8-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r8-2.jpg" }, { type: "image", src: "/reviews/huzaifi-r8-3.jpg" }, { type: "image", src: "/reviews/huzaifi-r8-4.jpg" }, { type: "image", src: "/reviews/huzaifi-r8-5.jpg" }, { type: "video", src: "/reviews/huzaifi-r8.mp4" }] },
      { author: "w*****i", rating: 5, text: "Kualitas: baik. Warna: krem. Desain: desain simple, motif timbul, bisa custom nama. Alhamdulillah sudah diterima dalam keadaan baik dan sesuai pesanan. Terima kasih", date: "29 Aug 2026", variant: "Cream • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r9-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r9-2.jpg" }, { type: "image", src: "/reviews/huzaifi-r9-3.jpg" }, { type: "video", src: "/reviews/huzaifi-r9.mp4" }] },
      { author: "raka_raya8384", rating: 5, text: "Kualitas: Baik dan Original cetakan madinah", date: "09 Jun 2025", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r10-1.jpg" }] },
      { author: "dewisedyaningsih", rating: 5, text: "Warna: Bagus. Kualitas: Baik. Konten: Baik. Cantik sekali.", date: "13 Aug 2025", variant: "Pink • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r11-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r11-2.jpg" }] },
      { author: "misssuri.kitchen", rating: 5, text: "Warna: bagus banget warna dalam nya sangat bagus putih soft. Kualitas: kualitas sangat bagus packaging nya juga sangat bagus dan nyaman dimata", date: "08 Aug 2026", variant: "Biru tua • QURAN SAJA", reviewSource: "Shopee" },
      { author: "ku5n4nt0", rating: 5, text: "Alhamdulillah sesuai dengan harapan, terimakasih", date: "20 Apr 2025", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r13-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r13-2.jpg" }] },
      { author: "25oinz6xni", rating: 5, text: "Warna: Beby pink. Kualitas: mushaf sangat bagus dan jelas. Alhamdulillah pesanan suda sampai Ambon dengan selamat... Al-Qur'an ini benar2 bagus... next order lagi ya bunda \u{2764}\u{FE0F}\u{2764}\u{FE0F}\u{1F44D}\u{1F3FB}\u{1F44D}\u{1F3FB}", date: "22 Jul 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r14-1.jpg" }] },
      { author: "a*****l", rating: 5, text: "Bagus,", date: "24 Jun 2026", variant: "Hitam • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r15-1.jpg" }, { type: "image", src: "/reviews/huzaifi-r15-2.jpg" }, { type: "image", src: "/reviews/huzaifi-r15-3.jpg" }] },
      { author: "ayu_rubiah", rating: 5, text: "MasyaAllah Qur'annyaa baguss sekaliii, pengirimannnn cepaaat, baraangg sesuaaai, veryy recomendedddd loveloveee, puaas bangeet thankyouu seller \u{2764}\u{FE0F}", date: "27 Apr 2026", variant: "Cream • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "dumbodabiii", rating: 5, text: "Kualitas: sangat memuaskan. Warna: sesuai dengan di gambar. Desain: sangat bagus", date: "30 Jun 2026", variant: "Coklat • QURAN + NAMA + BOX", reviewSource: "Shopee" },
      { author: "m_yasin1094", rating: 5, text: "Kualitas: bagus...mmng cari quran cetakan madinah...ga suka quran warna soalnya. Warna: cantik request nama juga. Desain: manarik", date: "16 Jul 2026", variant: "Maroon • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "malikkkaaaaastoreee", rating: 5, text: "Kualitas: bgaus. Konten: baik", date: "30 Jun 2025", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r17-1.jpg" }] },
      { author: "1_hikam", rating: 5, text: "Warna: cantik. Kualitas: sangat bagus", date: "27 Jul 2026", variant: "Hitam • QURAN SAJA", reviewSource: "Shopee" },
      { author: "y*****a", rating: 5, text: "Kualitas: baik, tulisan jelas. Warna: soft. Desain: menarik", date: "10 Jul 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r19-1.jpg" }, { type: "video", src: "/reviews/huzaifi-r19.mp4" }] },
      { author: "yufabusanamuslim70", rating: 5, text: "Kualitas: baik. Konten: keren. Kegunaan: sangat berguna. Beli di sini dijamin puas.", date: "25 May 2025", variant: "Cream • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r20-1.jpg" }] },
      { author: "tiaraaja334", rating: 5, text: "Bgus sekali semoga Bermanfaat yg jual dan yg membli Ny dapat safaat nya", date: "11 Jun 2025", variant: "Maroon • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "lupit_slenteng", rating: 5, text: "Kualitas: kualitas memuaskan. Warna: warna sesuai di etalase. Desain: desain simpel, elegan, dan mewah", date: "24 Jun 2026", variant: "Coklat • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "rianashanum", rating: 5, text: "Belum tau dalemnya karena buat kado langsung dikasih hehe", date: "17 Feb 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "nidyasari967", rating: 5, text: "Warna: coklat. Kualitas: sangat bagus. Pelayanan cepat, ramah dan amanah... Jazakallah khoir\u{1F601}", date: "26 Jul 2026", variant: "Coklat • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "kaisarstuff", rating: 5, text: "Sampai dengan selamat tp kotaknya ada sedikit penyok, buat hadiah soalnya \u{1F605}", date: "25 Jun 2025", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee" },
      { author: "ulfa_martina", rating: 5, text: "Cocok Untuk: semua umur. Tampilan: sampul bagus, bacaan jelas. Kualitas: bagus", date: "20 Sep 2026", variant: "Cream • QURAN SAJA", reviewSource: "Shopee" },
      { author: "vina_rustamelia", rating: 5, text: "Kualitas: bagus. Warna: nyaman untuk mata. Desain: rasm Utsmani", date: "01 Jun 2026", variant: "Hitam • QURAN SAJA", reviewSource: "Shopee" },
      { author: "aderoyani154", rating: 5, text: "Kualitas: bagus. Warna: cantik. Desain: sangat mudah di baca", date: "09 Sep 2026", variant: "Cream • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "a*****d", rating: 5, text: "Kualitas: Alhamdulillah sesuai dan amanah, pelayanan ramah, slalu berlangganan \u{1F44C}", date: "13 Aug 2026", variant: "Coklat • QURAN SAJA", reviewSource: "Shopee" },
      { author: "nazwazahraalkatiri", rating: 5, text: "Kualitas: sngat bgus. Warna: crem, sesuai pesanan. Desain: desain nama sesuai permintaan", date: "05 Jul 2026", variant: "Cream • QURAN + NAMA + BOX", reviewSource: "Shopee" },
      { author: "o*****e", rating: 5, text: "Alhamdulillah sudah sampai. Bagus maa syaa Allah Tabarakallah. Alhamdulillah bisa custom nama pakai tulisan arab. Jazaakumullaahu khoiron", date: "01 Sep 2026", variant: "Coklat • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "p7rem6zups", rating: 5, text: "Kualitas: bagus. Warna: sesuai yg di pesan. Desain: menarik", date: "22 May 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "ummuahya852", rating: 5, text: "Warna: bagus. Desain: cantik. Kualitas: baik", date: "17 Oct 2025", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "roidialfan", rating: 5, text: "Ada bekas lem masih basah yg tidak dibersihkan", date: "03 May 2025", variant: "Pink • QURAN SAJA", reviewSource: "Shopee" },
      { author: "cactusgurun", rating: 5, text: "Warna: bagus. Kualitas: memuaskan", date: "21 Jul 2025", variant: "Cream • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "aprilaharsou", rating: 5, text: "Warna: manis sekali", date: "19 Jul 2025", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "a*****2", rating: 5, text: "Lelet bgt pengirimannya", date: "21 Apr 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "rasya.faris.syafiq", rating: 5, text: "Kualitas: bagus. Warna: cantik. Desain: elegan", date: "04 Jun 2026", variant: "Coklat • QURAN + NAMA", reviewSource: "Shopee" },
      { author: "deagannyaldi", rating: 5, text: "Kualitas: bagus. Warna: sesuai. Desain: simple dan elegan. Alhamdulillah, respon cepat sekali dan karena menggunakan pengiriman instant jadi tidak khawatir dengan paket yang dikirim, khawatir dilempar dll. Alhamdulillah amanah sekali. Mushafnya juga cakep banget.. anak saya suka. Jazaakumullahu khayran wa baarokallahu fiikum.", date: "03 Jul 2026", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r41-1.jpg" }] },
      { author: "dila11ija14lulu17", rating: 5, text: "Kualitas: Saya merasa sangat puas dengan Al quran ini, tulisannya sangat jelas, dan warna mushafnya sangat cantik", date: "30 Jun 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "video", src: "/reviews/huzaifi-r42.mp4" }] },
      { author: "sparkscloud", rating: 5, text: "Kualitas: Sangat baik. Warna: Warnanya jauh lebih cantik dari yang di foto. Desain: Simple dan elegan. Qurannya bagus banget..Warna pinknya warna yang aku suka banget. Lebih soft dari yang di etalase. Belum dicek dalemnya karena ini untuk seserahan. Terima kasih seller\u{1F90D}", date: "18 May 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/huzaifi-r43-1.jpg" }, { type: "video", src: "/reviews/huzaifi-r43.mp4" }] },
    ],
  },
  {
    id: "4",
    slug: "al-quran-tajwid-al-mumtaz-a7-resleting",
    name: "Al Quran Tajwid Al Mumtaz A7 Resleting",
    price: 45000,
    category: "quran-tajwid",
    size: "A7",
    rating: 5,
    imageUrl: "/products/al-quran-tajwid-al-mumtaz-a7-resleting.jpg",
  },
  {
    id: "5",
    slug: "al-quran-al-azhim-a5-hard-cover",
    name: "Al Quran Al Azhim A5 Hard Cover",
    price: 33000,
    category: "quran-harian",
    size: "A5",
    wakafEligible: true,
    imageUrl: "/products/al-quran-al-azhim-a5-hard-cover.jpg",
  },
  {
    id: "6",
    slug: "mushaf-al-quran-al-wafa-a5-hard-cover",
    name: "Mushaf Al Quran Al Wafa A5 Hard Cover",
    price: 65000,
    category: "quran-hafalan",
    size: "A5",
    rating: 4,
    wakafEligible: true,
  },
  // Products 7-9: real bundle SKUs from the homepage's own "Hadiah/Gift"
  // carousel — 2-piece box sets with free name engraving, positioned by
  // the site itself as gift-appropriate.
  {
    id: "7",
    slug: "bundling-mushaf-al-quran-madinah-huzaifi-a5-2-pcs-box-exclusive-free-custom-nama",
    name: "Bundling Mushaf Al Quran Madinah Huzaifi A5 2 pcs Box Exclusive Free Custom Nama",
    imageUrl: "/products/bundling-mushaf-al-quran-madinah-huzaifi-a5-2-pcs-box-exclusive-free-custom-nama.jpg",
    price: 260800,
    category: "quran-harian",
    size: "A5",
    badge: "Free Custom Nama",
    giftEligible: true,
  },
  {
    id: "8",
    slug: "bundling-mushaf-al-quran-al-wafa-a6-pocket-2-pcs-box-exclusive-free-custom-nama",
    name: "Bundling Mushaf Al Quran Al Wafa A6 Pocket 2 pcs Box Exclusive Free Custom Nama",
    imageUrl: "/products/bundling-mushaf-al-quran-al-wafa-a6-pocket-2-pcs-box-exclusive-free-custom-nama.jpg",
    price: 151800,
    category: "quran-hafalan",
    size: "A6",
    badge: "Free Custom Nama",
    giftEligible: true,
  },
  {
    id: "9",
    slug: "bundling-mushaf-al-quran-terjemah-al-halim-a6-pocket-2-pcs-box-exclusive-free-custom-nama",
    name: "Bundling Mushaf Al Quran Terjemah Al Halim A6 Pocket 2 pcs Box Exclusive Free Custom Nama",
    imageUrl: "/products/bundling-mushaf-al-quran-terjemah-al-halim-a6-pocket-2-pcs-box-exclusive-free-custom-nama.jpg",
    price: 157800,
    category: "quran-terjemah",
    size: "A6",
    badge: "Free Custom Nama",
    giftEligible: true,
  },
  // Products 10-14: real Al Wafa line SKUs.
  {
    id: "10",
    slug: "mushaf-al-quran-al-wafa-a7-pocket-edition",
    name: "Mushaf Al Quran Al Wafa A7 Pocket Edition",
    price: 35000,
    category: "quran-hafalan",
    size: "A7",
    imageUrl: "/products/mushaf-al-quran-al-wafa-a7-pocket-edition.jpg",
  },
  {
    id: "11",
    slug: "mushaf-al-quran-al-wafa-muslimah-a5-resleting",
    name: "Mushaf Al Quran Al Wafa Muslimah A5 Resleting",
    price: 83000,
    category: "quran-hafalan",
    size: "A5",
  },
  {
    id: "12",
    slug: "mushaf-al-quran-al-wafa-b7-mujazza-per-5-juz",
    name: "Mushaf Al Quran Al Wafa B7 Mujazza Per 5 Juz",
    price: 50000,
    category: "quran-hafalan",
    size: "B7",
    imageUrl: "/products/mushaf-al-quran-al-wafa-b7-mujazza-per-5-juz.jpg",
  },
  {
    id: "13",
    slug: "mushaf-al-quran-al-wafa-rubu-b7-resleting",
    name: "Mushaf Al Quran Al Wafa Rubu B7 Resleting",
    price: 45000,
    category: "quran-hafalan",
    size: "B7",
    imageUrl: "/products/mushaf-al-quran-al-wafa-rubu-b7-resleting.jpg",
  },
  {
    id: "14",
    slug: "mushaf-al-qur-an-al-wafa-a5-resleting-premium",
    name: "Mushaf Al Qur'an Al Wafa A5 Resleting Premium",
    price: 76000,
    category: "quran-hafalan",
    size: "A5",
  },
  // Products 15-41: full remainder of halimquran.com/products' real
  // catalog (verified 26 Sep 2026) — see file header.
  {
    id: "15",
    slug: "al-quran-hafalan-a7-resleting",
    name: "Al Quran Hafalan A7 Resleting",
    price: 42000,
    category: "quran-hafalan",
    size: "A7",
    imageUrl: "/products/al-quran-hafalan-a7-resleting.jpg",
  },
  {
    id: "16",
    slug: "al-quran-hafalan-a6-hard-cover",
    name: "Al Quran Hafalan A6 Hard Cover",
    price: 52000,
    category: "quran-hafalan",
    size: "A6",
    imageUrl: "/products/al-quran-hafalan-a6-hard-cover.jpg",
  },
  {
    id: "17",
    slug: "al-quran-terjemah-tajwid-samara-a6-resleting",
    name: "Al Quran Terjemah Tajwid Samara A6 Resleting",
    price: 75000,
    category: "quran-terjemah",
    size: "A6",
  },
  {
    id: "18",
    slug: "al-quran-terjemah-tajwid-samara-a6-dompet",
    name: "Al Quran Terjemah Tajwid Samara A6 Dompet",
    price: 85000,
    category: "quran-terjemah",
    size: "A6",
    imageUrl: "/products/al-quran-terjemah-tajwid-samara-a6-dompet.jpg",
  },
  {
    id: "19",
    slug: "al-quran-hafalan-b7-per-5-juz",
    name: "Al Quran Hafalan B7 Per 5 Juz",
    price: 68000,
    category: "quran-hafalan",
    size: "B7",
    rating: 5,
    imageUrl: "/products/al-quran-hafalan-b7-per-5-juz.jpg",
  },
  {
    id: "20",
    slug: "al-quran-hafalan-a6-resleting-batik",
    name: "Al Quran Hafalan A6 Resleting Batik",
    price: 66000,
    category: "quran-hafalan",
    size: "A6",
    imageUrl: "/products/al-quran-hafalan-a6-resleting-batik.jpg",
  },
  {
    id: "21",
    slug: "al-quran-hafalan-a6-agenda-metode-hafalan",
    name: "Al Quran Hafalan A6 Agenda Metode Hafalan",
    price: 63000,
    category: "quran-hafalan",
    size: "A6",
    rating: 5,
  },
  {
    id: "22",
    slug: "al-quran-hafalan-a5-hard-cover",
    name: "Al Quran Hafalan A5 Hard Cover",
    price: 75000,
    category: "quran-hafalan",
    size: "A5",
  },
  {
    id: "23",
    slug: "al-quran-hafalan-a5-resleting",
    name: "Al Quran Hafalan A5 Resleting",
    price: 80000,
    category: "quran-hafalan",
    size: "A5",
  },
  {
    id: "24",
    slug: "al-quran-tajwid-al-mumtaz-a6-resleting",
    name: "Al Quran Tajwid Al Mumtaz A6 Resleting",
    price: 65000,
    category: "quran-tajwid",
    size: "A6",
    rating: 5,
    imageUrl: "/products/al-quran-tajwid-al-mumtaz-a6-resleting.jpg",
  },
  {
    id: "25",
    slug: "al-quran-tajwid-al-mumtaz-a5-resleting",
    name: "Al Quran Tajwid Al Mumtaz A5 Resleting",
    price: 98000,
    category: "quran-tajwid",
    size: "A5",
    imageUrl: "/products/al-quran-tajwid-al-mumtaz-a5-resleting.jpg",
  },
  {
    id: "26",
    slug: "al-quran-tajwid-al-mumtaz-a5-hard-cover",
    name: "Al Quran Tajwid Al Mumtaz A5 Hard Cover",
    price: 70000,
    category: "quran-tajwid",
    size: "A5",
    imageUrl: "/products/al-quran-tajwid-al-mumtaz-a5-hard-cover.jpg",
  },
  {
    id: "27",
    slug: "al-quran-kalimatul-ulya-a5-resleting",
    name: "Al Quran Kalimatul Ulya A5 Resleting",
    price: 60000,
    category: "quran-lainnya",
    size: "A5",
    imageUrl: "/products/al-quran-kalimatul-ulya-a5-resleting.jpg",
  },
  {
    id: "28",
    slug: "al-quran-terjemah-besar-al-haqq-a4-hard-cover-box",
    name: "Al Quran Terjemah Besar Al Haqq A4 Hard Cover Box",
    price: 160000,
    category: "quran-terjemah",
    size: "A4",
    imageUrl: "/products/al-quran-terjemah-besar-al-haqq-a4-hard-cover-box.jpg",
  },
  {
    id: "29",
    slug: "mushaf-al-quran-al-yasir-hafalan-a5-hard-cover",
    name: "Mushaf Al Quran Al Yasir Hafalan A5 Hard Cover",
    price: 79000,
    category: "quran-hafalan",
    size: "A5",
  },
  {
    id: "30",
    slug: "mushaf-al-quran-al-yasir-hafalan-a5-resleting",
    name: "Mushaf Al Quran Al Yasir Hafalan A5 Resleting",
    price: 109000,
    category: "quran-hafalan",
    size: "A5",
    rating: 4,
  },
  {
    id: "31",
    slug: "al-quran-terjemah-al-halim-b7-rubu-qpp-resleting",
    name: "Al Quran Terjemah Al Halim B7 Rubu QPP Resleting",
    price: 47000,
    category: "quran-terjemah",
    size: "B7",
    imageUrl: "/products/al-quran-terjemah-al-halim-b7-rubu-qpp-resleting.jpg",
  },
  {
    id: "32",
    slug: "al-quran-terjemah-al-halim-b7-rubu-qpp-resleting-colorfull-edition",
    name: "Al Quran Terjemah Al Halim B7 Rubu QPP Resleting Colorfull Edition",
    price: 47000,
    category: "quran-terjemah",
    size: "B7",
    imageUrl: "/products/al-quran-terjemah-al-halim-b7-rubu-qpp-resleting-colorfull-edition.jpg",
  },
  {
    id: "33",
    slug: "al-quran-terjemah-al-halim-rubu-b7-pocket-series",
    name: "Al Quran Terjemah Al Halim Rubu B7 Pocket Series",
    price: 50000,
    category: "quran-terjemah",
    size: "B7",
    imageUrl: "/products/al-quran-terjemah-al-halim-rubu-b7-pocket-series.jpg",
  },
  {
    id: "34",
    slug: "al-quran-terjemah-al-halim-b7-rubu-hvs-resleting",
    name: "Al Quran Terjemah Al Halim B7 Rubu HVS Resleting",
    price: 43000,
    category: "quran-terjemah",
    size: "B7",
    imageUrl: "/products/al-quran-terjemah-al-halim-b7-rubu-hvs-resleting.jpg",
  },
  {
    id: "35",
    slug: "al-quran-terjemah-al-halim-a6-resleting",
    name: "Al Quran Terjemah Al Halim A6 Resleting",
    price: 55000,
    category: "quran-terjemah",
    size: "A6",
  },
  {
    id: "36",
    slug: "al-quran-terjemah-al-halim-a6-pocket-resleting",
    name: "Al Quran Terjemah Al Halim A6 Pocket Resleting",
    price: 59000,
    category: "quran-terjemah",
    size: "A6",
    badge: "Terbaru",
  },
  {
    id: "37",
    slug: "al-quran-terjemah-al-halim-a5-resleting",
    name: "Al Quran Terjemah Al Halim A5 Resleting",
    price: 80000,
    category: "quran-terjemah",
    size: "A5",
  },
  {
    id: "38",
    slug: "al-quran-terjemah-al-halim-new-fancy-a5-resleting",
    name: "Al Quran Terjemah Al Halim New Fancy A5 Resleting",
    price: 65000,
    category: "quran-terjemah",
    size: "A5",
  },
  {
    id: "39",
    slug: "al-quran-terjemah-al-halim-a5-hard-cover",
    name: "Al Quran Terjemah Al Halim A5 Hard Cover",
    price: 67000,
    category: "quran-terjemah",
    size: "A5",
  },
  {
    id: "40",
    slug: "al-quran-terjemah-al-halim-klasik-emas-perak-a5-hard-cover",
    name: "Al Quran Terjemah Al Halim Klasik Emas Perak A5 Hard Cover",
    price: 57000,
    category: "quran-terjemah",
    size: "A5",
  },
  {
    id: "41",
    slug: "al-quran-terjemah-al-halim-a5-agenda",
    name: "Al Quran Terjemah Al Halim A5 Agenda",
    price: 60000,
    category: "quran-terjemah",
    size: "A5",
  },
];
