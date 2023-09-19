import React, { FC, useState } from 'react';
import { Button, Chip, CircularProgress, Divider, IconButton, LinearProgress, Theme, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles'
import ImageStatisticsModal from '../modals/ImageStatisticsModal';
import Modal from '@components/ui/Modal';
import ImageStatisticsGraph from '../ImageStatisticsGraph';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useAcceleratedMedia } from '../context/AcceleratedMediaContext';

export interface ImageStatistics {
    src: string;
    name: string;
    types: { [key: string]: string }
    sizes: { [key: string]: number }
    completed: number,
    total: number
}

const formatTests = ['auto', 'jpeg', 'webp', 'avif']; // png deliberately excluded

async function DetermineImageSizes(onChange: (stats: ImageStatistics[]) => void) {
    const images = Array.from(document.images);

    const result: ImageStatistics[] = [];

    const promises: Promise<any>[] = [];

    for (const image of images) {
        const src = image.currentSrc;
        try {
            const url = new URL(src);

            const isAmplienceRequest = url.pathname.startsWith('/i/');
            const accountName = url.pathname.split('/')[2];

            if (isAmplienceRequest) {
                const imageResult: ImageStatistics = {
                    src,
                    name: url.pathname.split('/')[3],
                    types: {},
                    sizes: {},
                    completed: 0,
                    total: formatTests.length
                }

                result.push(imageResult);

                onChange(result);

                const formatPromises = formatTests.map(async format => {
                    url.searchParams.set('fmt', format);

                    const src = url.toString();

                    try {
                        const response = await fetch(src);

                        const headLength = response.headers.get("content-length");
                        const size = headLength ? Number(headLength) : (await response.arrayBuffer()).byteLength;

                        imageResult.sizes[format] = size;
                        imageResult.types[format] = response.headers.get("content-type") ?? '';
                        imageResult.completed++;

                        onChange(result);
                    } catch (e) {
                        console.log(`Could not scan image ${image.currentSrc}`);
                    }
                });

                promises.push(...formatPromises);
            }
        } catch (e) {
            console.log(`Not a valid URL ${image.currentSrc}`);
        }
    }

    onChange(result);

    await Promise.all(promises);

    return result;
}

function getProgress(stats: ImageStatistics[]): number {
    let completed = 0;
    let total = 0;

    for (const stat of stats) {
        completed += stat.completed;
        total += stat.total;
    }

    return 100 * (completed / total);
}

const VisibilityToggle = ({ selected, onClick }: any) => {
    return <IconButton size="small" color={selected ? "primary" : "default"} onClick={onClick}>
        {selected && <CheckBoxIcon />}
        {!selected && <CheckBoxOutlineBlankIcon />}
    </IconButton>
}

const styles = (theme: Theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginTop: 12,
        marginBottom: 12
    },
    input: {
    },
    progress: {
    },
    table: {
        width: '100%'
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties
}

const AcceleratedMediaPanel: FC<Props> = (props) => {
    const {
        classes,
        ...other
    } = props;

    const [calculating, setCalculating] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [result, setResult] = useState<ImageStatistics[]>([]);

    const closeModal = () => {
        setModalOpen(false);
    }

    const openModal = () => {
        setModalOpen(true);
    }

    const startCalculating = async () => {
        setCalculating(true);
        await DetermineImageSizes((result) => { setResult([...result]) });
        setCalculating(false);
    }

    const {
        acceleratedMedia,
        setAcceleratedMedia
    } = useAcceleratedMedia();

    const toggleAcceleratedMedia = () => {
        setAcceleratedMedia(!acceleratedMedia);
    }

    return (<>
        <Table size="small" className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Configuration</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={"content"}>
                    <TableCell>Enable Accelerated Media</TableCell>
                    <TableCell align="right">
                        <VisibilityToggle selected={acceleratedMedia} onClick={toggleAcceleratedMedia} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <form noValidate>
            <Button className={classes.button} startIcon={calculating && <CircularProgress className={classes.progress} size="1em" color="primary" />} variant="contained" color="primary" size='small' onClick={startCalculating} disabled={calculating}>
                Get Image Statistics
            </Button>
            <Modal open={modalOpen} onClose={closeModal}>
                {modalOpen && <ImageStatisticsModal stats={result} onClose={closeModal} />}
            </Modal>
            {
                result.length > 0 && <>
                    <Typography component="p">
                        {result.length} Amplience Images detected.
                    </Typography>
                    <LinearProgress variant="determinate" value={getProgress(result)} />
                    <ImageStatisticsGraph stats={result} />
                    {
                        !calculating && result.length > 0 && <>
                            <Button variant="outlined" color="primary" onClick={openModal} size='small'>
                                Open Details
                            </Button>
                        </>
                    }
                </>
            }
        </form>
    </>);
};

export default withStyles(styles)(AcceleratedMediaPanel);