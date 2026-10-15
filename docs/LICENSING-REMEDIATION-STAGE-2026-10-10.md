# Licensing remediation stage — D-1 to D-4 (2026-10-10)

Stage report for the zero-visual-change licensing remediation approved after the read-only licensing audit.
The work ran 2026-10-10 to 2026-10-11 (local time).

This report contains no private personal information or ownership evidence. The detailed evidence is kept
in the git-ignored `audit/` folder. Paths below point to it.

## 1. Stage overview

| Item | Record |
| --- | --- |
| Objective | Close the zero-visual-change gaps found by the read-only licensing audit without changing anything a visitor can see or do |
| Approved tasks | D-1 notices completion, D-2 README correction, D-3 baseline preservation, D-4 media provenance register |
| Not in scope | Any UI, CSS, asset, animation, dependency or behaviour change; design-similarity remediation; media replacement |
| Branch | `ip-remediation` |
| Starting commit | `d719d546aa9124267be59006576048177257672f` (tags `final-fixes` and `licensing-audit-baseline`) |
| Final status | D-1, D-2, D-3 and D-4 implemented and verified. Nothing committed, pushed or deployed. |

## 2. Changes implemented

### D-1 Third-party notices completed

- **`scripts/third-party-notices.mjs`.** The generator now also includes the three build tools that put code
  of their own into the shipped bundle. Their exact installed versions are read from each package's
  `package.json`.
  - **tailwindcss 4.3.3:** its base styles (preflight) are in the CSS.
  - **vite 8.3.3:** its module-preload helper and polyfill are in the main JS.
  - **rolldown 1.2.13:** its module runtime chunk ships as `rolldown-runtime-*.js`.
- **Vite licence text.** Only the "Vite core license" section of Vite's `LICENSE.md` is included. The rest
  of that file lists the dependencies bundled into Vite's own Node.js tooling, and none of that code ships
  in the website. The generator stops with an error if Vite's licence file layout changes, rather than
  silently dropping text.
- **Rolldown licence text.** Rolldown's `LICENSE` is included, followed by its `THIRD-PARTY-LICENSE`
  (Rollup contributors, MIT; Evan Wallace / esbuild, MIT). Rolldown's licence says parts of it derive from
  those libraries, and the shipped runtime helpers follow that pattern.
- **`public/THIRD_PARTY_NOTICES.txt`.** Regenerated with `npm run notices`. It went from 11 to 14 package
  sections (358 to 483 lines). Lines were only added; no existing notice was removed or altered. The file
  is copied unchanged into `dist/`.

### D-2 README corrected

`README.md` is a repository document; it isn't part of the website build output.

| Before | Problem | After |
| --- | --- | --- |
| "An original … site" | Unverified claim of original authorship | A **Provenance** paragraph: the layout, measurements and motion were first built from a third-party website; a remediation is in progress; the design measurements, several gradients and animation settings still derive from it; the private audit records are in `audit/`; the site shouldn't be described as original until review is complete |
| "no stock images, video or Lottie files" | Inaccurate: the showreel uses raster images and a video, and the founders section uses photos | Graphics and media are described as they are; their provenance records are noted as incomplete |
| Placeholder-content bullet | Out of date: content was confirmed by the founders on 2026-10-10 | Points to the confirmation comments in `content.js` |
| Interactions table and structure | Referred to files that no longer exist (`ExplodeButton`, `useSectionTheme`, `Testimonials`/Swiper) and omitted current ones | Lists only files that exist, checked against `src/` |
| Animation note | "`transform` / `opacity` only" was inaccurate | States the two exceptions (nav width, fill-button clip-path) and where reduced motion is checked |
| — | — | Adds `npm run notices` and a Licences bullet |

No git history was rewritten. `HANDOFF.md`, the audit records and the leftover code identifiers that record
the cloning history were left untouched.

**Tailwind side effect, found and handled.** Tailwind scans the README for class names. The old README
contained the word "collapse", which is the only source of an existing `.collapse{visibility:collapse}`
rule in the production CSS. No component uses that rule. The first draft of the new README dropped the
word, and the CSS (and therefore every JS and HTML hash) changed. The README now says "Nav pill collapse on
scroll", which is accurate, and the CSS is byte-identical again (section 5). The README fix needed no
Tailwind configuration change. Removing the unused rule would also be invisible, but it would change the CSS file, so it was not
done.

