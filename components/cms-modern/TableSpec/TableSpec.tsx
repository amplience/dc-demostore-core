import { WithTheme } from '@components/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import './TableSpec.scss';

const TableSpec = () => {
    const items = [
        { id: 1, label: 'One' },
        { id: 2, label: 'Two' },
        { id: 3, label: 'Three' },
        { id: 4, label: 'Four' },
    ];
    return (
        <WithTheme>
            <h3 style={{ fontSize: '18px' }}>Default</h3>
            <TableContainer>
                <Table aria-label="A table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Label</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item: any) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.label}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <h3 style={{ fontSize: '18px' }}>Compact</h3>

            <TableContainer component={Paper}>
                <Table size="small" aria-label="A table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Label</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item: any) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.label}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </WithTheme>
    );
};
export default TableSpec;
