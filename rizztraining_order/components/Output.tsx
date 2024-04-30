import React from 'react';
import SolvedProcess from './output/solvedProcess';
import GanttChart from './output/ganttChart';

interface OutputProps {
    processes: any[];
    solving: boolean;
}

export default function Output({ solving, processes }: OutputProps) { 
    
    return (
        <div className='p-4 bg-slate-50 rounded-lg shadow-md ml-10 mt-10 w-[765px]'>
            <h1 className='text-lg font-semibold text-start text-gray-700'>Gantt chart and Table will be shown here</h1>
            <div className='pb-5 pt-10 pl-12 pr-12'>
                <div>
                    <GanttChart processes={processes} />
                </div>
                <div className='pt-2 pb-5'>
                    {solving && <SolvedProcess processes={processes} />} 
                </div>
            </div>
        </div>
    )
}
