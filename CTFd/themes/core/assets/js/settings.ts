import Alpine from "alpinejs";

import CTFd from "./index";
import { createProfileForm } from "./components/forms/ProfileForm";
import { mount, register } from "./components/registry";
import { Tokens } from "./components/settings/Tokens";
import { TokensForm } from "./components/settings/TokensForm";

window.Alpine = Alpine;
window.CTFd = CTFd;

register(
  "SettingsForm",
  createProfileForm(data => CTFd.pages.settings.updateSettings(data)),
);
register("TokensForm", TokensForm);
register("Tokens", Tokens);

mount();
