import Alpine from "alpinejs";

import CTFd from "../index";
import { createScoreGraphs } from "../components/stats/ScoreGraphs";
import { publicUser } from "../components/stats/subjects";
import { mount, register } from "../components/registry";

window.Alpine = Alpine;
window.CTFd = CTFd;

register("UserGraphs", createScoreGraphs(publicUser));

mount();
