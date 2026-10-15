# HW1 — Production Portfolio

**Course:** Web Application Development  
**Lab:** Modern Web Foundations & AI-Assisted Engineering

## 1. Objective

Build a responsive developer portfolio using semantic HTML5, modern CSS, and Vanilla JavaScript. Verify accessibility, keyboard navigation, security controls, and performance.

## 2. Mandatory milestones

### M1 — WCAG 2.2 AA audit
- [ ] Review semantic landmarks and heading hierarchy.
- [ ] Ensure the page has one primary `h1`.
- [ ] Check text contrast against WCAG 2.2 AA requirements.
- [ ] Verify the skip link and visible keyboard focus.
- [ ] Check both light and dark themes, if both are implemented.
- [ ] Record issues found, fixes applied, and verification results.
- **Required commit:** `fix(a11y): contrast & landmarks`

### M2 — Focus trap audit
- [ ] Test `Tab` and `Shift+Tab` navigation throughout the page.
- [ ] Test keyboard activation of links and buttons.
- [ ] Check that focus is not trapped unintentionally.
- [ ] If a modal/dialog is implemented, verify focus entry, exit, and restoration.
- [ ] Record the audit result. If no modal exists, document that fact rather than adding one solely for this audit.
- **Required commit:** `fix(nav): keyboard trap prevention`

### M3 — Strict CSP and zero inline handlers
- [ ] Remove inline JavaScript event handlers such as `onclick="..."`.
- [ ] Use external JavaScript files and `addEventListener`.
- [ ] Configure a Content Security Policy (CSP) suitable for the actual implementation.
- [ ] Test the page and inspect the browser console for CSP violations.
- [ ] Confirm required assets still load and no unauthorized external scripts are used.
- **Suggested commit:** `fix(security): enforce CSP and remove inline handlers`

### M4 — Lighthouse audit and asset optimization
- [ ] Run Lighthouse and save the actual report or screenshots.
- [ ] Investigate audit failures and optimize assets/code.
- [ ] Give images explicit dimensions where appropriate to reduce layout shifts.
- [ ] Use suitable image formats and lazy-load non-critical images where appropriate.
- [ ] Re-run Lighthouse after changes and record the real scores.
- **Required commit:** `perf: optimize assets`
- **Important:** Do not claim a score of 100 unless the report actually shows it.

## 3. Recommended additional atomic milestones

The lab slides emphasize small, independently verifiable commits. Use additional commits as needed so that the history shows the actual development process.

- [ ] Define project contracts and work breakdown.
- [ ] Build semantic HTML structure.
- [ ] Implement CSS reset and design tokens.
- [ ] Build responsive layout with Grid/Flexbox.
- [ ] Implement accessible theme switching, if included.
- [ ] Perform final integration and regression tests.

Suggested initial commit:
`docs(spec): define portfolio contracts and WBS`

## 4. Project rules

- Use semantic HTML5, modern CSS, and Vanilla JavaScript ES6+.
- Do not use jQuery, Bootstrap, Tailwind, or external script CDNs.
- Use `const` by default and `let` only when reassignment is needed.
- Do not use inline JavaScript event handlers.
- Do not insert untrusted user input with `innerHTML`.
- Test the layout at a 375px viewport and check for horizontal overflow.
- Inspect Git diffs and verify changes before committing.
- Verify AI-generated suggestions; do not generate the whole project in one prompt.

## 5. Acceptance checklist

- [ ] Portfolio content is complete and personalized.
- [ ] Semantic structure and heading order are reasonable.
- [ ] Keyboard navigation and visible focus work.
- [ ] Contrast has been checked for relevant text/background combinations.
- [ ] No unintended focus trap exists.
- [ ] No inline event handlers remain.
- [ ] CSP is configured and tested.
- [ ] No horizontal scrolling at 375px.
- [ ] Lighthouse has been run and findings addressed.
- [ ] Browser console has no unexplained errors.
- [ ] Git history contains small, meaningful commits.
- [ ] README explains how to run the project.

## 6. Verification log

Record evidence instead of marking items complete without testing.

| Date | Check / issue | Fix or result | Evidence (report, screenshot, commit) |
|---|---|---|---|
| YYYY-MM-DD | Example: contrast audit | Describe actual fix/result | Path or link |

## 7. Notes

- The slide specifies a minimum of four commits and names M1, M2, and M4 commit messages. It does not specify an exact M3 commit message; the suggested message above is a practical choice.
- A separate slide gives a six-commit atomic workflow example. Use enough small commits to demonstrate the actual work; do not squash the required milestones into one monolithic commit.
- Only report results that have actually been verified.
