import React, { useState, useEffect } from 'react';

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [paused, setPaused] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval;
        if (running && !paused) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10); // update time every 10 ms
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, paused]);

    const handleStart = () => {
        setRunning(true);
        setPaused(false);
    };

    const handlePause = () => {
        setPaused(true);
    };

    const handleReset = () => {
        setRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        if (running && !paused) {
            setLaps([...laps, time]);
        }
    };

    const formatTime = (time) => {
        const milliseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
        const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    return (
        <div>
            <h1>Stopwatch</h1>
            <div>{formatTime(time)}</div>
            {!running || paused ?
                <button onClick={handleStart}>Start</button> :
                <button onClick={handlePause}>Pause</button>
            }
            <button onClick={handleLap} disabled={!running || paused}>Lap</button>
            <button onClick={handleReset} disabled={!running}>Reset</button>
            
            <ul>
                {laps.map((lap, index) => (
                    <li key={index}>{formatTime(lap)}</li>
                ))}
            </ul>
        </div>
    );
}

export default Stopwatch;