### Report safeguard: `docs/` excluded from Tailwind's scan

- **What happened.** Adding this report to `docs/` made Tailwind generate one extra rule from the word
  "table": `.table{display:table}`. The CSS hash changed, and with it the JS and HTML hashes.
- **Fix.** `src/index.css` gained `@source not "../docs";` directly after `@import "tailwindcss";`, with a
  one-line comment. This is the only change to a website source file in this stage, and it was made under
  the brief's instruction to exclude `docs/` if the report changed the CSS.
- **What it does.** The rule only removes the `docs/` folder from Tailwind's class scan. `src/` and
  `index.html` are still scanned.
- **Verification.**
  - After the exclusion, all CSS, JS and HTML hashes are identical to the baseline (section 5). That shows
    the rule removed no class used by the UI.
  - The dev server still serves the CSS without errors, without the `.table` rule and with the existing
    `.collapse` rule.

### D-3 Baseline evidence preserved

- **Location.** All capture evidence was copied from the temporary scratchpad to
  `audit/licensing-baseline-2026-10-10/baseline-v2/`. That folder is git-ignored (`.gitignore`: `audit/`,
  confirmed with `git check-ignore`).
- **What was copied.** Screenshot runs 1 and 2, the interaction, first-visit and animation captures, the
  capture script (`capture.mjs`), the comparison scripts (`compare.py`, `hashcmp.py`), logs, the
  determinism report, the browser-test outputs and the source scans.
- **Integrity check.** 503 files, 47 MB. Every copied file was verified against a SHA-256 manifest of the
  scratchpad originals, and all matched. The manifest is kept as `baseline-v2/MANIFEST-sha256.txt`.
- **Durability.** The copies live in the project folder, outside the temporary directory. They don't depend
  on the scratchpad, so they survive its removal.
- **Earlier evidence untouched.** The earlier baseline files in `audit/licensing-baseline-2026-10-10/`
  (run-1, run-1m, run-2, run-A, `dist-sha256.txt`, scans) were not modified.
- **Post-change evidence.** Stored in the same folder: `post-change/run-1/`, `post-change/tests/`,
  `post-change-classified.txt` and `post-change/investigate/`.

### D-4 Media provenance register

- **Created.** `audit/records/MEDIA-PROVENANCE-REGISTER.md` (private, git-ignored).
- **Contents.** One entry per asset group (M-1 to M-6). Each entry records the file's dimensions, size,
  SHA-256, where it's used, its git history and what was observed in it.
- **Unknowns.** Every unknown source, permission and licence is marked **PENDING**, with the question
  number (E-1, E-2, E-3, E-4, E-8).
- **No invented answers.** None of the owner's answers were assumed. Where an existing record and the file
  disagree, the register records both and leaves the item unresolved. For example, a code comment calls the
  chat screenshots "real", while the visible names look like test data.
- **Answer log.** An empty, dated answer log is ready for your answers.

## 3. Licensing compliance

| Package | Version | Licence | Notice in `THIRD_PARTY_NOTICES.txt` | Status |
| --- | --- | --- | --- | --- |
| tailwindcss | 4.3.3 | MIT | **Added in this stage** | Notice gap closed |
| vite | 8.3.3 | MIT | **Added in this stage** (core licence) | Notice gap closed |
| rolldown | 1.2.13 | MIT (plus its third-party MIT notices) | **Added in this stage** | Notice gap closed |
| react, react-dom, scheduler | 19.3.0, 19.3.0, 0.28.0 | MIT | Present before | Compliant |
| framer-motion, motion-dom, motion-utils | 14.0.0 | MIT | Present before | Compliant |
| lenis | 1.3.26 | MIT | Present before | Compliant |
| lucide-react | 1.52.0 | ISC (+ Feather MIT) | Present before | Compliant |
| @fontsource-variable/plus-jakarta-sans | 5.3.0 | OFL-1.1 | Present before | Compliant |
| tslib | 2.8.1 | 0BSD | Present before (no tslib code in the bundle) | Nothing required |
| gsap | 3.15.0 | GSAP Standard "No Charge" | Present before (header); licence banners kept in the built chunk | Compliant on the terms reviewed |

