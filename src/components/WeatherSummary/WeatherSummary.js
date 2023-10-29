import styles from './WeatherSummary.module.scss';

const WeatherSummary = ({ weatherData }) => {
	console.log(weatherData);
	return (
		<section className={styles.weatherSummary}>
			<img
				className={styles.weatherIcon}
				alt={weatherData.description}
				src={`${process.env.PUBLIC_URL}/images/weather-icons/${weatherData.icon}.png`}
			/>
			<div className={styles.weatherInfo}>
				<h2>{weatherData.city}</h2>
				<p>
					<strong>Temp:</strong> {weatherData.temp.toFixed(0)}°C
				</p>
			</div>
		</section>
	);
};

export default WeatherSummary;
