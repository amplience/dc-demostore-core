import { WithTheme } from '@components/core';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import './SelectSpec.scss';

const SelectSpec = () => {
    const items = [
        { id: 1, label: 'One' },
        { id: 2, label: 'Two' },
        { id: 3, label: 'Three' },
        { id: 4, label: 'Four' },
    ];
    const selectedItem = items[3];
    return (
        <WithTheme>
            <FormControl>
                <InputLabel>Items</InputLabel>
                <Select value={selectedItem.id}>
                    {items.map((item: any) => {
                        return (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </WithTheme>
    );
};
export default SelectSpec;
