import Alpine from "alpinejs";

import CTFd from "../index";
import { mount, register } from "../components/registry";
import { createScoreGraphs } from "../components/stats/ScoreGraphs";
import { currentTeam } from "../components/stats/subjects";
import { CaptainMenu } from "../components/teams/CaptainMenu";
import { TeamCaptainModal } from "../components/teams/TeamCaptainModal";
import { TeamDisbandModal } from "../components/teams/TeamDisbandModal";
import { TeamEditModal } from "../components/teams/TeamEditModal";
import { TeamInviteModal } from "../components/teams/TeamInviteModal";

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
