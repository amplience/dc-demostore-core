import React, { PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';

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
            <Box
                style={{
                    borderTop: '1px solid #000',
                    borderBottom: '1px solid #000',
                    cursor: 'pointer',
                    padding: '10px 47.6px 10px 20px',
                }}
            >
                <Typography
                    sx={{
                        '&::before': {
                            content: '"+"',
                            fontSize: 20,
                            position: 'absolute',
                            display: 'inline-block',
                            right: 20,
                            top: 15,
                        },
                    }}
                >
                    {title}
                </Typography>
            </Box>
            <Box style={{ padding: '15px 0px 0px 15px', display: 'inline-block' }}>{children}</Box>
        </Box>
    );
};

export default Accordion;
