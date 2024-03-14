import React from 'react';
import { Accordion as MuiAccordian, AccordionDetails, Theme, AccordionSummary, Collapse, Button } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';

const styles = (theme: Theme) => ({
  root: {
    marginTop: 10,
    boxShadow: 'none',
  },
  header: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid #000',
    cursor: 'pointer',
    minHeight: '48px !important',
    maxHeight: '48px',
  },
  headerText: {
    '&::before': {
      content: '"+"',
      fontSize: 20,
      position: 'absolute',
      display: 'inline-block',
      right: 20,
      top: 12,
    },
  },
  body: {
    padding: '15px 0px 0px 15px',
    display: 'inline-block',
  },
  collapseButton: {
    marginTop: '6px',
  },
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
  title: string;
}

const Accordion: React.SFC<Props> = (props) => {
  const { classes, title, children, ...other } = props;

  if (!React.Children.count(children)) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <MuiAccordian className={classes.root} defaultExpanded>
        <AccordionSummary
          className={classes.header}
          id="panel-header"
          aria-controls="panel-content"
          sx={{ minHeight: '48px' }}
        >
          <span className={classes.headerText}>{title}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div>{children}</div>
        </AccordionDetails>
      </MuiAccordian>
    </div>
  );
};

export default withStyles(styles)(Accordion);
