import React, { useState } from 'react';
import Highcharts from 'highcharts';
import { DataPoint } from './DataPoint';
import { ColumnChart } from './ColumnChart';
import { PieChart } from './PieChart';
import './App.css';

const pieSize = 152;
const pieInnerSize = pieSize - 32;

const initialMonthlySpending: Array<DataPoint> = [
    { name: 'Food & Dining', value: 22 },
    { name: 'Health Insurance', value: 18 },
    { name: 'Miscellaneous', value: 32 },
    { name: 'Travel & Shopping', value: 16 },
];

const categoryIds = ['food', 'health', 'misc', 'travel'];

Highcharts.setOptions({
    colors: [
        '#00BFF8',
        '#008733',
        '#FFB618',
        '#FF4A44',
        '#64E572',
        '#FF9655',
        '#FFF263',
        '#6AF9C4',
    ],
});

export const App = () => {
    const [monthlySpending, setMonthlySpending] = useState(
        initialMonthlySpending
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Set new values for monthly spending
        const elements = e.currentTarget.elements['monthlySpending'];
        const newMonthlySpending = [];
        for (let i = 0; i < elements.length; i++) {
            newMonthlySpending.push({
                name: monthlySpending[i].name,
                value: parseInt(elements[i].value, 10),
            });
        }
        setMonthlySpending(newMonthlySpending);
    };

    return (
        <main className="app">
            <div className="chart">
                <PieChart
                    title="Top spending categories"
                    totalLabel="$ per month"
                    pieSize={pieSize}
                    pieInnerSize={pieInnerSize}
                    data={monthlySpending}
                />
            </div>

            <div className="chart mt-3">
                <ColumnChart
                    title="Top spending categories"
                    data={monthlySpending}
                />
            </div>

            <div className="form p-3">
                <form onSubmit={handleSubmit}>
                    {monthlySpending.map((category, i) => (
                        <div key={categoryIds[i]} className="form-group">
                            <label htmlFor={categoryIds[i]}>
                                {category.name}
                            </label>
                            <input
                                id={categoryIds[i]}
                                name="monthlySpending"
                                className="form-control"
                                defaultValue={category.value}
                            />
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </main>
    );
};
