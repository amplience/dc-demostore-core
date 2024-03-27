import React from 'react';
import { ButtonBack } from 'pure-react-carousel';
import { NavigatePrevious } from '@components/icons';

const SliderBackButton = () => {
    return (
        <ButtonBack style={{ display: 'contents' }}>
            <NavigatePrevious
                style={{
                    cursor: 'pointer',
                    width: 40,
                    height: 40,
                    fill: '#fff',
                    background: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: 0,
                    transform: 'translateY(-50%)',
                }}
            />
        </ButtonBack>
    );
};

export default SliderBackButton;
