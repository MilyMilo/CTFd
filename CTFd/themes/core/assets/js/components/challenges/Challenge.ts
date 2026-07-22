import Alpine from "alpinejs";

import CTFd from "../../index";
import highlight from "../../theme/highlight";
import { intl } from "../../theme/times";
import { ui } from "../../ui/adapter";
import { component } from "../magics";
import { CHALLENGE_EVENTS } from "./events";
import { challengeStore } from "./store";

/** Maps the `challenge_window_size` theme setting onto modal sizing classes. */
const MODAL_SIZES: Record<string, string> = {
  sm: "modal-sm",
  lg: "modal-lg",
  xl: "modal-xl",
};

export const Challenge = component(() => ({
  id: null as number | null,
  submission: "",
  tab: null as unknown,
  solves: [] as Record<string, any>[],
  submissions: [] as Record<string, any>[],
  solution: null as string | null,
  response: null as Record<string, any> | null,
  shareUrl: null as string | null,
  maxAttempts: 0,
  attempts: 0,
  ratingValue: 0,
  selectedRating: 0,
  ratingReview: "",
  ratingSubmitted: false,

  async init() {
    highlight();
  },

  getStyles() {
    const styles: Record<string, boolean> = { "modal-dialog": true };
    try {
      const size = MODAL_SIZES[CTFd.config.themeSettings.challenge_window_size];
      if (size) {
        styles[size] = true;
      }
    } catch (error) {
      // Ignore errors with challenge window size
      console.log("Error processing challenge_window_size");
      console.log(error);
    }
    return styles;
  },

  async showChallenge() {
    ui().tab(this.$el).show();
  },

  async showSolves() {
    this.solves = await CTFd.pages.challenge.loadSolves(this.id);
    this.solves.forEach(solve => {
      solve.date = intl.format(new Date(solve.date));
      return solve;
    });
    ui().tab(this.$el).show();
  },

  async showSubmissions() {
    const response = await CTFd.pages.users.userSubmissions("me", this.id);
    this.submissions = response.data;
    this.submissions.forEach(s => {
      s.date = intl.format(new Date(s.date));
      return s;
    });
    ui().tab(this.$el).show();
  },

  getSolutionId() {
    return challengeStore().data.solution_id;
  },

  getSolutionState() {
    return challengeStore().data.solution_state;
  },

  setSolutionId(solutionId: number) {
    challengeStore().data.solution_id = solutionId;
  },

  async showSolution() {
    const solutionId = this.getSolutionId();
    CTFd._functions.challenge.displaySolution = (solution: Record<string, any>) => {
      this.solution = solution.html;
      ui().tab(this.$el).show();
    };
    await CTFd.pages.challenge.displaySolution(solutionId);
  },

  getNextId() {
    return challengeStore().data.next_id;
  },

  async nextChallenge() {
    const modal = ui().modal("[x-ref='challengeWindow']");

    modal.onHidden(() => {
      // Dispatch load-challenge event to call loadChallenge in the ChallengeBoard
      Alpine.nextTick(() => {
        this.$dispatch(CHALLENGE_EVENTS.loadChallenge, this.getNextId());
      });
    });
    modal.hide();
  },

  async getShareUrl() {
    const body = {
      type: "solve",
      challenge_id: this.id,
    };
    const response = await CTFd.fetch("/api/v1/shares", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    this.shareUrl = data["data"]["url"];
  },

  copyShareUrl() {
    navigator.clipboard.writeText(this.shareUrl ?? "");

    // Created on demand and disposed after, so the manual tooltip does not stay
    // attached to the button and fire on hover.
    const tooltip = ui().tooltip(this.$el, { trigger: "manual" });
    tooltip.show();
    setTimeout(() => {
      tooltip.hide();
      tooltip.dispose();
    }, 2000);
  },

  async submitChallenge() {
    this.response = await CTFd.pages.challenge.submitChallenge(
      this.id,
      this.submission,
    );

    // Challenges page might be visible to anonymous users, redirect to login on submit
    if (this.response!.data.status === "authentication_required") {
      window.location.href = `${CTFd.config.urlRoot}/login?next=${CTFd.config.urlRoot}${window.location.pathname}${window.location.hash}`;
      return;
    }

    await this.renderSubmissionResponse();
  },

  async renderSubmissionResponse() {
    const status = this.response!.data.status;

    if (status === "correct") {
      this.submission = "";
    }

    // Decide whether to check for the solution
    if (this.getSolutionId() == null) {
      if (
        CTFd.pages.challenge.checkSolution(
          this.getSolutionState(),
          challengeStore().data,
          status,
        )
      ) {
        const data = await CTFd.pages.challenge.getSolution(this.id);
        this.setSolutionId(data.id);
      }
    }

    // Increment attempts counter
    if (this.maxAttempts > 0 && status != "already_solved" && status != "ratelimited") {
      this.attempts += 1;
    }

    // Dispatch load-challenges event to call loadChallenges in the ChallengeBoard
    this.$dispatch(CHALLENGE_EVENTS.loadChallenges);
  },

  async submitRating() {
    const response = await CTFd.pages.challenge.submitRating(
      this.id,
      this.selectedRating,
      this.ratingReview,
    );
    if (response.value) {
      this.ratingValue = this.selectedRating;
      this.ratingSubmitted = true;
    } else {
      alert("Error submitting rating");
    }
  },
}));
