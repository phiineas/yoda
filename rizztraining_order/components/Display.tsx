"use client"
import exp from 'constants';
import React, { ReactElement, useState } from 'react';
import Selection from './Selection';

export interface Process {
    processId: number;
    arrivalTime: number;
    burstTime: number;
    priority?: number;
    Btime?:number;
    Start?:number;
    End?:number;
}
interface DisplayProps {
    numProcesses: number;
    select: string;
    quantum?: number;
    contextSwitch?: number;
}

export default function Display({ numProcesses, select ,quantum , contextSwitch }: DisplayProps) {
    {
        const [processes, setProcesses] = useState<Process[]>([]);
        const [calcResult, setCalcResult] = useState<{ avgTurnAroundTime: string, avgWaitingTime: string }>();
        const [executedP, setExecutedP] = useState<Process[]>([]);

        const handleInputChange = (index: number, key: string, value: string): void => {
            const updatedProcesses = [...processes];
            updatedProcesses[index] = { ...updatedProcesses[index], [key]: parseFloat(value), processId: index + 1 };
            setProcesses(updatedProcesses);
        }

        const calcHandle = (processes: Process[], selected: string): void => {
            let result: {
                avgTurnAroundTime: string;
                avgWaitingTime: string;
            } = calc(processes, selected);
            let ans = { avgTurnAroundTime: result.avgTurnAroundTime, avgWaitingTime: result.avgWaitingTime };
            setCalcResult(ans);
        };

        const addProcesses = () => {
            const inputs: ReactElement[] = [];

            for (let i = 1; i <= numProcesses; i++) {
                inputs.push(
                    <div className='flex flex-row justify-between mb-4' key={i}>
                        <div className='pl-5 pr-5'>
                            <label className='block text-gray-700 text-sm font-semibold mb-2 text-left'>
                                Arrival Time for Process {i}
                            </label>
                            <input 
                                type="number" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" 
                                id={`AT-${i}`} 
                                step={1} 
                                name="arrivalTime" 
                                pattern="^[0-9]*$" 
                                onChange={(e) => {
                                    handleInputChange(i - 1, 'arrivalTime', e.target.value);
                                }}
                            />
                        </div>
                        <div className='pr-5'>
                            <label className='block text-gray-700 text-sm font-semibold mb-2 text-left'>
                                Burst Time for Process {i}
                            </label>
                            <input 
                                type="number" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" 
                                id={`BT-${i}`} 
                                step={1} 
                                name="burstTime" 
                                pattern="^[0-9]*$" 
                                onChange={(e) => {
                                    handleInputChange(i - 1, 'burstTime', e.target.value);
                                }}
                            />
                        </div>
                        {(select === "PRIORITY") && (
                            <div className='pr-5'>
                                <label className='block text-gray-700 text-sm font-semibold mb-2 text-left'>
                                    Priority for Process {i}
                                </label>
                                <input 
                                    type="number" 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" 
                                    id={`P-${i}`} 
                                    step={1} 
                                    name="priority" 
                                    pattern="^[0-9]*$" 
                                    onChange={(e) => {
                                        handleInputChange(i - 1, 'priority', e.target.value);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                );
            }
            return inputs;            
        }


        const calc = (processes: Process[], select: string): {
            avgTurnAroundTime: string;
            avgWaitingTime: string;
        } => {
            console.log(select);
            if (select === "FCFS") {
                console.log("Calculating data for FCFS");
                const calArr: Process[] = processes;
                let executedP: Process[] = [];
                calArr.sort((a, b) => a.arrivalTime - b.arrivalTime);
                let arrivalTime = 0, finishTime = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                for (let p of processes) {
                    if (p.arrivalTime > arrivalTime) {
                        arrivalTime = p.arrivalTime;
                    }
                    let Execute = { ...p, Start : arrivalTime, End : arrivalTime + p.burstTime}
                    // console.log(Execute);
                    executedP.push(Execute);
                    finishTime = arrivalTime + p.burstTime;
                    turnAroundTime = finishTime - p.arrivalTime;
                    waitingTime = turnAroundTime - p.burstTime;
                    totalTurnAroundTime += turnAroundTime;
                    totalWaitingTime += waitingTime;
                    arrivalTime = finishTime;
                }
                setExecutedP(executedP);
                let avgTurnAroundTime = (totalTurnAroundTime / calArr.length).toFixed(2);
                let avgWaitingTime = ((totalWaitingTime / calArr.length).toFixed(2));
                let result = { avgTurnAroundTime, avgWaitingTime };
                return result;
            }
            else if (select === "SJF") {
                console.log("calculating data for SJF");
                let calArr: Process[] = [...processes]; // copy of processes
                let executedP: Process[] = [];
                let newArr: Process[] = [];
                calArr.sort((a, b) => a.burstTime - b.burstTime); // sort by arrival time, then by burst time
                let time = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                while (calArr.length > 0) {
                        let current = calArr.shift()!;
                        if (current.arrivalTime > time) {
                            calArr.push(current);
                            calArr.sort((a, b) => a.arrivalTime - b.arrivalTime);
                            time = calArr[0].arrivalTime;
                        }else{
                            let Execute = { ...current, Start : time, End : time + current.burstTime}
                            executedP.push(Execute);
                            waitingTime = time - current.arrivalTime;
                            turnAroundTime = waitingTime + current.burstTime;
                            totalTurnAroundTime += turnAroundTime;
                            totalWaitingTime += waitingTime;
                            time += current.burstTime;
                            calArr.sort((a, b) => a.burstTime - b.burstTime); // sort again after removing a process
                        }
                        }
                setExecutedP(executedP);
                let avgTurnAroundTime = ((totalTurnAroundTime / processes.length).toFixed(2));
                let avgWaitingTime = ((totalWaitingTime / processes.length).toFixed(2));
                let result = { avgTurnAroundTime, avgWaitingTime };
                console.log(executedP);
                return result;
            }
            else if (select === "PRIORITY") {
                console.log("calculating data for Priority");
                let calArr: Process[] = [...processes]; // create a copy of processes
                let executedP: Process[] = [];
                calArr.sort((a, b) => a.arrivalTime - b.arrivalTime || a.priority! - b.priority!); // sort by arrival time, then by priority
                let time = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                while (calArr.length > 0) {
                        let current = calArr.shift()!;
                        if (current.arrivalTime > time) {
                            calArr.push(current);
                            calArr.sort((a, b) => a.arrivalTime - b.arrivalTime);
                            time = calArr[0].arrivalTime;
                        }else{
                            let Execute = { ...current, Start : time, End : time + current.burstTime}
                            executedP.push(Execute);
                            waitingTime = time - current.arrivalTime;
                            turnAroundTime = waitingTime + current.burstTime;
                            totalTurnAroundTime += turnAroundTime;
                            totalWaitingTime += waitingTime;
                            time += current.burstTime;
                            calArr.sort((a, b) => a.priority! - b.priority!); // sort again after removing a process
                        }
                    }
                setExecutedP(executedP);
                console.log(executedP);
                let avgTurnAroundTime = (totalTurnAroundTime / processes.length).toFixed(2);
                let avgWaitingTime = (totalWaitingTime / processes.length).toFixed(2);
                let result = { avgTurnAroundTime, avgWaitingTime };
                return result;
            }
            else if (select === "Round Robin") {
                console.log("calculating data for Round Robin");
                let calArr: Process[] = processes.map((p)=>({...p, Btime: p.burstTime}));
                let executedP: Process[] = [];
                calArr.sort((a, b) => a.arrivalTime - b.arrivalTime);
                let newArr: Process[] = [];
                let qt:number = quantum!;
                let csgo:number = contextSwitch!;
                let time = 0;
                let turnAroundTime = 0, waitingTime = 0;
                let totalTurnAroundTime = 0, totalWaitingTime = 0;
                while(calArr.length > 0  || newArr.length > 0){
                    // console.log("First loop");
                    while(calArr.length > 0 && calArr[0].arrivalTime <= time){
                        // console.log("Second loop  ")
                        newArr.push(calArr.shift()!);
                    }
                    if(newArr.length > 0){
                        let current = newArr.shift()!;
                        let Execute = { ...current, Start : time, End : time + ((current.burstTime -qt > 0) ? qt : current.burstTime)}
                        executedP.push({...Execute});
                        // console.log(executedP)
                        if(current.burstTime > qt){
                            time+=qt;
                            current.burstTime -= qt;
                            while(calArr.length > 0 && calArr[0].arrivalTime <= time){
                                newArr.push(calArr.shift()!);
                            }
                            newArr.push(current);
                            time += csgo;
                        }else{
                            time += current.burstTime;
                            turnAroundTime = time - current.arrivalTime;
                            waitingTime = turnAroundTime - (current.Btime || 0);
                            totalTurnAroundTime += turnAroundTime;
                            totalWaitingTime += waitingTime;
                            time += csgo;
                        }
                        setExecutedP(executedP);
                        
                }else{
                    time++;
                }
                
            }
            
                let avgTurnAroundTime = (totalTurnAroundTime / processes.length).toFixed(2);
                let avgWaitingTime = (totalWaitingTime / processes.length).toFixed(2);
                let result = { avgTurnAroundTime, avgWaitingTime };
                return result;
            }
            else {
                return { avgTurnAroundTime: "NaN", avgWaitingTime: "NaN" };
            }
        }

        return (
            <div className="flex flex-col md:flex-row justify-between">
              <div className="w-full md:w-4/10 p-4 shadow-md rounded-md ml-8 bg-slate-50 mb-20 mt-4" style={{ maxWidth: '650px' }}>
                {addProcesses()}
                {numProcesses > 0 && (
                <div className="flex justify-start mt-4">
                    <button 
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => {
                        calcHandle(processes, select);
                        }}
                    >
                        Solve
                    </button>
                </div>
                )}
              </div>
              <div className="w-full md:w-6/10 p-4 bg-slate-50 shadow-md rounded-md ml-0 mt-4 mr-8 mb-20" style={{ maxWidth: '765px' }}>
                <h2 className='text-xl m-2 font-bold font-sans text-left'>Gantt Chart and Table will be shown here</h2>
                {executedP.length > 0 && numProcesses > 0 && (
                  <div>
                    <div className='w-max mt-8 flex flex-row items-center justify-center'>
                      {select !== "Round Robin" && executedP.map((process, index) => (
                        <div key={index} className='flex'>
                          { // gap between processes
                            index > 0 && (process.Start ?? 0) > (executedP[index - 1].End ?? 0) && (
                              <div key={`p-gap-${index}`} className='text-2xl border-solid border-1 text-center' style={{ width: `${((process.Start ?? 0) - (executedP[index - 1].End ?? 0)) * 20}px` }} ></div>
                            )
                          }
                          <div key={`p-child-${index}`} className='text-2xl border border-gray-700 text-center' style={{ width: `${process.burstTime * 20}px` }} >
                            <div className='p-1 text-lg bg-purple-500'>
                              P{process.processId}
                            </div>
                          </div>
                        </div>
                      ))}
                      {select === "Round Robin" && executedP.map((process, index) => (
                        <div key={`RR-p-${index}`} className='flex items-center'>
                            {index > 0 && (process.Start ?? 0) > (executedP[index - 1].End ?? 0) && (
                                <div className='bg-purple-500' style={{ width: `${((process.Start ?? 0) - (executedP[index - 1].End ?? 0)) * 20}px` }}></div>
                            )}
                            <div key={`RR-c1-${index}`} className='flex justify-center items-center bg-purple-500' style={{ width: `${(process.burstTime > (quantum ?? 0)) ? (quantum ?? 0) * 20 : process.burstTime * 20}px` }}>
                                <div className='p-1 text-lg'>
                                    P{process.processId}
                                </div>
                            </div>
                            {index < executedP.length - 1 && (executedP[index + 1].Start ?? 0) <= ((process.End ?? 0) + (contextSwitch ?? 0)) && (
                                <div className='bg-purple-500' style={{ width: `${(contextSwitch ?? 0 > 0) ? (contextSwitch ?? 0) * 20 : 0}px` }}></div>
                            )}
                        </div>
                    ))}
                    </div>
                    <div className='w-max flex flex-row justify-center'>
                      {select !== "Round Robin" && executedP.map((process, index) => (
                        <div key={index} className='flex'>
                          {
                            index > 0 && ((process.Start ?? 0) > (executedP[index - 1].End ?? 0)) && (
                              <div style={{ width: `${((process.Start ?? 0) - (executedP[index - 1].End ?? 0)) * 20}px` }}></div>
                            )
                          }
                          <div key={`c-${index}`} className='flex justify-between text-base' style={{ width: `${process.burstTime * 20}px` }}>
                            {index === 0 && (
                              <div>{process.Start}</div>
                            )}
                            {index > 0 && (process.Start !== executedP[index - 1].End) && (
                              <div>{process.Start}</div>
                            )}
                            <div></div>
                            <div>{process.End}</div>
                          </div>
                        </div>
                      ))}
                      {select === "Round Robin" && executedP.map((process, index) => (
                        <>
                            {index > 0 && (process.Start ?? 0) > (executedP[index - 1].End ?? 0) && (
                                <div style={{ width: `${((process.Start ?? 0) - (executedP[index - 1].End ?? 0)) * 20}px` }}></div>
                            )}
                            <div key={`RR-c2-${index}`} className='flex justify-between' style={{ width: `${(process.burstTime - (quantum ?? 0) > 0) ? (quantum ?? 0) * 20 : (process.burstTime) * 20}px` }}>
                                {index === 0 && (
                                    <div>{process.Start}</div>
                                )}
                                {index > 0 && (process.Start !== executedP[index - 1].End) && (
                                    <div>{process.Start}</div>
                                )}
                                <div></div>
                                <div>{process.End}</div>
                            </div>
                        </>
                    ))}
                    </div>
                  </div>
                )}
                {calcResult && (
                    <>
                        <div className='mt-8'>
                            <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                                <thead className="bg-purple-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Process</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Arrival Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Burst Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Finish Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Turnaround Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Waiting Time</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {executedP.map((process, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{`P${process.processId}`}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.arrivalTime}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.burstTime}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.End}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.End - process.arrivalTime}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{(process.End - process.arrivalTime) - process.burstTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 text-left">
                            <div className="mb-2 font-semibold">Average Turn Around Time : {calcResult.avgTurnAroundTime}</div>
                            <div className='mb-2 font-semibold'>Average Waiting Time : {calcResult.avgWaitingTime}</div>
                        </div>
                    </>
                )}
              </div>
            </div>
        );
    }
}