import { Modal, Tab, Toast, Tooltip } from "bootstrap";

import type {
  ModalHandle,
  TabHandle,
  ToastHandle,
  TooltipHandle,
  TooltipOptions,
  UIAdapter,
} from "./adapter.js";

function resolve(target: Element | string): Element {
  if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el === null) {
      throw new Error(`No element matched ${target}`);
    }
    return el;
  }
  return target;
}

export const bootstrapUI: UIAdapter = {
  modal(target: Element | string): ModalHandle {
    // Resolve the element up front so `onHidden` can bind to it directly rather
    // than reaching into the Modal instance's private `_element`.
    const el = resolve(target);
    const modal = Modal.getOrCreateInstance(el);

    return {
      show: () => modal.show(),
      hide: () => modal.hide(),
      onHidden: callback =>
        el.addEventListener("hidden.bs.modal", () => callback(), { once: true }),
    };
  },

  tab(target: Element): TabHandle {
    const tab = Tab.getOrCreateInstance(target);
    return { show: () => tab.show() };
  },

  tabFor(panel: string): TabHandle | null {
    const trigger = document.querySelector(`[data-bs-target="${panel}"]`);
    return trigger ? bootstrapUI.tab(trigger) : null;
  },

  toast(target: Element | string): ToastHandle {
    const el = resolve(target);
    const toast = Toast.getOrCreateInstance(el);

    return {
      show: () => toast.show(),
      onHidden: callback =>
        el.addEventListener("hidden.bs.toast", () => callback(), { once: true }),
      onDismissed: callback =>
        el
          .querySelector("[data-bs-dismiss='toast']")
          ?.addEventListener("click", () => callback(), { once: true }),
    };
  },

  tooltip(target: Element, options: TooltipOptions = {}): TooltipHandle {
    const tooltip = Tooltip.getOrCreateInstance(target, options);
    return {
      show: () => tooltip.show(),
      hide: () => tooltip.hide(),
      dispose: () => tooltip.dispose(),
    };
  },
};
