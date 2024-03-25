import React, { PropsWithChildren } from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import clsx from 'clsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props extends PropsWithChildren {
    className?: string;
    title: string;
}

const ProductFacet = (props: Props) => {
    const { className, title, children, ...other } = props;

    return (
        <div className={clsx(className)} {...other}>
            <Accordion style={{ boxShadow: 'unset', borderBottom: '1px solid #cbcbcb' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: 0 }}>
                    <div>
                        <Typography
                            style={{
                                fontSize: 13,
                                color: '#231f20',
                                fontWeight: 'bold' as 'bold',
                                textTransform: 'uppercase' as 'uppercase',
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography style={{ marginTop: 10, fontSize: 12, color: '#666' }}>All</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>{children}</AccordionDetails>
            </Accordion>
        </div>
    );
};

export default ProductFacet;
