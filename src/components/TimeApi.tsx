import React, { useEffect, useState } from 'react';

const FetchApi: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const fetchTimeData = () => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            });
            setCurrentTime(formattedTime);
        };

        // Fetch the initial time
        fetchTimeData();

        // Set up an interval to update the time every second (adjust as needed)
        const intervalId = setInterval(fetchTimeData, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h>Current Time in California</h>
            <p>{currentTime}</p>
        </div>
    );
};

export default FetchApi;
