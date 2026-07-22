export interface ModalHandle {
  show(): void;
  hide(): void;
  onHidden(callback: () => void): void;
}

export interface TabHandle {
  show(): void;
}

export interface TooltipOptions {
  title?: string;
  trigger?: string;
}

export interface TooltipHandle {
  show(): void;
  hide(): void;
  dispose(): void;
}

export interface ToastHandle {
  show(): void;
  onHidden(callback: () => void): void;
}

export interface UIAdapter {
  modal(target: Element | string): ModalHandle;
  tab(target: Element): TabHandle;
  tooltip(target: Element, options?: TooltipOptions): TooltipHandle;
  toast(target: Element | string): ToastHandle;
}

let adapter: UIAdapter | null = null;

export function registerUI(next: UIAdapter): void {
  adapter = next;
}

export function ui(): UIAdapter {
  if (adapter === null) {
    throw new Error(
      "No UI adapter registered. Call registerUI() before mounting components.",
    );
  }
  return adapter;
}
