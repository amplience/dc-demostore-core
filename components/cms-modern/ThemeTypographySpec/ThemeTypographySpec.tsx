import { createTheme, ThemeProvider, StyledEngineProvider, Typography } from '@mui/material';
import React from 'react';

interface FontDefinition {
    fontFamily: string;
    fontWeight: number;
    fontSize: string;
    color: string;
    lineHeight: number;
    letterSpacing: string;
    textTransform:
        | 'none'
        | '-moz-initial'
        | 'inherit'
        | 'initial'
        | 'revert'
        | 'unset'
        | 'full-width'
        | 'capitalize'
        | 'full-size-kana'
        | 'lowercase'
        | 'uppercase'
        | undefined;
}

interface Props {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
    htmlFontSize: number;
    fontFamily: string;
    fontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
    h1: FontDefinition;
    h2: FontDefinition;
    h3: FontDefinition;
    h4: FontDefinition;
    h5: FontDefinition;
    h6: FontDefinition;
    body1: FontDefinition;
    body2: FontDefinition;
    subtitle1: FontDefinition;
    subtitle2: FontDefinition;
    button: FontDefinition;
    caption: FontDefinition;
    overline: FontDefinition;
}

const ThemeTypographySpec = (props: Props) => {
    const theme = createTheme({
        typography: {
            fontFamily: props.fontFamily,
            fontSize: props.fontSize,
            htmlFontSize: props.htmlFontSize,
            h1: {
                fontFamily: props.h1.fontFamily,
                fontWeight: props.h1.fontWeight,
                fontSize: props.h1.fontSize,
                color: props.h1.color,
                lineHeight: props.h1.lineHeight,
                letterSpacing: props.h1.letterSpacing,
                textTransform: props.h1.textTransform,
            },
            h2: {
                fontFamily: props.h2.fontFamily,
                fontWeight: props.h2.fontWeight,
                fontSize: props.h2.fontSize,
                color: props.h2.color,
                lineHeight: props.h2.lineHeight,
                letterSpacing: props.h2.letterSpacing,
                textTransform: props.h2.textTransform,
            },
            h3: {
                fontFamily: props.h3.fontFamily,
                fontWeight: props.h3.fontWeight,
                fontSize: props.h3.fontSize,
                color: props.h3.color,
                lineHeight: props.h3.lineHeight,
                letterSpacing: props.h3.letterSpacing,
                textTransform: props.h3.textTransform,
            },
            h4: {
                fontFamily: props.h4.fontFamily,
                fontWeight: props.h4.fontWeight,
                fontSize: props.h4.fontSize,
                color: props.h4.color,
                lineHeight: props.h4.lineHeight,
                letterSpacing: props.h4.letterSpacing,
                textTransform: props.h4.textTransform,
            },
            h5: {
                fontFamily: props.h5.fontFamily,
                fontWeight: props.h5.fontWeight,
                fontSize: props.h5.fontSize,
                color: props.h5.color,
                lineHeight: props.h5.lineHeight,
                letterSpacing: props.h5.letterSpacing,
                textTransform: props.h5.textTransform,
            },
            h6: {
                fontFamily: props.h6.fontFamily,
                fontWeight: props.h6.fontWeight,
                fontSize: props.h6.fontSize,
                color: props.h6.color,
                lineHeight: props.h6.lineHeight,
                letterSpacing: props.h6.letterSpacing,
                textTransform: props.h6.textTransform,
            },
            subtitle1: {
                fontFamily: props.subtitle1.fontFamily,
                fontWeight: props.subtitle1.fontWeight,
                fontSize: props.subtitle1.fontSize,
                color: props.subtitle1.color,
                lineHeight: props.subtitle1.lineHeight,
                letterSpacing: props.subtitle1.letterSpacing,
                textTransform: props.subtitle1.textTransform,
            },
            subtitle2: {
                fontFamily: props.subtitle2.fontFamily,
                fontWeight: props.subtitle2.fontWeight,
                fontSize: props.subtitle2.fontSize,
                color: props.subtitle2.color,
                lineHeight: props.subtitle2.lineHeight,
                letterSpacing: props.subtitle2.letterSpacing,
                textTransform: props.subtitle2.textTransform,
            },
            body1: {
                fontFamily: props.body1.fontFamily,
                fontWeight: props.body1.fontWeight,
                fontSize: props.body1.fontSize,
                color: props.body1.color,
                lineHeight: props.body1.lineHeight,
                letterSpacing: props.body1.letterSpacing,
                textTransform: props.body1.textTransform,
            },
            body2: {
                fontFamily: props.body2.fontFamily,
                fontWeight: props.body2.fontWeight,
                fontSize: props.body2.fontSize,
                color: props.body2.color,
                lineHeight: props.body2.lineHeight,
                letterSpacing: props.body2.letterSpacing,
                textTransform: props.body2.textTransform,
            },
            button: {
                fontFamily: props.button.fontFamily,
                fontWeight: props.button.fontWeight,
                fontSize: props.button.fontSize,
                color: props.button.color,
                lineHeight: props.button.lineHeight,
                letterSpacing: props.button.letterSpacing,
                textTransform: props.button.textTransform,
            },
            caption: {
                fontFamily: props.caption.fontFamily,
                fontWeight: props.caption.fontWeight,
                fontSize: props.caption.fontSize,
                color: props.caption.color,
                lineHeight: props.caption.lineHeight,
                letterSpacing: props.caption.letterSpacing,
                textTransform: props.caption.textTransform,
            },
            overline: {
                fontFamily: props.overline.fontFamily,
                fontWeight: props.overline.fontWeight,
                fontSize: props.overline.fontSize,
                color: props.caption.color,
                lineHeight: props.overline.lineHeight,
                letterSpacing: props.overline.letterSpacing,
                textTransform: props.overline.textTransform,
            },
        },
    });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        marginTop: 30,
                        marginBottom: 30,
                    }}
                >
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="h1"
                        component="h1"
                    >{`Heading 1 (H1) - ${props.h1.fontFamily}; font-size: ${props.h1.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="h2"
                        component="h2"
                    >{`Heading 2 (H2) - ${props.h2.fontFamily}; font-size: ${props.h2.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="h3"
                        component="h3"
                    >{`Heading 3 (H3) - ${props.h3.fontFamily}; font-size: ${props.h3.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="h4"
                        component="h4"
                    >{`Heading 4 (H4) - ${props.h4.fontFamily}; font-size: ${props.h4.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="h5"
                        component="h5"
                    >{`Heading 5 (H5) - ${props.h5.fontFamily}; font-size: ${props.h5.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="h6"
                        component="h6"
                    >{`Heading 6 (H6) - ${props.h6.fontFamily}; font-size: ${props.h6.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="subtitle1"
                        component="p"
                    >{`Subtitle 1 (S1) - ${props.subtitle1.fontFamily}; font-size: ${props.subtitle1.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="subtitle2"
                        component="p"
                    >{`Subtitle 2 (S2) - ${props.subtitle2.fontFamily}; font-size: ${props.subtitle2.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="body1"
                        component="p"
                    >{`Body 1 (B1) - ${props.body1.fontFamily}; font-size: ${props.body1.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="body2"
                        component="p"
                    >{`Body 2 (B2) - ${props.body2.fontFamily}; font-size: ${props.body2.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="button"
                        component="button"
                    >{`Button 2 (BU) - ${props.button.fontFamily}; font-size: ${props.button.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="caption"
                        component="p"
                    >{`Caption (CA) - ${props.caption.fontFamily}; font-size: ${props.caption.fontSize};`}</Typography>
                    <Typography
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        variant="overline"
                        component="p"
                    >{`overline (O) - ${props.overline.fontFamily}; font-size: ${props.overline.fontSize};`}</Typography>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
export default ThemeTypographySpec;