No package was installed, removed or upgraded. `package.json` and `package-lock.json` are unchanged.

**Remaining licensing concerns, not resolved by this stage:**

- **Notices file not linked from the pages.** It ships with the site, which is the usual way to meet MIT,
  ISC and OFL notice terms, but that hasn't been legally confirmed.
- **GSAP terms.** Webflow may terminate the GSAP licence for non-compliance, and Webflow's Terms of Service
  (which set the governing law) haven't been reviewed. The licence also excludes using GSAP in a no-code
  animation builder that competes with Webflow (question E-7).
- **Vite licence scope.** The decision to include only Vite's core licence rests on the finding that the
  bundled-dependency code isn't shipped. That was checked by inspecting the shipped helper, not by a full
  provenance audit of Vite's source.

## 4. Media ownership

**Confirmed:**

- Inline SVG artwork is first-party code with no matches to the third-party site's artwork.
- The font is licensed under OFL-1.1.
- The voice-agent videos contain no audio track.
- No media is loaded from external hosts.
- None of the third-party site's media files are used.

**Unknown provenance:** all raster media. Every item is **PENDING** in the private register.

| Register entry | Asset | Open question |
| --- | --- | --- |
| M-1 | `media/automation.webp` | E-1: generating tool, account plan, date, inputs, terms |
| M-2, M-3 | `media/ezkhata-chat.webp`, `media/ezkhata-bill.webp` | E-2: product ownership; real or test data; who is blurred; WhatsApp/Meta interface review |
| M-4 | `media/voice-agent.*` | E-3: who recorded it; demo-app ownership; whether "Premier Realty Group" is fictional; demo-app font and icon licences |
| M-5 | `team/cofounder-1..3.webp` | E-4: written consents; photographer and rights; any AI editing |
| M-6 | `og-image.png`, favicons, app icons | E-8: who made them; source files |

No media file was changed, replaced, recompressed or moved.

## 5. Visual preservation verification

### Build hashes

- **Before.** Recorded before any change by a fresh build at the starting commit:
  `audit/licensing-baseline-2026-10-10/baseline-v2/pre-change-dist-sha256.txt`. These 31 files were
  identical to the earlier baseline `audit/licensing-baseline-2026-10-10/dist-sha256.txt`.
- **After.** Final build: see `final-dist-sha256.txt` in the same folder.

| File group | Files | Result |
| --- | --- | --- |
| `index.html` | 1 | Identical |
| CSS (`index-vaqCCB-h.css`) | 1 | Identical |
| JS (index, framer-motion, gsap, rolldown-runtime, Awards, Clients, Faq, Founders, SecondaryButton) | 9 | Identical |
| Fonts (3 × woff2) | 3 | Identical |
| Images and icons (media, team, og-image, favicons, app icons) | 13 | Identical |
| Video (mp4, webm) | 2 | Identical |
| `site.webmanifest` | 1 | Identical |
| `THIRD_PARTY_NOTICES.txt` | 1 | **Changed, as intended:** `157d1417b638eee3…` → `5f775f27caf82ba0…` |

Result: 30 of 31 files are byte-identical. The only difference is the approved notices file.

Each change was verified separately as it was made:

| Check | Files identical | Note |
| --- | --- | --- |
| After D-1 | 30 / 31 | Only notices changed |
| After the first README draft | Failed | `.collapse` rule dropped; corrected, see D-2 |
| After the corrected README | 30 / 31 | Only notices changed |
| After this report was added to `docs/` | Failed | `.table` rule added; see the report safeguard |
| After `@source not "../docs"` (final) | 30 / 31 | Only notices changed; identical to both recorded baselines |

### Screenshot comparison

The post-change capture used the same script and conditions as the baseline:

