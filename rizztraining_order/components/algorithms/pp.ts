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

export default function PriorityPreemptive({processes}: {processes: Process[]}) {
    const [expose, setExpose] = useState<Process[]>([]);
    console.log("Priority Preemptive selected")
    let time = 0;
    
    processes = processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    processes = processes.map(p => ({...p, remainingTime: p.burstTime}));
    let exposeP: Process[] = [];
    
    while(processes.length > 0) {
        console.log("Priority Preemptive calculating")
        let current = processes.reduce((prev, curr) => (prev.priority < curr.priority) ? prev : curr);
        processes = processes.filter(p => p.id !== current.id);
        if(current.remainingTime <= time) {
            time += current.remainingTime;
            exposeP.push({...current, AT: time - current.remainingTime, BT: time});
        } else {
            time++;
            current.remainingTime--;
            processes.push(current);
        }
        processes = processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    }
    
    setExpose([...expose, ...exposeP]);
};