/** Force externally-linking anchors in server-rendered HTML to open in a new tab. */
export function addTargetBlank(html: string): string {
  const dom = new DOMParser();
  const view = dom.parseFromString(html, "text/html");
  const links = view.querySelectorAll('a[href*="://"]');
  links.forEach(link => {
    link.setAttribute("target", "_blank");
  });
  return view.documentElement.outerHTML;
}
