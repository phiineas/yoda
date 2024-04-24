import { fcfs } from './fcfs';
// import { sjf } from './sjf';
// import { srtf } from './srtf';
// import { rr } from './rr';
// import { npp } from './npp';
// import { pp } from './pp';

export type ganttChartInfoType = {
  job: string;
  start: number;
  stop: number;
}[];

export type solvedProcessesInfoType = {
  job: string;
  at: number;
  bt: number;
  ft: number;
  tat: number;
  wat: number;
}[];

type Algorithm = (arrivalTime: number[], burstTime: number[], timeQuantum: number) => any; 

const algorithms: Record<string, Algorithm> = {
  'FCFS': fcfs,
  // 'SJF': sjf,
  // 'SRTF': srtf,
  // 'RR': rr,
  // 'NPP': npp,
  // 'PP': pp,
};

export const solve = (
  algorithm: string,
  arrivalTime: number[],
  burstTime: number[],
  timeQuantum: number,
  priorities: number[]
) => {
  const algorithmFunc = algorithms[algorithm];
  if (!algorithmFunc) {
    throw new Error(`Unknown algorithm: ${algorithm}`);
  }
  return algorithmFunc(arrivalTime, burstTime, timeQuantum);
};