import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material";

export function createAdminTheme() {
    return createTheme({
        palette: {
            mode: 'light'
        }
    });
}

const theme = createAdminTheme();

const WithAdminTheme = (props: any) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default WithAdminTheme;