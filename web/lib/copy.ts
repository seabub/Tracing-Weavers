/**
 * Copy in two languages, one place.
 *
 * Rewritten against the Ogilvy principles (skill: ogilvy-copywriting).
 * What changed and why:
 *  · one promise per surface, stated in plain words: "kain ini punya nama"
 *  · facts instead of praise: eleven minggu, tiga kali celup, dua tangan
 *  · the reader is spoken to, not briefed: second person, short sentences
 *  · nothing explains the machinery to a visitor before it earns it
 *
 * The design system's rule still holds: Indonesian first, English gloss only
 * where a visitor who does not read Indonesian needs the word, eyebrows
 * uppercase and letterspaced, headlines in sentence case.
 */

export const t = {
    /* shell */
    readTag: "Tempel tag",
    readTagEn: "Read a tag",
    myPassports: "Paspor saya",
    openPassport: "Lihat paspor saya",
    signIn: "Masuk",
    brandLine: "Benih ke Tenun",

    /* home — the promise, then the news, then the action */
    homeEyebrow: "Digital Product Passport · Benih ke Tenun",
    homeTitleA: "Kain ini",
    homeTitleB: "punya nama",
    homeLead:
        "Mama Ina Dida menenumnya sebelas minggu di Adonara. Tempelkan ponsel ke tag, dan akte lahir kainnya terbaca.",
    recordsEyebrow: "Jejak kain",
    recordsTitle: "Satu kain. Satu nama.",
    recordsCount: "jejak",
    tagsCount: "tag",

    /* what it is / is not — the trust block, one line each */
    beforeEyebrow: "Sebelum mengklaim",
    beforeTitle: "Akte lahir kain, bukan token.",
    explain: [
        {
            title: "Yang kamu klaim",
            body: "Satu kain, satu halaman: siapa penenunnya, dari apa bahannya, berapa lama dikerjakan.",
        },
        {
            title: "Kenapa ada",
            body: "Nama penenun jarang tercatat. Halaman ini menuliskannya.",
        },
        {
            title: "Yang kamu dapat",
            body: "Nomor id, halaman yang bisa diperiksa siapa saja, tempat di koleksimu.",
        },
        {
            title: "Yang bukan",
            body: "Bukan kepemilikan kain, bukan token, bukan investasi. Tanpa dompet kripto.",
        },
    ],

    /* the seven steps of the programme (uppercase, per the design system) */
    journeyEyebrow: "Yang diikuti jejaknya",
    journeyTitle: "Benih ke tenun, lalu sesudahnya.",
    journeyLead:
        "Tiga tahun, tujuh tahap, tiga kabupaten. Tiap tahap berdiri di atas yang sebelumnya.",
    steps: [
        { id: "Seed", id_label: "Benih", label: "Seed", note: "Kapas ditanam di kebun rakyat" },
        { id: "Loom", id_label: "Tenun", label: "Loom", note: "Ditenun, satu helai satu penenun" },
        { id: "Trace", id_label: "Jejak", label: "Trace", note: "Tag ditulis, jejak menempel" },
        { id: "Teach", id_label: "Ajar", label: "Teach", note: "Motif didokumentasikan untuk kurikulum" },
        { id: "Regenerate", id_label: "Tumbuh", label: "Regenerate", note: "Kebun dan alat dipulihkan" },
        { id: "Hub", id_label: "Hub", label: "Hub", note: "Dijual lewat Local Impact Hub" },
        { id: "Flourish", id_label: "Mekar", label: "Flourish", note: "Nilainya kembali ke rumah penenun" },
    ],

    /* wardrobe of natural dyes — the brand's reserved data palette */
    dyeEyebrow: "Pewarna alami",
    dyeLead: "Empat warna, semuanya dari dapur pewarna penenun.",

    /* record page */
    backToRecords: "Semua jejak",
    recordEyebrow: "Jejak kain",
    supplyUnique: "satu-satunya",
    supplyShared: "hingga {n} pemegang",
    issued: "Sudah terbit",
    remaining: "Masih tersedia",
    tagRead: "Tag terbaca",
    fieldMaker: "Penenun · Maker",
    fieldOrigin: "Asal · Origin",
    fieldMaterial: "Bahan · Material",
    fieldTechnique: "Teknik · Technique",
    fieldDye: "Pewarna · Dye",
    fieldWeeks: "Lama di alat tenun · Weeks",
    fieldBaths: "Kali celup · Dye baths",
    fieldStep: "Tahap · Step",
    traitsEyebrow: "Catatan kain · Traits",
    yourPassport: "Paspor kamu",

    /* claim */
    claimEyebrow: "Klaim jejak ini",
    claimTitle: "Taruh namamu di jejak ini.",
    claimLead: "Cukup nama dan email. Tanpa dompet, tanpa kata sandi.",
    claimName: "Nama lengkap",
    claimEmail: "Email",
    claimOutlet: "Lembaga · opsional",
    claimButton: "Klaim jejak ini",
    claimBusy: "Menerbitkan paspor…",
    claimSoldOut: "Semua paspor sudah terbit",
    claimOnePerCloth: "Satu klaim per kain",
    claimFine: "Kain dan motifnya tetap milik penenun dan komunitasnya.",
    claimedEyebrow: "Terbit",
    claimedHolder: "Dipegang oleh",
    claimedWovenBy: "Ditenun oleh",
    claimedIssued: "Diterbitkan",
    claimedNote:
        "Jejaknya ikut bersama kain, termasuk saat berpindah tangan. Tiap penjualan kembali ke rumah yang menenumnya.",
    viewPassport: "Lihat paspor",
    stayHere: "Tetap di jejak ini",

    /* collection / verify / login */
    collectionEyebrow: "Paspor saya",
    collectionTitle: "Tersimpan atas namamu",
    collectionEmpty: "Belum ada paspor di sini",
    collectionEmptyNote:
        "Terbitkan satu, tempatnya sudah menunggu. Dari perangkat lain, masuk dengan email yang sama.",
    collectionSignInNote:
        "Masuk dengan email yang kamu pakai saat mengklaim, dan paspornya muncul di sini.",
    signInEyebrow: "Masuk",
    signInTitle: "Tanpa dompet. Tanpa kata sandi.",
    signInLead: "Pakai email yang sama seperti saat kamu mengklaim.",
    signInButton: "Buka paspor saya",
    verifyEyebrow: "Periksa paspor",
    verifyStored: "Terverifikasi di daftar",
    verifySignature: "Terverifikasi dari tanda tangan",
    verifyMissing: "Tidak ada paspor dengan id ini.",
    verifyMissingNote:
        "Periksa lagi karakternya, atau tempel tag sekali lagi. Bentuk paspor seperti",
    verifyProves: "Yang dibuktikan halaman ini",

    /* scan */
    scanEyebrow: "Membaca tag",
    scanTitleA: "Tempelkan ponsel",
    scanTitleB: "ke tepi kain.",
    scanLead: "tag terdaftar. Satu tag, satu kain.",
} as const;