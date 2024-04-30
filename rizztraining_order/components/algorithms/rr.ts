import { useState } from 'react';

export type Process = {
    id: number;
    arrivalTime : number;
    burstTime: number;
    remainingTime?: number;
    AT?:number;
    BT?: number;
    quantumTime: number;
};

export default function RoundRobin({processes, quantum}: {processes: Process[], quantum: number}) {
    const [expose, setExpose] = useState<Process[]>([]);
    console.log("Round Robin selected")
    let time = 0;
    
    processes = processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    processes = processes.map(p => ({...p, remainingTime: p.burstTime}));
    let exposeP: Process[] = [];
    
    while(processes.length > 0) {
        console.log("Round Robin calculating")
        let current = processes.shift();
        if(current) {
            if(current.remainingTime <= quantum) {
                time += current.remainingTime;
                exposeP.push({...current, AT: time - current.remainingTime, BT: time});
            } else {
                time += quantum;
                current.remainingTime -= quantum;
                processes.push(current);
            }
        }
    }
    
    setExpose([...expose, ...exposeP]);
};
