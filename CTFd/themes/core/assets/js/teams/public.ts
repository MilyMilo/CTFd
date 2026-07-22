import Alpine from "alpinejs";

import CTFd from "../index";
import { createScoreGraphs } from "../components/stats/ScoreGraphs";
import { publicTeam } from "../components/stats/subjects";
import { mount, register } from "../components/registry";

window.Alpine = Alpine;
window.CTFd = CTFd;

register("TeamGraphs", createScoreGraphs(publicTeam));

mount();
