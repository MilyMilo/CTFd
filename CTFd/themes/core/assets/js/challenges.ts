import Alpine from "alpinejs";

import CTFd from "./index.js";
import { Challenge } from "./components/challenges/Challenge.js";
import { ChallengeBoard } from "./components/challenges/ChallengeBoard.js";
import { Hint } from "./components/challenges/Hint.js";
import { mount, register } from "./components/registry.js";

window.Alpine = Alpine;
window.CTFd = CTFd;

Alpine.store("challenge", {
  data: {
    view: "",
  },
});

register("Hint", Hint);
register("Challenge", Challenge);
register("ChallengeBoard", ChallengeBoard);

mount();
