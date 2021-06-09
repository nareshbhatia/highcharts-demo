import React, { useState } from 'react';
import Highcharts from 'highcharts';
import { DataPoint } from './DataPoint';
import { ColumnChart } from './ColumnChart';
import { PieChart } from './PieChart';
import './App.css';

const initialMonthlySpending: Array<DataPoint> = [
  { name: 'Food & Dining', y: 22 },
  { name: 'Health Insurance', y: 18 },
  { name: 'Miscellaneous', y: 32 },
  { name: 'Travel & Shopping', y: 16 },
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
    // @ts-ignore
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
          data={monthlySpending}
        />
      </div>

      <div className="chart mt-3">
        <ColumnChart title="Top spending categories" data={monthlySpending} />
      </div>

      <div className="form p-3">
        <form onSubmit={handleSubmit}>
          {monthlySpending.map((category, i) => (
            <div key={categoryIds[i]} className="form-group">
              <label htmlFor={categoryIds[i]}>{category.name}</label>
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
