import { useState } from 'react';

export type Process = {
    id: number;
    arrivalTime : number;
    burstTime: number;
    remainingTime?: number;
    AT?:number;
    BT?: number;
    priority: number;
};

export default function NonPreemptivePriority({processes}: {processes: Process[]}) {
    const [expose, setExpose] = useState<Process[]>([]);
    console.log("Non-Preemptive Priority selected")
    let time = 0;
    
    processes = processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    processes = processes.map(p => ({...p, remainingTime: p.burstTime}));
    let exposeP: Process[] = [];
    
    while(processes.length > 0) {
        console.log("Non-Preemptive Priority calculating")
        let current = processes.reduce((prev, curr) => (prev.priority < curr.priority) ? prev : curr);
        processes = processes.filter(p => p.id !== current.id);
        time += current.burstTime;
        exposeP.push({...current, AT: time - current.burstTime, BT: time});
        processes = processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    }
    
    setExpose([...expose, ...exposeP]);
};