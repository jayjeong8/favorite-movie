import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        black: string;
        gray: {
            dark: string;
            gray: string;
            light: string;
        };
        white: string
        yellow: {
            dark: string;
            light: string;
        }
    }
}