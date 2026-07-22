import Alpine from "alpinejs";

import CTFd from "./index";
import { createProfileForm } from "./components/forms/ProfileForm";
import { mount, register } from "./components/registry";
import { Tokens, TokensForm } from "./components/settings/tokens";

window.Alpine = Alpine;
window.CTFd = CTFd;

register(
  "SettingsForm",
  createProfileForm(data => CTFd.pages.settings.updateSettings(data)),
);
register("TokensForm", TokensForm);
register("Tokens", Tokens);

mount();
