
import { startCountdown } from "./countdown.js";
import { FormStateMachine } from "./form.js";

const countdownValue = document.querySelector("#countdown-value");

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

  if (formMachine.state === "submitting") return;

  if (!form.reportValidity()) return;

  formMachine.transition("submitting", "Submitting...");

  try {
    // Temporary demonstration only: no backend request is made.
    await new Promise((resolve) => setTimeout(resolve, 500));

    formMachine.transition("success", "Demo submitted successfully.");
    form.reset();
  } catch {
    formMachine.transition("error", "Submission failed. Please try again.");
  }
});
