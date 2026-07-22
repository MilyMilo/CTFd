/**
 * A stable colour per string, so a category keeps the same colour across pages.
 * https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
 */
export function colorHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  const h = ((hash % 360) + 360) % 360; // 0..360
  const s = (((hash % 25) + 25) % 25) + 75; // 75..100
  const l = (((hash % 20) + 20) % 20) + 40; // 40..60

  return `hsl(${h}, ${s}%, ${l}%)`;
}
