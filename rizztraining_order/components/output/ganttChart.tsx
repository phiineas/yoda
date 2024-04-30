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
        // This code runs whenever `processes` changes
        if (!processes || processes.length === 0) {
            setShowChart(false);
        } else {
            const maxFinishTime = Math.max(...processes.map(process => process.finishTime));
            const totalDuration = maxFinishTime;
            // Assuming the total width of the Gantt chart is 1000px
            const totalWidth = 1000;
            // Update cellWidth based on new processes
            setCellWidth(totalWidth / totalDuration);
        }
    }, [processes]);
    
    if (!processes || processes.length === 0) {
        return null;
    }

    const maxFinishTime = Math.max(...processes.map(process => process.finishTime));
    const totalDuration = maxFinishTime;

    return (
        <div>
            <div className='pb-5'>
                <button 
                    onClick={() => setShowChart(!showChart)}    
                    className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2'
                >
                    <FaChartGantt />
                    <span>{showChart ? 'Hide Gantt Chart' : 'Display Gantt Chart'}</span>
                </button>
            </div>
            {showChart && (
            <table className="w-1/2 mx-auto"> 
                <tbody>
                    <tr className="text-center">
                    {processes.map((process, index) => {
                        if (typeof process.burstTime === 'number' && totalDuration !== 0) {
                            const dynamicCellWidth = (process.burstTime / totalDuration) * 100; 
                            return (
                                <td key={`process-${index}`} style={{ width: `${dynamicCellWidth}%` }} className="border border-gray-700 bg-purple-500 text-center relative">
                                    <div className="h-full">
                                        P{index+1}
                                    </div>
                                </td>
                            );
                        } else {
                            return null;
                        }
                    })}
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GanttChart;