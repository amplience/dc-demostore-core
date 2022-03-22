import { ThemeProvider, Theme, StyledEngineProvider, createTheme } from "@mui/material";
import { FC } from "react";
// import pink from '@mui/material/colors/pink';


declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}


export function createAdminTheme() {
    return createTheme({
        palette: {
            mode: 'light',
            // primary: {
            //     // ...pink
            // }
        }
    });
}

const theme = createAdminTheme();

const WithAdminTheme: FC = ({children}) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default WithAdminTheme;