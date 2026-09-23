/**
 * Every word a visitor reads, in one place.
 *
 * Written against the Ogilvy principles (skill: ogilvy-copywriting), in ENGLISH:
 * the interface speaks English and the craft keeps its own words as a gloss
 * (tenun, ikat, mengkudu). Proper nouns stay as they are — a weaver's name is
 * not translated.
 *
 * The rules the copy is held to:
 *  · one promise per surface, in plain words: "this cloth has a name"
 *  · the framing said out loud: a birth record for the cloth
 *  · facts instead of praise: eleven weeks, three dye baths, three districts
 *  · short sentences, one idea each
 *  · nothing explains the machinery to a visitor before it earns it
 */

export const t = {
    /* shell */
    readTag: "Tap a tag",
    readTagEn: "Read a tag",
    myPassports: "My passport",
    openPassport: "Open my passport",
    signIn: "Sign in",
    brandLine: "Seed to Loom",

    /* home — the promise, then the news, then the action */
    homeEyebrow: "Digital Product Passport · Seed to Loom",
    homeTitleA: "This cloth",
    homeTitleB: "has a name",
    homeLead:
        "Mama Ina Dida wove it for eleven weeks in Adonara. Hold your phone to the tag, and its birth record comes up.",
    recordsEyebrow: "Cloth records",
    recordsTitle: "One cloth. One name.",
    recordsCount: "records",
    tagsCount: "tags",

    /* what it is / is not — the trust block, one line each */
    beforeEyebrow: "Before you claim",
    beforeTitle: "A birth record, not a token.",
    explain: [
        {
            title: "What you claim",
            body: "One cloth, one page: who wove it, what from, how long it took.",
        },
        {
            title: "Why it exists",
            body: "Weavers' names are rarely recorded. This page writes it down.",
        },
        {
            title: "What you get",
            body: "An id, a page anyone can check, and a place in your collection.",
        },
        {
            title: "What it is not",
            body: "Not ownership of the cloth, not a token, not an investment. No crypto wallet.",
        },
    ],

        /* The seven stages of the programme. `id_label` is what is shown, and `id` is
       the key that a record's "Journey step" attribute matches on (see
       components/journey-strip.tsx). */
    journeyEyebrow: "What the record follows",
    journeyTitle: "Seed to loom, and after.",
    journeyLead:
        "Three years, seven stages, three districts. Each stage stands on the one before it.",
    steps: [
                { id: "Seed", id_label: "Seed", note: "Cotton planted in community gardens" },
        { id: "Loom", id_label: "Loom", note: "Woven, one length by one weaver" },
        { id: "Trace", id_label: "Trace", note: "The tag is written, the record sticks" },
        { id: "Teach", id_label: "Teach", note: "Motifs documented for the curriculum" },
        { id: "Regenerate", id_label: "Regenerate", note: "Gardens and tools restored" },
        { id: "Hub", id_label: "Hub", note: "Sold through the Local Impact Hub" },
        { id: "Flourish", id_label: "Flourish", note: "Value returns to the weaver's household" },
    ],

    /* the natural dyes — the brand's reserved data palette */
    dyeEyebrow: "Natural dyes",
    dyeLead: "Four colours, all of them from the weavers' dye pots.",

    /* record page */
    backToRecords: "All records",
    recordEyebrow: "Cloth record",
    supplyUnique: "the only one",
    supplyShared: "up to {n} holders",
    issued: "Issued",
    remaining: "Still available",
    tagRead: "Tag read",
    fieldOrigin: "Origin",
    fieldMaterial: "Material",
    fieldTechnique: "Technique",
    fieldDye: "Dye",
    fieldWeeks: "Weeks on the loom",
    fieldBaths: "Dye baths",
    fieldStep: "Journey stage",
    traitsEyebrow: "Cloth notes",
    yourPassport: "Your passport",

    /* claim */
    claimEyebrow: "Claim this record",
    claimTitle: "Put your name on this record.",
    claimLead: "A name and an email is all it takes. No wallet, no password.",
    claimName: "Full name",
    claimEmail: "Email",
    claimOutlet: "Organisation · optional",
    claimButton: "Claim this record",
    claimBusy: "Issuing the passport…",
    claimSoldOut: "All passports issued",
    claimOnePerCloth: "One claim per cloth",
    claimFine: "The cloth and its motifs stay with the weaver and their community.",
    claimedEyebrow: "Issued",
    claimedHolder: "Held by",
    claimedWovenBy: "Woven by",
    claimedIssued: "Issued on",
    claimedNote:
        "The record travels with the cloth, including when it changes hands. Every resale returns value to the household that wove it.",
    viewPassport: "View the passport",
    stayHere: "Stay on this record",

    /* collection / verify / login */
    collectionEyebrow: "My passport",
    collectionTitle: "Kept under your name",
    collectionEmpty: "No passports here yet",
    collectionEmptyNote:
        "Issue one and its place is already waiting. A passport claimed on another device arrives once you open its verification link and save it.",
    collectionSignInNote:
        "Sign in with the email you claimed with, so your name is filled in next time.",
    signInEyebrow: "Sign in",
    signInTitle: "No wallet. No password.",
    signInLead: "Use the same email you claimed with.",
    signInButton: "Open my passport",
    verifyEyebrow: "Passport check",
    verifyStored: "Verified against the register",
    verifySignature: "Verified by signature",
    verifyProves: "What this page proves",

    /* scan */
    scanEyebrow: "Reading a tag",
    scanTitleA: "Hold your phone",
    scanTitleB: "to the edge of the cloth.",
    scanLead: "registered tags. One tag, one cloth.",
} as const;