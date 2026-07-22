export function cumulativeSum(values: number[]): number[] {
  let running = 0;
  return values.map(value => (running += value));
}
