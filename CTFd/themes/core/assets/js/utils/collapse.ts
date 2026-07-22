import { Collapse } from "bootstrap";

export default () => {
  document
    .querySelectorAll(".collapse")
    .forEach(element => new Collapse(element, { toggle: false }));
};
