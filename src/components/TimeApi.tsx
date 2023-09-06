import React, { useEffect, useState } from 'react';

const FetchApi: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [timeFormat, setTimeFormat] = useState<string>('12'); // Default to 12-hour format

    useEffect(() => {
        const fetchTimeData = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            };

            if (timeFormat === '12') {
                options.hour12 = true; // Use 12-hour format
            } else {
                options.hour12 = false; // Use 24-hour format
            }

            const formattedTime = now.toLocaleTimeString('en-US', options);
            setCurrentTime(formattedTime);
        };

        // Fetch the initial time
        fetchTimeData();

        // Set up an interval to update the time every second (adjust as needed)
        const intervalId = setInterval(fetchTimeData, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [timeFormat]);

    const toggleTimeFormat = () => {
        // Toggle between 12-hour and 24-hour formats
        setTimeFormat(timeFormat === '12' ? '24' : '12');
    };

    const buttonStyle = {
        fontSize: '.7rem', // Adjust the font size here to make it smaller
    };

    return (
        <div>
            <h4>Current Time in California</h4>
            <p>{currentTime}</p>
            <button onClick={toggleTimeFormat} style={buttonStyle}>
                Toggle Time Format ({timeFormat === '12' ? '12-hour' : '24-hour'})
            </button>
        </div>
    );
};

export default FetchApi;
