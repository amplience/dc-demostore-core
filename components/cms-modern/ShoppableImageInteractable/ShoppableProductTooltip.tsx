import { Tooltip } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { commerceApi } from '@pages/api';

type ShoppableProductTooltipProps = {
    children: ReactElement;
    title: string;
    target: string;
};

export const ShoppableProductTooltip = ({ children, title, target }: ShoppableProductTooltipProps) => {
    const [tooltip, setTooltip] = useState(title);

    useEffect(() => {
        commerceApi.getProduct({ id: target }).then((product) => {
            setTooltip(`${product.name} - ${product.variants[0]?.listPrice}`);
        });
    });
    return (
        <Tooltip title={tooltip} followCursor>
            {children}
        </Tooltip>
    );
};
