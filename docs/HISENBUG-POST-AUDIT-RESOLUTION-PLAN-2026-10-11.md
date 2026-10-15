``# HisenBug post-audit resolution plan (2026-10-11)

| | |
| --- | --- |
| Builds on | `docs/HISENBUG-OUTCROWD-FINAL-GAP-AUDIT-2026-10-11.md` (findings) and the October 9–10 audits |
| Repository | `ip-remediation` @ `d719d54` plus uncommitted licensing-stage changes. No website file changed in this stage. |
| Live work done | 2026-10-11, 02:38–02:58 PKT (2026-10-10, 21:38–21:58 UTC) |
| Nature | Read-only investigation and recommendations. **Not legal advice; not a clearance.** Nothing here has been implemented. |
| Private evidence | `audit/final-gap-audit-2026-10-11/registry-live/` (search pages, results, screenshots), `tm/`, `outcrowd-live/`, `compare/` |

---

## 1. Investigations completed with live evidence

| Investigation | How | Result |
| --- | --- | --- |
| outcrowd.io rendered at 1440 / 1024 / 768 / 390 / 320 px | Headless Edge 155, DPR 1, fresh profile, cookie banner answered "Deny all" (118 screenshots, 2026-10-11) | Reviewed again for this plan; no further crawl needed (see 1.1) |
| HisenBug current build | Baseline screenshots of the current build (`audit/licensing-baseline-2026-10-10/baseline-v2/post-change/run-1/`) and its tests | Same build hashes as today |
| Live hisenbug.com, DNS, Wayback Machine, search index, connected Vercel account | HTTP, DNS, CDX API, web search, Vercel connector (read-only) | Different site live; nothing archived or indexed; no HisenBug project in the connected account |
| Voice Agent demo page | HTTP | Separate app (microphone, recordings, ElevenLabs), own `/privacy` page |
| IP Australia trade mark register | Normal search page: term typed, Search clicked | **Completed**, see section 2 |
| IP Australia designs register | Normal search page | **Completed**, see section 2 |
| US Copyright Office public records | Public search API | **Completed**, see section 2 |
| `automation.webp` vs archived original artwork | Perceptual hash against 399 images embedded in Outcrowd's Lottie files; visual comparison with the live render | No near-duplicate; one shared motif (segmented orange/violet ring). The original's 85 web rasters were not archived, so they could not be compared. |

### 1.1 Comparison conditions (limits on accuracy)

| | Outcrowd capture | HisenBug capture |
| --- | --- | --- |
| Motion | Animations running | Reduced motion; infinite loops paused at t=0 |
| Clock / randomness | Real | Fixed clock, seeded random |
| First-visit UI | Preloader played; banner shown, then denied | Preloader and banner suppressed by storage keys (captured separately) |
| States | No hover states | Hover states captured separately |
| Browser | Edge 155 headless, DPR 1, sRGB | Same |

These differences affect pixel-level detail (animation phase, scroll-reveal state), not the layout-level
comparison this plan relies on. No more live captures were needed: the remaining questions are legal and
evidential, not visual.

---

## 2. Official searches with verified records

**IP Australia — Australian Trade Mark Search** (official register; searched 2026-10-10 21:40–21:46 UTC;
quick search covers mark words and owner names, all classes):

| Term | Results | Relevant records |
| --- | --- | --- |
| hisenbug | **0** | — |
| hisen bug | **0** | — |
| heisenbug | **0** | — |
| hisenbag | **0** | — |
| ezkhata | **0** | — |
| ez khata | **0** | — |
| outcrowd | **0** | — |
| out crowd | 7 | All phrase marks such as "Stand out from the crowd"; unrelated owners. The only class 42 or 9/42 records are 1076801 (removed) and 1363925 (lapsed). |
| hisense (comparison) | 53 | See below |

The nearest HISENSE records (official detail pages read 2026-10-10 21:46 UTC):

