import { useState } from 'react';
export type Process = {
    id: number;
    arrivalTime : number;
    burstTime: number;
    AT?:number;
    BT?: number;

};

export default function Fcfs ({process}: Process) {
    const [expose,setExpose] = useState<Process[]>([]);
    console.log("FCFS selected")
    let time = 0;
    
    let processes = process.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let exposeP : Process= [];
    let arrivaltime=0;
    let waitingTime = 0;
    let turnaroundTime = 0;
    let finishTime = 0;
    
    while(processes.length > 0 ){
        console.log("FCFS calculating")
        let current = processes.shift();
        exposeP = {...current , AT : time , BT: time + current.burstTime};
        if(current.arrivalTime > time){
            time = current.arrivalTime;
        }
        arrivaltime = time;
        waitingTime = time - current.arrivalTime;
        time += current.burstTime;
        turnaroundTime = time - current.arrivalTime;
        finishTime = time + current.burstTime;
        setExpose(expose);
        
    }
};
