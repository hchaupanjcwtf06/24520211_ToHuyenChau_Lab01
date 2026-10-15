(() => {
    "use strict";

    const root = document.documentElement;
    const themeButton = document.querySelector("#theme-btn");
    const themeIcon = document.querySelector(".theme-icon");
    const themeLabel = document.querySelector(".theme-label");
    const yearOutput = document.querySelector("#current-year");
    const contactForm = document.querySelector("#contact-form");
    const contactEmailLink = document.querySelector("#contact-email-link");
    const formStatus = document.querySelector("#form-status");
    const storageKey = "theme";

    function readSavedTheme() {
      try {
        const savedTheme = window.localStorage.getItem(storageKey);
        if (savedTheme === "light" || savedTheme === "dark") {
          return savedTheme;
        }
      } catch (error) {
        // Browser storage can be disabled; fall back to the system preference.
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    function applyTheme(theme, persist = true) {
      const isDark = theme === "dark";
      root.dataset.theme = isDark ? "dark" : "light";

      if (themeButton && themeIcon && themeLabel) {
        themeButton.setAttribute("aria-pressed", String(isDark));
        themeIcon.textContent = isDark ? "☀" : "☾";
        themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
      }

      if (persist) {
        try {
          window.localStorage.setItem(storageKey, isDark ? "dark" : "light");
        } catch (error) {
          // Theme switching remains functional when storage is unavailable.
        }
      }
    }

    if (themeButton) {
      themeButton.addEventListener("click", () => {
        const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
      });
    }

    applyTheme(readSavedTheme(), false);

    if (yearOutput) {
      yearOutput.textContent = String(new Date().getFullYear());
    }

    if (contactForm && contactEmailLink && formStatus) {
      contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formStatus.textContent = "";

        if (!contactForm.reportValidity()) {
          formStatus.textContent = "Please check the fields marked as required.";
          return;
        }

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();
        const senderEmail = String(formData.get("email") || "").trim();
        const subject = String(formData.get("subject") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const recipient = contactEmailLink.getAttribute("href").replace(/^mailto:/i, "").trim();

        if (!recipient || recipient === "your.email@example.com") {
          formStatus.textContent = "Replace the sample contact email in index.html before using this form.";
          return;
        }

        const body = [
          `Name: ${name}`,
          `Reply email: ${senderEmail}`,
          "",
          message
        ].join("\n");
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        formStatus.textContent = "Opening your email application. The message will not be sent until you review and send it there.";
        window.location.href = mailtoUrl;
      });
    }
  })();
