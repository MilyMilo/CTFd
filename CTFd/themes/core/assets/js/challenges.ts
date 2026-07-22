import Alpine from "alpinejs";

import CTFd from "./index";
import { Challenge } from "./components/challenges/Challenge";
import { ChallengeBoard } from "./components/challenges/ChallengeBoard";
import { Hint } from "./components/challenges/Hint";
import { mount, register } from "./components/registry";

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
