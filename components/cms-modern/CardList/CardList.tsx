// Generated with util/create-component.js
import React from "react";
import { Grid, CardContent, Typography, Card as MuiCard, CardActions, Button, Box } from '@mui/material';
import { CmsContent } from '@lib/cms/CmsContent';
import { withStyles, WithStyles } from '@mui/styles'
import { Theme } from '@mui/material';
import Card from '../Card'


const styles = (theme: Theme) => ({
    root: { marginTop: 30, marginBottom: 30 }
});

interface CardListProps extends WithStyles<typeof styles> {
    className?: string;

    /**
     * Card List Header
     */
    header?: string;
    
    /**
     * List of Cards
     */
    cards?: CmsContent[];
}

const CardList: React.FC<CardListProps> = ({ 
  header,
  cards,
  classes
}) => {
  return (
      <Box data-testid="CardList" className={classes.root}>
      {
          header && ( 
              <Typography variant="h2" component="h2">
                  {header}
              </Typography>
          )
      }
      {
          cards && (
              <Grid container>
                  {
                      cards.map((card: any, index: number) => {
                          return <Card key={ Math.random().toString(36).substr(2, 9) } {...card} />
                      })
                  }
              </Grid>
          )
      }
      </Box>
  )
};

export default withStyles(styles)(CardList);