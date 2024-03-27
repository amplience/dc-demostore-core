import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import React from 'react';
import './CheckboxSpec.scss';
import { WithTheme } from '@components/core';

const CheckboxSpec = () => {
    const [state] = React.useState({
        one: true,
        two: true,
    });
    return (
        <WithTheme>
            <FormControl component="fieldset">
                <FormLabel component="legend">States</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel control={<Checkbox checked={state.one} color="primary" />} label="Primary" />
                    <FormControlLabel control={<Checkbox checked={state.two} />} label="Secondary" />
                    <FormControlLabel control={<Checkbox />} label="Uncontrolled" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                    <FormControlLabel disabled control={<Checkbox checked />} label="Disabled" />
                    <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
                </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Label Placement</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="top"
                        control={<Checkbox color="primary" />}
                        label="Top"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="start"
                        control={<Checkbox color="primary" />}
                        label="Start"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="bottom"
                        control={<Checkbox color="primary" />}
                        label="Bottom"
                        labelPlacement="bottom"
                    />
                    <FormControlLabel
                        value="end"
                        control={<Checkbox color="primary" />}
                        label="End"
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>
        </WithTheme>
    );
};
export default CheckboxSpec;
