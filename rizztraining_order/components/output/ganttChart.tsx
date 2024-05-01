import React, { useState, useEffect } from 'react';
import { FaChartGantt } from 'react-icons/fa6';

interface Process {
    process: string;
    arrivalTime: number;
    burstTime: number;
    finishTime: number;
    turnaroundTime: number;
    waitingTime: number;
}

type GanttChartProps = {
    processes: Process[];
};

const GanttChart: React.FC<GanttChartProps> = ({ processes }) => {
    const [showChart, setShowChart] = useState(false);
    const [cellWidth, setCellWidth] = useState(0);

    useEffect(() => {
        if (!processes || processes.length === 0) {
            setShowChart(false);
        } else {
            setShowChart(true);
            const maxFinishTime = Math.max(...processes.map(process => process.finishTime));
            setCellWidth(100 / maxFinishTime);
        }
    }, [processes]);

    if (!processes || processes.length === 0) {
        return null;
    }

    return (
        <div>
            <div className='pb-5'>
                <button 
                    onClick={() => setShowChart(!showChart)}    
                    className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2'
                >
                    <FaChartGantt />
                    <span>{showChart ? 'Hide Gantt Chart' : 'Show Gantt Chart'}</span>
                </button>
            </div>
            {showChart && (
                <div>
                    <table className="w-1/2 mx-auto"> 
                        <tbody>
                            <tr className="text-center">
                                {processes.map((process, index) => {
                                    if (typeof process.burstTime === 'number') {
                                        return (
                                            <td key={`process-${index}`} className="border border-gray-700 bg-purple-500 text-center relative" style={{ width: `${cellWidth * process.burstTime}%` }}>
                                                P{index+1}
                                            </td>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        {processes.map((process, index) => (
                            <div key={`process-${index}`}>
                                {index === 0 && (
                                    <td style={{ width: `${cellWidth * process.arrivalTime}%` }}>
                                        {process.arrivalTime}
                                    </td>
                                )}
                                {index < processes.length - 1 ? (
                                    <td style={{ width: `${cellWidth * (processes[index + 1].arrivalTime - process.finishTime)}%` }}>
                                        {process.finishTime}
                                    </td>
                                ) : (
                                    <td style={{ width: `${cellWidth * (process.finishTime - process.arrivalTime)}%` }}>
                                        {process.finishTime}
                                    </td>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GanttChart;