- headless Edge 155.0.4283.45, device scale 1, sRGB, scrollbars hidden;
- timezone Asia/Karachi, locale en-US, fixed clock, seeded random;
- Plus Jakarta Sans Variable loaded at every width;
- widths 1440, 1024, 768, 390 and 320.

**Page-level facts are identical to the baseline at every width:**

- page heights 18806, 14568, 15104, 15086 and 15786 px;
- no horizontal overflow;
- the same three static shots fail to settle (1024 slice 08, and 768 slices 07 and 08, all in the Stages
  cards).

| Capture | Shots | Identical to a baseline run | Remaining differences |
| --- | --- | --- | --- |
| Static (full-page slices + sections) | 151 | 124 | 27 |
| Interaction | 20 | 13 | 7 |
| First visit (preloader, cookie banner) | 14 | 3 | 11 |
| Animation frames (hero, showreel) | 40 | 0 | 40 |

**Static differences.** All 27 belong to the classes that already differed between the two baseline runs,
before any change:

- the floating "Book a call" label (sub-pixel position);
- founder-photo areas (most pixels within 1–10 out of 255);
- the 1024 px label area;
- the Stages cards (unsettled);
- the raster showreel image.

Two shots needed a closer look: `slice-03` at 1440 and at 1024, which were identical between the two
baseline runs.

- The difference lies entirely within the raster `automation.webp` image.
- At 1440, 331,256 of the 356,034 changed pixels differ by 1 out of 255, and the largest difference is 23.
- Text, labels and layout pixels are unchanged.
- The before/after/difference sheets are in `post-change/investigate/`.

This is the same image-compositing variation seen on the founder photos. The served HTML, CSS, JS and image
bytes are identical, so the page can't render differently from source.

**Interaction, first-visit and animation frames.** These are timed by the wall clock and only have one
baseline run, so pixel equality isn't expected. They were checked by geometry and timing instead:

| Check | Baseline | After |
| --- | --- | --- |
| Nav collapse, 1440 | 613 → 341 px, settled 679 ms | 613 → 341 px, settled 676 ms |
| Nav collapse, 1024 | 436 → 242 px, 704 ms | 436 → 242 px, 696 ms |
| Nav collapse, 768 | 327 → 181 px, 709 ms | 327 → 181 px, 707 ms |
| FAQ open, 1440 / 1024 / 768 / 390 / 320 | 101 / 71 / 54 / 122 / 161 px, 551–578 ms | Same heights, 503–570 ms |
| Showreel first scene | "AI Voice Agent" | "AI Voice Agent" |

The geometry is identical. The timing spread (under 55 ms) is sampling jitter.

## 6. Testing results

| Check | Result |
| --- | --- |
| `npm run build` | Passed (exit 0). The build was run after each change and again after this report was added. |
| `npm test` | The project has no test script. The six existing browser tests in `audit/tools/` were run instead. |
| Tracking and privacy (`tracking-audit.mjs`, production preview) | Exit 0. 0 third-party requests and no POST or beacon requests in any of the 3 scenarios; no console errors; the storage keys match the baseline |
| Footer access (`footer-access.mjs`, 9 viewports) | Exit 0. Output byte-identical to the baseline: every link reachable by tap and by keyboard, none covered |
| Floating "Book a call" step-aside (`fab-test.mjs`) | Exit 0. "Controls fully blocked while shown: none" at every width. Sweep switch counts vary by 1–2 between runs, as they did in the baseline runs. |
| Floating button vs product cards (`fab-products-test.mjs`) | Exit 0. The creep distances vary between runs by the same amounts as the two earlier baseline runs (for example 1440: hidden 18 / 30 / 36 px across three runs). |
| Showreel scene bars (`bars-final.mjs`, 6 widths) | Exit 0. Click 4/4, tap above the bar 4/4, keyboard 3/3, focus ring present, the fill animates |
| Sections: FAQ, milestones, showreel, footer, nav (`sections-shots.mjs`, 6 widths) | Exit 0. FAQ open and close 9/9 at every width; link targets resolve; no page overflow; no console errors |

**Results that differ from the latest baseline run, all checked:**

