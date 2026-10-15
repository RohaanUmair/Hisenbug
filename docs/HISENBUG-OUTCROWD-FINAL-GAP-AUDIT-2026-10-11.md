# HisenBug vs Outcrowd — final copyright, design, trademark and legal-risk gap audit

| | |
| --- | --- |
| Date of inspection | 2026-10-11, about 02:00–03:30 PKT (2026-10-10, 21:00–22:30 UTC) |
| Repository | Branch `ip-remediation`, HEAD `d719d546aa9124267be59006576048177257672f` (tags `final-fixes`, `licensing-audit-baseline`), with uncommitted changes from the licensing stage (section M) |
| Original site | https://www.outcrowd.io/ — rendered live on 2026-10-11, plus the archive fetched 2026-10-08 |
| Nature | Read-only technical and legal-risk research. **Not legal advice, not a clearance opinion.** No website file was changed. |
| Private evidence | `audit/final-gap-audit-2026-10-11/` (git-ignored). This report summarises it and doesn't reproduce private ownership evidence. |

Risk scale: CRITICAL / HIGH / MEDIUM / LOW / NO IDENTIFIED ISSUE / UNKNOWN. Confidence: High / Medium / Low.
No lawsuit probabilities or "safe similarity" percentages are given; there is no reliable basis for them.

---

## REPORT A — Executive summary

**Resolved, with fresh evidence.** Every item the October 9 audit called the strongest copyright or claims
problem is absent from the current code:
- **Hero widgets** (stacked-bar card with 562/286, growth card, pulse disc, chips): the components and their
  width slots are gone; no 562, 346 or 412+ in `src/`.
- **Outcrowd's FAQ:** 9 new questions; no shared 4- or 6-word sequence with the original homepage.
- **Fundraising and "$100M+" claims:** gone, along with the "10x" and "85%" stats.
- **Exact Outcrowd accent colours** (`#774dff`, `#fe4a23`): gone from the showreel canvas.
- **Code copies:** the "explode" button, the spotlight CSS and the original class-name comments are gone.
- **Third-party notices** are complete.

No original SVG, Lottie, raster, font, script, domain or tracking ID ships.

**Unresolved.**
- **Combined look and feel.** For the first time, outcrowd.io was rendered live at all five widths, and the
  side-by-side comparison shows the overall commercial impression is still close to the original:
  - the same centred pill nav, which holds the same two buttons ("Book a call" grey, "Contact" orange) and
    collapses to almost the same width (Outcrowd 590→346 px, HisenBug 613→341 px at 1440);
  - the same violet floating "Book a call" pill, 198×68 px in both;
  - the same hero-with-floating-cards-around-a-laptop-showreel composition;
  - the same staggered services masonry, recognition-style rows, centred FAQ, two-button CTA card and
    footer arrangement;
  - largely the same section order.
- **Measurement fingerprint:** 40 distinct high-precision values (55 occurrences), all present in
  Outcrowd's stylesheet.
- **One complete style rule:** the cookie card.
- **Several interaction specifications.**

All of this is strong **evidence of copying**. Whether it infringes an **enforceable right** is a separate,
open legal question (sections G and J).

**New or newly material findings (Report C).**
1. **`automation.webp`.** The owner's statement on 2026-10-11 says it was generated with ChatGPT using
   reference images taken from Outcrowd's website, with no permission for those images. Earlier audits rated
   this media item LOW. No near-duplicate of the archived Outcrowd artwork was found, but which images were
   uploaded is unknown. The risk cannot be closed without the uploaded images, the prompt and the output
   record.
2. **Mock figures in the Services illustrations.** "48.2k monthly users", "+18% retention", "99.98% uptime",
   "✓ 128 tests" and "✓ lighthouse 100" are **still rendered**. They were flagged on October 9 and 10, but the
   licensing-stage reports did not carry them forward.
3. **Identical nav button pair and floating-pill size**, confirmed from the live render.
4. **UK cookie law changed on 5 February 2026** (Data (Use and Access) Act 2025). This alters the earlier
   analysis of the preloader's session flag, and it raises the PECR penalty ceiling.
5. **The live hisenbug.com** is a different Vercel-hosted site that isn't in the connected Vercel account.
   Who hosts it, and whether preview deployments of this cloned build ever existed, can't be checked from
   here.
6. **An unmentioned `master` branch** holds only the template commit. The cloning stage (2–9 October) was
   never committed.

**Weak or unsupported claims still on the page:**
- the Services mock figures;
- "pick up every call";
- "react instantly";
- "fast, efficient";
- the "Forecasting" capability;
- the Founders note's delivered-outcome claim ("The outcome is less manual effort and lower costs");
- "Live with customers" / "In use with customers" (confirmed by the owner, but there is no supporting
  document);
- the cookie text, which asks consent for analytics and outreach the site doesn't do.

**Missing evidence:**
- No official trademark or design register could be searched automatically. The USPTO uses an AWS WAF
  challenge; UK IPO and UK designs use a CAPTCHA; WIPO Brand DB uses an ALTCHA CAPTCHA; IP Australia returned
  HTTP 403; IPO-Pakistan's search host timed out; UAE needs a login and a fee. All of these are **NOT
  VERIFIED**.
- The US Copyright Office public records *were* searched: no registration in Outcrowd Inc.'s name, and none
  for HisenBug.
- Outcrowd's authorship chain, its customer recognition, the AI-image inputs, and the hosting of hisenbug.com
  and the demo are unknown.

**Do material legal-risk concerns remain?** Yes:
- `automation.webp` (copyright, unknown reference inputs; MEDIUM, low confidence);
- the overall get-up, trade dress or passing off (MEDIUM, low confidence);
- the layout as an artistic work under UK, EU or Australian-style tests (MEDIUM in aggregate, low
  confidence);
- unsubstantiated performance figures in the Services art (MEDIUM);
- the inaccurate cookie and privacy statements (LOW–MEDIUM);
- your own name, which is uncleared (UNKNOWN).

None of these is a finding of infringement; several need specialist legal judgement. **The site is not
legally cleared.**

---

## REPORT B — Previous findings reconciliation

