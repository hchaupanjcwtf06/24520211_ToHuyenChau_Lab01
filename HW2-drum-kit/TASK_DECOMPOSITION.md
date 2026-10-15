# HW2 — Drum Kit Engine

**Course:** Web Application Development  
**Lab:** Modern Web Foundations & AI-Assisted Engineering

## 1. Objective

Build a browser-based drum kit with a decoupled audio engine, keyboard interaction, and a timestamped FIFO Beat Recorder.

## 2. Mandatory architecture and order

### T-01 — HTML `data-sound` contract
- [ ] Define each drum pad in HTML before writing JavaScript.
- [ ] Use a semantic, keyboard-accessible control such as a `<button>`.
- [ ] Give each pad a stable keyboard mapping using `data-key`.
- [ ] Define its audio source using `data-sound`.
- [ ] Confirm each audio path points to an actual asset.
- [ ] Keep JavaScript out of this milestone.
- **Required first implementation commit:** `feat(html): define drum pad audio contract`

### T-02 — Independent polyphonic Audio engine
- [ ] Implement audio playback in a separate module.
- [ ] Keep playback logic independent from DOM event handling.
- [ ] Allow overlapping playback so one sound does not unnecessarily interrupt another.
- [ ] Handle missing sources and playback failures appropriately.
- [ ] Test the engine independently before integration.
- **Suggested commit:** `feat(js): implement independent polyphonic audio engine`

### T-03 — Keyboard event integration
- [ ] Use `keydown` and `event.key`; do not use obsolete `keypress` or `keyCode`.
- [ ] Use `event.repeat` to prevent repeated triggering while a key is held.
- [ ] Keep key mapping centralized and derived from the HTML contract.
- [ ] Ensure pointer and keyboard input use the same activation function.
- [ ] Consider inputs/textareas if the interface later includes editable fields.
- **Suggested commit:** `feat(js): bind keyboard events with repeat throttling`

### T-04 — FIFO Beat Recorder
- [ ] Record events in the order they occur.
- [ ] Store at least the key/pad identifier and a relative timestamp for each event.
- [ ] Preserve event ordering when timestamps are equal.
- [ ] Implement start, stop, and replay behavior.
- [ ] Replay recorded events in order and with their relative timing.
- [ ] Prevent replay events from being recorded again unintentionally.
- [ ] Cancel old replay timers when starting a new replay or leaving the page.
- **Suggested commit:** `feat(js): implement timestamped FIFO beat recorder`

### T-05 — Integration and verification
- [ ] Test pointer and keyboard playback.
- [ ] Test overlapping audio playback.
- [ ] Test recording and replay timing.
- [ ] Test missing or invalid audio assets.
- [ ] Check responsive layout at 375px.
- [ ] Inspect browser console and Git diffs.
- **Suggested commit:** `test: verify drum kit engine and recorder`

## 3. HTML contract

The HTML is the source of the pad-to-key and pad-to-sound mapping. JavaScript should read these attributes rather than hard-code a separate mapping for every pad.

Example contract shape (replace paths with the actual assets):

```html
<button
  class="drum-pad"
  type="button"
  data-key="a"
  data-sound="assets/sounds/kick.wav"
>
  Kick
</button>
```

Do not write the JavaScript engine before committing this contract. If the instructor changes `data-sound` to `data-audio-src`, update the contract and the centralized code that reads it; do not rewrite the entire application.

## 4. Project rules

- Use semantic HTML5, modern CSS, and Vanilla JavaScript ES6+.
- Use ES modules if the code is split into JavaScript modules.
- Run through Live Server or another local HTTP server; do not open with `file:///`.
- Use `const` by default and `let` only when reassignment is needed.
- Use `addEventListener`; no inline event handlers.
- Use `keydown`, `event.key`, and `event.repeat`.
- Keep audio engine, event handling, and recorder logic separate.
- Verify every AI-generated change and inspect Git diffs before committing.
- Do not prompt AI to generate the whole project in one shot.

## 5. Live defense preparation

Practice these changes without rebuilding the project:

- [ ] Change a pad's key binding in HTML and verify the new key works after reload.
- [ ] Change `data-sound` to `data-audio-src` and update the centralized contract reader.
- [ ] Explain how the audio engine supports overlapping sounds.
- [ ] Explain how the FIFO queue and timestamps preserve playback order and timing.
- [ ] Be prepared to explain how a Spacebar stop-all feature could be added without breaking normal button behavior.

## 6. Verification log

| Date | Check / issue | Fix or result | Evidence (report, screenshot, commit) |
|---|---|---|---|
| YYYY-MM-DD | Example: keyboard mapping test | Describe actual result | Path or link |

## 7. Notes

- The mandatory order is: HTML contract commit first, independent polyphonic audio engine, keyboard listener with repeat throttling, then FIFO timestamped Beat Recorder.
- Suggested commit messages beyond the explicit first HTML-contract commit are recommendations; keep the history accurate to the work actually completed.
- Use only audio assets that you are permitted to use.
