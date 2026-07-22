import { Alert } from "bootstrap";

export default () => {
  document.querySelectorAll(".alert").forEach(element => new Alert(element));
};
