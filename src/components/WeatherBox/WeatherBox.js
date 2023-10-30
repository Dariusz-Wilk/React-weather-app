import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const API_KEY = '0b35dd1a1b71a477e4f7bcb19531895d';

const WeatherBox = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const handleCityChange = useCallback(cityName => {
		setPending(true);
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
		).then(res => {
			if (res.status === 200) {
				return res.json().then(data => {
					setWeatherData({
						city: data.name,
						temp: data.main.temp,
						icon: data.weather[0].icon,
						description: data.weather[0].main,
					});
					setPending(false);
					setError(false);
				});
			} else {
				setErrorMsg(res.statusText);
				setError(true);
				setPending(false);
			}
		});
	}, []);

	return (
		<section>
			<PickCity action={handleCityChange} />
			{weatherData && !pending && !error && <WeatherSummary {...weatherData} />}
			{pending && <Loader />}
			{error && <ErrorBox> {errorMsg} </ErrorBox>}
		</section>
	);
};

export default WeatherBox;
