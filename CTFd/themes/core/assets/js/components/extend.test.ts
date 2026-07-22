import assert from "node:assert/strict";
import { test } from "node:test";

// Explicit extension so Node's ESM resolver can load this directly under
// `node --test` with native type stripping.
import { extendComponent } from "./extend.ts";

const Base = () => ({
  count: 0,
  label: "base",
  bump() {
    this.count += 1;
    return this.count;
  },
  describe() {
    return `${this.label}:${this.count}`;
  },
});

const Child = extendComponent(Base, parent => ({
  label: "child",
  bump() {
    parent.bump.call(this);
    this.count += 10;
    return this.count;
  },
}));

test("override calls the base implementation with the child as `this`", () => {
  const c = Child();
  assert.equal(c.bump(), 11);
  assert.equal(c.describe(), "child:11", "inherited method sees overridden field");
});

test("merged instances expose own properties only", () => {
  // Alpine's reactivity proxy does not reliably track prototype-inherited props.
  const c = Child();
  for (const key of ["count", "label", "bump", "describe"]) {
    assert.ok(Object.hasOwn(c, key), `${key} must be an own property`);
  }
  assert.equal(Object.getPrototypeOf(c), Object.prototype);
});

test("no parent reference leaks onto the instance", () => {
  const c = Child();
  assert.deepEqual(Object.keys(JSON.parse(JSON.stringify(c))), ["count", "label"]);
});

test("instances do not share state", () => {
  const a = Child();
  const b = Child();
  a.bump();
  assert.equal(b.count, 0);
});

test("the override factory runs once per instance", () => {
  const seen: object[] = [];
  const Tracking = extendComponent(Base, parent => {
    seen.push(parent);
    return {};
  });
  Tracking();
  Tracking();
  assert.equal(seen.length, 2);
  assert.notEqual(seen[0], seen[1], "each instance gets a distinct parent");
});

test("a theme can extend an already-extended component", () => {
  // Regression: a parent resolved through `this` (a `$super` property) recurses
  // forever here, because the middle layer re-reads the grandchild's `$super`.
  const GrandChild = extendComponent(Child, parent => ({
    bump() {
      parent.bump.call(this);
      this.count += 100;
      return this.count;
    },
  }));

  const g = GrandChild();
  assert.equal(g.bump(), 111, "0 +1 +10 +100");
  assert.equal(g.label, "child", "inherits the middle layer's field");
  assert.equal(g.describe(), "child:111", "base method through two levels");
});

test("mutable state added by an override is per-instance", () => {
  // Why the function form is mandatory: `{ extra: [] }` evaluated once would
  // hand every instance the same array.
  const WithState = extendComponent(Base, () => ({ extra: [] as string[] }));
  const w1 = WithState();
  const w2 = WithState();
  w1.extra.push("x");
  assert.deepEqual(w2.extra, []);
});
