import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './App.css';

const gridSize = 152;
const gridInnerSize = gridSize - 32;

const options = {
    chart: {
        type: 'pie',
        style: {
            fontFamily: 'Overpass',
        },
    },
    credits: {
        enabled: false,
    },
    plotOptions: {
        pie: {
            size: gridSize,
            innerSize: gridInnerSize,
        }
    },
    title: {
        text: 'Top spending categories',
        align: 'left',
    },
    series: [
        {
            data: [
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
            ],
        },
    ],
};

export const App = () => {
    return (
        <div className="app">
            <HighchartsReact
                highcharts={Highcharts}
                containerProps={{ style: { width: '100%', height: '100%' } }}
                options={options}
            />
        </div>
    );
};
