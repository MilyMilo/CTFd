import Alpine from "alpinejs";

import CTFd from "../index.js";
import { mount, register } from "../components/registry.js";
import { createScoreGraphs } from "../components/stats/ScoreGraphs.js";
import { currentTeam } from "../components/stats/subjects.js";
import { CaptainMenu } from "../components/teams/CaptainMenu.js";
import { TeamCaptainModal } from "../components/teams/TeamCaptainModal.js";
import { TeamDisbandModal } from "../components/teams/TeamDisbandModal.js";
import { TeamEditModal } from "../components/teams/TeamEditModal.js";
import { TeamInviteModal } from "../components/teams/TeamInviteModal.js";

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
