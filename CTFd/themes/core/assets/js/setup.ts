import Alpine from "alpinejs";

import CTFd from "./index.js";
import { mount, register } from "./components/registry.js";
import { SetupForm } from "./components/setup/SetupForm.js";

window.Alpine = Alpine;
window.CTFd = CTFd;

register("SetupForm", SetupForm);

mount();
