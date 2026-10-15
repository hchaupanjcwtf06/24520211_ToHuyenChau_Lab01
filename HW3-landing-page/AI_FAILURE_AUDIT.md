# AI Failure Mode Audit Report

## Project: HW3 — Resilient Landing Page

## 1. Purpose

This report documents potential AI-induced defects reviewed during the development of the Resilient Landing Page. The review focuses on countdown accuracy, form submission reliability, and input security.

Each defect must be confirmed against the implementation before it is reported as an observed finding. The diagnostic methods and verification steps below describe how to validate each issue.

---

## 2. Defect 1 — Countdown Drift Caused by Interval-Based Time Accumulation

### Defect Description

A countdown implementation may incorrectly subtract one second every time a `setInterval()` callback executes. JavaScript timers are not guaranteed to execute at exact intervals. Browser scheduling delays, background-tab throttling, and main-thread workload can cause the countdown to drift away from the actual deadline.

### Diagnostic Method

- Inspect the countdown implementation using `git diff`.
- Set a breakpoint inside the timer callback in DevTools and observe how the countdown value is updated.
- Compare the displayed remaining time against the difference between the target timestamp and the current system time.
- Test the countdown after switching tabs or introducing execution delays.

### Refactored Solution

Calculate the remaining duration from the target timestamp on every update instead of decrementing a stored counter.

The implementation uses an explicit ISO 8601 timestamp with a UTC timezone and calculates the remaining time using `Date.parse()` and `Date.now()`. The interval is used only to refresh the display; it is not the source of elapsed-time truth.

### Verification

Confirm that the remaining time is derived from the target timestamp, expired deadlines return zero remaining time, and invalid timestamps are rejected. Record the actual test results after running the countdown tests.

---

## 3. Defect 2 — Potential Cross-Site Scripting Through Unsafe HTML Rendering

### Defect Description

AI-generated form code may render user-controlled input through `innerHTML`. If untrusted input is interpreted as HTML rather than text, malicious markup may be executed or injected into the page.

Input validation alone does not eliminate this risk because valid-looking input can still contain HTML markup.

### Diagnostic Method

- Search the source files for assignments to `innerHTML` and other HTML-parsing APIs.
- Inspect the relevant code with `git diff`.
- Use a harmless test string containing HTML-like markup in a local development environment.
- Confirm whether the browser renders the value as literal text or interprets it as markup.

### Refactored Solution

Use `textContent` when displaying user-provided values or status messages. Keep validation and rendering responsibilities separate, and avoid passing untrusted values into HTML-parsing APIs.

Client-side validation is used to improve the user experience. Any future backend integration must also validate data on the server.

### Verification

Confirm that user-controlled values are displayed as text and that no injected markup is interpreted as executable content. Record the observed result after testing.

---

## 4. Defect 3 — Duplicate Form Submission During an In-Progress Request

### Defect Description

An AI-generated form handler may allow multiple submissions before the first operation completes. Repeated clicks or rapid submit events can trigger duplicate requests, duplicate records, or inconsistent UI states.

Disabling the submit button alone may not be sufficient if the handler lacks an explicit guard against repeated submission events.

### Diagnostic Method

- Inspect the submit event handler and the form state transitions.
- Use a DevTools breakpoint at the start of the handler.
- Trigger multiple submit events while the form is in the `Submitting` state.
- Verify that only one submission operation is allowed to proceed at a time.

### Refactored Solution

Use an explicit in-progress guard and the form state machine to reject additional submissions while processing is underway.

The handler sets the guard before starting the asynchronous operation and releases it in a `finally` block so that both successful and failed operations can recover. The submit button is disabled during processing to provide clear feedback.

For a real backend integration, server-side idempotency or equivalent duplicate-request protection may also be required.

### Verification

Confirm that repeated submissions during the pending operation do not start additional operations, and that the form can be submitted again after the operation finishes. Record the actual observed results.

---

## 5. Review Summary

The review targets three important reliability and security concerns:

1. Time drift in the countdown engine.
2. Unsafe rendering of user-controlled input.
3. Duplicate form submissions during asynchronous processing.

The refactored design addresses these concerns through timestamp-based calculations, safe text rendering, and guarded form state transitions.

**Evidence and final findings must reflect the implementation actually reviewed.** Before submission, replace any unverified descriptions with the specific defect observed in the source code, the diagnostic evidence collected, and the result of the corresponding regression test.
