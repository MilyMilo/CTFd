import { ui } from "../ui/adapter.js";

export function copyToClipboard($input: HTMLElement) {
  const tooltip = ui().tooltip($input, { title: "Copied!", trigger: "manual" });

  navigator.clipboard.writeText(($input as HTMLInputElement).value).then(() => {
    tooltip.show();
    setTimeout(() => {
      tooltip.hide();
      tooltip.dispose();
    }, 1500);
  });
}
