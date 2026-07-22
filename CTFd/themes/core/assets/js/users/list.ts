import Alpine from "alpinejs";

import CTFd from "../index";
import { mount } from "../components/registry";

window.CTFd = CTFd;
window.Alpine = Alpine;

mount();
