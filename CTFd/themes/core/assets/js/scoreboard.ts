import Alpine from "alpinejs";

import CTFd from "./index";
import { mount, register } from "./components/registry";
import { ScoreboardDetail } from "./components/scoreboard/ScoreboardDetail";
import { ScoreboardList } from "./components/scoreboard/ScoreboardList";

window.Alpine = Alpine;
window.CTFd = CTFd;

register("ScoreboardDetail", ScoreboardDetail);
register("ScoreboardList", ScoreboardList);

mount();
