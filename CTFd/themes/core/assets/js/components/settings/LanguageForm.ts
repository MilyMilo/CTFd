import CTFd from "../../index";
import { component } from "../magics";

export const LanguageForm = component(() => ({
  async set(event: Event) {
    const language = (event.target as HTMLElement).getAttribute("value");
    document.cookie = `language=${language};SameSite=Lax`;
    localStorage.setItem("language", language!);

    // Set user language preference if logged in
    if (CTFd.user.id) {
      await CTFd.fetch("/api/v1/users/me", {
        method: "PATCH",
        body: JSON.stringify({ language }),
      });
    }

    // Reload with new language
    window.location.reload();
  },
}));
