import React, { useState } from 'react';
import { DataPoint } from './DataPoint';
import { PieChart } from './PieChart';
import './App.css';

const pieSize = 152;
const pieInnerSize = pieSize - 32;

const initialMonthlySpending: Array<DataPoint> = [
    { name: 'Food & Dining', y: 22 },
    { name: 'Health Insurance', y: 18 },
    { name: 'Miscellaneous', y: 32 },
    { name: 'Travel & Shopping', y: 16 },
];

const categoryIds = ['food', 'health', 'misc', 'travel'];

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
                y: parseInt(elements[i].value, 10),
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
                                defaultValue={category.y}
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
