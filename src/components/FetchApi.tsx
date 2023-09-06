import React, { useEffect, useState } from 'react';

const FetchApi: React.FC = () => {
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY;
        const city = 'California'; // Replace with the desired city name
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        // Fetch weather data initially
        fetchWeatherData();

        // Set up an interval to update weather data every few minutes (adjust as needed)
        const intervalId = setInterval(fetchWeatherData, 300000); // 5 minutes (5 * 60 * 1000 milliseconds)

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const kelvinToFahrenheit = (kelvin: number) => {
        return ((kelvin - 273.15) * 9/5 + 32).toFixed(2); // Convert Kelvin to Fahrenheit and round to 2 decimal places
    };

    return (
        <div>
            <h1>Current Weather</h1>
            {weatherData && (
                <div>
                    <p>City: {weatherData.name}</p>
                    <p>Temperature: {kelvinToFahrenheit(weatherData.main.temp)} °F</p>
                    <p>Weather: {weatherData.weather[0].main}</p>
                </div>
            )}
        </div>
    );
};

export default FetchApi;
