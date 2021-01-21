import React from 'react';
import { DataPoint } from './DataPoint';
import { PieChart } from './PieChart';
import './App.css';

const pieSize = 152;
const pieInnerSize = pieSize - 32;

const data: Array<DataPoint> = [
    {
        name: 'Food & Dining',
        y: 22,
    },
    {
        name: 'Health Insurance',
        y: 18,
    },
    {
        name: 'Miscellaneous',
        y: 32,
    },
    {
        name: 'Travel & Shopping',
        y: 16,
    },
];

export const App = () => {
    return (
        <main className="app">
            <div className="chart">
                <PieChart
                    title="Top spending categories"
                    totalLabel="$ per month"
                    pieSize={pieSize}
                    pieInnerSize={pieInnerSize}
                    data={data}
                />
            </div>
        </main>
    );
};
