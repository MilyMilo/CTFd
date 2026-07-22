import { Tooltip } from "bootstrap";

export default () => {
  document
    .querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach(element => new Tooltip(element));
};
