import React from 'react';
import { Theme } from '@mui/material';
import { ButtonNext } from 'pure-react-carousel';
import { NavigateNext } from '@components/icons';

const SliderNextButton = () => {
    return (
        <ButtonNext style={{ display: 'contents' }}>
            <NavigateNext
                style={{
                    cursor: 'pointer',
                    width: 40,
                    height: 40,
                    fill: '#fff',
                    background: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translateY(-50%)',
                }}
            />
        </ButtonNext>
    );
};

export default SliderNextButton;
