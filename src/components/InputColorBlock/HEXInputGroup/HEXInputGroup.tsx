import {
	FormControl,
	FormHelperText,
	InputAdornment,
	TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { ONLY_HEX_CHARACTERES } from '../../../constants/regex';

interface propTypes {
	enteredHexValue: string;
	setEnteredHexValue: React.Dispatch<React.SetStateAction<string>>;
	enteredHexOpacityValue: number;
	setEnteredHexOpacityValue: React.Dispatch<React.SetStateAction<number>>;
	handleKeyPressed: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const HEXInputGroup = ({
	enteredHexValue,
	setEnteredHexValue,
	enteredHexOpacityValue,
	setEnteredHexOpacityValue,
	handleKeyPressed,
}: propTypes) => {
	const handleEnteredHexValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (
			event.target.value.match(ONLY_HEX_CHARACTERES) ||
			event.target.value === ''
		) {
			setEnteredHexValue(event.target.value);
		}
	};

	const handleEnteredHexOpacityValue = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setEnteredHexOpacityValue(+event.target.value);
	};

	useEffect(() => {
		localStorage.setItem('enteredHexValue', JSON.stringify(enteredHexValue));
	}, [enteredHexValue]);

	useEffect(() => {
		localStorage.setItem(
			'enteredHexOpacityValue',
			JSON.stringify(enteredHexOpacityValue),
		);
	}, [enteredHexOpacityValue]);

	return (
		<>
			<FormControl sx={{ m: 1 }} size="small">
				<TextField
					value={enteredHexValue}
					onChange={handleEnteredHexValue}
					variant="outlined"
					size="small"
					onKeyPress={handleKeyPressed}
				/>
				<FormHelperText>HEX Color Code (6 or 8 dig)</FormHelperText>
			</FormControl>
			<FormControl sx={{ m: 1, width: { xs: '30%', md: '15%' } }} size="small">
				<TextField
					value={enteredHexOpacityValue}
					onChange={handleEnteredHexOpacityValue}
					size="small"
					type="number"
					onKeyPress={handleKeyPressed}
					InputProps={{
						startAdornment: <InputAdornment position="start">A</InputAdornment>,
						inputProps: { min: 0, max: 1, step: 0.1 },
					}}
				/>
				<FormHelperText>Alpha</FormHelperText>
			</FormControl>
		</>
	);
};

export default HEXInputGroup;
