import React from 'react';
import SolvedProcess from './output/solvedProcess';
import GanttChart from './output/ganttChart';

interface OutputProps {
    processes: any[];
    solving: boolean;
}

export default function Output({ solving, processes }: OutputProps) { 
    
    return (
        <div className='p-4 bg-slate-50 rounded-lg shadow-md ml-10 mt-10 w-[925px]'>
            <h1 className='text-lg font-semibold text-start text-gray-700'>Gantt chart and Table will be shown here</h1>
            <div className='pt-10 pb-5'>
                <div className='pb-5'>
                    <GanttChart processes={processes} />
                </div>
                <div className='pb-5 pl-12 pr-12'>
                    {solving && <SolvedProcess processes={processes} />} 
                </div>
            </div>
        </div>
    )
}
