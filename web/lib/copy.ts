/**
 * Copy in two languages, one place.
 *
 * The design system's rule: Indonesian terms stay in Indonesian with a light
 * gloss, eyebrows are uppercase and letterspaced, headlines are sentence case.
 * So the shell speaks Indonesian first and glosses in English where a visitor
 * who does not read Indonesian still needs the word.
 */

export const t = {
    /* shell */
    readTag: "Tempel tag",
    readTagEn: "Read a tag",
    myPassports: "Paspor saya",
    openPassport: "Buka paspor saya",
    signIn: "Masuk",
    brandLine: "Benih ke Tenun",

    /* home */
    homeEyebrow: "Digital Product Passport · Benih ke Tenun",
    homeTitleA: "Baca jejak",
    homeTitleB: "satu kain",
    homeLead:
        "Setiap helai kain menyimpan jejak tangan yang menenumnya. Tempelkan ponsel ke tag di tepi kain, atau pindai kode di kemasan, untuk membaca dari mana asalnya — lalu simpan jejaknya sebagai paspor milikmu.",
    recordsEyebrow: "Jejak kain",
    recordsTitle: "Satu kain. Satu jejak.",
    recordsCount: "jejak",
    tagsCount: "tag",

    /* what it is / is not */
    beforeEyebrow: "Sebelum mengklaim",
    beforeTitle: "Paspor ini bukan token.",
    explain: [
        {
            title: "Yang kamu klaim",
            body: "Paspor untuk satu kain: dari mana bahannya, tangan siapa yang menenumnya, berapa lama di alat tenun, dan apa yang penenun izinkan untuk diceritakan tentang motifnya.",
        },
        {
            title: "Kenapa ada",
            body: "Pengetahuan penenun jarang dicatat namanya, apalagi dibayar. Jejak membuat penenun terlihat dan tetap terikat pada karyanya.",
        },
        {
            title: "Yang kamu dapat",
            body: "Paspor itu milikmu: halaman yang bisa diperiksa siapa saja, satu nomor id, dan tempatnya di koleksimu. Jejaknya tetap menempel pada kain, termasuk kalau kainnya berpindah tangan.",
        },
        {
            title: "Yang bukan",
            body: "Bukan kepemilikan atas kain. Bukan token untuk diperdagangkan, bukan investasi, bukan kuitansi donasi. Tidak ada dompet kripto, tidak ada gas, tidak ada akun yang harus dibuat.",
        },
    ],

    /* the seven steps of the programme (uppercase, per the design system) */
    journeyEyebrow: "Yang diikuti jejaknya",
    journeyTitle: "Benih ke tenun, lalu sesudahnya.",
    journeyLead:
        "Tujuh tahap, tiga tahun, di Adonara, Lembata dan Manggarai. Tiap tahap hanya berdiri kalau tahap sebelumnya sudah ada.",
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
    dyeLead:
        "Warna di halaman ini datang dari pewarna yang dipakai penenun, bukan dari palet digital.",

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
    claimLead:
        "Tidak perlu dompet, tidak perlu kata sandi. Nama dan email sudah cukup untuk menerbitkan paspor.",
    claimName: "Nama lengkap",
    claimEmail: "Email",
    claimOutlet: "Lembaga · opsional",
    claimButton: "Klaim jejak ini",
    claimBusy: "Menerbitkan paspor…",
    claimSoldOut: "Semua paspor sudah terbit",
    claimOnePerCloth: "Satu klaim per kain",
    claimFine:
        "Ini bukan kepemilikan atas kain, dan bukan investasi. Jejaknya menempel pada kain; kain dan motifnya tetap milik penenun dan komunitasnya.",
    claimedEyebrow: "Terbit",
    claimedHolder: "Dipegang oleh",
    claimedWovenBy: "Ditenun oleh",
    claimedIssued: "Diterbitkan",
    claimedNote:
        "Jejaknya ikut bersama kain, termasuk saat kain berpindah tangan. Nilai dari setiap penjualan kembali ke rumah yang menenumnya.",
    viewPassport: "Lihat paspor",
    stayHere: "Tetap di jejak ini",

    /* collection / verify / login */
    collectionEyebrow: "Paspor saya",
    collectionTitle: "Tersimpan atas namamu",
    collectionEmpty: "Belum ada apa-apa",
    collectionEmptyNote:
        "Baru saja mengklaim? Paspor muncul di sini seketika. Kalau kamu mengklaimnya dari perangkat lain, penyimpanan perlu disiapkan agar paspornya mengikutimu.",
    collectionSignInNote:
        "Masuk dengan email yang kamu pakai saat mengklaim, paspornya akan tampil di sini.",
    signInEyebrow: "Masuk",
    signInTitle: "Tanpa dompet. Tanpa kata sandi.",
    signInLead:
        "Nama dan email sudah cukup untuk sebuah paspor. Pakai email yang sama seperti saat mengklaim.",
    signInButton: "Buka paspor saya",
    verifyEyebrow: "Periksa paspor",
    verifyStored: "Terverifikasi di daftar",
    verifySignature: "Terverifikasi dari tanda tangan",
    verifyMissing: "Tidak ada paspor dengan id ini.",
    verifyMissingNote:
        "Periksa lagi karakternya, atau buka jejak kainnya dan tempel tag sekali lagi. Bentuk paspor seperti",
    verifyProves: "Yang dibuktikan halaman ini",

    /* scan */
    scanEyebrow: "Membaca tag",
    scanTitleA: "Tempelkan ponsel",
    scanTitleB: "ke tepi kain.",
    scanLead: "tag terdaftar. Tiap tag membuka jejak satu kain — hanya yang itu.",
} as const;