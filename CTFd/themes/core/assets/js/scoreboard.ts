import Alpine from "alpinejs";

import CTFd from "./index.js";
import { mount, register } from "./components/registry.js";
import { ScoreboardDetail } from "./components/scoreboard/ScoreboardDetail.js";
import { ScoreboardList } from "./components/scoreboard/ScoreboardList.js";

window.Alpine = Alpine;
window.CTFd = CTFd;

register("ScoreboardDetail", ScoreboardDetail);
register("ScoreboardList", ScoreboardList);

mount();
