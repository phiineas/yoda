"use strict";

import React, { useState, useEffect } from 'react';
import {Process} from './algorithms/Fcfs';
// import Fcfs from './algorithms/Fcfs';
import GanttChart from './output/ganttChart';
// import Output from './Output';
// import SolvedProcess from '../components/output/solvedProcess';

interface InputProps {
  setData: React.Dispatch<React.SetStateAction<Array<{
    process: string;
    arrivalTime: number;
    burstTime: number;
    finishTime: number;
    turnaroundTime: number;
    waitingTime: number;
    priority: number;
  }>>>;
}

export default function Input({ setData }: InputProps) {
    const [algorithm, setAlgorithm] = useState('');
    const [numProcesses, setNumProcesses] = useState(0);
    const [arrivalTimes, setArrivalTimes] = useState<number[]>([]);
    const [burstTimes, setBurstTimes] = useState<number[]>([]);
    const [schedulingType, setSchedulingType] = useState<string>('');
    const [showQuantumTime, setShowQuantumTime] = useState<boolean>(false);
    const [priorities, setPriorities] = useState<number[]>([]);
    // const [showSolvedProcess, setShowSolvedProcess] = useState<boolean>(false);
    const [showTable, setShowTable] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setShowTable(true); 

        const preparedData = prepareData();
        setData(preparedData);
    }

    const prepareData = () => {
      let totalTAT = 0;
      let totalWT = 0;
      let currentTime = 0;
      const processedData = [];
      for (let i = 0; i < numProcesses; i++) {
        const process = `Process ${i + 1}`;
        const arrivalTime = arrivalTimes[i];
        const burstTime = burstTimes[i];
        const priority = priorities[i];

        if (arrivalTime > currentTime) {
          currentTime = arrivalTime;
        }

        const finishTime = currentTime + burstTime;
        const turnaroundTime = finishTime - arrivalTime;
        const waitingTime = turnaroundTime - burstTime;

        totalTAT += turnaroundTime;
        totalWT += waitingTime;

        currentTime = finishTime;
    
        processedData.push({
          process,
          arrivalTime,
          burstTime,
          finishTime,
          turnaroundTime,
          waitingTime,
          priority, 
        });
      }

      const avgTAT = totalTAT / numProcesses;
      const avgWT = totalWT / numProcesses;

      processedData.push({
        avgTAT,
        avgWT,
      });
      
      return processedData;
  };

    useEffect(() => {
        if (numProcesses > 0) {
            const preparedData = prepareData();
            setData(preparedData);
        }
    }, [numProcesses, arrivalTimes, burstTimes, priorities]); 

    const handleInputChange = (index: number, type: string, value: number) => {
      switch (type) {
          case 'arrivalTime':
              arrivalTimes[index] = value;
              setArrivalTimes([...arrivalTimes]);
              break;
          case 'burstTime':
              burstTimes[index] = value;
              setBurstTimes([...burstTimes]);
              break;
          case 'priority':
              priorities[index] = value;
              setPriorities([...priorities]);
              break;
          default:
              break;
      }
  };

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setAlgorithm(value);
        setShowQuantumTime(value === 'RR');
        setSchedulingType(value);
        setPriorities(value === 'PP' || value === 'NPP' ? new Array(numProcesses).fill(0) : []);        
    };

    const handleMouseOver = (event: React.FormEvent) => {
        const target = event.target as HTMLSelectElement;
        target.style.backgroundColor = '#BA68C8';
        target.style.color = 'white';
    };

    const handleMouseOut = (event: React.FormEvent) => {
        const target = event.target as HTMLSelectElement;
        target.style.backgroundColor = 'white';
        target.style.color = 'white';
    };

    let arr1 : Process = [];

    return (
        <div className="flex justify-start items-center pl-10 pt-10">
          <form onSubmit={handleSubmit} className="bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[650px]">
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Algorithm
              </label>
              <select 
                value={algorithm} 
                onChange={handleAlgorithmChange}
                className="custom-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700"
              >
                <option value="FCFS" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>First Come First Serve</option>
                <option value="SJF" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Shortest Job First</option>
                <option value="SRTF" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Shortest Remaining Time First</option>
                <option value="RR" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Round-Robin</option>
                <option value="NPP" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Priority (non-preemptive)</option>
                <option value="PP" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Priority (preemptive)</option>
              </select>
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-4">
                Number of Processes
                <input type="number" value={numProcesses} onChange={(e) => setNumProcesses(parseInt(e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" />
            </label>
            {showQuantumTime && (
                <label className="block text-gray-700 text-sm font-bold mb-4">
                    Quantum Time
                    <input type="number" onChange={(e) => setShowQuantumTime(Boolean(parseInt(e.target.value)))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" />
                </label>
            )}
                {
                    [...Array(numProcesses)].map((_, i) => (
                        arr1 = {...arr1, id: i+1, arrivalTime: 0, burstTime: 0, AT: 0, BT: 0},
                        <div key={i} className="flex mb-4">
                        <div className="w-1/2 pr-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                            Arrival Time for Process {i+1}
                            <input 
                                type="number" 
                                onChange={(e) => handleInputChange(i, 'arrivalTime', Number(e.target.value))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" />
                            </label>
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Burst Time for Process {i+1}
                            <input 
                              type="number"  
                              onChange={(e) => handleInputChange(i, 'burstTime', Number(e.target.value))}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" 
                            />
                            </label>
                        </div>
                        <div className="w-1/2 pl-4">
                        {algorithm === 'PP' || algorithm === 'NPP' ? (
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Priority for Process {i+1}
                                <input
                                  type="number" 
                                  onChange={(e) => handleInputChange(i, 'priorities', Number(e.target.value))}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" 
                                />
                            </label>
                        ) : null}
                    </div>
                  </div>
                ))
              }
            <div className="flex items-center justify-between">
              <button onClick={GanttChart} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Solve
              </button>
            </div>
          </form>
        </div>
    );
}

function setShowChart(arg0: boolean) {
  throw new Error('Function not implemented.');
}
