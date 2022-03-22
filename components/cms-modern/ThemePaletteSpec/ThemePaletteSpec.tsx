import { Grid, Paper, Theme, Typography } from "@mui/material";
import React, { FC } from "react";
import { withStyles, WithStyles } from '@mui/styles'
import { nanoid } from 'nanoid'

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 50
  },
  paper: {
    height: 120,
    width: "90%"
  }
});

interface Palette {
  light: string;
  main: string;
  dark: string; 
}

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
  primary: Palette;
  secondary: Palette;
  error: Palette;
  warning: Palette;
  success: Palette;
}

const ThemePaletteSpec: FC<Props> = (props) => {
  const {
    classes,
    ...other
  } = props;

  const paletteList = [
    { name: "primary", palette: props.primary },
    { name: "secondary", palette: props.secondary },
    { name: "error", palette: props.error },
    { name: "warning", palette: props.warning },
    { name: "success", palette: props.success }
  ];

  return (
    <Grid container spacing={3} className={classes.root} justifyContent="center">
      {
        paletteList.map((color: {name: string, palette: Palette }) => {
          return (
            <Grid key={nanoid()} container spacing={3}>
              <Grid item xs={4}>
                <Paper style={{backgroundColor: color.palette.light}} className={classes.paper}/>
                <Typography variant="body1" component="p">{color.name} light</Typography>
                <Typography variant="caption" component="p">{color.palette.light}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Paper style={{backgroundColor: color.palette.main}} className={classes.paper}/>
                <Typography variant="body1" component="p">{color.name} main</Typography>
                <Typography variant="caption" component="p">{color.palette.main}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Paper style={{backgroundColor: color.palette.dark}} className={classes.paper}/>
                <Typography variant="body1" component="p">{color.name} dark</Typography>
                <Typography variant="caption" component="p">{color.palette.dark}</Typography>
              </Grid>
            </Grid>        
          );
        })
      }
    </Grid>
  );
}
export default withStyles(styles)(ThemePaletteSpec);