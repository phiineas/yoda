import React from 'react';

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
    if (!processes || processes.length === 0) {
        return null;
    }

    const maxFinishTime = Math.max(...processes.map(process => process.finishTime));
    //const cellWidth = Math.max(100 / processes.length, 10) + '%'; 
    return (
        <table className="w-full">
            <tbody>
                <tr className="text-center">
                    {processes.map((process, index) => {
                        let cellWidth = (process.finishTime -process.arrivalTime);
                        return (
                            <td key={index} className="border border-gray-700 bg-purple-500 text-center" style={{ width: cellWidth*20}}>
                                <div className="h-full">
                                    P{index+1}
                                </div>
                            </td>
                        );
                    })}
                </tr>
            </tbody>
        </table>
    );
};

export default GanttChart ;
