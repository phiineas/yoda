import { fcfs, Process } from './Fcfs';
import Input from '../Input';
import Output from '../Output';
import solvedProcessesInfoType from '../output/solvedProcess';
import SolvedProcess from '../output/solvedProcess';

type Algorithm = (arrivalTime: number[], burstTime: number[], timeQuantum: number, priorities: number[]) => any;

const algorithms: Record<string, Algorithm> = {
    'FCFS': fcfs,
};

export const solve = (
    algorithm: string,
    arrivalTime: number[],
    burstTime: number[],
    timeQuantum: number,
    priorities: number[]
): { solvedProcesses: typeof solvedProcessesInfoType } => {
    const algorithmFunc = algorithms[algorithm];
    if (!algorithmFunc) {
        throw new Error(`Unknown algorithm: ${algorithm}`);
    }
    return algorithmFunc(arrivalTime, burstTime, timeQuantum, priorities);
};

export { Input, Output, SolvedProcess, solvedProcessesInfoType };
