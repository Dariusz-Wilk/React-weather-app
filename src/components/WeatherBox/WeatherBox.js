import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const API_KEY = '0b35dd1a1b71a477e4f7bcb19531895d';

const WeatherBox = props => {
	const [weatherData, setWeatherData] = useState({});
	const handleCityChange = useCallback(cityName => {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
		)
			.then(res => res.json())
			.then(data => {
				setWeatherData({
					city: data.name,
					temp: data.main.temp,
					icon: data.weather[0].icon,
					description: data.weather[0].main,
				});
			});
	}, []);

	return (
		<section>
			<PickCity action={handleCityChange} />
			<WeatherSummary weatherData={weatherData} />
			<Loader />
		</section>
	);
};

export default WeatherBox;
