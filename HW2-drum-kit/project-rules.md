# Project Rules — HW2 Drum Kit Engine

- Use semantic HTML5, modern CSS, and Vanilla JavaScript ES6+.
- Define and commit the HTML `data-key` / `data-sound` contract before writing JavaScript.
- Use `addEventListener`; no inline event handlers.
- Use ES modules for separated JavaScript modules and run via Live Server or another HTTP server.
- Use `const` by default; use `let` only when reassignment is necessary.
- Use `keydown`, `event.key`, and `event.repeat`; avoid obsolete `keypress` and `keyCode`.
- Keep the Audio engine independent from UI and keyboard event handling.
- Support overlapping sound playback.
- Keep key mapping centralized and derive it from the HTML contract.
- Keep recorder state, event timestamps, and FIFO ordering separate from the audio engine.
- Prevent replay events from being recorded again unintentionally.
- Handle failed/missing audio assets and inspect browser console.
- Test keyboard and pointer input and verify the layout at 375px.
- Inspect Git diffs and verify every AI-generated change.
- Never generate the entire project in one AI prompt.
