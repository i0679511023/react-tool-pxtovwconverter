import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import SingleValuePage from './pages/SingleValuePage/SingleValuePage';
import TextConverterPage from './pages/TextConverterPage/TextConverterPage';
import ColorConvertorPage from './pages/ColorConvertorPage/ColorConvertorPage';
import SideMenu from './components/SideMenu/SideMenu';
import ShadowGeneratorPage from './pages/ShadowGeneratorPage/ShadowGeneratorPage';
import GradientGeneratorPage from './pages/GradientGeneratorPage/GradientGeneratorPage';
import SideSwipeableMenu from './components/SideSwipeableMenu/SideSwipeableMenu';
import SideSwipeableMenuProvider from './context/SideSwipeableMenuProvider';
import PATH from './constants/path';
import './App.css';
import RatioCalculationPage from './pages/RatioCalculationPage/RatioCalculationPage';

const App = () => (
	/**
	 *
	 * TODO 01. Renew App Title+, README file+ and images
	 * TODO 02. App: Refactor TS Props in RCs whole project
	 * TODO 10. App: Implement Error Boundry
	 * TODO 11. PX to VW Text: Add an min max option to limits vw convertation
	 * TODO 50. Add a LTR / RTL convertor
	 * TODO 70. Add ratio/margin calculator
	 * TODO 80. Add Regex drag&drop generator
	 * TODO 82. PX to VW Text: Exclude rows with specific rules (box-shadows, and other if needed)
	 * TODO 999. Add wave/shape generator (need to research)
	 */

	<SideSwipeableMenuProvider>
		<Box sx={{ display: 'flex' }}>
			<SideSwipeableMenu />
			<SideMenu />
			<Container
				component="div"
				maxWidth={false}
				sx={{ padding: { xs: 0, md: '0 16px' } }}
			>
				<Box>
					<Routes>
						<Route path={PATH.home} element={<SingleValuePage />} />
						<Route path={PATH.textConverter} element={<TextConverterPage />} />
						<Route path={PATH.colorConverter} element={<ColorConvertorPage />} />
						<Route path={PATH.shadowGenerator} element={<ShadowGeneratorPage />} />
						<Route
							path={PATH.gradientGenerator}
							element={<GradientGeneratorPage />}
						/>
						<Route path={PATH.ratioCalculator} element={<RatioCalculationPage />} />
						<Route path="*" element={<Navigate to={PATH.home} />} />
					</Routes>
				</Box>
			</Container>
		</Box>
	</SideSwipeableMenuProvider>
);

export default App;
