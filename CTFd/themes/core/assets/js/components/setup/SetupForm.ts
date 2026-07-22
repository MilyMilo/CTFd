import dayjs from "dayjs";

import CTFd from "../../index";
import { ui } from "../../ui/adapter";
import { component } from "../magics";

/** Start/end are the two configurable event times, each with date+time inputs. */
type EventTime = "start" | "end";

export const SetupForm = component(() => ({
  init() {
    // Bind Enter on any input to clicking the Next button
    this.$root.querySelectorAll("input").forEach(input => {
      input.addEventListener("keypress", event => {
        if (event.key == "Enter") {
          event.preventDefault();
          const target = event.target as HTMLElement;
          target
            .closest(".tab-pane")
            ?.querySelector<HTMLButtonElement>("button[data-href]")
            ?.click();
        }
      });
      input.addEventListener("change", event => {
        const target = event.target as HTMLInputElement;
        target.classList.toggle("input-filled-invalid", !target.checkValidity());
      });
    });

    // Register storage listener for MLC integration
    window.addEventListener("storage", event => {
      if (event.key !== "integrations" || !event.newValue) {
        return;
      }
      const integration = JSON.parse(event.newValue);
      if (integration["name"] === "mlc") {
        const button = this.$refs.mlcButton as HTMLButtonElement;
        button.textContent = "Already Configured";
        button.disabled = true;
        window.focus();
        localStorage.removeItem("integrations");
      }
    });
  },

  validateFileSize(event: Event, limit: number) {
    const target = event.target as HTMLInputElement;
    if (target.files![0].size > limit) {
      if (
        !confirm(
          `This image file is larger than ${
            limit / 1000
          }KB which may result in increased load times. Are you sure you'd like to use this file?`,
        )
      ) {
        target.value = "";
      }
    }
  },

  switchTab(event: Event) {
    // Handle tab validation
    const target = event.target as HTMLElement;
    const inputs = target
      .closest('[role="tabpanel"]')!
      .querySelectorAll<HTMLInputElement>("input,textarea");

    const invalid = [...inputs].filter(input => input.checkValidity() === false);
    invalid.forEach(input => input.classList.add("input-filled-invalid"));

    if (invalid.length > 0) {
      return;
    }

    const href = (target as HTMLElement).dataset.href;
    const tab = this.$root.querySelector(`[data-bs-target="${href}"]`);
    if (tab) {
      ui().tab(tab).show();
    }
  },

  setThemeColor(event: Event) {
    (this.$refs.colorInput as HTMLInputElement).value = (
      event.target as HTMLInputElement
    ).value;
  },

  resetThemeColor() {
    (this.$refs.colorInput as HTMLInputElement).value = "";
    (this.$refs.colorPicker as HTMLInputElement).value = "";
  },

  processDateTime(datetime: EventTime) {
    return () => {
      const date = this.$refs[`${datetime}Date`] as HTMLInputElement;
      const time = this.$refs[`${datetime}Time`] as HTMLInputElement;
      const preview = this.$refs[`${datetime}Preview`] as HTMLInputElement;

      const unix_time = dayjs(`${date.value} ${time.value}`, "YYYY-MM-DD HH:mm").unix();

      preview.value = isNaN(unix_time) ? "" : String(unix_time);
    };
  },

  mlcSetup() {
    const r = CTFd.config.urlRoot;
    const userMode = this.$root.querySelector<HTMLInputElement>(
      "[name=user_mode]:checked",
    );

    const params: Record<string, string> = {
      name: (this.$refs.ctfName as HTMLInputElement).value,
      type: "jeopardy",
      description: (this.$refs.ctfDescription as HTMLTextAreaElement).value,
      user_mode: userMode!.value,
      event_url: window.location.origin + r,
      redirect_url: window.location.origin + r + "/redirect",
      integration_setup_url: window.location.origin + r + "/setup/integrations",
      start: (this.$refs.startPreview as HTMLInputElement).value,
      end: (this.$refs.endPreview as HTMLInputElement).value,
      platform: "CTFd",
      state: window.STATE,
    };

    const query = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    window.open(`https://www.majorleaguecyber.org/events/new?${query}`, "_blank");
  },

  submitSetup(event: Event) {
    if (!(this.$refs.newsletter as HTMLInputElement).checked) {
      return;
    }

    const email = (event.target as HTMLElement).querySelector<HTMLInputElement>(
      "input[name=email]",
    )!.value;

    const params: Record<string, string> = {
      email,
      b_38e27f7d496889133d2214208_d7c3ed71f9: "",
      c: "jsonp_callback_" + Math.round(10000 * Math.random()),
    };

    const query = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    const script = document.createElement("script");
    script.src = `https://newsletters.ctfd.io/lists/ot889gr1sa0e1/subscribe/post-json?${query}`;
    document.head.appendChild(script);
  },
}));
