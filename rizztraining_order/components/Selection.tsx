"use client"
import React , { useState } from 'react';
import Processes from './Processes';

export default function Selection() {
    const [selected, setSelected] = useState("");

    const selectHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelected(e.target.value);
    }

    let present = null;

    switch(selected){
        case "FCFS" :
            present = "FCFS";
            break;
        case "SJF" :
            present = "SJF";
            break;
        case "PRIORITY" :
            present = "PRIORITY";
            break;
        case "Round Robin":
            present = "Round Robin";
            break;
        default:
            present = null;
    }    
  
    return (
        <div className='text-center m-2 relative'>
            <div className='flex flex-col items-start ml-10'>
                <h1 className='mb-2 mt-5 font-bold'>Algorithm</h1>
                <select 
                    className='shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700'
                    onChange={selectHandler} 
                    value={selected}
                >
                    <option value="">Select Algorithm</option>
                    <option value="FCFS">First Come First Serve (FCFS)</option>
                    <option value="SJF">Shortest Job First (SJF)</option>
                    <option value="PRIORITY">Non-preemptive Priority</option>
                    <option value="Round Robin">Round Robin</option>
                </select>
            </div>
            {present && <Processes select={selected} />}
        </div>
    );
}
