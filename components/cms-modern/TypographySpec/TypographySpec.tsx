import { Typography } from '@mui/material';
import React from 'react';

const TypographySpec = () => {
    return (
        <div>
            <Typography variant="h1" component="h1">
                Heading 1 (H1) - Montserrat Regular CAPS; font-size: 40px; font-color: #666;
            </Typography>
            <Typography variant="h2" component="h2">
                Heading 2 (H2) - Montserrat Regular CAPS; font-size: 24px; font-color: #666;
            </Typography>
            <Typography variant="h3" component="h3">
                Heading 3 (H3) - Roboto Condensed Bold; font-size 18px; font-color: #231f20;
            </Typography>
            <Typography variant="h4" component="h4">
                Heading 4 (H4) - Roboto Condensed Regular; font-size: 18px; font-color: #231f20;
            </Typography>
            <Typography variant="h5" component="h5">
                Heading 5 (H5) - Roboto Condensed Regular; font-size: 12px; font-color: #999;
            </Typography>
            <Typography variant="h6" component="h6">
                Heading 6 (H6) - Roboto Condensed Regular: font-size:9px; font-color: #231f20;
            </Typography>
            <Typography variant="subtitle1" component="p">
                Subtitle 1 (S1) - Roboto Condensed Bold: font-size: 14px; font-color: #231f20;
            </Typography>
            <Typography variant="subtitle2" component="p">
                Subtitle 2 (S2) - Roboto Condensed Regular: font-size: 16px; font-color: #231f20;
            </Typography>
            <p style={{ margin: 0 }}>Body 1 (B1) - not used/defined</p>
            <Typography variant="body2" component="p">
                Body 2 (B2) - Roboto Condensed Regular; font-size: 13px; font-color: #666;
            </Typography>
            <Typography style={{ textTransform: 'none' as 'none' }} variant="button" component="button">
                Button (BU) - Roboto Condensed Regular; font-size: 13px; font-color: #fff;
            </Typography>
            <Typography variant="caption" component="p">
                Caption (CA) - Roboto Condensed Italic; font-size: 13px; font-color: #666;
            </Typography>
            <p>Overline (O) - not used/defined</p>
        </div>
    );
};
export default TypographySpec;
