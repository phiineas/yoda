# Simply Salted: Optimized Process Scheduling Solver

## Introduction

Process scheduling algorithms play a crucial role in determining the efficiency and performance of computer systems. To address the challenges associated with process scheduling and provide users with valuable insights, **Simply Salted** offers a comprehensive solution. This documentation aims to provide an in-depth overview of Simply Salted, focusing on its capabilities in optimizing process scheduling and providing users with actionable insights through Gantt chart visualization.

## Purpose

The main purpose of this documentation is to introduce users to Simply Salted and demonstrate how it can be used to solve process scheduling algorithms effectively. By detailing its features, implementation details, and potential benefits, this documentation aims to empower users with the knowledge and understanding required to make the most of the platform. Whether you are a student studying process scheduling algorithms or a professional seeking to optimize system performance, Simply Salted offers valuable tools and resources to support your goals.

## Overview of the Website

Simply Salted is a user-friendly and intuitive platform designed to streamline the process of solving process scheduling algorithms. With its intuitive interface and powerful features, users can explore different scheduling algorithms, adjust parameters, and visualize the results through Gantt charts. By providing a visual representation of the scheduling process, Simply Salted enables users to gain valuable insights into the performance of different algorithms and make informed decisions to optimize system efficiency.

By leveraging Simply Salted, users can:
- Explore a variety of process scheduling algorithms.
- Customize parameters to suit specific requirements.
- Visualize scheduling results through Gantt charts for enhanced understanding.
- Analyze performance metrics to evaluate algorithm efficiency.

## Process Scheduling Algorithms

Process scheduling is a vital component of multitasking operating systems where multiple processes compete for system resources like CPU time. The scheduler determines the order in which processes are executed and for how long, aiming to optimize system performance and resource utilization.

### 1. First Come First Serve (FCFS)
- **Characteristics**: Executes processes based on their arrival time, with the first process to arrive being the first to be serviced.
- **Advantages**: Simple to implement, ensures fairness as processes are executed in the order they arrive.
- **Limitations**: Poor turnaround time for long processes, known as the "convoy effect," where short processes get stuck behind long ones.

### 2. Shortest Job First (SJF)
- **Characteristics**: Schedules processes based on their burst time (execution time), executing the shortest job first.
- **Advantages**: Minimizes average waiting time and turnaround time, optimal for minimizing the completion time of processes.
- **Limitations**: Requires knowledge of burst times in advance, not suitable for real-time systems, prone to starvation for long processes if short ones keep arriving.

### 3. Round Robin (RR)
- **Characteristics**: Assigns a fixed time slice (quantum) to each process, executing them in a circular order. When the time slice expires, the process is preempted and moved to the back of the queue.
- **Advantages**: Fairness in resource allocation, suitable for time-sharing systems, prevents starvation.
- **Limitations**: High context-switching overhead, inefficient for processes with varying burst times, longer average waiting times compared to SJF.

### 4. Non-preemptive Priority
- **Characteristics**: Assigns priorities to processes, where the highest priority process is executed first. Once a process starts executing, it cannot be preempted until it completes or blocks.
- **Advantages**: Allows for prioritization of critical tasks, suitable for real-time systems where tasks have fixed deadlines.
- **Limitations**: Possibility of starvation for low-priority processes, inefficient utilization of CPU if higher priority processes keep arriving.

## Installation

To get started with Simply Salted locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/phiineas/yoda.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd rizztraining_order
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

5. **Open your browser and go to** `http://localhost:3000`