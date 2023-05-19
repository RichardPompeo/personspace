import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    nameTheme: string;

    COLORS: {
      BACKGROUND: string;

      DEFAULT: string;
      DEFAULT_TWO: string;

      PRIMARY: string;
      SECONDARY: string;
    };
  }
}