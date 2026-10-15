
const ALLOWED_STATES = new Set([
    "idle",
    "submitting",
    "success",
    "error"
  ]);
  
  export class FormStateMachine {
    constructor({ form, button, status }) {
      this.form = form;
      this.button = button;
      this.status = status;
      this.state = "idle";
      this.render();
    }
  
    transition(nextState, message = "") {
      if (!ALLOWED_STATES.has(nextState)) {
        throw new Error(`Unknown form state: ${nextState}`);
      }
  
      const allowedTransitions = {
        idle: ["submitting"],
        submitting: ["success", "error"],
        success: ["submitting", "idle"],
        error: ["submitting", "idle"]
      };
  
      if (!allowedTransitions[this.state].includes(nextState)) {
        throw new Error(
          `Invalid transition: ${this.state} -> ${nextState}`
        );
      }
  
      this.state = nextState;
      this.render(message);
    }
  
    render(message = "") {
      const isSubmitting = this.state === "submitting";
  
      this.button.disabled = isSubmitting;
      this.form.setAttribute("aria-busy", String(isSubmitting));
      this.status.textContent = message;
      this.status.dataset.state = this.state;
    }
  }
  