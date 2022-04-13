import React from 'react';
import { Theme, Divider, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { withStyles, WithStyles } from '@mui/styles'

import ExtensionIcon from '@mui/icons-material/Extension';
import ComponentsPanel from './panels/ComponentsPanel';

import WithAdminTheme from '@components/admin/AdminTheme';
import ContentPreviewPanel from './panels/ContentPreviewPanel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { configLocator } from '@lib/config/AppContext';
import Image from 'next/image';

const styles = (theme: Theme) => ({
  root: {
  },
  logo: {
    display: 'flex',
    padding: '10px 10px 4px 10px',
    justifyContent: 'left'
  },
  icon: {
    marginRight: '0.4rem',
    width: 24,
    height: 24
  }
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties
}

const AdminPanel: React.SFC<Props> = (props) => {
  const {
    classes,
    ...other
  } = props;

  const configArray = configLocator.split(":");
  const hubname = configArray[0];
  const env = configArray[1];

  return (
    <WithAdminTheme>
      <div className={classes.root}>
        <div className={classes.logo}>
          <Image src="/images/amplience.png" width={247} height={100} alt='amplience' />
        </div>
        <Divider />
        <div className={classes.logo}>
          <div>
            <span>hub</span> <span><b>{hubname}</b></span>
          </div>
          <div style={{ marginLeft: '40px' }}>
            <span>env</span> <span><b>{env}</b></span>
          </div>
        </div>
        <Divider />
        <Accordion key={'Content Preview'}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
            <VisibilityIcon className={classes.icon} />
            <Typography variant="button">{'Content Preview'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ContentPreviewPanel />
          </AccordionDetails>
        </Accordion>

        <Accordion key={'Components'}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
            <ExtensionIcon className={classes.icon} />
            <Typography variant="button">{'Components'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ComponentsPanel />
          </AccordionDetails>
        </Accordion>
      </div>
    </WithAdminTheme>
  );
};

export default withStyles(styles)(AdminPanel);