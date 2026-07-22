import $ from "jquery";
import dayjs from "dayjs";
import MarkdownIt from "markdown-it";

import "./patch";
import fetch from "./fetch";
import config from "./config";
import API from "./api";
import ezq from "./ezq";
import { challenge } from "./challenge";
import { htmlEntities, createHtmlNode } from "../utils/html";
import { getScript } from "../utils/ajax";

const api = new API("/");

// Mirrors the core theme's CTFd.pages.challenge surface so a challenge type
// plugin's view.js can submit through the same call in either theme.
const pages = {
  challenge: {
    submitChallenge(challengeId, submission, preview = false) {
      const params = preview ? { preview: true } : {};
      return api.post_challenge_attempt(params, {
        challenge_id: challengeId,
        submission: submission,
      });
    },
  },
};
const user = {};
const _internal = {};
const ui = {
  ezq,
};
const lib = {
  $,
  markdown,
  dayjs,
};

let initialized = false;
const init = (data) => {
  if (initialized) {
    return;
  }
  initialized = true;

  config.urlRoot = data.urlRoot || config.urlRoot;
  config.csrfNonce = data.csrfNonce || config.csrfNonce;
  config.userMode = data.userMode || config.userMode;
  api.domain = config.urlRoot + "/api/v1";
  user.id = data.userId;
};
const plugin = {
  run: (f) => {
    f(CTFd);
  },
};
function markdown(config) {
  // Merge passed config with original. Default to original.
  const md_config = { ...{ html: true, linkify: true }, ...config };
  const md = MarkdownIt(md_config);
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(["target", "_blank"]);
    return self.renderToken(tokens, idx, options);
  };
  return md;
}

const utils = {
  ajax: {
    getScript,
  },
  html: {
    createHtmlNode,
    htmlEntities,
  },
};

const CTFd = {
  init,
  config,
  fetch,
  user,
  ui,
  utils,
  api,
  lib,
  _internal,
  challenge,
  pages,
  plugin,
};

export default CTFd;
