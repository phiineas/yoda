import Link from 'next/link';
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
                <Link href="https://github.com/phiineas">
                    <Icon className="text-5xl text-purple-500 cursor-pointer" />
                </Link>
                <h2 className='font-semibold text-xl text-gray-800'>{title}</h2>
            </div>
            <p className='text-base text-gray-700'>{content}</p>
        </div>
    );
}

export default Card;

// made it more reusable by using props