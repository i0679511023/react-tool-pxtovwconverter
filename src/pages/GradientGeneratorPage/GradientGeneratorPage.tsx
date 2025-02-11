import { Box, Button, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import ResultStringCopyButton from '../../components/ResultStringCopyButton/ResultStringCopyButton';
import SliderWithInput from '../../components/SliderWithInput/SliderWithInput';
import './GradientGeneratorPage.css';
import GradientColorsList from '../../components/GradientColorsList/GradientColorsList';
import DropDownSmallSelect from '../../components/DropDownSmallSelect/DropDownSmallSelect';

export interface gradientColorsListTypes {
	color: string;
	stop: number;
	isColorPickerOpened?: boolean;
}

const GradientGeneratorPage = () => {
	// background-image: linear-gradient(angle, color-stop1, color-stop2);
	// background-image: repeating-linear-gradient(red, yellow 10%, green 20%);

	const gradientTypesList = {
		linearGradient: 'linear-gradient',
		radialGradient: 'radial-gradient',
		conicGradient: 'conic-gradient',
		repeatingLinearGradient: 'repeating-linear-gradient',
		repeatingRadialGradient: 'repeating-radial-gradient',
	};

	const gradientTypesArray: { key: string; value: any }[] = [];

	Object.entries(gradientTypesList).forEach(([key, value]) =>
		gradientTypesArray.push({ key, value }),
	);

	const initialCalculatedGradient =
		'linear-gradient(90deg, #1f005c, #6d0061, #a51e5f, #cf4f5c, #ed815e, #ffb56b)';
	const [calculatedGradient, setCalculatedGradient] = useState(
		initialCalculatedGradient,
	);

	const initialGradientStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 150,
		background: calculatedGradient,
	};

	const [gradientStyle, setGradientStyle] = useState(initialGradientStyle);

	const [gradientAngle, setGradientAngle] = useState(90);

	const initialCirclePosition = {
		x: 50,
		y: 50,
	};
	const [circlePosition, setCirclePosition] = useState(initialCirclePosition);

	const initialGradientType = {
		key: 'linearGradient',
		value: 'linear-gradient',
	};
	const [gradientType, setGradientType] = useState(initialGradientType);

	const initialGradientColorSet = [
		{
			color: '#409a4a',
			stop: 0,
			isColorPickerOpened: false,
		},
		{
			color: '#211c79',
			stop: 25,
			isColorPickerOpened: false,
		},
		{
			color: '#a01989',
			stop: 50,
			isColorPickerOpened: false,
		},
		{
			color: '#c7c72c',
			stop: 75,
			isColorPickerOpened: false,
		},
		{
			color: '#e01313',
			stop: 100,
			isColorPickerOpened: false,
		},
	];
	const [gradientColorsSet, setGradientColorsSet] = useState<
		gradientColorsListTypes[]
	>(initialGradientColorSet);

	const handleAddNewColorRow = () => {
		const newGradientColorSet = [...gradientColorsSet];
		newGradientColorSet.push({
			color: '#FFFFFF',
			stop: 50,
			isColorPickerOpened: false,
		});

		setGradientColorsSet(newGradientColorSet);
	};

	const handleSetCirclePosition = (value: number, axios: string) => {
		if (axios === 'x') {
			setCirclePosition({ ...circlePosition, x: value });
		} else if (axios === 'y') {
			setCirclePosition({ ...circlePosition, y: value });
		}
	};

	const calculateGradient = () => {
		let gradientString = '';
		gradientString += `${gradientType.value}(`;

		switch (gradientType.key) {
			case 'linearGradient':
			case 'repeatinglinearGradient':
				gradientString += `${gradientAngle}deg`;
				break;
			case 'radialGradient':
			case 'repeatingRadialGradient':
				gradientString += `circle at ${circlePosition.x}% ${circlePosition.y}%`;
				break;
			case 'conicGradient':
				gradientString +=
					`from ${gradientAngle}deg` +
					` at ${circlePosition.x}% ${circlePosition.y}%`;
				break;
			default:
		}

		gradientString = gradientColorsSet.reduce(
			(colorString, colorRow) =>
				`${colorString}, ${colorRow.color} ${colorRow.stop}%`,
			gradientString,
		);

		gradientString += ')';
		setCalculatedGradient(gradientString);
	};

	useEffect(() => {
		calculateGradient();
	}, [gradientAngle, gradientColorsSet, gradientType]);

	useEffect(() => {
		setGradientStyle({ ...gradientStyle, background: calculatedGradient });
	}, [calculatedGradient]);

	useEffect(() => {
		calculateGradient();
	}, []);

	return (
		<>
			<NavigationBar title="Gradient Generator" />
			<div>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={12}>
						<Paper>
							<Box p={2} style={gradientStyle} />
						</Paper>
						<Paper>
							<ResultStringCopyButton value={`background: ${calculatedGradient};`} />
						</Paper>
					</Grid>
				</Grid>
				<Grid container direction="row" justifyContent="center">
					<Grid item xs={12} md={6} lg={4}>
						<Paper>
							<Box p={2}>
								<DropDownSmallSelect
									title="Gradient Type"
									value={gradientType}
									setValue={setGradientType}
									valuesList={gradientTypesArray}
								/>
							</Box>
							<Box p={2}>
								<GradientColorsList
									gradientColorsSet={gradientColorsSet}
									setGradientColorsSet={setGradientColorsSet}
								/>
								<Button
									variant="outlined"
									size="small"
									startIcon={<AddCircleOutlineIcon />}
									onClick={handleAddNewColorRow}
								>
									Add New Color
								</Button>
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={8}>
						<Paper>
							<Box p={2}>
								{gradientType &&
									(gradientType.key === 'linearGradient' ||
										gradientType.key === 'conicGradient') && (
										<SliderWithInput
											value={gradientAngle}
											setValue={setGradientAngle}
											title="Gradient Angle"
											minValue={0}
											maxValue={360}
											step={1}
											resetValue={90}
										/>
									)}
								{gradientType &&
									(gradientType.key === 'radialGradient' ||
										gradientType.key === 'conicGradient') && (
										<>
											<SliderWithInput
												value={circlePosition.x}
												setValue={(val: number) => handleSetCirclePosition(val, 'x')}
												title="Position X"
												minValue={-20}
												maxValue={120}
												step={10}
												resetValue={50}
											/>
											<SliderWithInput
												value={circlePosition.y}
												setValue={(val: number) => handleSetCirclePosition(val, 'y')}
												title="Position Y"
												minValue={-20}
												maxValue={120}
												step={10}
												resetValue={50}
											/>
										</>
									)}
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default GradientGeneratorPage;
