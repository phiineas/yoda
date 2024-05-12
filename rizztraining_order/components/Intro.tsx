"use client"
import Link from 'next/link';
import React from 'react';
import { MdStart } from "react-icons/md";
import Card from './Cards';
import { FaUserEdit } from 'react-icons/fa';
import { BiCloud, BiCloudLightning, BiCustomize } from 'react-icons/bi';
import { IoBarChartOutline } from 'react-icons/io5';

export default function Intro() {

    return (
        <div className="flex flex-col items-start justify-start h-screen">
            <div className='flex flex-col'>
                <p className='text-left text-3xl font-mono mt-12 ml-12 mb-6'>
                    We revolutionize your <span className='text-purple-500 font-semibold'>process <br />
                    solving</span> experience with our <br/>
                    user-friendly interface.
                </p>
                <p className='ml-12 text-left font-sans text-gray-700 text-base mb-6'>
                    Enhance productivity through our sophisticated technology and inventive solutions, <br />
                    customized to optimize your workflow and amplify efficiency, <br />
                    ensuring seamless operations and maximizing output. 
                </p>
                <Link href="/solve">
                    <>
                        <button 
                            className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline text-left ml-12 max-w-xs" 
                            style={{maxWidth: '211px'}}>
                            <MdStart className='inline-block mr-1 font-semibold' size={20} />
                            <span className='text-base'>Get Started</span>
                            <span className='text-xs ml-2'> - It's free!</span>
                        </button>
                    </>
                </Link>
                <div>
                    <div>
                        <p className='text-left text-2xl font-mono mt-12 ml-12 mb-2'>Why Simply Salted</p>
                        <p className='ml-12 text-left font-sans text-gray-700 text-base mb-6'>
                            Cut down on solving time with Simply Salted's <br />
                            lightning-fast algorithms and intuitive interface. <br />
                        </p>
                    </div>
                    <div className='ml-12 text-left font-sans mb-6'>
                        <Card 
                            title='User-Friendly' 
                            content='Our interface is designed to be intuitive and easy to use, ensuring a seamless experience for all users.'
                            icon={FaUserEdit}
                        />
                        <Card 
                            title='Lightning-Fast' 
                            content='Our algorithms are optimized for speed, allowing you to solve problems quickly and efficiently.' 
                            icon={BiCloudLightning}    
                        />
                        <Card 
                            title='Customizable' 
                            content='Our solutions are customizable to fit your needs, ensuring that you get the most out of our platform.' 
                            icon={BiCustomize}    
                        />
                        <Card 
                            title='Visualizations' 
                            content='Our platform includes a variety of visualizations to help you better understand your data and make informed decisions.' 
                            icon={IoBarChartOutline}    
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}