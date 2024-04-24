import React from 'react';
import SolvedProcess from './output/solvedProcess';

export default function Output({ solving, processes }: { solving: boolean; processes: any[] }) {
    return (
        <div className='p-4 bg-slate-50 rounded-lg shadow-md ml-10 mt-10 w-[765px]'>
            <h1 className='text-lg font-semibold text-start text-gray-700'>Gantt chart and Table will be shown here</h1>
            <div className='pt-10 pb-5'>
                {solving && <SolvedProcess processes={processes} />} 
            </div>
        </div>
    )
}