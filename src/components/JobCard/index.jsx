import React from 'react';
import dayjs from 'dayjs';

function JobCard(props) {
    const date1 = dayjs(Date.now());
    const diffInDays = date1.diff(dayjs(props.postedOn), 'day');

    return (
        <div className='mx-40 mb-4'>
            <div className='flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-100'>
                <div className='flex flex-col items-start gap-3'>
                    <h1 className='text-lg font-semibold'>{props.title} - {props.company}</h1>
                    <p>{props.type} &#x2022; {props.experience} &#x2022; {props.location}</p>
                    <div className='flex items-center gap-2'>
                        {props.skills.map((skill, index) => (
                            <p key={index} className='text-gray-500 py-1 px-2 rounded-md border-black'>{skill}</p>
                        ))}
                    </div>
                </div>
                <div className='text-right'>
                    <p className='text-sm text-gray-500'>
                        Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago
                    </p>
                    <a href={props.job_link}>
                        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-md'>Apply</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default JobCard;
