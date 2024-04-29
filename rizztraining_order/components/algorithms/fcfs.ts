export type Process = {
    id: number;
    burstTime: number;
};

export const fcfs = (arrivalTimes: number[], burstTimes: number[]) => {
    let currentTime = 0;
    let totalTAT = 0;
    let totalWT = 0;
    const processes: { process: string; at: number; bt: number; ft: number; tat: number; wat: number; }[] = [];

    arrivalTimes.forEach((arrivalTime, index) => {
        const process = {
            id: index + 1,
            burstTime: burstTimes[index],
        };
        const waitingTime = Math.max(0, currentTime - arrivalTime);
        currentTime = Math.max(currentTime, arrivalTime) + process.burstTime;
        const turnaroundTime = currentTime - arrivalTime;

        totalTAT += turnaroundTime;
        totalWT += waitingTime;

        processes.push({
            process: `P${process.id}`,
            at: arrivalTime,
            bt: process.burstTime,
            ft: currentTime,
            tat: turnaroundTime,
            wat: waitingTime,
        });
    });

    const averageTAT = totalTAT / arrivalTimes.length;
    const averageWT = totalWT / arrivalTimes.length;

    return { processes, averageTAT, averageWT };
};
