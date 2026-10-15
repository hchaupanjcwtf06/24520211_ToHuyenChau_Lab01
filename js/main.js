
import { startCountdown } from "./countdown.js";
import { FormStateMachine } from "./form.js";
import { validateFormData } from "./validation.js";

const countdownValue = document.querySelector("#countdown-value");
let submissionInProgress = false;

// ISO 8601 timestamp with explicit UTC timezone.
// Change this to the actual event deadline for your assignment.
const targetTimestamp = "2026-12-31T17:00:00Z";

const stopCountdown = startCountdown(targetTimestamp, (time) => {
  if (time.expired) {
    countdownValue.textContent = "The event has started!";
    return;
  }

  countdownValue.textContent =
    `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
});

window.addEventListener("pagehide", stopCountdown, { once: true });


const form = document.querySelector("#signup-form");
const submitButton = document.querySelector("#submit-button");
const formStatus = document.querySelector("#form-status");

const formMachine = new FormStateMachine({
  form,
  button: submitButton,
  status: formStatus
});


form.addEventListener("submit", async (event) => {
    event.preventDefault();
  
    if (submissionInProgress || formMachine.state === "submitting") {
      return;
    }
  
    if (!form.reportValidity()) return;

    const validation = validateFormData(new FormData(form));

    if (!validation.valid) {
        formMachine.transition("error", validation.message);
        return;
    }
  
    submissionInProgress = true;
    formMachine.transition("submitting", "Submitting...");
  
    try {
      // Temporary demo. Replace with a real API request when available.
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      formMachine.transition("success", "Demo submitted successfully.");
      form.reset();
    } catch {
      formMachine.transition("error", "Submission failed. Please try again.");
    } finally {
      submissionInProgress = false;
    }
  });
  
