import React, { FC } from 'react';
import { Theme } from '@mui/material';
import { useDebug } from '@components/ui';
import { withStyles, WithStyles } from '@mui/styles'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';


const styles = (theme: Theme) => ({
    table: {
        width: '100%'
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties
}

const VisibilityToggle = ({ selected, onClick }: any) => {
    return <IconButton size="small" color={selected ? "primary" : "default"} onClick={onClick}>
        {selected && <VisibilityIcon />}
        {!selected && <VisibilityOffIcon />}
    </IconButton>
}

const ComponentsPanel: FC<Props> = (props) => {
    const {
        classes,
        ...other
    } = props;

    const {
        showContent,
        showSlots,
        showEditions,
        setShowContent,
        setShowSlots,
        setShowEditions
    } = useDebug();

    const toggleSlots = () => {
        setShowSlots(!showSlots);
    }

    const toggleContent = () => {
        setShowContent(!showContent);
    }

    const toggleEditions = () => {
        setShowEditions(!showEditions);
    }

    return (<>
        <Table size="small" className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Component</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={"content"}>
                    <TableCell>All Content</TableCell>
                    <TableCell align="right">
                        <VisibilityToggle selected={showContent} onClick={toggleContent} />
                    </TableCell>
                </TableRow>
                <TableRow key={"slots"}>
                    <TableCell>All Slots</TableCell>
                    <TableCell align="right">
                        <VisibilityToggle selected={showSlots} onClick={toggleSlots} />
                    </TableCell>
                </TableRow>
                <TableRow key={"editions"}>
                    <TableCell>All Editions</TableCell>
                    <TableCell align="right">
                        <VisibilityToggle selected={showEditions} onClick={toggleEditions} />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>);
};

export default withStyles(styles)(ComponentsPanel);