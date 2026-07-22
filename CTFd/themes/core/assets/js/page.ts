import Alpine from "alpinejs";

import CTFd from "./index.js";
import { mount } from "./components/registry.js";

window.CTFd = CTFd;
window.Alpine = Alpine;

mount();
