/** Load a classic (non-module) script, replacing any previous load of the same src. */
export function getScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    document.querySelector(`script[src='${src}']`)?.remove();

    const script = document.createElement("script");
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    script.src = src;
    document.body.appendChild(script);
  });
}
