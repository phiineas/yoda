"use strict";

import React, { useState } from 'react';

export default function Input() {
  const [algorithm, setAlgorithm] = useState('');
  const [numProcesses, setNumProcesses] = useState(0);
  const [arrivalTimes, setArrivalTimes] = useState<number[]>([]);
  const [burstTimes, setBurstTimes] = useState<number[]>([]);

  const solveProcess = () => {
    // Implement your process solving logic here
  };

const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add logic to handle form submission
};

const handleMouseOver = (event: React.FormEvent) => {
    const target = event.target as HTMLSelectElement;
    target.style.backgroundColor = '#BA68C8';
    target.style.color = 'white';
}

const handleMouseOut = (event: React.FormEvent) => {
    const target = event.target as HTMLSelectElement;
    target.style.backgroundColor = '';
    target.style.color = '';
}
  
  return (
    <div className="flex justify-start items-center pl-10 pt-10">
      <form onSubmit={handleSubmit} className="bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[600px]">
        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Algorithm
          </label>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            className="custom-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700"
          >
            <option value="FCFS" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>First Come First Serve</option>
            <option value="SJF" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Shortest Job First</option>
            <option value="SRTF" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Shortest Remaining Time First</option>
            <option value="RR" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Round-Robin</option>
            <option value="RR" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Priority (non-preemptive)</option>
            <option value="RR" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Priority (preemptive)</option>
          </select>
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Number of Processes:
            <input type="number" value={numProcesses} onChange={(e) => setNumProcesses(parseInt(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" />
            </label>
            {
                [...Array(numProcesses)].map((_, i) => (
                    <div key={i} className="flex mb-4">
                    <div className="w-1/2 pr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                        Arrival Time for Process {i+1}
                        <input type="number" onChange={(e) => {
                            let newArrivalTimes = [...arrivalTimes];
                            newArrivalTimes[i] = Number(e.target.value);
                            setArrivalTimes(newArrivalTimes);
                        }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" />
                        </label>
                    </div>
                    <div className="w-1/2 pl-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                        Burst Time for Process {i+1}
                        <input type="number" onChange={(e) => {
                            let newBurstTimes = [...burstTimes];
                            newBurstTimes[i] = Number(e.target.value);
                            setBurstTimes(newBurstTimes);
                        }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" />
                        </label>
                    </div>
                    </div>
                ))
                }
        <div className="flex items-center justify-between">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Solve
          </button>
        </div>
      </form>
    </div>
  );
}
