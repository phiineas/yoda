import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className='flex justify-between items-center bg-gradient-to-r from-purple-700 via-purple-700 to-purple-600 text-white p-5 fixed bottom-0 w-full'>
            <p className='text-sm'>Copyright &copy; {new Date().getFullYear()} Simply Salted</p>
            <a 
                href="https://github.com/phiineas/yoda" 
                target="_blank" 
                rel="noopener noreferrer"
                className='flex items-center text-white hover:text-gray-300'>
                <FaGithub className='mr-2' /> GitHub
            </a>
        </footer>
    );
}
