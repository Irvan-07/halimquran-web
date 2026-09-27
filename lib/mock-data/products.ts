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
    // No rating/review widget rendered on this product's native
    // halimquran.com PDP at all (unlike Huzaifi A5 / Mumtaz A7) — not
    // fabricated, left unset until a Shopee/TikTok listing link is given,
    // same as the established template pattern.
    colorVariants: [
      { hex: "#6B7280", name: "Abu-Abu", imageUrl: "/products/wafa-a6-colors/color-abu-abu.jpg" },
      { hex: "#8B5E34", name: "Coklat", imageUrl: "/products/wafa-a6-colors/color-coklat.jpg" },
      { hex: "#E8DCC4", name: "Cream", imageUrl: "/products/wafa-a6-colors/color-cream.jpg" },
      { hex: "#0F7A5C", name: "Hijau", imageUrl: "/products/wafa-a6-colors/color-hijau.jpg" },
      { hex: "#111827", name: "Hitam", imageUrl: "/products/wafa-a6-colors/color-hitam.jpg" },
      { hex: "#8E7CC3", name: "Lilac", imageUrl: "/products/wafa-a6-colors/color-lilac.jpg" },
      { hex: "#C2417A", name: "Pink", imageUrl: "/products/wafa-a6-colors/color-pink.jpg" },
    ],
    customNameEligible: true,
    imageUrl: "/products/mushaf-al-quran-al-wafa-a6-pocket-edition.jpg",
    // Real PDP gallery (hero shot, detail photos, size-chart graphic),
    // downloaded from this exact product's live halimquran.com PDP 27 Sep
    // 2026 — same pattern as the Wafa B7 template.
    galleryImages: [
      "/products/wafa-a6-gallery/gallery-1-main.jpg",
      "/products/wafa-a6-gallery/gallery-2.jpg",
      "/products/wafa-a6-gallery/gallery-3.jpg",
      "/products/wafa-a6-gallery/gallery-4.jpg",
      "/products/wafa-a6-gallery/gallery-5.jpg",
      "/products/wafa-a6-gallery/gallery-6-sizechart.jpg",
    ],
    weightGrams: 330,
    // Real PDP copy, read verbatim from halimquran.com 27 Sep 2026.
    description:
      "Pengen baca Al-Qur'an setiap waktu tapi suka repot bawa Al-Qur'annya?? Nyari yang ringan dan mudah dibawa?? Sepertinya Anda perlu coba Al-Qur'an satu ini, Al-Qur'an Al-Wafa Rubu' Pocket Resleting, beratnya hanya 330gr, ringan dibawa ke mana saja. Penasaran apa saja keistimewaannya??\n\nSpesifikasi:\n- Ukuran A6 (10,5 x 14,5 cm)\n- Kertas QPP 50gr\n- Berat 330gr\n- Tebal 616 halaman\n\nFitur cover:\n- Desain cover casual, kalem, dan hangat.\n- Jahitan super rapi.\n- Zipper kuat dan tahan lama.\n- Tersedia dalam 7 pilihan warna.\n\nMaterial cover:\n- Cover terbuat dari kulit sintetis jenis cocoli berkualitas yang membuat warna cover lebih kuat dan tidak mudah pudar. Selain itu, cover dilapisi dengan foil yang memberi kesan mewah pada tampilan cover.\n- Resleting berbahan metal, sehingga lebih kokoh dan aman, serta memiliki gigitan resleting yang lebih kuat. Metal Zipper memberi kesan mahal dan eksklusif pada Al-Qur'an.\n\nMaterial inner:\n- Menggunakan kertas QPP 50gr dengan tingkat kehalusan tinggi, high smoothies dan tahan hingga 100 tahun.\n- Bahan kertas sudah teruji lab dan terbukti halalan thayyiban.\n- Warna kertas Yellowish, membuat mata tidak lelah walaupun membaca dalam waktu yang lama.\n\nFitur inner:\n- Rasm Utsmani 15 baris standar Kemenag RI.\n- Dicetak dengan khat yang jelas ditambah bahan kertas dengan daya serap tinta yang baik, sangat nyaman dibaca.\n- Dilengkapi indeks juz yang memudahkan kamu mencari juz atau halaman tertentu.\n- Terdapat pewarnaan kata ganti Allah dan -Nya yang memudahkan kamu menemukan ayat-ayat pilihan.\n\nCari Al-Qur'an premium, kekinian, terjangkau, dan bergaransi? Halim Qur'an aja.. Yuk check out sekarang!",
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
    badge: "Ukir Nama",
    rating: 5,
    // 1357 = 5-star (1274) + 4-star (83) ratings on this product's real
    // Shopee listing, out of 1377 total — per the project owner's
    // direction, 3/2/1-star ratings (20 total) are treated as 0 / not
    // counted here.
    ratingCount: 1357,
    colorVariants: [
      { hex: "#6B7280", name: "Abu-Abu", imageUrl: "/products/mumtaz-a7-colors/color-abu-abu.jpg" },
      { hex: "#2563EB", name: "Biru", imageUrl: "/products/mumtaz-a7-colors/color-biru.jpg" },
      { hex: "#E8DCC4", name: "Cream", imageUrl: "/products/mumtaz-a7-colors/color-cream.jpg" },
      { hex: "#8B5E34", name: "Coklat", imageUrl: "/products/mumtaz-a7-colors/color-coklat.jpg" },
      { hex: "#C9A227", name: "Gold", imageUrl: "/products/mumtaz-a7-colors/color-gold.jpg" },
      { hex: "#111827", name: "Hitam", imageUrl: "/products/mumtaz-a7-colors/color-hitam.jpg" },
      { hex: "#7B2D26", name: "Maroon", imageUrl: "/products/mumtaz-a7-colors/color-maroon.jpg" },
    ],
    customNameEligible: true,
    imageUrl: "/products/al-quran-tajwid-al-mumtaz-a7-resleting.jpg",
    // Real PDP gallery (hero shot, detail photos, size-chart graphic),
    // downloaded from this exact product's live halimquran.com PDP 27 Sep
    // 2026 — same pattern as the Wafa B7 template.
    galleryImages: [
      "/products/mumtaz-a7-gallery/gallery-1-main.jpg",
      "/products/mumtaz-a7-gallery/gallery-2.jpg",
      "/products/mumtaz-a7-gallery/gallery-3.jpg",
      "/products/mumtaz-a7-gallery/gallery-4.jpg",
      "/products/mumtaz-a7-gallery/gallery-5-sizechart.jpg",
    ],
    weightGrams: 180,
    // Real PDP copy, read verbatim from halimquran.com 27 Sep 2026.
    description:
      "Pengen membaca Al-Qur'an setiap waktu tapi suka repot bawa Al-Qur'annya?? Nyari yang pas di kantong?? Pas banget, Kamu bisa coba pakai Al-Qur'an Tajwid ukuran saku, covernya kasual dan bagus, cocok untuk siapa saja. Beratnya hanya 180gr, ringan dibawa ke mana saja, bisa disimpan di saku. Apa sih yang istimewa dari Al-Qur'an ini??\n\nSpesifikasi:\n- Ukuran A7 (8 x 10,5 cm)\n- Kertas QPP 50gr\n- Berat 180gr\n- Tebal 616 halaman\n\nFitur Cover:\n- Desain cover elegan.\n- Jahitan super rapi.\n- Zipper kuat dan tahan lama.\n- Tersedia dalam 7 pilihan warna.\n- Bisa custom nama di cover-nya, custom suka-suka, proses tanpa lama.\n\nMaterial Inner:\n- Menggunakan kertas QPP dengan tingkat kehalusan tinggi, high smoothies dan tahan hingga 100 tahun.\n- Bahan kertas sudah teruji lab dan terbukti halalan thayyiban.\n- Warna kertas Yellowish, membuat mata tidak lelah walaupun membaca dalam waktu yang lama.\n\nFitur Inner:\n- Rasm Utsmani standar Kemenag RI.\n- Tanda tajwid berwarna standar Kemenag RI, memudahkan Kamu membaca sesuai kaidah yang benar.\n- Dicetak dengan khat yang jelas ditambah bahan kertas dengan daya serap tinta yang baik, sangat nyaman dibaca.\n- Dilengkapi indeks Juz untuk memudahkan Kamu mencari juz atau halaman tertentu.\n- Dilengkapi penjelasan Adab dan Fadhilah membaca Al-Qur'an.\n\nCari Al-Qur'an premium, terjangkau, dan bergaransi? Halim Qur'an aja.. Yuk check out sekarang!",
    // Curated subset of this product's real Shopee listing reviews (27 Sep
    // 2026) — 1377 total ratings is far more than fits as individual cards,
    // so this is the top ~30 by (has media, then like count), not literally
    // every review. Read via Shopee's own ratings API with the logged-in
    // owner's session, kept verbatim:
    // https://shopee.co.id/Halim-Qur'an-QUR'AN-TAJWID-AL-MUMTAZ-A7-RESLETING-UKURAN-SAKU-RINGAN-DAN-MUDAH-DIBAWA-i.229472472.21717587007
    reviews: [
      { author: "dewirus21", rating: 5, text: "Tampilan: Masyaallah Tabarakallah. Kualitas: Terbaik kerennn aku suka desain cover nya kekinian dan simple. Cocok Untuk: Al-Qur'an saku untuk memudahkan menghafal dimana saja. Jazakumullah Khayr seller sudah bantu aku minta tolong kirim cepat karna buat hadiah. aku pesen kemarin siang Alhamdulillah sampai jam 9 pagi hari ini. Masyaallah seneng bgt \u{2764}\u{FE0F}\u{2764}\u{FE0F}\u{2764}\u{FE0F}. Smg berkah untuk pemiliknya nanti", date: "26 Aug 2022", variant: "Hitam • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r0-1.jpg" }, { type: "video", src: "/reviews/mumtaz-r0.mp4" }] },
      { author: "e*****s", rating: 5, text: "Tampilan: Cakep Banget. Kualitas: Top. Cocok Untuk: Dibawa Kemana-mana. Alhamdulillah Masya Allah Tabarakallah, Al Qur'an nya Segenggam tangan, cocok buat dibawa kemana-mana, desainnya covernya juga bagus, apalagi yang custom nama, warnanya ciamik. Cuma ada sedikit aja yg kurang jelas itu huruf Hijaiyah ي titiknya kalo sambung kayak ب.", date: "14 Mar 2023", variant: "Gold • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r1-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r1-2.jpg" }, { type: "video", src: "/reviews/mumtaz-r1.mp4" }] },
      { author: "muh.izki", rating: 5, text: "Ukuran: sesuai deskripsi. Kualitas: terbaik. Kegunaan: membaca kitab suci. Sangat baik, rapih, mudah dibaca, akurat, komplit, warna sesuai trntu, n mudah untuk dibaca n hafalan. \u{1F44D}", date: "24 Jun 2024", variant: "Hitam • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r2-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r2-2.jpg" }, { type: "video", src: "/reviews/mumtaz-r2.mp4" }] },
      { author: "m*****3", rating: 5, text: "Cocok Untuk: cocok di bawa kemana mana, pas di kantong. Tampilan: menarik, bagus, mudah di pahami. Kualitas: kualitas baik dan oke. Sudah beli 2 kali dan puas, semoga selalu langganan", date: "13 Apr 2023", variant: "Biru • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r3-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r3-2.jpg" }] },
      { author: "n*****a", rating: 5, text: "Tampilan: Al-Qur'an nya bagus. Kualitas: ok. Cocok Untuk: dibawa bepergian karena bisa dimasukin ke dlm tas ukuran kecil. Paket Al-Qur'an nya sdh keterima dengan baik dan barang nya jg oke semoga bisa lebih meningkatan lagi bacaan Al-Qur'an sy karena ini ukurannya mini sehingga bisa dibawa kemanapun bila bepergian, thx penjual dan jg shopee...\u{1F44D}\u{1F44D}", date: "05 Jan 2024", variant: "Coklat • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r4-1.jpg" }] },
      { author: "m*****3", rating: 5, text: "Tampilan: tampilan menarik, mudah dibaca, jelas dan rapih. Kualitas: baik dan mantap. Cocok Untuk: cocok untuk di bawa pergi pergi traveling. Al-qurannya bagus, rekomendasi banget buat yg suka jalan jalan travelling, pas di tas pinggang dan kantong.", date: "05 Apr 2023", variant: "Maroon • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r5-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r5-2.jpg" }, { type: "video", src: "/reviews/mumtaz-r5.mp4" }] },
      { author: "onotarsono82", rating: 5, text: "Ukuran: pas disaku. Kualitas: tidak diragukan. Kegunaan: cocok buat penghapal alquan bisa dibawa kemana²", date: "03 Oct 2024", variant: "Maroon • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r6-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r6-2.jpg" }] },
      { author: "i*****u", rating: 5, text: "Ukuran: pas untuk di saku. Kualitas: baik bagus berkualitas. Kegunaan: ke syurga. Tanksyu seller pengiriman cepat bandung Jakarta 1 hari. Next insya Allah order kembali", date: "15 Sep 2024", variant: "Abu-abu • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r7-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r7-2.jpg" }, { type: "video", src: "/reviews/mumtaz-r7.mp4" }] },
      { author: "annisatrishadi", rating: 5, text: "Kualitas: bagus. Cocok Untuk: semua muslim. Tampilan: bagus. Sesuai pesanan. Paking lumayan aman. Admin baik dan ramah. Pingiriman cepat sesuai pesanan. Harga terjangkau. Cocok untuk cindramata.", date: "12 Oct 2023", variant: "Gold • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r8-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r8-2.jpg" }] },
      { author: "a*****1", rating: 5, text: "Ukuran: pas. Kualitas: sangat Bagus dan rapi. Barang sesuai pesanan dan cepat sampai pelayanannya sangat baik", date: "19 Oct 2024", variant: "Biru • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r9-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r9-2.jpg" }] },
      { author: "sari.mulyati11", rating: 5, text: "Kualitas: sangat baik. Kegunaan: tadarus. MashaAllah bagus banget Al-qur'an nya... Kualitas bahan sangat baik. Cetakan huruf sangat jelas. Packing rapi. Harga sangat terjangkau. Semoga berkah jualannya dan semoga awet Al-quran nya aamiin..", date: "01 Mar 2025", variant: "Abu-abu • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r10-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r10-2.jpg" }, { type: "video", src: "/reviews/mumtaz-r10.mp4" }] },
      { author: "pujipriyatno005", rating: 5, text: "Ukuran: pas dan sesuai. Kualitas: sangat bagus. Kegunaan: beribadah. untuk barangnya bagus sesuai deskripsi. Cuma saya yg kurang teliti, soalnya sebenernya lagi nyari yg mushaf utsmani madinah hehehe. Overall, oke banget..", date: "29 Oct 2024", variant: "Maroon • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r11-1.jpg" }, { type: "video", src: "/reviews/mumtaz-r11.mp4" }] },
      { author: "febri.hrtn", rating: 5, text: "Cocok Untuk: dibawa travelling. Kualitas: bagus bngt. Masyaallah bagus bngt, beli ini utk adik yg masih kelas 5 SD katanya mau Al-Quran yg kecil.. Ini bener2 bagus dan ada tajwid nya jga, makasi seller berkah selalu ya", date: "05 Jun 2023", variant: "Hitam • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r12-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r12-2.jpg" }] },
      { author: "s*****a", rating: 5, text: "Ukuran: pas dan sesuai. Kualitas: bagus, jelas dan tidak burem. Kegunaan: untuk mengaji. alhamdulillah paketnya sesuai dengan pesanan dan ortu saya suka. Terimakasih untuk penjualnya yang ramah. semoga berkah selalu tokonya", date: "20 Nov 2024", variant: "Hitam • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r13-1.jpg" }, { type: "video", src: "/reviews/mumtaz-r13.mp4" }] },
      { author: "t*****s", rating: 5, text: "Ukuran: pas. Kualitas: baik sekali. Kegunaan: panduan hidup. Ukurannya yg compact bisa dibawa kemana aja. Tulisannya masih terlihat jelas dan terbaca jelas meskipun kecil, tapi mungkin yg punya minus tinggi agak sedikit bikin pusing yaa.. desainnya cantik, saya suka", date: "20 Oct 2024", variant: "Gold • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r14-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r14-2.jpg" }, { type: "video", src: "/reviews/mumtaz-r14.mp4" }] },
      { author: "hasan_basri.asmah", rating: 5, text: "Ukuran: A7 sangatlah simpel. Kualitas: sangat memuaskan. Kegunaan: mengaji, menghafal Alquran & membaca Alquran. Alhamdulillah barangnya sudah datang dalam kondisi baik & selamat, sesuai dengan gambar nya. Saya tidak bisa ngomong apa2 lagi, pokoknya sangatlah mantap \u{1F44D} Alquran nya. Cocok dibawa ke mana2 bisa ditaruh kedalam saku, tulisanya jelas, simpel & praktis. saya selalu bersemangat mengajinya, dan janganlah berhenti. Selalu membaca Alquran untuk penolong di akhirat kelak nanti", date: "15 Mar 2025", variant: "Maroon • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r15-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r15-2.jpg" }, { type: "video", src: "/reviews/mumtaz-r15.mp4" }] },
      { author: "yusro1988", rating: 5, text: "Ukuran: pas dan sesuai. Kualitas: dengan kwalitas cetakan bagus. Kegunaan: simple buat di bawa. Bagus, ukuran sesuai, kwalitan mantap. Semoga jadi tambah sering baca al quran.", date: "12 Aug 2024", variant: "Biru • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r16-1.jpg" }, { type: "video", src: "/reviews/mumtaz-r16.mp4" }] },
      { author: "m*****l", rating: 5, text: "Respon penjual cepet, terus proses nya dikira bakal lama karena ada custom nama ternyata order pagi siangnya langsung dikirim. Packing rapi juga, thanks seller", date: "29 Feb 2024", variant: "Cream • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r17-1.jpg" }] },
      { author: "yusro1988", rating: 5, text: "Ukuran: Cocok. Kualitas: Bagus sekali. Kegunaan: Membaca n menghafal Al Quran. Bagus, semoga awet, tulisan nama juga bagus. Semoga bermanfaat.", date: "26 Apr 2025", variant: "Abu-abu • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r18-1.jpg" }, { type: "video", src: "/reviews/mumtaz-r18.mp4" }] },
      { author: "jakrem", rating: 5, text: "Ukuran: saku. Kualitas: bagus. Kegunaan: membaca Alquran. Alhamdulillah Al Qur'an nya sudah sampai, dalam rangka menyambut bulan suci Ramadhan semoga kita senantiasa membaca Alquran dan menjadikan nya pedoman dalam membimbing agar hati kita selalu suci, aamiin", date: "15 Feb 2025", variant: "Cream • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r20-1.jpg" }, { type: "video", src: "/reviews/mumtaz-r20.mp4" }] },
      { author: "a*****d", rating: 5, text: "Pesanan sudah saya terima, pengiriman cepat seller ramah langganan di toko ini, dpt harga murce dic shopee makasih semuanya sukses.", date: "22 Oct 2024", variant: "Hitam • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r21-1.jpg" }, { type: "video", src: "/reviews/mumtaz-r21.mp4" }] },
      { author: "pernandapratama12", rating: 5, text: "Ukuran: pas dan sesuai. Kualitas: sangat bagus. Kegunaan: Untuk anak saya sekolah di pondok pesantren. Ok sekali. Barang nya sangat bagus dan sesuai dengan ekspektasi. Top banget \u{1F44D}\u{1F44D}\u{1F44D}\u{1F44D}", date: "14 Nov 2024", variant: "Abu-abu • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r22-1.jpg" }] },
      { author: "y*****a", rating: 5, text: "Tampilan: bagus. Kualitas: oke. Cocok Untuk: anak muda. Barang telah sampai di tempat tujuan. Al-Qur'an nya bagus. Tampilan mewah dan simpel. Menurut ku Al-Qur'an nya kekecilan tapi mudah dibawa. Tapi masih okelah. Seller amanah. Kurir oke. Thanks.", date: "13 May 2024", variant: "Coklat • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r23-1.jpg" }, { type: "video", src: "/reviews/mumtaz-r23.mp4" }] },
      { author: "s*****3", rating: 5, text: "Kualitas: bagus. Kegunaan: ibadah. Ukuran: pas dan sesuai. Barang sudah sampai dengan aman. Terima kasih shoope seller dan kurir", date: "26 May 2024", variant: "Abu-abu • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r24-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r24-2.jpg" }, { type: "video", src: "/reviews/mumtaz-r24.mp4" }] },
      { author: "wilis.inc", rating: 5, text: "Ukuran: pas sesuai. Kualitas: limited edition. Kegunaan: banyak hal. Alhamdulillah ada bonusnya, sangat recommended untuk semua kalangan", date: "29 Sep 2024", variant: "Abu-abu • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r25-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r25-2.jpg" }] },
      { author: "ritakartika241", rating: 5, text: "Ukuran: sesuai. Kualitas: ok. Kegunaan: multifungsi. alhamdulillah alquran bagus imut..tulisan agak lembut ya ..tapi gpp masih kebaca pake kacamata..kostum nama bagus....terimakasih", date: "24 Apr 2025", variant: "Maroon • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r26-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r26-2.jpg" }] },
      { author: "hajisupriyanto63", rating: 5, text: "Ukuran: ok. Kualitas: ok. Kegunaan: ok. Khusus buat hafalan dan yng SDH mahir dalam membaca Alquran, Krn huruf nya kecil\u{1F44D}\u{1F64F}", date: "23 Mar 2025", variant: "Gold • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r27-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r27-2.jpg" }] },
      { author: "246810aisyah", rating: 5, text: "Ukuran: pas. Kualitas: baik. Kegunaan: banyak. Alhamdulillah bagus dan sesuai", date: "04 Mar 2025", variant: "Hitam • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r28-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r28-2.jpg" }, { type: "video", src: "/reviews/mumtaz-r28.mp4" }] },
      { author: "lenaakbar", rating: 5, text: "Ukuran: pas dan sesuai. Kualitas: sangat memuaskan dan unggul. Kegunaan: cocok utk hafalan. Alqurannya bagus untuk hafalan tp syg pengirimannya agak lama tp nggak apa.", date: "16 Aug 2024", variant: "Biru • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r29-1.jpg" }] },
      { author: "marishamegalita", rating: 5, text: "Ukuran: pas dan sesuai. Kualitas: sangat baik. Kegunaan: mudah d bawa, jadi bisa enteng klo mau ngaji. mashaaAllah bagus banget Al-Qur'annya, aku sukaa, emng dri dlu nyari yg kyak gni, thank you seller,, inshaaAllah amalnya sampe ke seller yaa... amin", date: "17 Jan 2025", variant: "Biru • Tambah Custom Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r30-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r30-2.jpg" }] },
      { author: "fadilahsitifatimah542", rating: 5, text: "Ukuran: sesuai. Kualitas: bagus, kemasan rapi, warna sesuai pesanan, mudah dibawa kemana mana. Kualitas bagus, kemasan rapi, semua sesuai pesanan", date: "20 Nov 2024", variant: "Biru • Tanpa Nama", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mumtaz-r31-1.jpg" }, { type: "image", src: "/reviews/mumtaz-r31-2.jpg" }] },
    ],
  },
  {
    id: "5",
    slug: "al-quran-al-azhim-a5-hard-cover",
    name: "Al Quran Al Azhim A5 Hard Cover",
    price: 33000,
    category: "quran-harian",
    size: "A5",
    wakafEligible: true,
    rating: 5,
    // 2277 = 5-star (2137) + 4-star (140) ratings on this product's real
    // Shopee listing, out of 2309 total — per the project owner's
    // direction, 3/2/1-star ratings (32 total) are treated as 0.
    ratingCount: 2277,
    // Shopee's own "Terjual" figure showed as "10RB+" (rounded) — set
    // directly per the project owner's screenshot/direction.
    soldCount: 10000,
    colorVariants: [
      { hex: "#1E3A5F", name: "Biru", imageUrl: "/products/azhim-a5-colors/color-biru.jpg" },
      { hex: "#8B5E34", name: "Cokelat", imageUrl: "/products/azhim-a5-colors/color-cokelat.jpg" },
      { hex: "#E8DCC4", name: "Cream", imageUrl: "/products/azhim-a5-colors/color-cream.jpg" },
      { hex: "#0F7A5C", name: "Hijau", imageUrl: "/products/azhim-a5-colors/color-hijau.jpg" },
      { hex: "#111827", name: "Hitam", imageUrl: "/products/azhim-a5-colors/color-hitam.jpg" },
      { hex: "#E8C547", name: "Kuning", imageUrl: "/products/azhim-a5-colors/color-kuning.jpg" },
      { hex: "#B91C1C", name: "Merah", imageUrl: "/products/azhim-a5-colors/color-merah.jpg" },
      { hex: "#14B8A6", name: "Tosca", imageUrl: "/products/azhim-a5-colors/color-tosca.jpg" },
    ],
    imageUrl: "/products/al-quran-al-azhim-a5-hard-cover.jpg",
    // Real PDP gallery (hero shot, detail photos, size-chart graphic, plus
    // a wakaf-campaign graphic), downloaded from this exact product's live
    // halimquran.com PDP 27 Sep 2026 — same pattern as the Wafa B7
    // template. Note: this product's live PDP purchase panel differs from
    // the standard template (wakaf-specific "Quran Saja"/"Quran + Cover
    // Doa" pills + a penyaluran-wakaf destination picker + "Nama Wakif"
    // field, instead of the usual Quran Saja/+Nama/+Nama+Box pattern) —
    // not rebuilt here, only the standard data fields below are populated.
    galleryImages: [
      "/products/azhim-a5-gallery/gallery-1-main.jpg",
      "/products/azhim-a5-gallery/gallery-2.jpg",
      "/products/azhim-a5-gallery/gallery-3.jpg",
      "/products/azhim-a5-gallery/gallery-4.jpg",
      "/products/azhim-a5-gallery/gallery-5.jpg",
      "/products/azhim-a5-gallery/gallery-6-sizechart.jpg",
      "/products/azhim-a5-gallery/gallery-7.png",
    ],
    weightGrams: 405,
    // Real PDP copy, read verbatim from halimquran.com 27 Sep 2026.
    description:
      "Siapa bilang wakaf itu modalnya mahal?? Semua itu cuma mitos setelah ada Al-Azhim, siapa saja bisa berwakaf Qur'an. Satu kali berwakaf, mengalir pahala sampai selamanya, Insya Allah..\n\nAl-Qur'an Al-'Azhim Tsumun Hard Cover Halim Qur'an, murah dan berkualitas, pilihan terbaik untuk wakaf pribadi atau lembaga. Yuk cek apa saja keistimewaannya !!\n\nSpesifikasi:\n- Ukuran A5 (14,5 x 20,5 cm)\n- Kertas CD/Kertas koran 42gr\n- Berat 405gr\n- Tebal 496 halaman\n\nFitur cover:\n- Desain elegan dengan khat kufi.\n- Style cover yang fresh dan cerah.\n- Tersedia dalam 8 pilihan warna.\n\nMaterial cover:\n- Cover dibuat dari jilid grey broad dengan finishing laminasi glossy, menghasilkan cover premium yang berkilau, memantulkan cahaya, dan gambar lebih kuat.\n\nFitur inner:\n- Rasm Utsmani 18 baris standar Kemenag RI.\n- Khat jelas dan sangat nyaman dibaca.\n- Dilengkapi indeks juz yang memudahkan kamu mencari juz atau halaman tertentu.\n- Dilengkapi penjelasan tajwid praktis, singkat, dan mudah dipahami.\n\nMaterial inner:\n- Setiap lembar Al-Qur'an menggunakan kertas CD 42gr dengan warna redup, sehingga mata kamu terasa lebih teduh saat membacanya.\n\nCari Al-Qur'an premium, kekinian, terjangkau, dan bergaransi? Halim Qur'an aja.. Yuk check out sekarang!",
    // Curated subset of this product's real Shopee listing reviews (27 Sep
    // 2026) — top ~30 by (has media, then like count) out of 2309 total
    // ratings. Read via Shopee's own ratings API with the logged-in
    // owner's session, kept verbatim:
    // https://shopee.co.id/AL-QUR'AN-AL-'AZHIM-HARD-COVER-MURAH-BERKUALITAS-PILIHAN-TERBAIK-UNTUK-WAKAF-i.229472472.3419825439
    reviews: [
      { author: "nurhasanahumi", rating: 5, text: "Alhamdulillah packingnya rapiiiih saya suka banget dengan harga segitu lumayan banget laaaahhhh ga mengecewakan pokonyaaaa, dan alhamdulillah ibu aku suka sama Al-Qur'annyaaa.. Makasih yaaa kak", date: "13 Nov 2021", variant: "Merah", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r0-1.jpg" }, { type: "video", src: "/reviews/azhim-r0.mp4" }] },
      { author: "sofianna1203", rating: 5, text: "Desain: bagus dan modern. Kualitas: terlihat jelas dan memuaskan. Kegunaan: sangat cocok untuk mengaji. Barangnya datang kemarin, gak kecewa, bagussss banget, tulisannya jelas mudah dibaca, ringan simple kalo dibawa kemana-mana ga berat", date: "28 Jul 2025", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r1-1.jpg" }, { type: "image", src: "/reviews/azhim-r1-2.jpg" }, { type: "video", src: "/reviews/azhim-r1.mp4" }] },
      { author: "almashop31", rating: 5, text: "Barangnya bagus dan packing rapi, aman pokoknya. Seller amanah dan ramah. Syukron..semoga sukses selalu.", date: "06 Sep 2021", variant: "Coklat", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r2-1.jpg" }, { type: "video", src: "/reviews/azhim-r2.mp4" }] },
      { author: "shintas367", rating: 5, text: "Desain: bagus. Kegunaan: untuk mengaji. Kualitas: sangat baik. Alqurannya bagus, dari segi desain dan tulisan Arabnya bagus... tapi sayang pengirimannya lama padahal masih satu Jawa Barat, yg dari luar daerah Jawa Timur malahan lebih cepat", date: "10 Aug 2024", variant: "Cream", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r3-1.jpg" }, { type: "image", src: "/reviews/azhim-r3-2.jpg" }, { type: "video", src: "/reviews/azhim-r3.mp4" }] },
      { author: "a*****8", rating: 5, text: "Alhamdulillah Al-Qurannya sudah sampai, cover bagus, Al-Qurannya ada indeks disetiap juznya, tapi kecewa sedikit karena ternyata kertasnya tidak putih mirip seperti kertas buram agak gelap, saya yang tidak baca deskripsinya. Terima kasih penjual semoga tokonya barokah dan dilancarkan rejekinya. Aamiin", date: "05 Apr 2021", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r4-1.jpg" }, { type: "image", src: "/reviews/azhim-r4-2.jpg" }] },
      { author: "albejshop", rating: 5, text: "Alhamdulillah... Pesanan sesuai, packing rapih... Kurirnya baik, menghubungi dulu pas mau ngirim \u{1F64F}\u{1F64F} Semoga jadi langganan keberkahan \u{1F91E}\u{1F91E}", date: "08 Oct 2021", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r5-1.jpg" }, { type: "image", src: "/reviews/azhim-r5-2.jpg" }, { type: "video", src: "/reviews/azhim-r5.mp4" }] },
      { author: "by_agathachristy", rating: 5, text: "Desain: bagus. Kegunaan: untuk belajar. Kualitas: bagus. Packing aman dan rapi, kurir ramah, pengiriman cepat, seller baik, produk bagus dan sesuai", date: "02 Nov 2024", variant: "Cream", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r6-1.jpg" }, { type: "image", src: "/reviews/azhim-r6-2.jpg" }, { type: "video", src: "/reviews/azhim-r6.mp4" }] },
      { author: "b*****r", rating: 5, text: "Pesanan sesuai, packing rapi, pengiriman cepat, jumlah sesuai, semoga bermanfaat terimakasih", date: "22 Feb 2022", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r7-1.jpg" }, { type: "video", src: "/reviews/azhim-r7.mp4" }] },
      { author: "mohammad.reiza", rating: 5, text: "Alhamdulillah. Produk original berkualitas dengan harga terjangkau. Pengemasan rapih aman, pengiriman cepat. Mantap pokoknya. Terima kasih Halim Quran! \u{1F44D}\u{1F3FC}\u{2764}\u{FE0F}", date: "18 Jul 2024", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r8-1.jpg" }, { type: "video", src: "/reviews/azhim-r8.mp4" }] },
      { author: "devialenda", rating: 5, text: "Desain: simple. Kegunaan: membaca dan memahami. Kualitas: sangat bagus. Alhamdulillah wakaf Alquran untuk almarhumah mamaku sudah sampai...semoga bermanfaat dan menjadi ladang pahala untuk mamaku", date: "21 Dec 2024", variant: "Hijau", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r9-1.jpg" }, { type: "image", src: "/reviews/azhim-r9-2.jpg" }, { type: "video", src: "/reviews/azhim-r9.mp4" }] },
      { author: "venur19", rating: 5, text: "Desainnya sudah bagus. Hard covernya keren. Tapi alangkah baiknya sebelum packing diperiksa dulu Al-Qurannya. Itu ada yg lepas atau tidak kejahit.", date: "01 Sep 2024", variant: "Cream", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r10-1.jpg" }, { type: "image", src: "/reviews/azhim-r10-2.jpg" }] },
      { author: "innesabreena", rating: 5, text: "Packing rapi, aman dan cepat...pengiriman cepat...terima kasih...", date: "07 Apr 2021", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r11-1.jpg" }, { type: "video", src: "/reviews/azhim-r11.mp4" }] },
      { author: "milito16", rating: 5, text: "Alhamdulillah pesanan sudah sampai tepat waktu, Al-Qurannya bagus ga terlalu besar dan ga terlalu kecil, terimakasih", date: "14 Mar 2025", variant: "Tosca", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r12-1.jpg" }, { type: "image", src: "/reviews/azhim-r12-2.jpg" }, { type: "video", src: "/reviews/azhim-r12.mp4" }] },
      { author: "e*****t", rating: 5, text: "Desain: memiliki desain yang menarik. Kualitas: sangat bagus dan baik. Penggunaan: sangat membantu. Toko amanah, packing bagus, sukses untuk tokonya", date: "14 Aug 2025", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r13-1.jpg" }, { type: "image", src: "/reviews/azhim-r13-2.jpg" }, { type: "video", src: "/reviews/azhim-r13.mp4" }] },
      { author: "banimakmur", rating: 5, text: "Pesanan sesuai, packing rapi pengiriman cepat, jumlah sesuai semoga bermanfaat terimakasih", date: "22 Feb 2022", variant: "Hijau", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r14-1.jpg" }, { type: "video", src: "/reviews/azhim-r14.mp4" }] },
      { author: "s*****9", rating: 5, text: "Desain: menarik. Kegunaan: sangat cocok untuk aktivitas belajar. Kualitas: bagus. Alhamdulillah pesanan sudah datang dalam keadaan baik. Terimakasih \u{1F64F}", date: "15 Nov 2024", variant: "Hitam", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r15-1.jpg" }, { type: "video", src: "/reviews/azhim-r15.mp4" }] },
      { author: "farahsugiarto", rating: 5, text: "Alhamdulillah Al-Qurannya udah sampe bagus, cuma anaknya pengen kertas HVS putih, jadi kayanya beli lagi.. Overall bagus kok makasih sukses selalu", date: "11 Jul 2024", variant: "Tosca", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r16-1.jpg" }, { type: "video", src: "/reviews/azhim-r16.mp4" }] },
      { author: "s13wx41du9", rating: 5, text: "Desain: menarik. Kualitas: baik. Kegunaan: belajar. Sesuai pesanan, pengirimannya lama banget, tapi gapapa", date: "15 Mar 2025", variant: "Tosca", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r17-1.jpg" }, { type: "image", src: "/reviews/azhim-r17-2.jpg" }, { type: "video", src: "/reviews/azhim-r17.mp4" }] },
      { author: "y*****7", rating: 5, text: "Semoga bermanfaat bagi calon-calon hafiz.. Aamiin.", date: "24 Feb 2022", variant: "Coklat", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r18-1.jpg" }] },
      { author: "banana18", rating: 5, text: "Desain: Saya suka desainnya yang sederhana namun tetap menarik. Kualitas: Kualitas cetakan sangat jelas dan mudah dibaca. Kegunaan: Cocok dipakai aktivitas belajar ataupun wakaf. Bagus banget.. sangat rekomendasi banget beli di toko ini.. pengiriman dari tokonya juga cepat", date: "02 Apr 2026", variant: "Hitam", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r19-1.jpg" }, { type: "image", src: "/reviews/azhim-r19-2.jpg" }, { type: "video", src: "/reviews/azhim-r19.mp4" }] },
      { author: "ahksan92", rating: 5, text: "Desain: Menarik. Kualitas: Sangat worth it. Penggunaan: Untuk mengaji Al-Qur'an. Al-Qur'annya sesuai deskripsi, bagus dan menarik, cocok untuk anak saya belajar mengaji Al-Qur'an. Semoga manfaat dan berkah dunia akhirat!! Terimakasih \u{1F91D} Semoga sama-sama berkah \u{1F60A}", date: "22 Aug 2025", variant: "Cream", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r20-1.jpg" }, { type: "image", src: "/reviews/azhim-r20-2.jpg" }, { type: "video", src: "/reviews/azhim-r20.mp4" }] },
      { author: "indosan.id", rating: 5, text: "Desain: Menarik. Kegunaan: Mengaji. Kualitas: Bagus. Sangat Recommended \u{1F44C}", date: "22 Jul 2024", variant: "Cream", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r21-1.jpg" }, { type: "image", src: "/reviews/azhim-r21-2.jpg" }, { type: "video", src: "/reviews/azhim-r21.mp4" }] },
      { author: "rusmahmahrusmah08", rating: 5, text: "Desain: simple, modern dan cocok untuk berbagai usia. Kualitas: cetakan yang jelas dan mudah saat dibaca. Kegunaan: membantu untuk belajar mengaji. Alhamdulillah wasyukurillah sudah datang Alquran buat wakaf, semoga bermanfaat buat mereka dan Alqurannya bagus menurutku sesuai harganya \u{1F970}", date: "14 Jun 2026", variant: "Tosca", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r22-1.jpg" }, { type: "video", src: "/reviews/azhim-r22.mp4" }] },
      { author: "aabd13", rating: 5, text: "Cakep banget, khatnya juga jelas. \u{1F60D}. Cuma kertasnya tipis", date: "08 Apr 2026", variant: "Merah", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r23-1.jpg" }, { type: "video", src: "/reviews/azhim-r23.mp4" }] },
      { author: "dodiirawan89", rating: 5, text: "Desain: bagus. Kegunaan: pas untuk belajar. Kualitas: jelas. Semoga bermanfaat sampai dunia dan akhirat", date: "07 Nov 2024", variant: "Hitam", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r24-1.jpg" }, { type: "image", src: "/reviews/azhim-r24-2.jpg" }, { type: "video", src: "/reviews/azhim-r24.mp4" }] },
      { author: "Pembeli Shopee", rating: 5, text: "Desain: menarik. Kualitas: biasa karena kertas koran. Kegunaan: untuk mengaji. Semua bagian bagus. Minusnya di bahan kertas koran yg rentan sobek jika tidak hati-hati. Tapi wajar karena harga murah", date: "12 Aug 2025", variant: "Kuning", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r25-1.jpg" }, { type: "image", src: "/reviews/azhim-r25-2.jpg" }, { type: "video", src: "/reviews/azhim-r25.mp4" }] },
      { author: "a*****y", rating: 5, text: "Alhamdulillah paket sudah diterima. Terimakasih seller.", date: "28 May 2025", variant: "Tosca", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r26-1.jpg" }, { type: "video", src: "/reviews/azhim-r26.mp4" }] },
      { author: "inzih", rating: 5, text: "Kualitas: Gooooddd. Desain: Keren. Al Quran 50 pcs sudah nyampe Alhamdulillah bagus semua. Gak ada yg lecet krn packingannya sangat aman. Di dalam kardus masih dilapisi kertas. Terus di tas paket ada tulisan Al Quran sehingga paketnya gak rusak dibanting. Terus Al-Qurannya juga di plastik ini 1/1. Jadi barang diterima sangat mulus padahal pengiriman jauh ke Sulawesi. Makasih seller... pelayanannya. Next time order disini lagi deh....", date: "28 Jul 2026", variant: "Hitam", reviewSource: "Shopee", media: [{ type: "video", src: "/reviews/azhim-r27.mp4" }] },
      { author: "w*****1", rating: 5, text: "Desain: bagus. Kualitas: bagus sesuai harga. Kualitasnya sesuai dengan harga.", date: "16 Dec 2024", variant: "Coklat", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r28-1.jpg" }] },
      { author: "abukhanifah055", rating: 5, text: "Desain: bagus elegan. Kualitas: emang dari kertas koran tp jelas sesuai harga. Kegunaan: untuk mengaji", date: "11 Aug 2025", variant: "Cream", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/azhim-r29-1.jpg" }] },
      { author: "olyououtfitofficial", rating: 5, text: "Alhamdulillah Al-Qurannya sudah sampai sesuai pesanan.", date: "11 Mar 2022", variant: "Hijau", reviewSource: "Shopee", media: [{ type: "video", src: "/reviews/azhim-r30.mp4" }] },
      { author: "olyououtfitofficial", rating: 5, text: "Alhamdulillah jazakallah khairan sudah sampai Al-Qurannya", date: "13 Mar 2022", variant: "Merah", reviewSource: "Shopee", media: [{ type: "video", src: "/reviews/azhim-r31.mp4" }] },
    ],
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
    rating: 5,
    // 1995 = 5-star (1893) + 4-star (102) ratings on this product's real
    // Shopee listing, out of 2025 total — per the project owner's
    // direction, 3/2/1-star ratings (30 total) are treated as 0.
    ratingCount: 1995,
    colorVariants: [
      { hex: "#6B7280", name: "Abu-Abu", imageUrl: "/products/wafa-a7-colors/color-abu-abu.jpg" },
      { hex: "#1E3A5F", name: "Biru", imageUrl: "/products/wafa-a7-colors/color-biru.jpg" },
      { hex: "#C2417A", name: "Pink", imageUrl: "/products/wafa-a7-colors/color-pink.jpg" },
      { hex: "#E8DCC4", name: "Cream", imageUrl: "/products/wafa-a7-colors/color-cream.jpg" },
      { hex: "#8B5E34", name: "Coklat", imageUrl: "/products/wafa-a7-colors/color-coklat.jpg" },
      { hex: "#5C3A21", name: "Coklat Tua", imageUrl: "/products/wafa-a7-colors/color-coklat-tua.jpg" },
      { hex: "#8E7CC3", name: "Lilac", imageUrl: "/products/wafa-a7-colors/color-lilac.jpg" },
      { hex: "#111827", name: "Hitam", imageUrl: "/products/wafa-a7-colors/color-hitam.jpg" },
      { hex: "#0F7A5C", name: "Hijau", imageUrl: "/products/wafa-a7-colors/color-hijau.jpg" },
      { hex: "#7B2D26", name: "Maroon", imageUrl: "/products/wafa-a7-colors/color-maroon.jpg" },
    ],
    customNameEligible: true,
    imageUrl: "/products/mushaf-al-quran-al-wafa-a7-pocket-edition.jpg",
    // Real PDP gallery (hero shot, detail photos, size-chart graphic),
    // downloaded from this exact product's live halimquran.com PDP 27 Sep
    // 2026 — same pattern as the Wafa B7 template.
    galleryImages: [
      "/products/wafa-a7-gallery/gallery-1-main.jpg",
      "/products/wafa-a7-gallery/gallery-2.jpg",
      "/products/wafa-a7-gallery/gallery-3.jpg",
      "/products/wafa-a7-gallery/gallery-4.jpg",
      "/products/wafa-a7-gallery/gallery-5.jpg",
      "/products/wafa-a7-gallery/gallery-6-sizechart.jpg",
    ],
    weightGrams: 155,
    // Real PDP copy, read verbatim from halimquran.com 27 Sep 2026.
    description:
      "Pengen baca Al-Qur'an setiap waktu tapi suka repot bawa Al-Qur'annya?? Nyari Al-Qur'an yang ukurannya pas di kantong?? Sepertinya kamu perlu coba Al-Qur'an satu ini, Al-Qur'an Al-Wafa Tsumun Resleting, beratnya hanya 155gr, ringan dibawa ke mana saja, bisa disimpan di saku. Penasaran apa saja keistimewaannya??\n\nSpesifikasi:\n- Ukuran A7 (7 x 10 cm)\n- Kertas QPP 50gr\n- Berat 155gr\n- Tebal 616 halaman\n\nFitur cover:\n- Desain cover casual, kalem, dan hangat.\n- Tersedia dalam 10 pilihan warna.\n- Jahitan super rapi.\n- Zipper kuat dan tahan lama.\n\nMaterial cover:\n- Cover berbahan kulit prada metallic tebal dan dilapisi foil yang memberikan kesan mewah pada tampilan cover.\n- Kepala resleting dibuat dari bahan plastik berkualitas dengan tarikan yang lebih licin dan lancar. Resleting menjadi elastis dan kuat.\n\nMaterial inner:\n- Menggunakan kertas QPP 50gr dengan tingkat kehalusan tinggi, high smoothies dan tahan hingga 100 tahun.\n- Bahan kertas sudah teruji lab dan terbukti halalan thayyiban.\n- Warna kertas yellowish, membuat mata tidak lelah walaupun membaca dalam waktu yang lama.\n\nFitur inner:\n- Rasm Utsmani 15 baris standar Kemenag RI.\n- Dicetak dengan khat yang jelas ditambah bahan kertas dengan daya serap tinta yang baik, sangat nyaman dibaca.\n- Dilengkapi indeks juz yang memudahkan kamu mencari juz atau halaman tertentu.\n- Tanda tajwid berwarna standar Kemenag RI, memudahkan kamu membaca sesuai kaidah yang benar.\n\nCari Al-Qur'an premium, kekinian, terjangkau, dan bergaransi? Halim Qur'an aja.. Yuk check out sekarang!",
    // Curated subset of this product's real Shopee listing reviews (27 Sep
    // 2026) — 2025 total ratings is far more than fits as individual
    // cards, so this is the top ~30 by (has media, then like count).
    // Read via Shopee's own ratings API with the logged-in owner's
    // session, kept verbatim:
    // https://shopee.co.id/AL-QURAN-SAKU-KECIL-AL-WAFA-POCKET-MUSHAF-MINI-UKURAN-A7-RESLETING-i.229472472.27476142936
    reviews: [
      { author: "mini.momo", rating: 5, text: "Kualitas: sangat bagus dan memuaskan. Desain: menarik dan cantik warnanya. Konten: comelnya. Recomend beli di sini dijamin kualitanya \u{2764}\u{FE0F}", date: "20 Mar 2025", variant: "Hijau • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r0-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r0-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r0.mp4" }] },
      { author: "r*****r", rating: 5, text: "Ukuran: pas dan sesuai. Warna: sangat bagus dan sesuai gambar. Kualitas: sangat bagus dan memuaskan. MasyaAllah, Al-Qur'an sampai dengan sangat baik, packingnya sangat rapi, yang datang sesuai ekspektasi. Barakallahufiikum, pihak toko yang amanah, semoga Allah lancarkan rezkinya. Banyak yang suka Al-Qur'annya. InsyaAllah lain kali kami pesan lagi.", date: "08 May 2025", variant: "Hijau • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r1-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r1-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r1.mp4" }] },
      { author: "ozi075", rating: 5, text: "Kualitas: sesuai ekspektasi. Konten: baik. Kegunaan: sangat baik dan bermanfaat. Terimakasih halim Qur'an", date: "05 Mar 2025", variant: "Hijau • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r2-1.jpg" }, { type: "video", src: "/reviews/wafaa7-r2.mp4" }] },
      { author: "a*****i", rating: 5, text: "Ukuran: pas. Warna: cerah. Kualitas: bagus. Masya Allah kualitas Al-Qur'an nya bagus banget. Ukuran pas dan sesuai. Mudah juga buat dibawa ke mana-mana. Warnyanya juga lucu hijau muda. Paketnya pun dikasih tulisan jangan dibanting karena ini Al-Quran. Makasih seller", date: "03 Jan 2026", variant: "Hijau • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r3-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r3-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r3.mp4" }] },
      { author: "afriantipn", rating: 5, text: "Barangnya sudah sampai, kualitas bagus, warna2 alqurannya sukak bgt. Terimakasih seller. Suskes selalu.", date: "20 Apr 2025", variant: "Hijau • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r4-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r4-2.jpg" }] },
      { author: "wardaislamiyah_07", rating: 5, text: "Ukuran: pas. Warna: cantik. Kualitas: baguss. Qur'annya cocok dibawa kemana aja buat traveling, desain simple estetik\u{1F60D}", date: "21 Nov 2025", variant: "Pink • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r5-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r5-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r5.mp4" }] },
      { author: "wiwinusanti", rating: 5, text: "Warna: bagus dan sesuai dengan gambar. Kualitas: baik. Ukuran: pas sesuai dengan diskripsi. Makasih seller dan pak kurir", date: "12 Apr 2025", variant: "Hitam • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r6-1.jpg" }, { type: "video", src: "/reviews/wafaa7-r6.mp4" }] },
      { author: "putrizalita", rating: 5, text: "Kualitas: masyaAllah bagus. Desain: praktis dibawa kemana2. Sayang namanya kurang simetris aja\u{263A}\u{FE0F}", date: "21 Mar 2025", variant: "Biru • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r7-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r7-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r7.mp4" }] },
      { author: "auliaazzahraauliaazzahra", rating: 5, text: "Kualitas: memuaskan. Desain: menarik. Konten: bagus. Masyaallahh sesuai ekspektasi ternyata kecil banget dan mudah dibawa kemana mana, terus bisa custom nama suka bangett makasih banyakkk", date: "22 Mar 2025", variant: "Hijau • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r8-1.jpg" }, { type: "video", src: "/reviews/wafaa7-r8.mp4" }] },
      { author: "v*****3", rating: 5, text: "Warna: bagus. Ukuran: pas dan sesuai. Kualitas: bagus. Alhamdulilah paketnya sudah sampai, sangat aman dan rapih pengemasannya. Nama dan warnanya sesuai pesanan aku. Suka sekali dan puas sekali, terimakassih banyak\u{1F64F}", date: "23 Apr 2025", variant: "Abu abu • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r9-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r9-2.jpg" }] },
      { author: "windyjul008", rating: 5, text: "MasyaAllah Qur'annya bagus sekali lucuu bisa dibawa kemana2, worth it for buy \u{1F60D}\u{1F60D}", date: "11 Mar 2025", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r10-1.jpg" }, { type: "video", src: "/reviews/wafaa7-r10.mp4" }] },
      { author: "x*****w", rating: 5, text: "Ukuran: pas sesuai. Warna: oke. Kualitas: sangat bagus. Alhmdllh kaka paket udah sampe mulus luar dlm, qurannya kecil mudah dibawa kemana2 dan huruf2nya jelas, mudah2an dengan usia diatas 30an ini masih bisa baca sampai kapanpun penglihatanku tetep jelas amin. Buat kakanya makasih semoga diberi rizqi berkah dan sehat selalu amiin", date: "05 May 2025", variant: "Maroon • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r11-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r11-2.jpg" }] },
      { author: "bund4_zhay", rating: 5, text: "Ukuran: pas. Warna: menarik. Kualitas: bagus. Kecil tapi sangat bermanfaat mudah dibawa-bawa taruh dalam tas aman-aman saja tulisannyapun jelas dan menarik, alhamdulilah akhirnya menemukan alquran yg imut tapi sangat berguna", date: "02 Apr 2026", variant: "Hijau • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r12-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r12-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r12.mp4" }] },
      { author: "auliaagriya", rating: 5, text: "Maasyaalloh tabarokalloh bagus sekalii, melebihi ekspektasi aku, pengiriman cuma sehari. Seller ramah dan fast respon, makasih banyak ya ka, semoga lancar dan berkah selalu\u{2665}\u{FE0F}", date: "27 Feb 2025", variant: "Cream • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r13-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r13-2.jpg" }] },
      { author: "murmajannah", rating: 5, text: "Sangat baik bungkusnya juga rapi ga kaleng-kaleng, saya sarankan kalo mau beli Al-Qur'an di toko ini aja dijamin ga akan nyesel", date: "16 Apr 2025", variant: "Hijau • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r14-1.jpg" }, { type: "video", src: "/reviews/wafaa7-r14.mp4" }] },
      { author: "dinniebae", rating: 5, text: "Warna: pink. Kualitas: bagus bangetttt aku sukaaa. Ukuran: kecil tp jelas. Alhamdulillah seneng banget pengiriman cepat pengemasan produk sangat rapi terimakasih kakak semoga bermanfaat dan berkah buat yg jual..", date: "14 Apr 2025", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r15-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r15-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r15.mp4" }] },
      { author: "t*****i", rating: 5, text: "Kualitas: bagus. Desain: bagus. Konten: bagus. Alfurqan kecil bagus desain menarik.. thnkss seller.. Suka banget harga pun terjangkau alhamdulillah selalu amaanah", date: "21 Mar 2025", variant: "Cream • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r16-1.jpg" }, { type: "video", src: "/reviews/wafaa7-r16.mp4" }] },
      { author: "elsashope_13", rating: 5, text: "Ukuran: pas dan sesuai. Warna: saya suka. Kualitas: sangat baik", date: "29 Apr 2025", variant: "Hijau • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r17-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r17-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r17.mp4" }] },
      { author: "is31juscpp", rating: 5, text: "Ukuran: pas. Warna: bagus. Kualitas: memuaskan. Al-Qur'annya cantik dan modern. Warnanya cerah. Cakep banget. Ukuran pas di saku. Harga pas di kantong. Tidak mengecewakan. Puas laaah. Beli 3 pcs warna pink, cokelat, dan abu tua. Memang bagus-bagus warnanya.", date: "17 Nov 2025", variant: "Abu abu • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r18-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r18-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r18.mp4" }] },
      { author: "muawiyahaan", rating: 5, text: "Warna: pink. Ukuran: pas saku. Kualitas: bagus, cantik. Suka sama Al-Qurannya, warna dan nama sesuai pesanan, pokonya suka suka suka, semoga tambah semangat bacanya. Aamiin \u{1F607}\u{1F604}", date: "20 Apr 2025", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r19-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r19-2.jpg" }] },
      { author: "nazoya07", rating: 5, text: "Warna: bagus. Kualitas: baik. Al Qurannya udah datang makasih seller bagus sesuai ekspektasi", date: "12 Apr 2025", variant: "Cream • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r20-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r20-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r20.mp4" }] },
      { author: "a*****5", rating: 5, text: "Ukuran: pas dan sesuai. Warna: warnanya bagus unik. Kualitas: sangat bagus. Pengirimannya cepat, tp sayangnya naro paketnya dilantai teras", date: "08 May 2025", variant: "Abu abu • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r21-1.jpg" }, { type: "video", src: "/reviews/wafaa7-r21.mp4" }] },
      { author: "y*****3", rating: 5, text: "Terimakasih ka paket sudah saya terima \u{1F64F} puas banget Al-Qur'annya bagus dan imut serta bisa diberi nama pemiliknya.", date: "20 Mar 2025", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r22-1.jpg" }] },
      { author: "k*****h", rating: 5, text: "Size benar-benar mini. Enak dimasukin tas dan dibawa kemana saja. Warna pinknya cantik. Dapat harga under 30k.", date: "05 Feb 2026", variant: "Pink • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r23-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r23-2.jpg" }] },
      { author: "hani_2", rating: 5, text: "Warna: cream. Ukuran: mungil. Kualitas: bagus BGT. Gaberenti muji ini lucu dan bagus masyaallah, hurufnya jelas, kecil imut setelapak tangan, seneng bgt belinya \u{1F62D}", date: "21 Feb 2026", variant: "Cream • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r24-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r24-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r24.mp4" }] },
      { author: "i*****k", rating: 5, text: "Ukuran: saya suka karena ukuran mushafnya mini. Kualitas: tulisannya jelas, kertasnya halus. Warna: warna mushaf sesuai dan tampilan menarik. Alhamdulillah pertama kali beli di toko ini, dan mushafnya aku suka...", date: "02 Mar 2026", variant: "Hijau • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r25-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r25-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r25.mp4" }] },
      { author: "a*****a", rating: 5, text: "Ukuran: pas dan sesuai. Warna: sesuai gambar. Kualitas: sangat baik. Warna pinknya gemes banget, mudah dibawa kemana-mana karena ukurannya yang sangat mini, tapi isi Al Qurannya tetap jelas", date: "02 Jan 2026", variant: "Pink • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r26-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r26-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r26.mp4" }] },
      { author: "deisistiqomah_78", rating: 5, text: "Alhamdulillah . . . Mksih kk \u{1F970}\u{1F970}\u{1F970}", date: "27 Mar 2025", variant: "Abu abu • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r27-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r27-2.jpg" }] },
      { author: "astiana895", rating: 5, text: "Kualitas: sangat baik", date: "13 Mar 2025", variant: "Hijau • QURAN + NAMA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r28-1.jpg" }, { type: "video", src: "/reviews/wafaa7-r28.mp4" }] },
      { author: "a*****i", rating: 5, text: "MasyaAllah bagus bangettt\u{1F62D}\u{1F62D}\u{1FAF6}", date: "07 Mar 2025", variant: "Pink • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r29-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r29-2.jpg" }] },
      { author: "sriade0219", rating: 5, text: "Ukuran: pas. Warna: hijau. Sangat sangat baguuuuuuuus, bisa tulis nama alhamdulillah bagus banget persiapan ramadhan hehe. Terima kasih", date: "15 Dec 2025", variant: "Hijau • QURAN + NAMA + BOX", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r30-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r30-2.jpg" }] },
      { author: "danudito", rating: 5, text: "Ukuran: ukuran pas dan pas di kantong Quran nya. Kualitas: kualitas sangat bagus mushafnya keren. Warna: pilihan warna pas sesuai kebutuhan Al Quran nya. Yah semoga berkah jualan Qurannya di bulan Ramadhan dan dapat rezeki juga bagi kami Ammiin", date: "05 Mar 2026", variant: "Hijau • QURAN SAJA", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/wafaa7-r31-1.jpg" }, { type: "image", src: "/reviews/wafaa7-r31-2.jpg" }, { type: "video", src: "/reviews/wafaa7-r31.mp4" }] },
    ],
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
    rating: 5,
    // 572 = 5-star (533) + 4-star (39) ratings on this product's real
    // Shopee listing, out of 578 total — per the project owner's
    // direction, 3/2/1-star ratings (6 total) are treated as 0.
    ratingCount: 572,
    colorVariants: [
      { hex: "#B91C1C", name: "Merah", imageUrl: "/products/mujazza-b7-colors/color-merah.jpg" },
      { hex: "#1E3A5F", name: "Biru", imageUrl: "/products/mujazza-b7-colors/color-biru.jpg" },
    ],
    customNameEligible: true,
    imageUrl: "/products/mushaf-al-quran-al-wafa-b7-mujazza-per-5-juz.jpg",
    // Real PDP gallery (hero shot, detail photos, size-chart graphic),
    // downloaded from this exact product's live halimquran.com PDP 27 Sep
    // 2026 — same pattern as the Wafa B7 template.
    galleryImages: [
      "/products/mujazza-b7-gallery/gallery-1-main.jpg",
      "/products/mujazza-b7-gallery/gallery-2.jpg",
      "/products/mujazza-b7-gallery/gallery-3.jpg",
      "/products/mujazza-b7-gallery/gallery-4.jpg",
      "/products/mujazza-b7-gallery/gallery-5.jpg",
      "/products/mujazza-b7-gallery/gallery-6.jpg",
      "/products/mujazza-b7-gallery/gallery-7-sizechart.jpg",
    ],
    weightGrams: 245,
    // Real PDP copy, read verbatim from halimquran.com 27 Sep 2026.
    description:
      "Pengen baca Al-Qur'an setiap waktu tapi suka repot bawa Al-Qur'annya?? Nyari Al-Qur'an yang ukurannya pas di kantong?? Sepertinya kamu perlu coba Al-Qur'an satu ini, Al-Qur'an Al-Wafa Mujazza, praktis, ringan dibawa ke mana saja, dan bisa disimpan di saku. Penasaran apa saja keistimewaannya??\n\nSpesifikasi Produk:\n- Soft Cover + Box mika\n- Ukuran B7 (9 x 12,5 cm)\n- Kertas QPP 50gr\n- Berat 240gr\n- Tebal 638 halaman\n\nDetail material:\n- Menggunakan kertas QPP 50gr dengan tingkat kehalusan tinggi, high smoothies dan tahan hingga 100 tahun.\n- Bahan kertas sudah teruji lab dan terbukti halalan thayyiban.\n- Warna kertas Yellowish, membuat mata tidak lelah walaupun membaca dalam waktu yang lama.\n- Dilengkapi dompet Al-Qur'an dari mika yang lentur, kuat, dan tahan lama.\n- Rasm Utsmani 15 baris standar Kemenag RI.\n- Dicetak dengan khat yang jelas ditambah bahan kertas dengan daya serap tinta yang baik, sangat nyaman dibaca.\n- Dilengkapi indeks juz yang memudahkan kamu mencari juz atau halaman tertentu.\n- Terdapat pewarnaan kata ganti Allah dan -Nya yang memudahkan kamu menemukan ayat-ayat pilihan.\n\nCari Al-Qur'an premium, kekinian, terjangkau, dan bergaransi? Halim Qur'an aja.. Yuk check out sekarang!",
    // Curated subset of this product's real Shopee listing reviews (27 Sep
    // 2026) — top ~28 by (has media, then like count) out of 578 total
    // ratings. Read via Shopee's own ratings API with the logged-in
    // owner's session, kept verbatim:
    // https://shopee.co.id/Halim-Qur'an-MUSHAF-AL-QUR'AN-AL-WAFA-PER-5-JUZ-MUJAZZA'-CUKUP-DI-SAKU-i.229472472.7417574895
    reviews: [
      { author: "0cf5whdrvs", rating: 5, text: "Kemudahan: bagus. Keterbacaan: jelas. Kualitas: mantap oke lah. Pengiriman cepet banget recomended si\u{1F44F}", date: "07 Mar 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r0-1.jpg" }, { type: "video", src: "/reviews/mujazza-r0.mp4" }] },
      { author: "zian_jaelani", rating: 5, text: "Kualitas: bagus. Kegunaan: meringankan hafalan. Alhamdulillah paketnya sampe sesuai pesanan dan harapan, semoga bermanfaat bisa meringankan hafalan anak saya di pondok. Bagus Al-Qurannya", date: "01 Jan 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r1-1.jpg" }, { type: "image", src: "/reviews/mujazza-r1-2.jpg" }] },
      { author: "abdoelrani2611", rating: 5, text: "Keterbacaan: tulisan jelas. Kemudahan: sangat praktis. Kualitas: sangat baik. Rupanya saya sudah 2 kali belanja di toko ini.. baru tau saya lihat Al Qur'an kecil di rumah sama mereknya", date: "02 Apr 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r2-1.jpg" }, { type: "image", src: "/reviews/mujazza-r2-2.jpg" }, { type: "video", src: "/reviews/mujazza-r2.mp4" }] },
      { author: "l*****n", rating: 5, text: "Kemudahan: khat jelas versi Utsmani yg familiar di Indonesia. Kualitas: bagus. Rekomended tuk yg mau menghafal Quran", date: "26 Feb 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r3-1.jpg" }, { type: "image", src: "/reviews/mujazza-r3-2.jpg" }] },
      { author: "rifqilmujahid", rating: 5, text: "Ketebalan: bagus banget. Kemudahan: mudah dibawa ke mana-mana. Kualitas: kualitasnya bagus sekali", date: "22 Jun 2026", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r4-1.jpg" }, { type: "video", src: "/reviews/mujazza-r4.mp4" }] },
      { author: "miftah.ulie", rating: 5, text: "Kemudahan: Quran lama dari model resleting. Keterbacaan: dipecah jadi per 5 juz. Kualitas: tempel pakai selotip aja. Akhirnya ilang kena banjir, beli baru", date: "13 Mar 2025", reviewSource: "Shopee", media: [{ type: "video", src: "/reviews/mujazza-r5.mp4" }] },
      { author: "ahmadroziqinahmadroziqin", rating: 5, text: "Kemudahan: praktis. Kualitas: kualitas bagus. Bisa dipesan lagi lain waktu dengan skala yg lebih banyak lagi", date: "04 Feb 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r6-1.jpg" }] },
      { author: "jaydul432", rating: 5, text: "Konten: baik. Kegunaan: mengaji. Keaslian: asli. Pengemasan sangat rapi. Pengiriman cepat. Al Qurannya tulisan jelas, bagus, rapi. Bapak kurir mengantar paket sesuai dengan alamat, ramah. Terimakasih", date: "24 Dec 2024", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r7-1.jpg" }, { type: "video", src: "/reviews/mujazza-r7.mp4" }] },
      { author: "naila010800", rating: 5, text: "Kemudahan: sangat praktis dibawa kemana-mana. Kualitas: bagus tulisannya juga jelas", date: "19 Apr 2026", variant: "Merah", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r8-1.jpg" }] },
      { author: "ranywati772", rating: 5, text: "Kualitas: cetakan bagus. Konten: bagus. Kegunaan: membaca lebih simpel praktis bisa dibawa kemana-mana makasih seller udah amanah moga berkah", date: "12 Jan 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r9-1.jpg" }] },
      { author: "e*****h", rating: 5, text: "Keterbacaan: jelas. Kemudahan: mudah. Kualitas: baik. Tulisannya jelas, praktis,", date: "10 Jan 2026", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r10-1.jpg" }, { type: "image", src: "/reviews/mujazza-r10-2.jpg" }] },
      { author: "wiwilastiawati", rating: 5, text: "Keterbacaan: tulisan jelas mudah untuk dibaca. Kemudahan: sangat praktis. Kualitas: memiliki detail yang jelas dan tajam. Maaf baru kasih ulasan, paket sudah diterima kemarin, Al-Qur'annya bagus kecil praktis bisa dibawa kemana-mana", date: "05 Sep 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r11-1.jpg" }, { type: "image", src: "/reviews/mujazza-r11-2.jpg" }] },
      { author: "dewiramdaniyah", rating: 5, text: "Keterbacaan: tulisannya jelas. Kemudahan: sangat praktis. Kualitas: memiliki detail yang bagus dan tajam. Alhamdulillah sampai pesanannya, sesuai sama yang di gambar. Keterbacaannya tulisan sangat jelas. Kemudahan praktis dibawa kemana-mana cocok untuk anak pondok. Kualitasnya memiliki detail yg bagus dan tajam", date: "03 Jul 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r12-1.jpg" }] },
      { author: "el_manar", rating: 5, text: "Ketebalan: Alhamdulillah ukuran & ketebalannya nyaman untuk dibawa sehari-hari. Kemudahan: Alhamdulillah sangat memudahkan untuk selalu dibaca. Kualitas: Alhamdulillah kualitas baik, kemasannya juga rapi. Silahkan pesan Al-Qur'an saku agar bisa selalu baca Alquran dimanapun", date: "28 May 2026", variant: "Merah", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r13-1.jpg" }, { type: "video", src: "/reviews/mujazza-r13.mp4" }] },
      { author: "7*****4", rating: 5, text: "Keterbacaan: jelas enak dibaca. Kemudahan: praktis simple. Kualitas: bagus sesuai", date: "09 Oct 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r14-1.jpg" }, { type: "image", src: "/reviews/mujazza-r14-2.jpg" }, { type: "video", src: "/reviews/mujazza-r14.mp4" }] },
      { author: "iismustakimah26", rating: 5, text: "Kemudahan: sangat praktis. Keterbacaan: tulisan sangat jelas. Kualitas: baik. Alhamdulilah pesanan sudah sampai, amanah tokonya, bagus Al Qurannya, terimakasih reseller lancar terus usahanya", date: "07 Mar 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r15-1.jpg" }, { type: "image", src: "/reviews/mujazza-r15-2.jpg" }] },
      { author: "n*****a", rating: 5, text: "Bagus banget Al Qur'annya, pengiriman juga cepet dan aman poll. Thank you seller", date: "13 Feb 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r16-1.jpg" }] },
      { author: "bang_raul", rating: 5, text: "Kemudahan: sangat simple. Kualitas: bagus. Konten: Quran per 5 juz. Bagus ringkas cepat sampai", date: "28 Feb 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r17-1.jpg" }] },
      { author: "s*****0", rating: 5, text: "Akhirnya sampai juga. Pengiriman lumayan lama, tapi gapapa karena ga buru-buru pakainya. Khatnya enak dibaca, lihatnya kayak Quran Madinah. Ga bikin pusing tulisannya. Perpaduan warna kertas sama warna tampilan isinya bikin nyaman buat dibaca. Jazaakumullaahu khairan kak seller", date: "13 Sep 2026", variant: "Merah", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r18-1.jpg" }, { type: "image", src: "/reviews/mujazza-r18-2.jpg" }] },
      { author: "i*****m", rating: 5, text: "Kemudahan: bagus banget suka bangettt semoga barokah. Kualitas: warnanya juga sesuai, makasii", date: "21 Apr 2026", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r19-1.jpg" }] },
      { author: "dcyh6a4a_v", rating: 5, text: "Keterbacaan: kebaca. Kemudahan: simpel. Kualitas: bagus. Cuma kekecilan", date: "22 Jan 2026", variant: "Merah", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r20-1.jpg" }, { type: "video", src: "/reviews/mujazza-r20.mp4" }] },
      { author: "atyrfauno3", rating: 5, text: "Kegunaan: untuk mengaji tiap hari. Keaslian: bagus", date: "20 Nov 2024", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r21-1.jpg" }, { type: "image", src: "/reviews/mujazza-r21-2.jpg" }] },
      { author: "c*****m", rating: 5, text: "Barang udah sampe...paket sesuai...pas di saku kerja... Recomended...", date: "07 Mar 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r22-1.jpg" }, { type: "image", src: "/reviews/mujazza-r22-2.jpg" }] },
      { author: "i*****s", rating: 5, text: "Keterbacaan: tulisan jelas dan mudah dibaca. Kemudahan: sangat praktis. Kualitas: bagus sekali", date: "21 Mar 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r23-1.jpg" }, { type: "video", src: "/reviews/mujazza-r23.mp4" }] },
      { author: "ikaafiatussoleha", rating: 5, text: "Keterbacaan: tulisannya jelas. Bagus barangnya, tidak mengecewakan meskipun harganya murah", date: "15 Jan 2026", variant: "Biru", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r24-1.jpg" }] },
      { author: "riddo21", rating: 5, text: "Alhamdulillah bagus", date: "14 Mar 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r25-1.jpg" }] },
      { author: "nabyla00", rating: 5, text: "Pengemasan rapi banget", date: "21 Feb 2025", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r26-1.jpg" }] },
      { author: "nor_hasanah17", rating: 5, text: "Ketebalan: pas. Kemudahan: mudah dibawa. Kualitas: bagus", date: "15 May 2026", variant: "Merah", reviewSource: "Shopee", media: [{ type: "image", src: "/reviews/mujazza-r27-1.jpg" }, { type: "image", src: "/reviews/mujazza-r27-2.jpg" }] },
    ],
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
