import Alpine from "alpinejs";

import CTFd from "../index";
import { mount, register } from "../components/registry";
import { createScoreGraphs } from "../components/stats/ScoreGraphs";
import { currentTeam } from "../components/stats/subjects";
import {
  CaptainMenu,
  TeamCaptainModal,
  TeamDisbandModal,
  TeamEditModal,
  TeamInviteModal,
} from "../components/teams/modals";

window.Alpine = Alpine;
window.CTFd = CTFd;

Alpine.store("inviteToken", "");

register("TeamEditModal", TeamEditModal);
register("TeamCaptainModal", TeamCaptainModal);
register("TeamInviteModal", TeamInviteModal);
register("TeamDisbandModal", TeamDisbandModal);
register("CaptainMenu", CaptainMenu);
register("TeamGraphs", createScoreGraphs(currentTeam));

mount();
