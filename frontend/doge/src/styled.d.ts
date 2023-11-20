import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
    orange: string;
    gray: {
      bright: string;
      darker: string;
      medium: string;
      lighter: string;
      lightdark: string;
    };
    yellow: string;
  }
}
