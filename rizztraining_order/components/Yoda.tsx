"use client";
import React from 'react';
import Input from './Input';
import Output from './Output';

type DataType = {
    process: string;
    arrivalTime: number;
    burstTime: number;
    finishTime: number;
    turnaroundTime: number;
    waitingTime: number;
    priority: number;
  };
  
  export default function Yoda() {
    const [data, setData] = React.useState<DataType[]>([]);
  
    return (
      <div className="flex">
        <div className="relative">
          <Input  
              setData={(value) => setData(value)}
          />
        </div>
        <div>
          <Output 
              processes={data}
              solving={true}
          /> 
        </div>
      </div>
    );
}
