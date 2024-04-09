import { CmsContent } from '@lib/cms/CmsContent';
import { CmsHierarchyNode } from '@lib/cms/fetchHierarchy';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { useThemes } from './ThemesContext';

interface WithCMSThemeProps extends PropsWithChildren {
    themes?: CmsHierarchyNode | undefined;
    themeOverride?: CmsContent | undefined;
}

const WithCMSTheme = ({ themeOverride, children }: WithCMSThemeProps) => {
    const { themes } = useThemes();

    let CMSTheme = undefined;
    let typography = undefined;
    let palette = undefined;

    if (themes) {
        const defaultTheme = themes?.content?.defaultTheme;
        if (defaultTheme) {
            const allThemes = themes?.children;
            CMSTheme = allThemes?.find((theme) => {
                return theme.content._meta.deliveryId === defaultTheme.values[0].id;
            });
        }
    }
    if (themeOverride) {
        const allThemes = themes?.children;
        CMSTheme = allThemes?.find((theme) => {
            return theme.content._meta.deliveryId === themeOverride.values[0].id;
        });
    }
    if (CMSTheme) {
        palette = CMSTheme?.children?.find((node) => node.content.type === 'Palette');
        typography = CMSTheme?.children?.find((node) => node.content.type === 'Typography');
    }

    const theme = createTheme({
        palette: {
            primary: {
                light: palette ? palette.content.primary.light : '#000',
                main: palette ? palette.content.primary.main : '#000',
                dark: palette ? palette.content.primary.dark : '#000',
            },
            secondary: {
                light: palette ? palette.content.secondary.light : '#d54d4d',
                main: palette ? palette.content.secondary.main : '#d54d4d',
                dark: palette ? palette.content.secondary.dark : '#d54d4d',
            },
            error: {
                light: palette ? palette.content.secondary.light : '#d54d4d',
                main: palette ? palette.content.secondary.main : '#d54d4d',
                dark: palette ? palette.content.secondary.dark : '#d54d4d',
            },
            background: {
                default: '#fff',
            },
            grey: {
                A100: '#333333',
            },
            text: {
                primary: '#333333',
            },
            divider: '#d5d5d5',
        },
        shape: {
            borderRadius: 0,
        },
        typography: {
            htmlFontSize: typography ? typography.content.htmlFontSize : 16,
            fontSize: typography ? typography.content.fontSize : 14,
            fontFamily: typography ? typography.content.fontFamily : "'Roboto Condensed', sans-serif",
            fontWeightLight: typography ? typography.content.fontWeightLight : 300,
            fontWeightRegular: typography ? typography.content.fontWeightRegular : 400,
            fontWeightMedium: typography ? typography.content.fontWeightMedium : 500,
            fontWeightBold: typography ? typography.content.fontWeightBold : 700,
            h1: {
                fontSize: typography ? typography.content.h1.fontSize : '40px',
                color: typography ? typography.content.h1.color : '#666',
                lineHeight: typography ? typography.content.h1.lineHeight : '44px',
                fontFamily: typography ? typography.content.h1.fontFamily : "'Montserrat', sans-serif",
                fontWeight: typography ? typography.content.h1.fontWeight : 400,
                textTransform: typography ? typography.content.h1.textTransform : 'uppercase',
            },
            h2: {
                fontSize: typography ? typography.content.h2.fontSize : '24px',
                color: typography ? typography.content.h2.color : '#666',
                fontFamily: typography ? typography.content.h2.fontFamily : "'Montserrat', sans-serif",
                fontWeight: typography ? typography.content.h2.fontWeight : 400,
                textTransform: typography ? typography.content.h2.textTransform : 'uppercase',
            },
            h3: {
                fontSize: typography ? typography.content.h3.fontSize : '18px',
                color: typography ? typography.content.h3.color : '#231f20',
                fontFamily: typography ? typography.content.h3.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.h3.fontWeight : 700,
                textTransform: typography ? typography.content.h3.textTransform : 'uppercase',
            },
            h4: {
                fontSize: typography ? typography.content.h4.fontSize : '18px',
                color: typography ? typography.content.h4.color : '#231f20',
                fontFamily: typography ? typography.content.h4.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.h4.fontWeight : 400,
                textTransform: typography ? typography.content.h4.textTransform : 'none',
            },
            h5: {
                fontSize: typography ? typography.content.h5.fontSize : '12px',
                color: typography ? typography.content.h5.color : '#999',
                fontFamily: typography ? typography.content.h5.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.h5.fontWeight : 400,
                textTransform: typography ? typography.content.h5.textTransform : 'none',
            },
            h6: {
                fontSize: typography ? typography.content.h6.fontSize : '11px',
                color: typography ? typography.content.h6.color : '#231f20',
                fontFamily: typography ? typography.content.h6.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.h6.fontWeight : 400,
                textTransform: typography ? typography.content.h6.textTransform : 'none',
            },
            subtitle1: {
                fontSize: typography ? typography.content.subtitle1.fontSize : '14px',
                color: typography ? typography.content.subtitle1.color : '#231f20',
                fontFamily: typography ? typography.content.subtitle1.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.subtitle1.fontWeight : 700,
                textTransform: typography ? typography.content.subtitle1.textTransform : 'none',
            },
            subtitle2: {
                fontSize: typography ? typography.content.subtitle2.fontSize : '16px',
                color: typography ? typography.content.subtitle2.color : '#231f20',
                fontFamily: typography ? typography.content.subtitle2.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.subtitle2.fontWeight : 400,
                textTransform: typography ? typography.content.subtitle2.textTransform : 'none',
            },
            body1: {
                fontSize: typography ? typography.content.body1.fontSize : '16px',
                color: typography ? typography.content.body1.color : '#231f20',
                fontFamily: typography ? typography.content.body1.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.body1.fontWeight : 400,
                textTransform: typography ? typography.content.body1.textTransform : 'none',
            },
            body2: {
                fontSize: typography ? typography.content.body2.fontSize : '13px',
                color: typography ? typography.content.body2.color : '#666',
                fontFamily: typography ? typography.content.body2.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.body2.fontWeight : 400,
                textTransform: typography ? typography.content.body2.textTransform : 'none',
            },
            button: {
                fontSize: typography ? typography.content.button.fontSize : '13px',
                color: typography ? typography.content.button.color : '#fff',
                backgroundColor: '#999',
                fontFamily: typography ? typography.content.button.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.button.fontWeight : 400,
                textTransform: typography ? typography.content.button.textTransform : 'none',
            },
            caption: {
                fontSize: typography ? typography.content.caption.fontSize : '13px',
                color: typography ? typography.content.caption.color : '#666',
                fontFamily: typography ? typography.content.caption.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.caption.fontWeight : 400,
                textTransform: typography ? typography.content.caption.textTransform : 'none',
                fontStyle: 'italic',
            },
            overline: {
                fontSize: typography ? typography.content.overline.fontSize : '11px',
                color: typography ? typography.content.overline.color : '#666',
                fontFamily: typography ? typography.content.overline.fontFamily : "'Roboto Condensed', sans-serif",
                fontWeight: typography ? typography.content.overline.fontWeight : 400,
                textTransform: typography ? typography.content.overline.textTransform : 'none',
            },
        },
    });

    // Add global style for the general default theme
    if (!themeOverride) {
        const styles = {
            '@global': {
                fontSize: theme.typography.fontSize,
                fontFamily: theme.typography.fontFamily,
                h1: {
                    fontSize: theme.typography.h1.fontSize,
                    color: theme.typography.h1.color,
                    lineHeight: theme.typography.h1.lineHeight,
                    fontFamily: theme.typography.h1.fontFamily,
                    fontWeight: theme.typography.h1.fontWeight,
                    textTransform: theme.typography.h1.textTransform,
                },
                h2: {
                    fontSize: theme.typography.h2.fontSize,
                    color: theme.typography.h2.color,
                    lineHeight: theme.typography.h2.lineHeight,
                    fontFamily: theme.typography.h2.fontFamily,
                    fontWeight: theme.typography.h2.fontWeight,
                    textTransform: theme.typography.h2.textTransform,
                },
                h3: {
                    fontSize: theme.typography.h3.fontSize,
                    color: theme.typography.h3.color,
                    lineHeight: theme.typography.h3.lineHeight,
                    fontFamily: theme.typography.h3.fontFamily,
                    fontWeight: theme.typography.h3.fontWeight,
                    textTransform: theme.typography.h3.textTransform,
                },
                h4: {
                    fontSize: theme.typography.h4.fontSize,
                    color: theme.typography.h4.color,
                    lineHeight: theme.typography.h4.lineHeight,
                    fontFamily: theme.typography.h4.fontFamily,
                    fontWeight: theme.typography.h4.fontWeight,
                    textTransform: theme.typography.h4.textTransform,
                },
                h5: {
                    fontSize: theme.typography.h5.fontSize,
                    color: theme.typography.h5.color,
                    lineHeight: theme.typography.h5.lineHeight,
                    fontFamily: theme.typography.h5.fontFamily,
                    fontWeight: theme.typography.h5.fontWeight,
                    textTransform: theme.typography.h5.textTransform,
                },
                h6: {
                    fontSize: theme.typography.h6.fontSize,
                    color: theme.typography.h6.color,
                    lineHeight: theme.typography.h6.lineHeight,
                    fontFamily: theme.typography.h6.fontFamily,
                    fontWeight: theme.typography.h6.fontWeight,
                    textTransform: theme.typography.h6.textTransform,
                },
                subtitle1: {
                    fontSize: theme.typography.subtitle1.fontSize,
                    color: theme.typography.subtitle1.color,
                    lineHeight: theme.typography.subtitle1.lineHeight,
                    fontFamily: theme.typography.subtitle1.fontFamily,
                    fontWeight: theme.typography.subtitle1.fontWeight,
                    textTransform: theme.typography.subtitle1.textTransform,
                },
                subtitle2: {
                    fontSize: theme.typography.subtitle2.fontSize,
                    color: theme.typography.subtitle2.color,
                    lineHeight: theme.typography.subtitle2.lineHeight,
                    fontFamily: theme.typography.subtitle2.fontFamily,
                    fontWeight: theme.typography.subtitle2.fontWeight,
                    textTransform: theme.typography.subtitle2.textTransform,
                },
                body1: {
                    fontSize: theme.typography.body1.fontSize,
                    color: theme.typography.body1.color,
                    lineHeight: theme.typography.body1.lineHeight,
                    fontFamily: theme.typography.body1.fontFamily,
                    fontWeight: theme.typography.body1.fontWeight,
                    textTransform: theme.typography.body1.textTransform,
                },
                body2: {
                    fontSize: theme.typography.body2.fontSize,
                    color: theme.typography.body2.color,
                    lineHeight: theme.typography.body2.lineHeight,
                    fontFamily: theme.typography.body2.fontFamily,
                    fontWeight: theme.typography.body2.fontWeight,
                    textTransform: theme.typography.body2.textTransform,
                },
                button: {
                    fontSize: theme.typography.button.fontSize,
                    color: theme.typography.button.color,
                    lineHeight: theme.typography.button.lineHeight,
                    fontFamily: theme.typography.button.fontFamily,
                    fontWeight: theme.typography.button.fontWeight,
                    textTransform: theme.typography.button.textTransform,
                },
                caption: {
                    fontSize: theme.typography.caption.fontSize,
                    color: theme.typography.caption.color,
                    lineHeight: theme.typography.caption.lineHeight,
                    fontFamily: theme.typography.caption.fontFamily,
                    fontWeight: theme.typography.caption.fontWeight,
                    textTransform: theme.typography.caption.textTransform,
                },
                overline: {
                    fontSize: theme.typography.overline.fontSize,
                    color: theme.typography.overline.color,
                    lineHeight: theme.typography.overline.lineHeight,
                    fontFamily: theme.typography.overline.fontFamily,
                    fontWeight: theme.typography.overline.fontWeight,
                    textTransform: theme.typography.overline.textTransform,
                },
                p: {
                    fontSize: theme.typography.body1.fontSize,
                    color: theme.typography.body1.color,
                    lineHeight: theme.typography.body1.lineHeight,
                    fontFamily: theme.typography.body1.fontFamily,
                    fontWeight: theme.typography.body1.fontWeight,
                    textTransform: theme.typography.body1.textTransform,
                },
            },
        };
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledEngineProvider>
    );
};

export default WithCMSTheme;
