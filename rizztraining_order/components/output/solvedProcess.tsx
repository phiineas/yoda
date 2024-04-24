import React from 'react';

interface Process {
  process: string;
  arrivalTime: number;
  burstTime: number;
  finishTime: number;
  turnaroundTime: number;
  waitingTime: number;
}

interface SolvedProcessProps {
  processes: Process[];
}

const SolvedProcess: React.FC<SolvedProcessProps> = ({ processes }) => {
    if (!processes) {
      return null; 
    }
    return (
      <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
        <thead className="bg-purple-500">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Process</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Arrival Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Burst Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Finish Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Turnaround Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-200">Waiting Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {processes.map((process, index) => (
            <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.process}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.arrivalTime}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.burstTime}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.finishTime}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.turnaroundTime}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{process.waitingTime}</td>
            </tr>
            ))}
        </tbody>
      </table>
    );
}

export default SolvedProcess;