Sources reconciled:
- October 9 forensic audit: LAY, COL, TYP, CMP, TXT, IMG, MED, COD, META, BR, MIS, C, T, S and P items.
- Phase 1 report (October 9).
- Phase 2B record.
- Phase 2C content audit and wording proposal (October 10).
- Remaining content audit (October 10).
- October 10 source-code and licensing audit (CC, D and E items; delivered in chat, its draft file was
  removed at the owner's request).
- Licensing remediation stage report (`docs/LICENSING-REMEDIATION-STAGE-2026-10-10.md`).
- Media provenance register.

"Latest evidence" is fresh from this inspection unless it names a commit.

### B.1 Copyright, design and code (October 9 IDs)

| Finding ID | October 9 status | Latest evidence | Current status | Confidence | Action |
| --- | --- | --- | --- | --- | --- |
| IMG-01 / C-1 / S-1 / P0-1 | HIGH: hero bar card, values 562/286 | `HeroArt.jsx` has no BarsCard, GrowthCard, ApprovedChip, StatChip or Sparkle (grep count 0). "562": 0 hits in `src/`. The only "286" is a path coordinate (`CtaArt.jsx:34`). Replaced in `6480ed2`. | VERIFIED RESOLVED | High | None. Old version kept in tag `pre-remediation-2026-10-09` as evidence. |
| IMG-02 / C-2 / P0-2 | MEDIUM: growth card + pulse disc | 346/412/380 absent; components gone (`6480ed2`) | VERIFIED RESOLVED | High | None |
| IMG-03 | LOW–MEDIUM: chips in the original's width slots | Slot widths `10.4861vw`, `11.9444vw`, `4.6116vw` absent (count M3) | VERIFIED RESOLVED | High | None |
| IMG-04 / C-8 | LOW: CTA dashboard concept | New order-flow art; no "Series A" / "$128,420"; comment naming `dashboard-cta.svg` gone. An illustration still sits in the same CTA slot (LAY-10). | VERIFIED RESOLVED (art) | High | None |
| IMG-05–08, 10, 11 | No issue | Unchanged files; logo, OG, icons, sound unchanged since October 9 | NO IDENTIFIED ISSUE (rechecked) | High | None |
| IMG-09 | No raster duplicates | All 12 rasters unchanged since `a27e909` (hashes in the media register). New: `automation.webp` checked against 399 images embedded in Outcrowd's Lottie files; nearest dHash distance 93/256, which is unrelated. | NO IDENTIFIED ISSUE for duplicates. See N-1. | Medium | See N-1 |
| MED-01 / S-12 | LOW (Unverified): own media provenance | Owner statement 2026-10-11: `automation.webp` was generated with ChatGPT from Outcrowd reference images | SUPERSEDED BY NEW EVIDENCE | High (that the statement exists) | N-1 |
| TXT-01 / C-3 / P0-3 / MIS-02 | MEDIUM: FAQ paraphrase | `bdec1b2`: 9 HisenBug questions. Text similarity vs original homepage: max sentence ratio 0.57 (short generic question forms), no shared 4- or 6-word sequences. Only shared topic is pricing. | VERIFIED RESOLVED | High | None |
| TXT-02 / MIS-01 / P0-4 | HIGH: fundraising claim | 0 hits for "raise capital", "Series A", "$100", "100M"; new CTA line `content.js:230` | VERIFIED RESOLVED | High | None |
| TXT-03 | LOW: services intro paraphrase | `content.js:87` "Hire us to lead the whole journey, or bring us in for one sharp, well-defined piece." Same idea as Outcrowd's "full-scale IT partner … or a vendor for particular tasks". | STILL PRESENT | High (fact) / Low (law) | Low concern; idea-level |
| TXT-04 | LOW: card copy and keys | Product Design and Engineering texts are unchanged since October 9. Keys `platforms` / `dev` remain (`content.js:103,107`). | STILL PRESENT | Medium | Low concern |
| TXT-05 / MIS-03 / P1-5 | Unsubstantiated 10x / 85% | `b861453`: 24/7 · 2 · 3 languages. `StatsArt.jsx` keeps comments "85%: donut ring" and "10x" but renders no such numbers. | VERIFIED RESOLVED | High | None |
| TXT-08 / P1-6 | Footer labels mapped from original | `15ac2ce`: real services and anchors | VERIFIED RESOLVED (labels) | High | Structure: LAY-11 |
| TXT-09 / MIS-04 / F-1 | Cookie text: boilerplate paraphrase, inaccurate | `content.js:270-271` unchanged. The site sets no cookies (tracking audits). | STILL PRESENT | High | Report H |
| TXT-10 / G-1 / P1-8 | Positioning remnants | Manifest description is now HisenBug's; "Brand Architecture" 0 hits; README corrected (D-2) | VERIFIED RESOLVED | High | None |
| LAY-01 / C-4 / P1-1 | MEDIUM (aggregate): section sequence | Live render: Outcrowd = hero → showreel → statement → stats → stages → services → cases → testimonials → awards → blog → FAQ → CTA → footer. HisenBug = hero → showreel → stats → stages → services → products → milestone rows → founders → FAQ → CTA → footer. | STILL PRESENT | High (fact) / Low (law) | Report G / K |
| LAY-02 / S-5 | LOW: nav pill | Code rewritten in `0a9d0b6` (widths measured, `41.25rem` gone). Height `3.47222rem`, radius `.83333rem`, 0.7 s and link scale 0.6 retained (`Navbar.jsx:15,103,123`). Live: same button pair and labels; collapse 590→346 vs 613→341 px. | PARTIALLY RESOLVED (code), STILL PRESENT (design) | High | N-3 |
| LAY-03 / CMP-08 | MEDIUM: hero composition, growing showreel | Widgets replaced; `1.70111vw` radius and laptop-to-fullscreen growth remain (`Hero.jsx:49,154`) | PARTIALLY RESOLVED | High | Report G / K |
| LAY-04 | LOW: stats cards | `7.77778rem`, `-.07826rem` (`Stats.jsx:73`); own content | STILL PRESENT | High | Low concern |
| LAY-05 | LOW: stages mechanism | Same arc-carousel idea; own text and art | STILL PRESENT (idea) | Medium | None needed |
| LAY-06 | MEDIUM (aggregate): services block | 16 matching values in `Services.jsx` (card width `34.5833rem`, heights 35.0694 / 40.4167 / 36.1111 / 45.5556 / 31.0625 rem, radius `1.87792rem`, title `9.72222rem`). Live render: same staggered two-column masonry and big title. | STILL PRESENT | High | Report G / K |
| LAY-07 | LOW: work list | `2.29167rem` divider, hover chip | STILL PRESENT | High | Low concern |
| LAY-08 | LOW: recognition rows | `Awards.jsx:24` `15.6875rem` thumb offset, hover fill, synthesised click | STILL PRESENT | High | Low concern |
| LAY-09 | LOW: FAQ layout | `3.88889rem`, `71.3889rem` (`Faq.jsx:76,79`) | STILL PRESENT | High | Low concern |
| LAY-10 | LOW–MEDIUM: CTA card | Art and claim replaced; `48.6111vw` card, two-line heading, orange + grey button pair remain | PARTIALLY RESOLVED | High | Low concern |
| LAY-11 | LOW: footer | Labels rebuilt; same 3-column + big e-mail + copyright/location layout; `37.8125rem`, `4.16667rem` | PARTIALLY RESOLVED | High | Low concern |
| LAY-12 | LOW: floating pill | `FloatingCall.jsx:136,144`: 13.75 × 4.72222 rem, 11.125 rem on phones, radius 6.94 rem, violet. Live Outcrowd pill 198×68 px at 1440, which equals 13.75 × 4.72222 rem. | STILL PRESENT | High | N-3 |
| LAY-13 / CC-2 | LOW: cookie card | `CookieBanner.jsx:30` reproduces the **whole** `.fs-cc-banner_component` rule (gradient 171deg `#505050`→`#191919` 64%, radius 2.2rem, padding .2rem, inset 1rem, z 998) | STILL PRESENT | High | Report E / K |
| LAY-14 | LOW: preloader | `Preloader.jsx`: `#404040`, 0.9 s, once per session | STILL PRESENT | High | Low concern |
| LAY-15 | No identified issue: root sizing | `index.css:31-33` same 1rem = 1vw scheme | STILL PRESENT; NO IDENTIFIED ISSUE | High | None |
| COL-01 | LOW: neutral palette | 21 hex values shared, most of them Tailwind neutrals | STILL PRESENT | High | Low concern |
| COL-02 | MEDIUM (aggregate): accent roles | Same orange-primary / violet-floating-pill roles (live render) | STILL PRESENT | High | Report G |
| COL-03 / S-7 | LOW: exact original accents in canvas | `MotionBackground.jsx:4` now `102,87,255` / `255,106,61`; 0 hits for the original values | VERIFIED RESOLVED | High | None |
| COL-04 / S-8 / CC-3 | LOW: identical gradients | Stats, Services, Hero and CTA glows rewritten (EdgeGlow); tool finds only the cookie gradient verbatim. Stages top fade `#080808 19% → #080808cc 58% → transparent` equals `.top-gradient` (`#0000` = transparent). | PARTIALLY RESOLVED | High | Low concern |
| TYP-01 | No issue | Plus Jakarta Sans, OFL-1.1, notice shipped | NO IDENTIFIED ISSUE | High | None |
| TYP-02 | LOW: type scale | Values such as `3.19444rem`, `9.72222rem`, `.97222rem` remain | STILL PRESENT | High | Low concern |
| CMP-01 / S-4 | LOW–MEDIUM: explode button | `ExplodeButton.jsx` removed in `0a9d0b6`; `FillButton` uses a clip-path circle; 0 hits for `scale(50)` / `.455` | VERIFIED RESOLVED (code). The hover-fill idea remains (unprotected). | High | None |
| CMP-02 | LOW: magnet | Rewritten (spring, own formula) in `0a9d0b6` | VERIFIED RESOLVED (code) | Medium | None |
| CMP-03 / S-3 | LOW: spotlight | `index.css:105` single 160 px layer (original 800/600 px, two layers) | VERIFIED RESOLVED (code) | High | None |
| CMP-04 / CC-4 | LOW: scrub text | Same GSAP parameters; React rewrite without SplitType | STILL PRESENT (functional) | High | None needed |
| CMP-05 / CC-5 | No issue: Lenis | Same library options | NO IDENTIFIED ISSUE | High | None |
| CMP-06 | LOW: section-aware nav | `useNavTone` replaces `useSectionTheme` (`0a9d0b6`) | VERIFIED RESOLVED (code). Idea remains. | Medium | None |
| CMP-07 | LOW: cursor zones | `CursorZone` on Services | STILL PRESENT | High | Low concern |
| CMP-09 | LOW: secondary button | Unchanged | STILL PRESENT | High | Low concern |
| COD-01 / S-2 / P1-2 / CC-1 | LOW direct, HIGH evidentiary | 40 distinct ≥4-decimal values, 55 occurrences, 100% present in the original CSS (see the reconciliation below) | STILL PRESENT | High | Report E / K |
| COD-02 / C-5 / S-6 | LOW–MEDIUM: interaction logic | Nav, explode, magnet, spotlight, nav tone rewritten; preloader, scrub, Lenis and nav timing constants kept | PARTIALLY RESOLVED | Medium | Report E |
| COD-03 | LOW: near-verbatim CSS | Spotlight and explode gone; cookie rule remains | PARTIALLY RESOLVED | High | LAY-13 |
| COD-04 / S-9 / CC-7 | LOW: remnant identifiers | Original class and file names gone from comments (0 hits). Remaining: `STARTUPS` (`content.js:114,123`), `id="cases"` (`Stages.jsx:175`), "six service cards" (`ServiceArt.jsx:3`), keys `platforms` / `dev` | PARTIALLY RESOLVED | High | Keep as evidence. Do not scrub. |
| COD-05 / S-11 | No issue | 0 hits for outcrowd / webflow / website-files / finsweet / Calendly; production tracking audit: 0 third-party requests | NO IDENTIFIED ISSUE | High | None |
| COD-06 / S-10 / P2-1 / P2-2 | LOW: licences | `THIRD_PARTY_NOTICES.txt` lists 14 packages incl. Tailwind, Vite, Rolldown; GSAP banners kept; build identical except notices | VERIFIED RESOLVED | High | None |
| COD-07 / G-7 | LOW: process remnants in docs | README corrected (D-2, uncommitted); `HANDOFF.md` kept as a record | PARTIALLY RESOLVED (intended) | High | None |
| META-01, 03 | No issue | Unchanged | NO IDENTIFIED ISSUE | High | Domain ownership: N-5 |
| META-02 | LOW: theme colour, manifest | Manifest text corrected; `#080808` theme colour remains (ordinary) | VERIFIED RESOLVED (text) | High | None |
| BR-01 / T-4 | No issue: names and logos | Different name, logo, domain (rechecked live) | NO IDENTIFIED ISSUE (factual) | High | Official search: Report F |
| BR-02 / T-1 / T-2 | MEDIUM (low confidence): overall impression | Live side-by-side at 1440/1024/768/390/320 confirms close resemblance (Report D) | STILL PRESENT, evidence strengthened | Medium | Report G |
| BR-03 | No issue: social set | No icons render; comment and `Icons.jsx` keep the same five network names | NO IDENTIFIED ISSUE | High | None |
| BR-04 | No issue: "THE OUTCROWD" US 5,359,702 (mirror) | Official DB inaccessible; mirror shows Class 40 imprinting, individual owner | UNVERIFIED (official) | Medium | Report F |
| BR-05 / T-5 / P1-9 | LOW (Unverified): own name | All official registers NOT VERIFIED (Report F) | UNVERIFIED | — | Professional search |
| T-3 | LOW: Pakistan CA 2010 s.10(2)(d) | Unchanged facts | STILL PRESENT | Low | Report G |
| T-6 | UNKNOWN: design rights | Design registers inaccessible (Report G) | UNVERIFIED | — | Counsel / manual search |
| T-7 | HIGH: claims | Fundraising resolved; Services mock figures and other claims remain (Report H) | PARTIALLY RESOLVED | High | Report H |
| MIS-05 / H-1 / P1-10 | LOW: demo booking modal | `BookCallModal.jsx:92-94` "You're on the calendar … demo confirmation, nothing was sent." Owner instruction: not to be changed. | STILL PRESENT | High | Report H |
| P0-5 | Keep build private | No evidence this build was deployed (Report I) | NO IDENTIFIED ISSUE in accessible records; UNKNOWN elsewhere | Medium | Report I |
| P1-3 | Signature interactions | Several rewritten; nav, preloader, rows and cursor concepts kept | PARTIALLY RESOLVED | High | Low concern |
| P1-4 | Palette | Canvas fixed; same families and roles | PARTIALLY RESOLVED | High | Report G |
| P1-7 / F-3 | Cookie banner + privacy notice | Banner text unchanged; no privacy notice | STILL PRESENT | High | Report H |
| P2-3 / D-4 | Provenance log | Register exists; M-1 not yet updated with the 2026-10-11 statement (that task was interrupted) | PARTIALLY RESOLVED | High | Update the register when approved |
| P2-4 | Unused code | swiper removed; `Blog.jsx`, `TiltCard.jsx`, `src/journal` remain (not in `dist/`) | PARTIALLY RESOLVED | High | Optional |

### B.2 Content audits (October 10) and licensing stage

| Finding ID | Earlier status | Latest evidence | Current status | Confidence | Action |
| --- | --- | --- | --- | --- | --- |
| Phase 2C B-4 / Remaining A2 | Mock figures in Services art | `ServiceArt.jsx:100,103,124,191,192`: "48.2k", "+18%", "99.98% uptime", "✓ 128 tests", "✓ lighthouse 100" | STILL PRESENT | High | N-2 |
| Remaining A2 chip | "Forecast" capability not confirmed | `ServiceArt.jsx:44`; `StageArt.jsx:216` "Stock forecast"; `content.js:79` "Forecasting shows what to reorder" | STILL PRESENT | High | Report H |
| Remaining A1 | "react instantly", "fast, efficient", "pick up every call", "run themselves" | `content.js:89,93,97` | STILL PRESENT | High | Report H |
| Remaining B / Phase 2C B-5 | Founders note outcome claim | `content.js:169` | STILL PRESENT | High | Report H |
| Remaining B | "Stock, couriers and suppliers move on their own" art text | Not rechecked line by line | NOT RECHECKED | — | Include in claims review |
| Phase 2C C, D, E | Products, milestones, footer | `b861453`, `0fea234`, `7a4632e`, `15ac2ce` implemented owner-confirmed wording | VERIFIED RESOLVED (as owner-confirmed wording). Supporting documents: none on file. | Medium | Report H |
| Phase 2C G-3 | "Brand Architecture · 2025" | 0 hits | VERIFIED RESOLVED | High | None |
| CC-1 (Oct 10) | Measurement fingerprint | Unchanged | STILL PRESENT | High | Report E |
| CC-6 (Oct 10) | Nav behaviour spec | Unchanged | STILL PRESENT | High | Report E |
| D-1 | Notices gap | 14 packages; hash check 30/31 identical | VERIFIED RESOLVED | High | Commit when approved |
| D-2 | README originality claim | README now carries a provenance paragraph | VERIFIED RESOLVED (uncommitted) | High | See N-7 |
| D-3 | Baseline in temp storage | `baseline-v2/MANIFEST-sha256.txt` re-verified today: all files intact | VERIFIED RESOLVED | High | None |
| E-1 | `automation.webp` provenance | Owner statement 2026-10-11 (tool + reference source); prompt, date, plan pending | SUPERSEDED BY NEW EVIDENCE | High | N-1 |
| E-2, E-3, E-4, E-8 | EzKhata screenshots, video, founder photos, icons | No new documents | UNVERIFIED (PENDING in register) | — | Owner documents |
| E-5 | Design-spec similarity decision | Unchanged | STILL PRESENT | High | Report K |
| E-7 | GSAP no-code-builder use | No confirmation recorded | UNVERIFIED | — | Owner confirmation |
| E-9 | Earlier public builds | New evidence in Report I | PARTIALLY RESOLVED | Medium | Report I |

**Counting rule for the summary below.** A row counts once per primary ID; rows that group several IDs
(for example "IMG-01 / C-1 / S-1 / P0-1") count as one finding. A row with two statuses counts under the
first one named. Totals across B.1 and B.2, counted from the tables, in 85 rows:

| Status | Rows |
| --- | --- |
| VERIFIED RESOLVED | 21 |
| STILL PRESENT | 32 |
| PARTIALLY RESOLVED | 15 |
| NO IDENTIFIED ISSUE (rechecked) | 9 |
| UNVERIFIED | 5 |
| SUPERSEDED BY NEW EVIDENCE | 2 |
| NOT RECHECKED | 1 |

### B.3 Why the measurement counts differ (45 vs 25 of 30 vs 55 of 55)

All three counts were re-run with one script (`audit/final-gap-audit-2026-10-11/reconcile_counts.py`) on two
trees: the October 9 baseline `a27e909` and the current working tree.

| Figure | Report | What it counts | At `a27e909` | Current tree |
| --- | --- | --- | --- | --- |
| "45 of 45" | Oct 9 audit | **Distinct** values with ≥4 decimals and a length unit (rem/vw/vh/em/px/%) found anywhere in the original CSS | 45 distinct (61 occurrences) | 40 distinct (55 occurrences) |
| "25 of 30" | Oct 10 remaining-content audit | The **Appendix A list** values with **≥3 decimals** (30 of the list's 40 values), checked for presence in `src/` | 30 of 30 | **25 of 30** |
| "55 of 55" | Oct 10 licensing audit | **Occurrences** (every appearance) of ≥4-decimal values with any unit, also counting deg/s | 61 of 61 | **55 of 55** (= 40 distinct) |

- The figures are consistent once scope is taken into account.
- Between `a27e909` and now, 5 distinct high-precision values were removed with the hero, logo and tag-pill
  rebuilds: `2.46569rem`, `10.4861vw`, `11.9444vw`, `4.6116vw` and `10.1255rem`. Four lower-precision
  values went with them: `41.25rem`, `15.69rem`, `20.5rem` and `13.55rem`.
- **None of these counts is a percentage of infringement.** They measure how closely the dimensions were
  transcribed, which is evidence of copying, not of protected expression.
- Values with 2–3 decimals: 224 of 259 occurrences now match (October 9 reported 124 of 137 **distinct**
  values, a different unit of count).

---

## REPORT C — New findings missed by previous audits

| ID | New issue | Exact location | Evidence | Legal category | Risk | Confidence | Required investigation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| N-1 | AI image generated from the original site's images | `public/media/automation.webp` (showreel scene 3, `Showreel.jsx:85`) | **Owner statement**, 2026-10-11: made with ChatGPT image generation; reference images from Outcrowd's website were provided to ChatGPT; prompt, date and plan not supplied; no permission for the reference images. **Image check:** no near-duplicate among 399 images embedded in Outcrowd's archived Lottie files (nearest dHash 93/256). Live render shows a segmented orange/violet ring on Outcrowd's "Brand Strategy" card; `automation.webp`'s hub is also a segmented orange/violet ring, but its hub-and-panel composition does not appear in the visible original artwork. Outcrowd's ~85 web raster images were not archived locally, so they could not be compared. | Copyright (reproduction or adaptation, if protected expression from an input survives in the output); OpenAI terms (user responsible for rights in inputs); no US copyright in purely AI output (*Thaler*, cert. denied 2 March 2026) | **MEDIUM** | Low (inputs unknown) | Identify the exact uploaded images, the prompt and the ChatGPT conversation/output record; side-by-side review by counsel |
| N-2 | Mock performance figures still rendered | `ServiceArt.jsx:100,103,124,191,192` | "48.2k monthly users", "+18% retention", "99.98% uptime", "✓ 128 tests", "✓ lighthouse 100" — flagged twice on October 10 but absent from the licensing-stage risk lists | Misleading advertising (FTC Act §5; UK DMCCA 2024 Part 4 / BPRs 2008; ACL ss.18, 29; Pakistan CA 2010 s.10) | **MEDIUM** | High (fact) / Medium (how customers read UI mock-ups) | Owner decision; changing them is a visible change |
| N-3 | Identical nav button pair and floating-pill size, confirmed live | `Navbar.jsx` (grey "Book a call" + orange "Contact"); `FloatingCall.jsx:136` | Live 1440: Outcrowd nav 590→346 px with the same two buttons; floating pill 198×68 px `rgb(119,77,255)`. HisenBug 613→341 px; pill 13.75×4.72222 rem (198×68 px at 1440), `#6657ff`. Earlier audits had the nav and pill only from source code. | Trade dress / passing-off get-up (not copyright) | LOW alone; part of BR-02 (MEDIUM) | High | Include in counsel's look-and-feel review |
| N-4 | UK cookie rules changed on 2026-02-05 | `Preloader.jsx` (sessionStorage), `CookieBanner.jsx` (localStorage) | Data (Use and Access) Act 2025 s.112 adds consent exceptions to PECR reg. 6 (functionality, analytics, security, updates), in force 5 Feb 2026; PECR fines raised to UK GDPR levels. Earlier reports said the preloader flag was "arguably not strictly necessary" (pre-change law). | UK privacy (PECR as amended) | LOW | Medium | Counsel to confirm whether the preloader flag fits the new functionality exception; the banner's inaccurate wording remains the main issue (Report H) |
| N-5 | Live hisenbug.com is hosted outside the connected Vercel account | DNS: A 216.198.79.1, NS registrar-servers.com, MX smtp.google.com; `Server: Vercel` | Connected Vercel account: 8 projects, none HisenBug; no alias for hisenbug.com; no deployments since 2026-09-26. The live site is a different Next.js site ("Hisenbug \| AI Automation Solutions & Systems"); 0 cloned markers. Cache age ≈ 18 days. | Exposure evidence; domain control | UNKNOWN | Medium | Owner to identify the hosting account and list its deployments and previews (Report I) |
| N-6 | Cloning stage never committed; unrecorded `master` branch | `git branch -a`: `master` = `7faf0e7` only; reflog shows the checkout to `ip-remediation` on 2026-10-09 | No history exists between 2026-10-02 (template) and 2026-10-09 (baseline). Earlier states cannot be examined. | Evidence gap (not a risk in itself) | UNKNOWN | High | Owner: any other copies (other folders, machines, chat exports, preview links) of the 2–9 October work |
| N-7 | README now states the site was derived from a third-party site | `README.md` (uncommitted, D-2) | Accurate and approved | Disclosure / evidence | NO IDENTIFIED ISSUE (honest record). Note: it becomes public if the repository is ever published. | High | Owner awareness only; do not remove |
| N-8 | External Voice Agent demo collects voice data | https://real-estate-agent-blond.vercel.app/ (linked as "Try Live Demo") | Page title "… by Hisenbug"; mute-microphone control; ElevenLabs voices; "Audio Recordings" feature; has its own `/privacy` link | Privacy (separate system) | UNKNOWN | Medium | Separate audit of the demo's privacy notice and recording practices |
| N-9 | Outcrowd's cookie component is Finsweet's | Archived `home.html` loads `@finsweet/cookie-consent@1` | npm metadata for the package lists no licence. The copied `.fs-cc-banner_component` styling may be Outcrowd's customisation or Finsweet's default — unverified. | Copyright ownership of a short style rule | LOW | Low | None needed beyond LAY-13 |

**Also checked, nothing new found:**
- original domains, CDNs or hotlinks;
- shared SVG paths (0 of 117) or Lottie text;
- shared 4- or 6-word text sequences;
- third-party logos: only the name "WhatsApp" and its interface inside the EzKhata screenshot (E-2), and
  no brand icons in the art;
- hidden metadata: title, description, keywords and manifest are all HisenBug's;
- unshipped code: `Blog.jsx`, `TiltCard.jsx` and `src/journal` are not in `dist/`.

---

## REPORT D — Current visual similarity (live render, 2026-10-11)

- **Method.** outcrowd.io was rendered in headless Edge 155 at 1440, 1024, 768, 390 and 320 px: 118
  screenshots, cookie banner answered "Deny all". It was compared with the HisenBug baseline screenshots of
  the current build.
- **Evidence.** Side-by-side sheets are in `audit/final-gap-audit-2026-10-11/compare/`. These are genuine
  captures, not reconstructions.
- **Limitations.**
  - Outcrowd was captured with animations running; HisenBug with reduced motion (static pass).
  - The preloader was captured first-load only.
  - No hover states on Outcrowd.
  - The mobile menu was opened, but the menu screenshot was not reviewed in detail.

| Element | Outcrowd evidence | HisenBug evidence | Similarity | Protected expression concern | Risk | Recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| **Overall composition** | Dark page, centred pill nav, floating violet pill, hero with floating cards over a laptop showreel, card-heavy sections, light client band, recognition rows, centred FAQ, CTA card, footer | Same sequence of block types and same get-up; HisenBug drops testimonials and blog, adds products and founders | **High** to an ordinary viewer at desktop; moderate on phones | (C) shared specification + (E) potential trade dress + (F) open question whether the whole page is an artistic/graphic work (UK/EU/AU "own intellectual creation" test) | **MEDIUM** (low confidence) | Specialist review of the combined impression; permission is the only zero-change cure |
| Hero | Centred two-line headline, tag pill, floating product widgets, laptop showreel | Centred headline, tag pill, own floating cards, laptop showreel | Composition same; artwork different since `6480ed2` | (A) convention for the layout; protected widgets removed | LOW–MEDIUM | None beyond the overall review |
| Showreel | Grows with scroll; logo animation | Grows to full screen, pinned scenes | Mechanism same; content own | (B) functional / idea | LOW | None |
| Navigation | Pill 590→346 px; logo, "Book a call" grey, "Contact" orange | Pill 613→341 px; logo, "Book a call" grey, "Contact" orange | **Near-identical** | (A)/(B) plus (E) get-up | LOW (part of overall) | Include in review |
| Floating CTA | Violet pill 198×68 px, "Book a call ↗", bottom-right | Violet pill 198×68 px, "Book a call →", bottom-right; centred on phones in both | **Near-identical** | (B) functional; (E) colour + size + label | LOW (part of overall) | Include in review |
| Stats | 4 dark cards, huge numerals, small illustrations | 3 dark cards, huge numerals, own illustrations | Style same; content own | (A)/(C) | LOW | None |
| Stages | Pre-seed / Seed / Series A, sticky text + rotating cards | Idea & Prototype / First Release / Scale-Up, sticky text + 3D arc cards | Mechanism same; text and art own | (B) idea | LOW | None |
| Services | Huge "Services" title, tag pill, staggered 2-column cards with spotlight | Same title treatment, tag pill, staggered 2-column masonry with spotlight, same card sizes | **High** (same measurements) | (C) + arrangement question (F) | MEDIUM (aggregate) | Include in review |
| Work / products | Light band, client list with hover chips | Light band, two product rows with hover chips | Moderate | (A) | LOW | None |
| Recognition rows | Award rows (site, project, award, date) with hover fill and thumbnail | "Our Products & Services" rows (status, item, detail, type) with hover fill and thumbnail | Row anatomy same; content own | (A)/(B) | LOW | None |
| FAQ | Centred title, divider list, "+" icons | Same treatment | Layout same; text own | (A) | LOW | None |
| CTA | Card, two-line heading left, orange + grey buttons, art right | Same structure, own heading and art | Moderate–high | (A)/(C) | LOW | None |
| Footer | 3 link columns, large e-mail right, copyright left, location right | Same arrangement, own labels | High | (A) convention | LOW | None |
| Typography | ITC Avant Garde (commercial) | Plus Jakarta Sans (OFL) with transcribed sizes | Hierarchy same; fonts differ | (C) | LOW | None |
| Colour | `#080808` base, orange primary, violet floating | Same base, coral primary, indigo floating (ΔE 5.5 / 3.2) | Same families and roles | (E) part of get-up | LOW alone | Include in review |
| Gradients / glows | Hairline glows, top fade, cookie gradient | Glows rewritten; top fade and cookie gradient identical | Partial | (C) minimal creativity | LOW | None |
| Cursor / spotlight | Custom cursor over cards, spotlight | Cursor disc, own spotlight code | Idea same | (B) | LOW | None |
| Responsive | Phones: logo-left header + burger, centred floating pill | Same header pattern and centred pill | Moderate | (A) | LOW | None |
| Preloader | `#404040` curtain, once per session | Same colour, timing and session rule | High | (B) | LOW | None |

---

## REPORT E — Remaining source-code similarity

- **Measurement fingerprint.** 40 distinct values with ≥4 decimals (55 occurrences) in 15 first-party
  files; every one appears in Outcrowd's stylesheet, mostly on the corresponding component.
  - Largest group: `Services.jsx` (16 occurrences).
  - Most are round pixel sizes at a 1440 px design divided by 14.4, so the decimals are a conversion
    artefact.
  - Each number is an unprotectable fact; together they prove transcription.
  - Full list: `audit/final-gap-audit-2026-10-11/fingerprint-current.txt`.
- **Complete copied style blocks.** One: `CookieBanner.jsx:30` reproduces every visual declaration of
  `.fs-cc-banner_component` (gradient, radius, padding, inset, z-index). The Stages top fade equals
  `.top-gradient`'s gradient.
  - Neither is an original creative work in any meaningful sense (37 C.F.R. §202.1(a); minimal
    creativity).
  - Their authorship (Outcrowd or Finsweet) is unverified.
- **Animation implementations.** No original script survives literally; no Russian-language comments or
  SplitType.
  - The nav collapse (0.7 s, scale 0.6), preloader (`#404040`, 0.9 s, session), scrub text
    (stagger .05 / 'top 90%' / 'bottom 20%') and Lenis options are re-implementations with the same
    parameters.
  - Under US filtration (*Altai*) these are largely functional. Under UK s.21(3)(ab)/(4) a translation of
    a program is an adaptation only if a substantial part of the original's expression is taken; short
    parameter sets are unlikely to qualify.
  - Risk: LOW.
- **SVG and inline artwork.** 0 of 117 original paths match; no shared numeric runs. Only the generic
  `0 0 24 24` viewBox is shared.
- **Design tokens.** 21 shared hex values (Tailwind neutrals plus `#080808`, `#101010`, `#191919`,
  `#404040`, `#505050`). Unprotectable individually.
- **Not done.** No original source beyond the publicly served files was available. Webflow IX2 interaction
  data was not decoded.

---

## REPORT F — Trademark clearance

All searches were run on 2026-10-10 / 2026-10-11 (UTC 21:01–21:30), automated from this workstation. Raw
responses are in `audit/final-gap-audit-2026-10-11/tm/`.

| Jurisdiction / database | Terms attempted | Result | Status |
| --- | --- | --- | --- |
| US — USPTO Trademark Search (tmsearch.uspto.gov) | HISENBUG (planned: HISEN BUG, HEISENBUG, OUTCROWD, OUT CROWD) | Search page serves an AWS WAF bot challenge (`challenge.js`); API returned 405. Not attempted further: completing bot challenges is outside this audit's permissions. | **NOT VERIFIED** |
| UK — UK IPO trade mark text search | HISENBUG | HTTP 403 with a CAPTCHA page | **NOT VERIFIED** |
| Pakistan — IPO-Pakistan (WIPO Publish search linked from ipo.gov.pk) | HISENBUG | `search.ipo.gov.pk` resolves (202.83.168.227) but connections timed out (HTTP and HTTPS) | **NOT VERIFIED** |
| UAE — Ministry of Economy and Tourism | — | Official trademark inquiry is an eService requiring UAE PASS or registered login and an AED 350 fee ([MoET trademark services](https://www.moet.gov.ae/en/w/trademark-services-1)) | **NOT VERIFIED** |
| Australia — IP Australia Trade Mark Search | HISENBUG | Quick-search form submits, but the result page returns HTTP 403 to automated requests | **NOT VERIFIED** |
| International — WIPO Global Brand Database | HISENBUG | ALTCHA CAPTCHA (`api.branddb.wipo.int/captcha`) | **NOT VERIFIED** |
| US Copyright Office public records (not a trademark register; checked for ownership) | "outcrowd" (keyword, name), "outcrowd inc", "hisenbug" | "outcrowd" keyword: 9 hits, all unrelated — song titles "The Outcrowd", a 1989 sound recording, a 2017 text and a 2023 box set. No hit in Outcrowd Inc.'s name; 0 for name "outcrowd"; 0 for "hisenbug". | Searched (limitation: recent registrations may not yet appear) |

**Non-official sources (labelled; not a substitute for the registers):**
- Web search for "HisenBug" trademark: no HisenBug mark found. The results returned Hexbug and Hisense.
- "Heisenbug" is a generic programming term (dictionary and glossary sources); no registration found in web
  results.
- "THE OUTCROWD", US Reg. 5,359,702, Class 40 (custom imprinting), individual owner — per the
  [Justia mirror](https://trademarks.justia.com/874/58/the-87458863.html). Unrelated goods.
- "OURCROWD" (CIPO Canada 1844553) is a different, unrelated brand. Canada is not a target market.

**Assessment, as far as the evidence allows:**
- **Against Outcrowd:** no identified conflict. The names (HisenBug vs Outcrowd) and the logos (ring and dot
  vs infinity loop) are dissimilar. No registered OUTCROWD mark for design or IT services was found, and
  that absence is not verified in the official databases.
- **Your own mark:** the closest concern is **Hisense**, a well-known consumer-electronics mark. Overlap is
  limited to the letters "Hisen". The goods and services differ (televisions and appliances vs AI software
  services), although Hisense's specifications may include Class 9 software. A likelihood-of-confusion or
  well-known-mark objection can't be excluded without register searches. "Heisenbug" being a generic term
  helps distinctiveness of the overall word only marginally.
- **Classes to consider:**
  - 42: software development, SaaS, AI services.
  - 9: downloadable software.
  - 35: business automation and consultancy.
  - EzKhata's bookkeeping and billing functions may also touch 36 (financial record services).
  - Each product name (EzKhata, AI Voice Agent) needs its own search.
- **No trademark clearance is given.** Professional searches are required in all five jurisdictions.

---

## REPORT G — Trade dress, passing off and design rights

### US — unregistered trade dress (Lanham Act §43(a), 15 U.S.C. §1125(a))

- **Requirements.** Outcrowd would need to prove:
  - **distinctiveness**: website design is usually treated like product design or get-up, so it needs
    acquired distinctiveness or secondary meaning (*Wal-Mart v. Samara*, 529 U.S. 205 (2000));
  - **non-functionality**, which is the claimant's burden for unregistered dress (§43(a)(3); *TrafFix*,
    532 U.S. 23 (2001));
  - **likelihood of confusion**.
- **Evidence.** No evidence was found that Outcrowd's site look identifies it as a source to customers:
  no surveys, no "look-for" advertising, no registration. The site shows "70+ reviews" and awards
  (Awwwards, CSSDA, TheFWA), which may support recognition among design buyers but is not secondary-meaning
  evidence as such.
- **Factors.** The names, logos and domains differ, which weighs strongly against confusion. Overlap in
  services (software for startups and businesses) and channels (web) is partial.
- **Assessment.** MEDIUM, low confidence. Website look-and-feel claims are pleaded but hard to win.

### UK, Australia and Pakistan — passing off

- **Requirements.** Goodwill in the jurisdiction, misrepresentation and damage (*Reckitt & Colman v Borden*
  [1990] 1 WLR 491). UK goodwill needs UK customers (*Starbucks v BSkyB* [2015] UKSC 31).
- **Evidence.** Outcrowd's UK, AU and PK goodwill is unproven: its site lists international clients, but
  none were checked.
- **Misrepresentation.** This is the weak point given the different name and logo, though "get-up"
  misrepresentation does not strictly require the name.
- **Australia.** ACL s.18 (misleading conduct) and s.29(1)(h) (affiliation) also apply to look-alikes;
  courts weigh name and logo heavily.
- **Pakistan.** Competition Act 2010 s.10(2)(d) covers "fraudulent use of another's trademark, firm name, or
  product labelling or packaging". That's a stretch for web get-up without the name.
- **UAE.** Unfair competition provisions exist (Federal Decree-Law 36/2021 on trademarks; civil and
  commercial codes); not researched further.
- **Assessment.** LOW–MEDIUM, low confidence.

### Registered designs and design patents

- **Possible rights.** US design patents (35 U.S.C. §171) can cover GUI and screen designs; UK, AU, PK and
  UAE registered designs can cover screen displays and icons in some systems.
- **Searches.** USPTO Patent Public Search could not be queried (its session API returned 404); UK designs
  returned a CAPTCHA (403); IP Australia designs returned 403 to automated search; PK and UAE design
  registers were not reached.
- **Status.** **UNKNOWN.** No registered design right was identified, and none was excluded.
- **Unregistered designs.** The UK supplementary unregistered design needs first disclosure in the UK; UK
  unregistered design right (CDPA s.213) protects shape or configuration, not surface decoration — of little
  relevance to a website.

### Copyright registration and enforcement (as it affects these theories)

| Jurisdiction | Registration needed to protect? | Registration and suing | Key rule / authority |
| --- | --- | --- | --- |
| US | No (17 U.S.C. §102, §408) | A **"United States work"** must be registered (or refused) before suit (§411(a); *Fourth Estate*, 586 U.S. 296 (2019)). Foreign works are exempt from §411(a). Statutory damages and fees need timely registration (§412), and §412 applies to foreign works too. | [17 U.S.C. ch. 4](https://www.copyright.gov/title17/92chap4.html). Outcrowd Inc. is a Delaware company; whether its site is a "US work" depends on first publication — likely yes (online, US company), unverified. **No registration found** (Report F). |
| UK | No | No registration system | CDPA 1988 ss.1, 16, 21, 96–97; *THJ v Sheridan* [2023] EWCA Civ 1354 (originality) |
| Pakistan | No (optional registration, evidentiary) | Suits in IP Tribunals; s.66 criminal provision for knowing infringement | Copyright Ordinance 1962 |
| UAE | No (registration evidentiary) | — | Federal Decree-Law 38/2021 |
| Australia | No registration system | — | Copyright Act 1968 ss.14, 36; *IceTV* [2009] HCA 14 |

- **AI output.** The US denies copyright to works without human authorship (*Thaler v. Perlmutter*, D.C.
  Cir. 18 March 2025; [cert. denied 2 March 2026](https://www.mayerbrown.com/en/insights/publications/2026/03/supreme-court-denies-review-in-ai-authorship-case)).
  The UK still has CDPA s.9(3) for computer-generated works; the government's March 2026 report proposes
  removing it with no timetable ([summary](https://www.stephensonharwood.com/post/102mpke/uk-government-publishes-report-and-impact-assessment-on-copyright-and-artificial-intelligence-the-debate-continues/)).
  This affects whether **you** own `automation.webp`; it does not stop **Outcrowd's** rights in any input
  expression that survives in the output.
- **Takedown.** A US host (Vercel) means DMCA §512 notices are the fastest route a claimant could use,
  regardless of where you are. Pakistan has no statutory notice-and-takedown equivalent.
- **Territoriality.** Each country applies its own law to infringement within it. Targeting the US and UK
  brings their tests into play even though you operate from Pakistan.

---

## REPORT H — Current claims and website compliance

### H.1 Claims (owner confirmation vs documents)

"Owner-confirmed" means the founders confirmed the wording on 2026-10-10 (code comments and audit records);
**no supporting documents are on file** for any of them.

| Claim (location) | Type | Status | Risk | Note |
| --- | --- | --- | --- | --- |
| "48.2k monthly users", "+18% retention" (`ServiceArt.jsx:100,103`) | Mock result figures | **Unsupported** | MEDIUM | Inside a UI illustration. A customer may read them as HisenBug client results; no "illustrative" label. |
| "99.98% uptime" (`ServiceArt.jsx:124`) | Uptime figure | **Unsupported** | MEDIUM | As above |
| "✓ 128 tests", "✓ lighthouse 100" (`ServiceArt.jsx:191-192`) | Test-result figures | **Unsupported** | LOW–MEDIUM | Reads as a build log; specific numbers |
| "Forecast" chip, "Stock forecast", "Forecasting shows what to reorder…" (`ServiceArt.jsx:44`, `StageArt.jsx:216`, `content.js:79`) | Capability | Not confirmed (Oct 10 question 2 unanswered) | LOW–MEDIUM | — |
| "react instantly", "fast, efficient AI automation" (`content.js:89`) | Performance | Unsupported | LOW | — |
| "pick up every call" (`content.js:97`); "run themselves" (`content.js:93`) | Absolute capability | Unsupported | LOW–MEDIUM | — |
| "The outcome is less manual effort and lower costs." (`content.js:169`) | Delivered outcome | Unsupported | LOW–MEDIUM | — |
| "Live with customers", "In use with customers", "The solution is live with real customers" (`content.js:130,155,215`) | Customer experience | Owner-confirmed; no document | LOW if true | Keep evidence (contracts, invoices) on file |
| EzKhata features, languages, paid subscription (`content.js:139-142,202-210`) | Product capability and pricing | Owner-confirmed; no document | LOW if true | — |
| 24/7 (`content.js:54`) | Availability | Owner-confirmed | LOW | Keep monitoring evidence |
| Founder roles (`content.js:174-176`) | Personal descriptions | Roles not explicitly confirmed (Oct 10) | LOW | — |
| Example data ("Charlie", "Rs 70,000", "3:12 AM", "Bill #4") | Obvious demo data | Fictional and illustrative | NO IDENTIFIED ISSUE | — |
| Testimonials | — | None on the page | NO IDENTIFIED ISSUE | — |

**Legal rules** (B2B buyers are the main audience; consumer law still applies to sole traders and small
shops):
- **US:** FTC Act §5 and the substantiation doctrine.
- **UK:** DMCCA 2024 Part 4 Chapter 1 has been in force since 6 April 2025 and replaced the CPRs (B2C); the
  BPRs 2008 cover B2B.
- **Australia:** ACL ss.18 and 29.
- **Pakistan:** Competition Act 2010 s.10.
- **UAE:** Federal Law 15/2020 on consumer protection.

### H.2 Privacy, cookies and forms (verified locally; hosting not verified)

| Item | Actual behaviour | Statement on the site | Issue |
| --- | --- | --- | --- |
| Cookies | None set (tracking audits 2026-10-09 and 2026-10-11, production build) | "We use cookies to … understand how it is used and improve our outreach" | **Inaccurate.** Asks consent for processing that does not occur (LOW–MEDIUM) |
| localStorage | `hb-cookie-choice` after a banner answer | — | Low |
| sessionStorage | `hb-preloader-seen` | — | UK: may fall within the new DUAA functionality exception (N-4), not confirmed |
| Analytics / third parties | 0 third-party requests; no beacons | — | Hosting-level analytics and logs not verified (N-5) |
| Privacy notice | **None** | — | You process personal data when people e-mail you, and hosting logs process IP addresses. UK GDPR Art. 13; UAE PDPL (Decree-Law 45/2021, Cabinet Decision 111/2023, compliance deadline 1 Jan 2025); AU Privacy Act — small-business exemption under AUD 3 m turnover still in force (reform pending); Pakistan: **no comprehensive data-protection statute enacted** (PDP Bill not passed as of 2026); US: CalOPPA applies to operators collecting PII from California residents online (whether a mailto link triggers it is uncertain). |
| E-mail links | `mailto:` only; the site receives nothing | — | Lower obligations than a form |
| Booking modal | Local slot picker; sends nothing; says "demo confirmation, nothing was sent" | "You're on the calendar" | Transparent fine print but a misleading headline and a lost lead (LOW). Owner instruction: no change. |
| Voice Agent demo | External app; microphone, recordings, ElevenLabs; own `/privacy` | "Try Live Demo" | Separate audit needed (N-8) |

---

## REPORT I — Previous public deployment investigation

| Check | Result |
| --- | --- |
| Git history | No remote. `master` = template commit `7faf0e7` (2026-10-02). `ip-remediation` starts at `a27e909` (2026-10-09). No deployment config (`.vercel`, `vercel.json`, `netlify.toml` absent; the template's `.vercel` ignore line was removed in `a27e909`). |
| Connected Vercel account | 8 projects, none for HisenBug or this site; no alias for hisenbug.com; no deployments since 2026-09-26 |
| hisenbug.com (live) | Vercel-hosted, different Next.js site ("Hisenbug \| AI Automation Solutions & Systems"); 0 cloned markers (562, 286, Series A, Outcrowd colours, `contact-book-a-call`, `hb-` keys); cache age ≈ 18 days. It's hosted on an account not available to this audit. |
| Wayback Machine (CDX) | 0 captures for `hisenbug.com`, `*.hisenbug.com`, `real-estate-agent-blond.vercel.app` |
| Search engines | `site:hisenbug.com` returned no indexed pages (results were "heisenbug" pages) |
| Voice demo host | Live, separate app, not the cloned site |

**Conclusion:**
- **Confirmed public deployments of the cloned build:** none found.
- **Evidence of no deployment:** partial. Nothing in git, the connected Vercel account, the Wayback Machine
  or search engines.
- **Unknown exposure:**
  - deployments or previews made from the account that hosts hisenbug.com;
  - any local tunnels or shared preview links during 2–9 October;
  - the uncommitted cloning stage.

---

## REPORT J — Risk priority matrix

| ID | Issue | Current status | Legal concern | Evidence strength | Risk | Confidence | Can UI remain identical? | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N-1 | `automation.webp` generated from Outcrowd reference images | Open | Copyright (adaptation via AI); OpenAI input terms | Owner statement; inputs unknown | **MEDIUM** | Low | Yes, if inputs are shown to be unprotected or permission is obtained; otherwise no | Recover the inputs, prompt and output record; counsel review |
| BR-02 / C-4 / T-1 / T-2 | Combined look and feel | Open | Trade dress / passing off; layout as an artistic work (UK, EU, AU) | Strong evidence of copying; weak evidence of Outcrowd's distinctiveness | **MEDIUM** | Low | Yes only with permission or a favourable legal opinion | Specialist IP opinion (US + UK + PK) |
| N-2 | Mock performance figures in the Services art | Open | Misleading advertising | Strong (on page) | **MEDIUM** | Medium | No (removing figures is visible), unless they're substantiated | Owner decision |
| COD-01 / CC-1 | Measurement fingerprint (40 distinct values) | Open | Evidence of copying; not independently infringing | Strong | LOW (evidentiary HIGH) | High | Yes | None needed for its own sake |
| LAY-13 / CC-2 | Complete copied cookie rule | Open | Minimal-creativity CSS | Strong (copying) / weak (protection) | LOW | Medium | Yes | Part of the overall review |
| TXT-09 / MIS-04 / P1-7 | Inaccurate cookie text; no privacy notice | Open | Privacy / consumer law | Strong | LOW–MEDIUM | High | No (text change) | Owner decision |
| Report H claims | "every call", "react instantly", forecasting, Founders outcome | Open | Advertising substantiation | Medium | LOW–MEDIUM | Medium | No (text change), or yes with evidence | Owner evidence file |
| BR-05 | HisenBug clearance (incl. Hisense) | Not searched officially | Trademark | None | **UNKNOWN** | — | Yes | Professional searches in 5 jurisdictions, classes 9/35/42 (+36) |
| T-6 | Design rights | Not searched | Design | None | **UNKNOWN** | — | Yes | Counsel (low priority) |
| N-5 / E-9 | Earlier exposure | Partly checked | Evidence / exposure | Partial | **UNKNOWN** | Medium | Yes | Owner checks the hosting account |
| E-2 | WhatsApp interface in the EzKhata screenshot | Open | Third-party interface / brand guidelines | Medium | LOW | Medium | Yes, if referential use is acceptable | Check WhatsApp brand guidelines / counsel |
| E-3, E-4, E-8 | Video, founder photos, icons provenance | Open | Copyright / consent | Owner statements only | LOW | Low | Yes | Documents |
| MIS-05 | Demo booking modal | Open (owner instruction) | Consumer law | Strong | LOW | High | No | Owner decision |
| N-8 | Voice demo privacy | Not audited | Privacy | — | **UNKNOWN** | — | Yes (separate system) | Separate audit |
| LAY-02, LAY-12, N-3 | Nav and floating pill | Open | Get-up (part of BR-02) | Strong | LOW | High | Yes | Part of the overall review |
| IMG-01–04, TXT-01, TXT-02, COL-03, CMP-01, CMP-03 | Earlier high-priority items | Resolved | — | Strong | NO IDENTIFIED ISSUE | High | — | None |

---

## REPORT K — Zero-visual-change resolution options

- **N-1 `automation.webp`.**
  - Not covered by any licence. OpenAI's terms assign whatever rights OpenAI has in the output to the user
    but make the user responsible for having the rights to inputs (current terms reported as last updated
    5 March 2026; the official page could not be fetched; the terms in force on the unknown generation date
    may differ).
  - Documentation could narrow the gap: the exact uploaded images, the prompt, the ChatGPT history and the
    output. If no Outcrowd expression survives, the residual risk is low.
  - **Permission from Outcrowd** would resolve it without change.
  - Counsel review is recommended.
  - Keeping it unchanged leaves **material residual risk** until the inputs are known.
- **BR-02 / C-4 overall look and feel.** No licence covers it. Documentation can't cure it. A **written
  licence or permission from Outcrowd** would. A specialist opinion can assess whether the residual risk is
  acceptable. Unchanged UI leaves residual risk: MEDIUM, low confidence.
- **COD-01, LAY-13 and the measurement fingerprint.** No change is necessary for their own sake; changing
  numbers only to break the match would be concealment. They matter only as evidence within BR-02 and N-1.
- **N-2 mock figures, and the other claims.**
  - Either substantiate them (a documented basis or an "illustrative" framing approved by counsel) or
    change the text, which is visible.
  - Documentation resolves only the figures that are true.
  - Purely fictional figures that read as results can't be fixed without a visible change.
- **Cookie text and privacy notice.** Not resolvable without a visible change. Counsel can advise whether the
  current banner is tolerable short term. Residual risk: LOW–MEDIUM.
- **Trademark (BR-05) and design (T-6).** No UI change involved. Professional searches and, if clear,
  filings.
- **Exposure (N-5).** Documentation from the hosting account resolves the evidentiary gap.
- **Media E-2, E-3, E-4, E-8.** Documentation (consents, photographer terms, demo-app licences) resolves
  most of it. For the WhatsApp interface, a brand-guideline check or counsel.

---

## REPORT L — Final launch decision support

1. **Verified resolved:** IMG-01–04 (hero widgets, CTA art), TXT-01 (FAQ), TXT-02 and MIS-01 (fundraising),
   TXT-05 and MIS-03 (10x / 85%), TXT-08 (footer labels), TXT-10 (positioning), COL-03 (exact accents),
   CMP-01 (explode), CMP-02, CMP-03, CMP-06 (code rewrites), COD-06 (licence notices), D-1, D-2, D-3, P0-1–4.
   All with commit and current-file evidence.
2. **Material unresolved:**
   - N-1 `automation.webp` inputs;
   - the combined look and feel (BR-02 / C-4 / T-1 / T-2);
   - N-2 mock performance figures;
   - the inaccurate cookie text and missing privacy notice;
   - unsupported capability and outcome wording.
3. **Registry searches completed:** US Copyright Office public records (Outcrowd, HisenBug).
4. **Registry searches not completed:** USPTO trademarks (WAF); UK IPO trademarks and designs (CAPTCHA);
   WIPO Global Brand Database (CAPTCHA); IP Australia trademarks and designs (HTTP 403); IPO-Pakistan
   (timeout); UAE MoET (login and fee); USPTO Patent Public Search (API unavailable).
5. **Legally less concerning:** individual measurements, colours, gradients, fonts; conventional components
   (pill nav, accordion, floating CTA, cookie card, preloader, footer); interaction parameters; your own
   products, founders, stages narrative, illustrations and media (except N-1).
6. **Needs specialist evaluation:** N-1; the overall get-up in the US (trade dress) and UK / AU / PK (passing
   off, artistic-work layout); exposure under Pakistan's Copyright Ordinance s.66 if any claim arises;
   advertising claims; trademark clearance for HisenBug, EzKhata and AI Voice Agent.
7. **Claims needing verification:** N-2 figures; forecasting; "every call", "react instantly", "fast,
   efficient"; the Founders outcome; "live with customers" (documents); founder roles; 24/7.
8. **Recommended next actions, ranked:**
   1. Recover the `automation.webp` inputs, prompt and output record, and update the register (M-1).
   2. Decide on the Services mock figures.
   3. Commission professional trademark searches (5 jurisdictions; classes 9/35/42, plus 36 for EzKhata).
   4. Obtain a specialist IP opinion on the combined look and feel; consider asking Outcrowd for permission.
   5. Confirm the hosting account and any preview deployments of hisenbug.com.
   6. Decide on the cookie banner and privacy notice.
   7. Assemble an evidence file for owner-confirmed claims.
   8. Complete the media documents (E-2 to E-4, E-8).
   9. Audit the Voice Agent demo's privacy separately.

**The site is not guaranteed copyright-safe, lawsuit-proof or legally cleared.**

---

## REPORT M — Evidence and research sources

- **Repository:** `ip-remediation` @ `d719d54` plus uncommitted D-1/D-2 files and the `src/index.css` docs
  exclusion. Git status and diff saved in `audit/final-gap-audit-2026-10-11/git-*-before.*`. Build and source
  hash manifests: `dist-sha256-before.txt`, `source-sha256-before.txt`.
- **Inspected URLs (2026-10-11):**
  - https://www.outcrowd.io/ (live render, 5 widths);
  - https://www.hisenbug.com/;
  - https://real-estate-agent-blond.vercel.app/;
  - registry endpoints listed in Report F;
  - Wayback CDX API;
  - npm registry (@finsweet/cookie-consent, split-type).
- **Archived artefacts:**
  - `audit/records/original/` (home.html, site.css, 18 SVG, 12 Lottie; fetched 2026-10-08);
  - `audit/final-gap-audit-2026-10-11/lottie-images/` (399 extracted frames);
  - `snap-a27e909/` (baseline source export).
- **Screenshot evidence:**
  - `audit/final-gap-audit-2026-10-11/outcrowd-live/` (118 PNG + capture log);
  - `compare/side-by-side-*.png`;
  - `compare/automation-vs-outcrowd-services-1440.png`;
  - HisenBug baseline: `audit/licensing-baseline-2026-10-10/baseline-v2/post-change/run-1/`.
- **Tools:**
  - `reconcile_counts.py`, `outcrowd-capture.mjs` (this audit);
  - `audit/tools/fingerprint.py`, `textsim.py`, `svgpaths.py` (re-run; outputs saved).
- **Legal sources** (checked 2026-10-11; secondary summaries are labelled):
  - 17 U.S.C. ch. 4 ([copyright.gov](https://www.copyright.gov/title17/92chap4.html));
  - *Thaler v. Perlmutter* cert. denial 2 March 2026 ([Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2026/03/supreme-court-denies-review-in-ai-authorship-case), secondary);
  - UK Data (Use and Access) Act 2025 cookie changes in force 5 Feb 2026 ([Bratby Law](https://bratby.law/data-use-and-access-act-2025-commencement/), secondary);
  - UK DMCCA 2024 Part 4 from 6 April 2025 ([Reed Smith](https://www.reedsmith.com/our-insights/blogs/viewpoints/102k531/are-you-dmcc-ready-supercharged-cma-consumer-law-powers-go-live-on-6-april-2025/), secondary);
  - UK CDPA s.9(3) review ([Stephenson Harwood](https://www.stephensonharwood.com/post/102mpke/uk-government-publishes-report-and-impact-assessment-on-copyright-and-artificial-intelligence-the-debate-continues/), secondary);
  - UAE PDPL and Executive Regulations ([Chambers 2026](https://practiceguides.chambers.com/practice-guides/data-protection-privacy-2026/uae), secondary);
  - Pakistan PDP Bill status ([Chambers 2026](https://practiceguides.chambers.com/practice-guides/data-protection-privacy-2026/pakistan), secondary);
  - Australia small-business exemption ([Sprintlaw](https://sprintlaw.com.au/articles/privacy-law-reforms-small-business/), secondary);
  - OpenAI Terms of Use, output assignment and content responsibility, reported last updated 5 March 2026
    ([provision record](https://conductatlas.com/platform/openai/terms-of-use-row/openai-assigns-output-ownership-to-user/), secondary; the official page returned 403);
  - UAE MoET trademark services ([moet.gov.ae](https://www.moet.gov.ae/en/w/trademark-services-1));
  - US statutes and cases as cited in the October 9 audit (primary; confirm current text with counsel).
- **Limitations:**
  - **Official registers:** every trademark and design register was inaccessible to automation (Report F).
  - **Original files:** Outcrowd's ~85 web raster images were never archived locally; the original
    private source and the Webflow IX2 data were unavailable.
  - **HisenBug evidence:** hosting accounts and hosting logs for hisenbug.com and the demo were
    inaccessible; there is no git history for 2–9 October.
  - **Missing records:** the AI-image inputs, prompt and output record are unavailable.
  - **Rendering:** hover states of the original were not captured.
  - **Not covered:** this report is not legal advice.
