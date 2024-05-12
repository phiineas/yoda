import React from 'react';
import { IconType } from 'react-icons';

interface CardProps {
    icon: IconType;  
    title: string;
    content: string;
}

const Card: React.FC<CardProps> = ({ icon: Icon, title, content }) => {
    return (
        <div className="bg-slate-50 shadow-lg rounded-lg overflow-hidden p-6 mb-6 transform transition duration-500 ease-in-out hover:scale-105">
            <div className="flex flex-col items-start">
                <Icon className='text-purple-500 w-8 h-8 mr-3'/>
                <h2 className='font-semibold text-xl text-gray-800'>{title}</h2>
            </div>
            <p className='text-base text-gray-700'>{content}</p>
        </div>
    );
}

export default Card;