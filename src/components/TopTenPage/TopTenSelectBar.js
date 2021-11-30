import * as React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function SelectLabels() {
    const [feature, setFeature] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChangeFeature = (event) => {
        setFeature(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
                Select a Feature: 
            </Button>
            <FormControl sx={{m: 1, minWidth: 300}}>
                <InputLabel id="demo-simple-select-label">Feature</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={feature}
                label="Feature"
                onChange={handleChangeFeature}
                >
                <MenuItem value={'affectionate_with_family'}>Affectionate with amily</MenuItem>
                <MenuItem value={'amount_of_shedding'}>Amount of shedding</MenuItem>
                <MenuItem value={'easy_to_groom'}>Easy to groom</MenuItem>
                <MenuItem value={'general_health'}>General health</MenuItem>
                <MenuItem value={'intelligence'}>Intelligence</MenuItem>
                <MenuItem value={'kid_friendly'}>Kid friendly</MenuItem>
                <MenuItem value={'pet_friendly'}>Pet friendly</MenuItem>
                <MenuItem value={'potential_for_playfulness'}>Potential for playfulness</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}