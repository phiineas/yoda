import React, { useState } from 'react';
import { CiViewTable } from 'react-icons/ci';

interface Process {
    process: string;
    arrivalTime: number;
    burstTime: number;
    finishTime: number;
    turnaroundTime: number;
    waitingTime: number;
    avgTAT: number;
    avgWT: number;
}

type SolvedProcessProps = {
    processes: Process[];
};

const SolvedProcess: React.FC<SolvedProcessProps> = ({ processes }) => {

    const [showTable, setShowTable] = useState(false);

    if (!processes || processes.length === 0) {
        return null;
    }

    const avgTAT = processes[processes.length - 1].avgTAT.toFixed(2);
    const avgWT = processes[processes.length - 1].avgWT.toFixed(2);

    return (    
        <div>
            <div className='pb-5'>
                <button 
                    onClick={() => setShowTable(!showTable)} 
                    className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2'
                >
                    <CiViewTable className='h-6 w-6' />
                    <span>{showTable ? 'Hide Table' : 'Display Table'}</span>
                </button>
            </div>
            {showTable && (
                <div>
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
                        <tbody className="bg-white divide-y divide-gray-200">
                            {processes.slice(0, -1).map((process, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">P{index+1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.arrivalTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.burstTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.finishTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.turnaroundTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.waitingTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> 
                    <div className="mt-5 flex space-x-2">
                        <p className="font-semibold text-gray-700">Average Turnaround Time =</p>
                        <p className="font-semibold text-gray-700">{avgTAT}</p>
                    </div>
                    <div className="mt-2 flex space-x-2">
                        <p className="font-semibold text-gray-700">Average Waiting Time =</p>
                        <p className="font-semibold text-gray-700">{avgWT}</p>
                    </div>
                </div> 
            )}
        </div>
    );
};

export default SolvedProcess;