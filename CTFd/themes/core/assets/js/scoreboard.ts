import Alpine from "alpinejs";

import CTFd from "./index";
import { mount, register } from "./components/registry";
import { ScoreboardDetail, ScoreboardList } from "./components/scoreboard";

window.Alpine = Alpine;
window.CTFd = CTFd;

register("ScoreboardDetail", ScoreboardDetail);
register("ScoreboardList", ScoreboardList);

mount();
