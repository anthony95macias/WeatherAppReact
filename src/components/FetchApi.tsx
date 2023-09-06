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

        fetchWeatherData();
    }, []);

    return (
        <div>
            <h1>Weather Information</h1>
            {weatherData && (
                <div>
                    <p>City: {weatherData.name}</p>
                    <p>Temperature: {weatherData.main.temp} K</p>
                    <p>Weather: {weatherData.weather[0].main}</p>
                </div>
            )}
        </div>
    );
};

export default FetchApi;
