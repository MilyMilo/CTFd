/* eslint-disable @typescript-eslint/no-explicit-any -- themeSettings is
 * operator-defined and has no fixed shape. */

export interface ThemeSettings {
  challenge_window_size?: "sm" | "lg" | "xl";
  challenge_order?: string;
  challenge_category_order?: string;
  use_builtin_code_highlighter?: boolean;
  [key: string]: any;
}

export interface CTFdConfig {
  urlRoot: string;
  csrfNonce: string;
  userMode: "users" | "teams" | "";
  start: string | null;
  end: string | null;
  themeSettings: ThemeSettings;
  preview?: boolean;
}

export const config: CTFdConfig = {
  urlRoot: "",
  csrfNonce: "",
  userMode: "",
  start: null,
  end: null,
  themeSettings: {},
};
