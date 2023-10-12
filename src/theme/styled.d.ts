import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      blue3: string;
      gray: string;
      gray2: string;
      blue2: string;
      blue: string;
      daybreakBlue: string;
    };
    breakpoints: {
      xs: number;
      md: number;
      lg: number;
      xl: number;
    };
  }
}