| Number | Mark | Classes | Status | Owner | Relevance |
| --- | --- | --- | --- | --- | --- |
| [857250](https://search.ipaustralia.gov.au/trademarks/search/view/857250) | HISENSE (word) | 9, 11, 37 | Registered/protected (filed 15 Nov 2000) | Hisense Co., Ltd. | Class 9 includes electronic computers |
| [1880471](https://search.ipaustralia.gov.au/trademarks/search/view/1880471) | HISENSE (word) | 7, 9, 11 | Protected (filed 8 Jun 2016) | Hisense Co., Ltd. | Class 9 includes **recorded computer software** |
| [2690732](https://search.ipaustralia.gov.au/trademarks/search/view/2690732) | Figurative (cartoon child, no words) | 7, 9, 11, 38, **42** | Published, awaiting examination (priority 31 Mar 2026) | Hisense Group Holdings Co., Ltd. | Covers chatbot software (9) and SaaS / software development (42). A device mark: no word similarity. Shows Hisense's activity in software classes. |
| 1323397, 1566456, 2005968, 2005969, 2539558 | HISENSE / HISENSE OLED (TV) / HISENSE CANVASTV | 7, 9, 10 | Protected or registered | Hisense Co., Ltd. | Consumer electronics |

**Reading.**
- No identical or near-identical **HISENBUG** or **EZKHATA** mark is on the Australian register.
- The question is HISENSE vs HISENBUG: shared "HISEN-" prefix, different endings and meaning, and partly
  overlapping class 9 software goods.
- Whether that gives rise to an objection or opposition in Australia is a **professional judgement**, not
  settled by this search.

**IP Australia — Australian Design Search** (official; 2026-10-10 21:47 UTC): "outcrowd" **0**, "hisenbug"
**0**, "ezkhata" **0**. This shows no Australian registered design in those names. It does not show freedom
from design rights held under other names or in other countries.

**US Copyright Office public records** (official; 2026-10-10 21:14 and 21:57 UTC; keyword, name and title
fields):

| Term | Result |
| --- | --- |
| outcrowd | 9 keyword hits, all unrelated (songs titled "The Outcrowd", a 1989 sound recording, a 2017 text, a 2023 box set) |
| outcrowd inc | 1 unrelated hit (box set) |
| outcrowd.io, hisenbug, hisen bug, ezkhata, ez khata | 0 |

No registered US work in Outcrowd Inc.'s name was found. Recent registrations may lag the catalogue. Absence
of registration does not remove protection: it affects when a US work can be sued on (§411(a)) and which
remedies are available (§412).

---

## 3. Official searches blocked or incomplete

**Marked NOT VERIFIED.**

| Register | What happened | What would complete it | Who |
| --- | --- | --- | --- |
| USPTO Trademark Search (US) | The search page serves an AWS WAF bot challenge. Not loaded in an automated browser, because completing bot detection is outside this audit's permissions. | Search HISENBUG, HISEN BUG, HEISENBUG, HISENSE (classes 9/35/42), EZKHATA, OUTCROWD and OUT CROWD at tmsearch.uspto.gov in your own browser, and save the result pages | You, or a US trademark attorney |
| USPTO Patent Public Search (design patents) | Page loads, but the Search button stays disabled and the app logs errors when starting its session. A USPTO account will be required from **7 Nov 2026** (site notice). | Search assignee "Outcrowd" and design-patent subclasses for graphical user interfaces and icons (USPC D14/485–495) at ppubs.uspto.gov | You (USPTO account), or counsel |
| UK IPO trade mark search | CAPTCHA (HTTP 403) | Complete the CAPTCHA by hand and search the same terms | You |
| UK registered designs | CAPTCHA (HTTP 403) | As above, owner "Outcrowd" | You |
| WIPO Global Brand Database | ALTCHA CAPTCHA | Complete it by hand; filter for PK, US, GB, AE, AU and Madrid designations | You |
| WIPO Global Design Database (Hague) | Not attempted: the same WIPO platform family uses CAPTCHA | Search holder "Outcrowd" | You |
| IPO-Pakistan trade mark search / e-journals | Search host unreachable (connection timeout). The e-journal page returned the site firewall's "Web Page Blocked … Attack ID" page to this browser. | Try ipo.gov.pk in your normal browser; if the search is unavailable, request an official search through IPO-Pakistan or a Pakistani trademark agent | You or an agent |
| Pakistan registered designs | Not reached (same host) | As above | Agent |
| UAE Ministry of Economy and Tourism | Trademark inquiry needs UAE PASS or a registered login and an **AED 350** fee | Paid official inquiry, or a UAE agent | You or an agent (payment) |
| UAE industrial designs | Not reached | UAE agent | Agent |

No clearance follows from any blocked or incomplete search.

---

## 4. Outstanding copyright and design concerns

| ID | Concern | Evidence | Legal question that remains |
| --- | --- | --- | --- |
| R-01 | `automation.webp` was generated by ChatGPT from Outcrowd reference images, with no established permission (owner statement, 2026-10-11; recorded in the private register M-1) | No near-duplicate in the archived artwork; one shared motif; uploaded files unknown | Whether protected expression from the uploaded images survives in the output (reproduction or adaptation). AI output itself has no US copyright without human authorship (*Thaler*, cert. denied 2 Mar 2026). |
| R-02 | Combined look and feel | Live side-by-side at five widths; 40 shared high-precision measurements; same section order, nav button pair, floating pill, services masonry, row and footer arrangements | Whether the arrangement is a protected artistic or graphic work (UK, AU, PK) or protectable trade dress (US), and whether Outcrowd has goodwill and distinctiveness. Evidence of copying is strong; evidence of an enforceable right is not established. |
| R-21 | One complete copied style rule (cookie card) and identical gradients | `CookieBanner.jsx:30`, `Stages.jsx:121` | Minimal creativity; authorship (Outcrowd or Finsweet) unverified. Low concern on its own. |
| R-14 | Registered designs | AU: none found; all other registers blocked | Unknown |

(IDs match the decision matrix below. Corrected 2026-10-11: this table first used R-03 and R-04, which clashed
with the matrix's R-03 and R-04.)

---

## 5. Decision matrix

Statuses: RESOLVED WITH EVIDENCE · ACTION REQUIRED · OWNER CONFIRMATION REQUIRED · PROFESSIONAL REVIEW REQUIRED
· NO ACTION RECOMMENDED · UNKNOWN.
"UI unchanged?" means whether the issue can be closed without any visible change.

| ID | Item | Status | Exact evidence | Risk / confidence | What actually remains | UI unchanged? | Next action | Who | Evidence that would resolve it |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R-01 | `automation.webp` from Outcrowd references | OWNER CONFIRMATION REQUIRED, then PROFESSIONAL REVIEW REQUIRED | Owner statement 2026-10-11; register M-1; `compare/automation-vs-outcrowd-services-1440.png`; Lottie hash check | MEDIUM / Low | Unknown inputs; no permission | **Yes**, if counsel finds no protected input expression survives, or Outcrowd grants permission. Otherwise no. | Export the ChatGPT conversation (prompt, uploaded files, output, date); give it to counsel for side-by-side review | Owner, then IP counsel | Uploaded files + prompt + output record, plus a written opinion or written permission |
| R-02 | Overall look and feel vs Outcrowd | PROFESSIONAL REVIEW REQUIRED | Gap audit Report D; `compare/side-by-side-*.png`; fingerprint 40/40 distinct | MEDIUM / Low | Open legal question; no right shown, no permission | **Yes**, only by permission or a favourable opinion; neither cures actual infringement if a court found it | Written IP opinion (Pakistan + US; UK and AU if marketed there); optionally ask Outcrowd for written permission | IP counsel; owner for any approach to Outcrowd | Signed permission/licence, or a written opinion accepting the residual risk |
| R-03 | Mock figures in the Services art ("48.2k monthly users", "+18% retention", "99.98% uptime", "✓ 128 tests", "✓ lighthouse 100") | **RESOLVED WITH EVIDENCE** (2026-10-11; uncommitted) | Owner confirmed the figures were not true ("we don't have users") and approved the change. `ServiceArt.jsx:100,103,124,191,192` now read "Users", "Retention", "Uptime checks", "✓ tests passed", "✓ performance checked". See the implementation log. | Was MEDIUM; now NO IDENTIFIED ISSUE for these figures / High | The small captions under the first two labels still say "monthly users" and "retention" (no numbers, so no claim; wording is redundant) | No — small, approved visible text change | Commit when you approve | Owner | Done: build proof, fit check and screenshot comparison (implementation log) |
| R-04 | Cookie banner text ("understand how it is used and improve our outreach") | ACTION REQUIRED | `content.js:270-271`; tracking audits: no cookies, no analytics, no third-party requests | LOW–MEDIUM / High | The statement is factually false | **No** | Approve accurate wording, or removal of the banner | Owner (counsel optional) | Banner matches actual behaviour |
| R-05 | No privacy notice | ACTION REQUIRED | No notice or link in the site; e-mail contact and host logs process personal data | LOW–MEDIUM / Medium | Missing notice (UK GDPR Art. 13; UAE PDPL; others vary; Pakistan has no comprehensive statute yet) | **No** (adds a link or page) | Supply the facts (hosting provider, e-mail provider, retention, legal entity); draft a notice | Owner, then counsel | Published notice that matches practice |
| R-06 | "pick up every call", "react instantly", "fast, efficient", "run themselves" | ACTION REQUIRED | `content.js:89,93,97` | LOW–MEDIUM / Medium | Absolute or performance claims without evidence | **No**, unless substantiated | Substantiate or approve wording | Owner | Test data or approved text |
| R-07 | Forecasting capability (chip, "Stock forecast", Stages sentence) | OWNER CONFIRMATION REQUIRED | `ServiceArt.jsx:44`, `StageArt.jsx:216`, `content.js:79` | LOW–MEDIUM / Medium | Unconfirmed capability | **Yes**, if confirmed | Confirm whether forecasting is offered | Owner | Written confirmation + a project or demo showing it |
| R-08 | Founders note outcome ("The outcome is less manual effort and lower costs") | ACTION REQUIRED | `content.js:169` | LOW–MEDIUM / Medium | Stated as a delivered result | **No**, unless documented | Provide results evidence or approve wording | Owner | Client results file or approved text |
| R-09 | "Live with customers" / "In use with customers", EzKhata features and subscription, 24/7 | OWNER CONFIRMATION REQUIRED | `content.js:54,130,139-142,155,215`; founders' confirmation 2026-10-10 (no documents) | LOW / Medium | Owner statement only | **Yes** | Put supporting documents on file | Owner | Contracts or invoices (redacted), service logs, monitoring records |
| R-10 | Founder role titles | OWNER CONFIRMATION REQUIRED | `content.js:174-176` (roles not explicitly confirmed on 10 Oct) | LOW / Medium | Unconfirmed role descriptions | **Yes** | Confirm the three roles | Owner | Written confirmation |
| R-11 | Booking modal: "You're on the calendar" while nothing is sent | ACTION REQUIRED | `BookCallModal.jsx:92-94` | LOW / High | Headline misleading despite the fine print; owner instruction keeps it unchanged | **No** | Owner decision (deliberately deferred) | Owner | Approved change, or a decision to accept the risk |
| R-12 | HISENBUG trademark clearance | PROFESSIONAL REVIEW REQUIRED | AU: 0 identical; HISENSE word marks in AU class 9 incl. software; US/UK/PK/UAE/WIPO blocked | UNKNOWN / Low | Clearance incomplete; HISENSE proximity unassessed | **Yes** | Complete the blocked searches (section 3); agent's opinion on HISENSE; decide filings (9, 35, 42; 36 if EzKhata is financial) | Owner + trademark agent | Search reports for all 5 jurisdictions + agent's opinion |
| R-13 | EZKHATA / AI Voice Agent names | PROFESSIONAL REVIEW REQUIRED | AU: 0 for ezkhata / "ez khata"; others blocked; "AI Voice Agent" is descriptive | UNKNOWN / Low | As R-12 | **Yes** | Include in the agent's search | Agent | Search reports |
| R-14 | Outcrowd registered designs / design patents | UNKNOWN | AU designs: 0; US, UK, WIPO, PK, UAE blocked | UNKNOWN / Low | Unsearched registers | **Yes** | Manual searches (section 3) or counsel | Owner / counsel | Search results recorded |
| R-15 | Outcrowd copyright registration (affects US remedies only) | NO ACTION RECOMMENDED | Copyright Office: no record in Outcrowd Inc.'s name | Informational | Recent filings may not show | **Yes** | Re-check before any response to a claim | Counsel if needed | — |
| R-16 | Earlier public exposure of cloned builds | OWNER CONFIRMATION REQUIRED | Gap audit Report I: none found in accessible records; hisenbug.com hosted on an account not available here; no git history for 2–9 Oct | UNKNOWN / Medium | Hosting account and previews unchecked | **Yes** | List all Vercel (or other host) projects and deployments, including previews, in the account that serves hisenbug.com; check for shared tunnel or preview links | Owner | Deployment list with dates and URLs |
| R-17 | WhatsApp interface in the EzKhata screenshot | PROFESSIONAL REVIEW REQUIRED | `ezkhata-chat.webp` (register M-2) | LOW / Medium | Third-party interface and brand guidelines | **Yes**, if referential use is acceptable | Check WhatsApp brand guidelines; ask counsel | Owner / counsel | Written note of compliance |
| R-18 | Other media documents (EzKhata data and blurred parties, video, founder consents and photographer, icons) | OWNER CONFIRMATION REQUIRED | Register M-2 to M-6 (PENDING) | LOW / Low | Documents not on file | **Yes** | Provide consents, photographer terms, test-data confirmation, source files | Owner | Documents logged in the register |
| R-19 | GSAP: no use in a no-code animation-builder product | OWNER CONFIRMATION REQUIRED | GSAP Standard licence (reviewed 10 Oct) | LOW / High | Owner confirmation only | **Yes** | Confirm in writing | Owner | Confirmation in the register |
| R-20 | Voice Agent demo privacy | UNKNOWN | Demo page: microphone, recordings, ElevenLabs, `/privacy` | UNKNOWN | Not audited | **Yes** (separate system) | Separate privacy review of the demo | Owner / counsel | Reviewed notice and data map |
| R-21 | Measurement fingerprint, copied cookie rule, identical gradients, retained interaction parameters | NO ACTION RECOMMENDED (on their own) | Gap audit Report E | LOW (evidentiary HIGH) / High | Evidence of copying; not an independent violation | **Yes** | None; don't change values to hide them. Considered within R-02. | — | — |
| R-22 | Hero widgets, FAQ, fundraising and other removed claims, original colours, explode and spotlight code, licence notices, README | RESOLVED WITH EVIDENCE | Commits `6480ed2`, `bdec1b2`, `b861453`, `0a9d0b6`, `020b4c6`, `017442a`; greps and similarity checks in the gap audit; D-1/D-2 hash checks | — / High | — | — | Commit the uncommitted licensing-stage files when you approve | Owner | — |

---

## 6. What can be resolved without visual changes

- **Possible with evidence, permission or professional work alone:** R-01 (if the inputs are shown harmless,
  or permission is given), R-02 (permission or opinion), R-07, R-09, R-10, R-12–R-19, R-21.
  - Documentation proves what is true; it does not cure an actual infringement.
  - Permission cures it only to the extent the permission covers it.
- **Cannot be resolved invisibly if the facts don't support the current text:** R-03, R-04, R-05, R-06,
  R-08 and R-11.
  - These statements are unsupported or inaccurate today.
  - They are not marked resolved because a fix would be visible.
  - R-05 also needs at least a link or page.

## 7. Claims and privacy statements that need correction or evidence

- **Correction needed, unless evidence is produced:**
  - ~~the Services mock figures (R-03)~~ — done 2026-10-11 (implementation log);
  - the cookie banner text (R-04);
  - "pick up every call", "react instantly", "fast, efficient", "run themselves" (R-06);
  - the Founders outcome sentence (R-08);
  - the booking-modal headline (R-11).
- **Evidence needed** (wording can stay if supported): forecasting (R-07); "live with customers", EzKhata
  features and subscription, 24/7 (R-09); founder roles (R-10).
- **Missing:** a privacy notice (R-05).

## 8. Owner's next actions, ranked

1. **Export the ChatGPT record for `automation.webp`** (prompt, uploaded Outcrowd images, output, date,
   plan) and give it to IP counsel (R-01).
2. ~~**Decide on the Services mock figures** (R-03)~~ — **done 2026-10-11**: figures replaced with labels
   (implementation log).
3. **Engage a trademark agent** to run the blocked searches (USPTO, UK IPO, IPO-Pakistan, UAE, WIPO) and
   advise on HISENSE vs HISENBUG and on EZKHATA (R-12, R-13). Run the USPTO and UK searches yourself before
   7 Nov 2026 if you want to avoid the new USPTO account requirement for patent search (R-14).
4. **Commission a written IP opinion** on the combined look and feel and N-1, covering Pakistan and the US
   (plus the UK and Australia if you market there). Decide whether to ask Outcrowd for written permission
   (R-02).
5. **Identify the hosting account for hisenbug.com** and list every deployment and preview (R-16).
6. **Decide the cookie banner wording and privacy notice**, and supply the facts for the notice (R-04,
   R-05).
7. **Assemble a claims evidence file** (customers, features, 24/7, forecasting, roles) and decide the
   wording you can't support (R-06 to R-10).
8. **Complete the media documents** (R-17, R-18) and the GSAP confirmation (R-19).
9. **Arrange a separate privacy review** of the Voice Agent demo (R-20).
10. **Approve committing** the licensing-stage files (notices, README, `docs/`) when ready (R-22).

---

## Build verification

Production build hashes were recorded before and after writing this report:
- before: `audit/final-gap-audit-2026-10-11/dist-sha256-plan-before.txt`;
- after: `dist-sha256-plan-after.txt`.

Result: **31 of 31 output files are byte-identical**, and every source and `public/` file matches the
manifest taken at the start of the gap audit. No source, asset, component, animation or interaction was
changed. The only project files written in this stage are this report and private records in
`audit/`.

(That result describes the plan as written. The implementation below deliberately changes the build.)

---

## Implementation log

### 2026-10-11 — R-03: mock figures in the Services illustrations

**Approval.** The owner stated the figures were not true ("we don't have users") and approved exactly these
replacements:

| Line | Before | After |
| --- | --- | --- |
| `ServiceArt.jsx:100` | 48.2k | Users |
| `ServiceArt.jsx:103` | +18% | Retention |
| `ServiceArt.jsx:124` | 99.98% uptime | Uptime checks |
| `ServiceArt.jsx:191` | ✓ 128 tests | ✓ tests passed |
| `ServiceArt.jsx:192` | ✓ lighthouse 100 | ✓ performance checked |

**Deviation (approved).** The first approved label, "Uptime monitored", was too long: at every width it ran
2.6–3.2 SVG units past the orange card's edge (`r03/uptime-zoom-1440.png`). Candidates were measured in the
page. The owner chose "Uptime checks", which leaves 14.5–15.2 units of space (the original label left 13.9).

**Verification** (evidence in `audit/final-gap-audit-2026-10-11/r03/`):

| Check | Result |
| --- | --- |
| Source diff | `ServiceArt.jsx` only: 5 lines, text content only; no attribute, position, size, colour or animation changed |
| Build | Passes. CSS `index-vaqCCB-h.css` byte-identical. 5 lazy chunks and `index.html` identical in content apart from file names (hash-proven). In the main bundle, putting the 5 old strings and the old chunk names back reproduces the previous bundle byte for byte (`f7a0eb16f7aa2aac`), so **the 5 strings are the only change in the whole build**. |
| No figures left | 0 matches for 48.2k, +18%, 99.98, 128 tests, lighthouse in `src/` |
| Labels fit their cards | All 5 inside their cards at 1440 / 1024 / 768 / 390 / 320 (`r03/fit-check.json`) |
| Layout | Page heights identical to the baseline at all 5 widths (18806 / 14568 / 15104 / 15086 / 15786 px); no horizontal overflow; the same 3 Stages shots unsettled as in the baseline |
| Screenshots (151 static shots vs both baseline runs) | Strong changes not explained by baseline noise occur **only** in the Services slices, at the label positions (`r03/ba-*.png`), plus the floating "Book a call" label (known sub-pixel noise). At 390 px a chat bubble in the Chatbots art differs. That illustration's animation code is byte-identical (bundle proof above), so this is capture timing of an infinite CSS loop. |

**Not done.** The captions under the first two labels still read "monthly users" and "retention"; changing
them was not part of the approval. Nothing is committed.
