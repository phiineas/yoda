"use client";
import Link from 'next/link';
import React from 'react';
import { MdStart } from "react-icons/md";
import Card from './Cards';
import { FaGithub, FaUserEdit } from 'react-icons/fa';
import { BiCloudLightning, BiCustomize } from 'react-icons/bi';
import { IoBarChartOutline } from 'react-icons/io5';
import Image from 'next/image';
import img1 from '../public/1.png';
import img2 from '../public/2.png';

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
                <div className='ml-12 mt-12 mb-10 text-left'>
                    <p className='font-mono text-gray-900 text-2xl'>Why Simply Salted</p>
                    <p className='text-gray-700 text-base'>
                        <span className="hover:underline">Cut down on solving time with Simply Salted's lightning-fast algorithms and intuitive interface.</span>
                    </p>
                </div>
                <div className='flex flex-col justify-between w-full'>
                    <div className='flex flex-row justify-end'>
                        <div className='mr-20 ml-12'>
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
                        </div>
                        <Image src={img1} alt='1' className='w-96 h-96 ml-80 mb-20 mr-12 border-2 border-solid border-purple-500 border-r-0 shadow-lg rounded-lg' />
                    </div>
                    <div className='flex flex-row justify-start'>
                        <Image src={img2} alt='2' className='w-96 h-96 mr-80 ml-12 border-2 border-solid border-purple-500 border-l-0 shadow-lg rounded-lg' />
                        <div className='mr-12'>
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
                <p className='mt-12 ml-12 text-3xl font-semibold text-gray-800 text-start font-mono'>Contributors</p>
                <div className='flex flex-row'>
                    <div className='ml-12 mb-6 mt-6 w-96'>
                        <Card 
                            title='Jainil Patel' 
                            content='lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
                            icon={FaGithub}    
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// have to add framer motion for animations