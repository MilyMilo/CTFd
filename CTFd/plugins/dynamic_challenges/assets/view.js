CTFd.challenge.register({
  preRender() {},

  postRender() {},

  submit(preview) {
    const challengeId = parseInt(document.querySelector("#challenge-id").value);
    const submission = document.querySelector("#challenge-input").value;

    const params = {};
    if (preview) {
      params["preview"] = true;
    }

    return CTFd.api.post_challenge_attempt(params, {
      challenge_id: challengeId,
      submission: submission,
    });
  },
});
