import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { nanoid } from 'nanoid';

interface Palette {
    light: string;
    main: string;
    dark: string;
}

interface ThemePaletteSpecProps {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
    primary: Palette;
    secondary: Palette;
    error: Palette;
    warning: Palette;
    success: Palette;
}

const ThemePaletteSpec = (props: ThemePaletteSpecProps) => {
    const paletteList = [
        { name: 'primary', palette: props.primary },
        { name: 'secondary', palette: props.secondary },
        { name: 'error', palette: props.error },
        { name: 'warning', palette: props.warning },
        { name: 'success', palette: props.success },
    ];

    return (
        <Grid
            style={{
                flexGrow: 1,
                paddingTop: 50,
                paddingBottom: 50,
            }}
            container
            spacing={3}
            justifyContent="center"
        >
            {paletteList.map((color: { name: string; palette: Palette }) => {
                return (
                    <Grid key={nanoid()} container spacing={3}>
                        <Grid item xs={4}>
                            <Paper style={{ height: 120, width: '90%', backgroundColor: color.palette.light }} />
                            <Typography variant="body1" component="p">
                                {color.name} light
                            </Typography>
                            <Typography variant="caption" component="p">
                                {color.palette.light}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={{ height: 120, width: '90%', backgroundColor: color.palette.main }} />
                            <Typography variant="body1" component="p">
                                {color.name} main
                            </Typography>
                            <Typography variant="caption" component="p">
                                {color.palette.main}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={{ height: 120, width: '90%', backgroundColor: color.palette.dark }} />
                            <Typography variant="body1" component="p">
                                {color.name} dark
                            </Typography>
                            <Typography variant="caption" component="p">
                                {color.palette.dark}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            })}
        </Grid>
    );
};
export default ThemePaletteSpec;
