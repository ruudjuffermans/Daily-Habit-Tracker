import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // State to keep track of remaining time (in seconds)
  const [remainingTime, setRemainingTime] = useState(1 * 60);
  // State to control whether the timer is running
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setDone] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      // Start the timer
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime >= 1) return prevTime - 1;
          setIsRunning(false); // Stop the timer when it reaches 0
          setDone(true)
          return 0; // Make sure time doesn't go below 0
        });
      }, 1000); // Decrease time every second
    } else {
      // Clear the interval if the timer is paused/stopped
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isRunning]); // Only re-run effect if isRunning changes

  // Convert remaining time in seconds to mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div>Time Remaining: {formatTime(remainingTime)}</div>

      {isDone ? 
            <button onClick={() => setIsRunning(false)}>complete</button>
            :
<>
<button onClick={() => setIsRunning(true)}>Play</button>
      <button onClick={() => setIsRunning(false)}>Pause</button></>
      }
    </div>
  );
};

export default CountdownTimer;
