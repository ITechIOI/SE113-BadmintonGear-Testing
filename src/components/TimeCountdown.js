// components/Countdown.js
import React from 'react'
import { useEffect, useState } from 'react';

export default function TimeCountdown(targetDate) {
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const target = new Date(targetDate.targetDate).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

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
        <div className='text-center w-fit justify-items-center'>
            <div className='flex text-3xl items-end font-bold text-[#FF8200] font-montserrat gap-5'>
                <div className='flex flex-col items-center '>
                    <span className='text-sm text-[#737373] font-normal'>Days</span>
                    <span className='text-black'>{timeLeft.days || '00'}</span>
                </div> :
                <div className='flex flex-col items-center '>
                    <span className='text-sm text-[#737373] font-normal'>Hours</span>
                    <span className='text-black'>{timeLeft.hours || '00'}</span>
                </div> :
                <div className='flex flex-col items-center '>
                    <span className='text-sm text-[#737373] font-normal'>Minutes</span>
                    <span className='text-black'>{timeLeft.minutes || '00'}</span>
                </div> :
                <div className='flex flex-col items-center '>
                    <span className='text-sm text-[#737373] font-normal'>Seconds</span>
                    <span className='text-black'>{timeLeft.seconds || '00'}</span>
                </div>
            </div>

        </div>
    );
}
