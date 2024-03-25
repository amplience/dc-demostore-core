import React from 'react';
import Image from 'next/image';
import { Theme, Divider, Typography, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExtensionIcon from '@mui/icons-material/Extension';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

import WithAdminTheme from '@components/admin/AdminTheme';
import ComponentsPanel from './panels/ComponentsPanel';
import ContentPreviewPanel from './panels/ContentPreviewPanel';
import { getHubName } from '@lib/config/locator/config-locator';
import { useECommerce } from '@components/core/Masthead/ECommerceContext';
import AcceleratedMediaPanel from './panels/AcceleratedMediaPanel';

const AdminPanel = () => {
    const hubname = getHubName();
    const vendor = useECommerce().vendor;

    return (
        <WithAdminTheme>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 10px 4px 10px',
                    justifyContent: 'center',
                }}
            >
                <div>
                    <Image src="/images/amplience.png" width={247} height={100} alt="amplience" />
                </div>
                <Divider />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        padding: '8px',
                    }}
                >
                    <div>
                        <span>hub</span>{' '}
                        <span>
                            <b>{hubname}</b>
                        </span>
                    </div>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ justifyContent: 'right' }}>
                        <span>vendor</span>{' '}
                        <span>
                            <b>{vendor}</b>
                        </span>
                    </div>
                </div>
                <Divider />
                <Accordion key={'Content Preview'}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                        <VisibilityIcon
                            style={{
                                marginRight: '0.4rem',
                                width: 24,
                                height: 24,
                            }}
                        />
                        <Typography variant="button">{'Content Preview'}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ContentPreviewPanel />
                    </AccordionDetails>
                </Accordion>

                <Accordion key={'Components'}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                        <ExtensionIcon
                            style={{
                                marginRight: '0.4rem',
                                width: 24,
                                height: 24,
                            }}
                        />
                        <Typography variant="button">{'Components'}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ComponentsPanel />
                    </AccordionDetails>
                </Accordion>

                <Accordion key={'Accelerated Media'}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                        <ElectricBoltIcon
                            style={{
                                marginRight: '0.4rem',
                                width: 24,
                                height: 24,
                            }}
                        />
                        <Typography variant="button">{'Accelerated Media'}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AcceleratedMediaPanel />
                    </AccordionDetails>
                </Accordion>
            </div>
        </WithAdminTheme>
    );
};

export default AdminPanel;
