import { useState } from 'react';
export type Process = {
    id: number;
    arrivalTime : number;
    burstTime: number;
    AT?:number;
    BT?: number;

};

export default function Sjf ({process}: Process) {
    const [expose,setExpose] = useState<Process[]>([]);
    console.log("SJF selected")
    let time = 0;
    
    let processes = process.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let exposeP : Process= [];
    let waitingTime = 0;
    let turnaroundTime = 0;
    let finishTime = 0;
    
    while(processes.length > 0 ){
        console.log("SJF calculating")

        let current = processes.reduce((prev, curr, i) => {
            if (curr.arrivalTime > time) return prev;
            if (!prev || curr.burstTime < prev.burstTime) return curr;
            return prev;
        }, null);
        if (!current) {
            time++;
            continue;
        }

        processes = processes.filter(p => p !== current);
        exposeP = {...current , AT : time , BT: time + current.burstTime};
        waitingTime = time - current.arrivalTime;
        time += current.burstTime;
        turnaroundTime = time - current.arrivalTime;
        finishTime = time + current.burstTime;
        setExpose(expose);
    }
};