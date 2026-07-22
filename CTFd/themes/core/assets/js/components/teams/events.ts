/**
 * Window events the captain menu dispatches to open each modal.
 *
 * The modals are siblings of the menu in the template, not descendants, so the
 * menu cannot reach them through `$refs`. Rather than look them up by id, each
 * modal listens for its own event and shows itself — which also keeps the
 * Bootstrap-specific lookup out of the menu entirely.
 *
 * Templates bind these as string literals (`@open-team-edit.window="show()"`).
 */
export const TEAM_MODAL_EVENTS = {
  edit: "open-team-edit",
  captain: "open-team-captain",
  invite: "open-team-invite",
  disband: "open-team-disband",
} as const;

export type TeamModalEvent = (typeof TEAM_MODAL_EVENTS)[keyof typeof TEAM_MODAL_EVENTS];