- **Clicking the "AI Voice Agent" bar showed "HisenBug Brand".** This happened at one width. The older
  baseline run gave the same result at two widths, so it's an existing timing behaviour of the test.
- **The nav pill width read 325 px at 1440 (and 160 px at 768).** The baseline readings were 563 and
  277 px, and the older baseline's were 368 and 183 px. The test measures the pill while it's still
  animating, so the reading depends on timing. The "clipped" notes come from links that are mid-collapse.
  The deterministic capture measured identical collapse geometry and settle times (section 5).

No functional regression was found. All outputs are in
`audit/licensing-baseline-2026-10-10/baseline-v2/post-change/tests/`.

**Interaction checks in the capture.** Identical geometry for the nav collapse, the FAQ open state, the
booking modal, the mobile menu, keyboard focus, the preloader and cookie banner on first visit, and the
hero and showreel animation frames (section 5).

## 7. Git changes

Tracked files changed (working tree only):

| File | Task | Ships in the website? |
| --- | --- | --- |
| `scripts/third-party-notices.mjs` | D-1 | No (build script) |
| `public/THIRD_PARTY_NOTICES.txt` | D-1 | Yes (text file, not linked from the pages) |
| `README.md` | D-2 | No |
| `src/index.css` | Report safeguard: one `@source not "../docs";` line plus a comment | The built CSS is byte-identical |
| `docs/LICENSING-REMEDIATION-STAGE-2026-10-10.md` (new) | Report | No |

Private, git-ignored files created:

- `audit/licensing-baseline-2026-10-10/baseline-v2/`: D-3 evidence and post-change evidence.
- `audit/records/MEDIA-PROVENANCE-REGISTER.md`: D-4.

Untouched:

- `.claude/launch.json`: still modified from before this stage; SHA-256 `520129E4…5766`, unchanged.
- `package.json`, `package-lock.json`, everything in `src/` except the one line in `index.css`,
  `index.html`, `vite.config.js` and every media file.

**Nothing was committed, pushed or deployed.** HEAD is still `d719d54`.

## 8. Outstanding risks

**Resolved in this stage, with evidence:**

- Missing licence notices for tailwindcss, vite and rolldown (D-1; the notices file diff and the hashes in
  section 5).
- The README's inaccurate claim of original authorship and its stale references (D-2).
- The baseline evidence existing only in temporary storage (D-3; hash-verified copy).
- No media provenance record (D-4). The register now exists, but its content is still PENDING; see below.

**Unresolved or unverified. Not cleared:**

- **Design-specification copying.** The measurements, the cookie-banner and stage gradients, and the
  scroll-text, smooth-scroll and nav animation settings were transcribed from the third-party site (audit
  IDs CC-1 to CC-7). They are unchanged by design in this stage. Resolving them needs legal review,
  permission or an approved visual change (E-5).
- **Media rights.** All raster media is PENDING (E-1, E-2, E-3, E-4, E-8). That includes the third-party
  WhatsApp interface in the EzKhata screenshot.
- **Earlier deployments.** It's unknown whether any earlier build that contained more literal copying was
  ever public (E-9).
- **GSAP.** The Webflow Terms of Service haven't been reviewed. No-code-builder use needs confirmation (E-7).
- **Legal confirmation.** No lawyer has reviewed the notice approach or the overall look-and-feel exposure.

HisenBug is **not** declared free of copyright or licensing risk.

## 9. Next recommended stage

Not started. Each item needs your approval.

1. Answer E-1, E-2, E-3, E-4 and E-8 so the provenance register can be completed with supporting documents.
2. Decide E-5, the remaining design-specification similarity. Options: a legal opinion for the target
   markets, permission from the third-party site's owner, or a separately approved redesign that is
   allowed to change visuals.
3. Answer E-9 (earlier public deployments) and E-7 (GSAP use).
4. Optional, for a later stage: also exclude `README.md` (and other repository documents) from Tailwind's
   scan, so wording changes there can never alter the CSS. This would remove the unused
   `.collapse{visibility:collapse}` rule, which comes only from the README. That changes the CSS bytes
   without any visible effect, so it needs its own approval and verification.
