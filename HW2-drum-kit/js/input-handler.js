
export function initializeKeyboard({
    pads,
    activatePad
  }) {
    const keyToPad = new Map();
  
    for (const pad of pads) {
      const key = pad.dataset.key?.toLowerCase();
  
      if (key) {
        keyToPad.set(key, pad);
      }
  
      // Mouse click and keyboard input share the same activation function.
      pad.addEventListener("click", () => {
        activatePad(pad);
      });
    }
  
    document.addEventListener("keydown", (event) => {
      // Ignore auto-repeated keydown events.
      if (event.repeat) {
        return;
      }
  
      // Do not trigger drum sounds while the user is typing.
      const target = event.target;
  
      if (
        target instanceof HTMLElement &&
        (
          target.isContentEditable ||
          target.closest("input, textarea, select")
        )
      ) {
        return;
      }
  
      const key = event.key.toLowerCase();
      const pad = keyToPad.get(key);
  
      if (!pad) {
        return;
      }
  
      event.preventDefault();
      activatePad(pad);
    });
  }
  