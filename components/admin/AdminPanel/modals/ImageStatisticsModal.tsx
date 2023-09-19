import React, { FC, useState } from 'react'
import { useUI } from '../../../ui/UIContext';
import { ImageStatistics } from '../panels/ImageStatisticsPanel';
import { Button } from '@mui/material';

interface Props {
    stats: ImageStatistics[];
}

const ImageStatisticsModal: FC<Props> = ({stats}) => {
    const { closeModal } = useUI();

    const handleHide = () => {
        closeModal();
    };

    return (
        <>
            <h2>Image Statistics</h2>
            <div className="af-form-field">
                <label role="text">IDK</label>
            </div>
            <Button variant="contained" color="primary" onClick={handleHide}>
                Done
            </Button>
        </>
    );
}

export default ImageStatisticsModal;