import Alpine from "alpinejs";

import CTFd from "../../index";
import { ui } from "../../ui/adapter";
import { addTargetBlank } from "../../utils/html";
import { component } from "../magics";
import { challengeStore } from "./store";

/**
 * Build a comparator from a theme setting. The setting is authored as a
 * JavaScript function source string in the admin panel.
 */
function comparatorFromSetting(source: string | undefined, context: string) {
  if (!source) {
    return null;
  }
  try {
    return new Function(`return (${source})`)() as (a: any, b: any) => number;
  } catch (error) {
    // Ignore errors with theme-provided sorting
    console.log(`Error running ${context} function`);
    console.log(error);
    return null;
  }
}

export const ChallengeBoard = component(() => ({
  loaded: false,
  challenges: [] as Record<string, any>[],
  challenge: null as Record<string, any> | null,

  async init() {
    // Go through loadChallenges() rather than fetching directly, so a theme
    // overriding it also affects the initial load and not just refreshes.
    await this.loadChallenges();
    this.loaded = true;

    if (window.location.hash) {
      const chalHash = decodeURIComponent(window.location.hash.substring(1));
      const idx = chalHash.lastIndexOf("-");
      if (idx >= 0) {
        await this.loadChallenge(chalHash.slice(idx + 1));
      }
    }
  },

  getCategories() {
    const categories: string[] = [];

    this.challenges.forEach(challenge => {
      const { category } = challenge;

      if (!categories.includes(category)) {
        categories.push(category);
      }
    });

    const sort = comparatorFromSetting(
      CTFd.config.themeSettings.challenge_category_order,
      "challenge_category_order",
    );
    if (sort) {
      categories.sort(sort);
    }

    return categories;
  },

  getChallenges(category: string | null) {
    let challenges = this.challenges;

    if (category !== null) {
      challenges = this.challenges.filter(challenge => challenge.category === category);
    }

    const sort = comparatorFromSetting(
      CTFd.config.themeSettings.challenge_order,
      "challenge_order",
    );
    if (sort) {
      challenges.sort(sort);
    }

    return challenges;
  },

  async loadChallenges() {
    this.challenges = await CTFd.pages.challenges.getChallenges();
  },

  async loadChallenge(challengeId: string | number) {
    await CTFd.pages.challenge.displayChallenge(challengeId, challenge => {
      challenge.view = addTargetBlank(challenge.view);
      challengeStore().data = challenge;

      // nextTick is required here because we're working in a callback
      Alpine.nextTick(() => {
        const modal = ui().modal("[x-ref='challengeWindow']");
        modal.onHidden(() => {
          // Remove location hash
          history.replaceState(null, "", " ");
        });
        modal.show();
        history.replaceState(null, "", `#${challenge.name}-${challengeId}`);
      });
    });
  },
}));
