import Alpine from "alpinejs";

import CTFd from "./index";
import { mount, register } from "./components/registry";
import { SetupForm } from "./components/setup/SetupForm";

window.Alpine = Alpine;
window.CTFd = CTFd;

register("SetupForm", SetupForm);

mount();
