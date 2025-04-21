// components/Countdown.js
import React from 'react'
import { useEffect, useState } from 'react';

export default function TimeCountdown(targetDate) {
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({});
            } else {
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className='text-center'>
            <div className=''>
                <span>Days</span> : <span>Hours</span> : <span>Minutes</span> : <span>Seconds</span>
            </div>
            <div className='text-3xl font-bold'>
                <span>{timeLeft.days || '00'}</span> : <span>{timeLeft.hours || '00'}</span> : <span>{timeLeft.minutes || '00'}</span> : <span>{timeLeft.seconds || '00'}</span>
            </div>

        </div>
    );
}
