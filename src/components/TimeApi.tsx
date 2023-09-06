import React, { useEffect, useState } from 'react';

const FetchApi: React.FC = () => {
    const [timeData, setTimeData] = useState<any>(null);

    useEffect(() => {
        const apiUrl = 'http://worldtimeapi.org/api/timezone/America/Los_Angeles';

        const fetchTimeData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setTimeData(data);
            } catch (error) {
                console.error('Error fetching time data:', error);
            }
        };

        // Fetch time data initially
        fetchTimeData();

        // Set up an interval to fetch time data every second (adjust as needed)
        const intervalId = setInterval(fetchTimeData, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>Current Time in California</h1>
            {timeData && (
                <div>
                    <p>Time Zone: {timeData.timezone}</p>
                    <p>Current Time: {timeData.datetime}</p>
                </div>
            )}
        </div>
    );
};

export default FetchApi;
