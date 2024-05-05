"use client"
import React, { ChangeEvent, ReactElement, useState } from "react";
import Display from "./Display";
interface select {
    select: string;
}
export default function Processes({ select }: select) {
    const [numProcesses, setNumProcesses] = useState<number>(0);
    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            setNumProcesses(0);
        } else {
            setNumProcesses(value);
        }
    }
    const [quantum, setQuantum] = useState<number>(0);
    const [contextSwitch, setContextSwitch] = useState<number>(0);
    const handleInputChange = (name: string, value: number) => {
        switch (name) {
            case 'quantum':
                if (value < 0) {
                    alert("Quantum Time cannot be negative");
                    return;
                }
                setQuantum(value);
                break;
            case 'contextSwitch':
                if (value < 0) {
                    alert("Context Switch Time cannot be negative");
                    return;
                }
                setContextSwitch(value);
                break;
        }
    }

    return (
        <div className="text-base">
            <div className="flex flex-col items-start mt-5">
                <h1 className="font-semibold">Number of Processes</h1>
                <input type="number" className='shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700' id="processes" name="processes" value={numProcesses} max={10} onChange={inputChange}></input>
            </div>
            {(select === "Round Robin") && (
                <div className="flex flex-col items-start mt-5">
                    <label>
                        <h1 className="font-semibold text-left">Quantum Time</h1>
                        <input className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" type="number" id="quantum" name="quantum" onChange={(e)=>{
                            handleInputChange('quantum', parseInt(e.target.value));
                            console.log(e.target.value);
                        }}></input>
                    </label>
                    <label>
                        <h1 className="font-semibold text-left mt-5">Context Switch Time</h1>
                        <input className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700" type="number" id="contextSwitch" name="contextSwitch" onChange={(e)=>{
                            handleInputChange('contextSwitch', parseInt(e.target.value));
                            console.log(e.target.value);
                        }}></input>
                    </label>
                </div>
            )}
            <Display numProcesses={numProcesses} select={select} quantum={quantum} contextSwitch={contextSwitch} />

        </div>
    );

}