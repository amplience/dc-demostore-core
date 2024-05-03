import React, { PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';
import { Accordion as MuiAccordian, AccordionDetails, Theme, AccordionSummary, Collapse, Button } from '@mui/material';

interface AccordionProps extends PropsWithChildren {
    title: string;
}

const Accordion = (props: AccordionProps) => {
    const { title, children, ...other } = props;

    if (!React.Children.count(children)) {
        return <></>;
    }

    return (
        <Box style={{ marginTop: 10 }}>
            <MuiAccordian defaultExpanded>
                <AccordionSummary id="panel-header" aria-controls="panel-content" sx={{ minHeight: '48px' }}>
                    <Typography>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>{children}</Box>
                </AccordionDetails>
            </MuiAccordian>
        </Box>
    );
};

export default Accordion;
