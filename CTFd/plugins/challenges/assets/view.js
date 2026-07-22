CTFd.challenge.register({
  preRender() {},

  postRender() {},

  submit(preview) {
    const challengeId = parseInt(document.querySelector("#challenge-id").value);
    const submission = document.querySelector("#challenge-input").value;

    return CTFd.pages.challenge.submitChallenge(challengeId, submission, preview);
  },
});
