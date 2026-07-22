import Alpine from "alpinejs";

import CTFd from "../index.js";
import { createScoreGraphs } from "../components/stats/ScoreGraphs.js";
import { publicUser } from "../components/stats/subjects.js";
import { mount, register } from "../components/registry.js";

window.Alpine = Alpine;
window.CTFd = CTFd;

register("UserGraphs", createScoreGraphs(publicUser));

mount();
