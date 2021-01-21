import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataPoint } from './DataPoint';

const initialOptions = {
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
            allowPointSelect: true,
            dataLabels: {
                distance: 30, // this is the default
                format: '{point.name}<br /><b>{point.y}</b>',
                style: {
                    fontSize: '12px',
                    fontWeight: 300,
                    textOverflow: 'clip',
                },
            },
        },
        series: {
            cursor: 'pointer',
            states: {
                hover: {
                    enabled: false,
                },
                inactive: {
                    opacity: 1,
                },
            },
        },
    },
    title: {
        align: 'left',
        style: {
            fontSize: '16px',
        },
    },
    tooltip: {
        enabled: false,
    },
};

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

export interface PieChartProps {
    title: string;
    totalLabel: string;
    pieSize: number;
    pieInnerSize: number;
    data: Array<DataPoint>;
}

export const PieChart = ({
    title,
    totalLabel,
    pieSize,
    pieInnerSize,
    data,
}: PieChartProps) => {
    const chartRef = useRef(null);
    const [chartOptions, setChartOptions] = useState(initialOptions);

    useEffect(() => {
        // @ts-ignore
        const chart = chartRef?.current?.chart;
        if (!chart) {
            return;
        }

        // set options from props
        setChartOptions({
            plotOptions: {
                pie: {
                    // @ts-ignore
                    size: pieSize,
                    innerSize: pieInnerSize,
                },
                series: {
                    cursor: 'pointer',
                    states: {
                        hover: {
                            enabled: false,
                        },
                        inactive: {
                            opacity: 1,
                        },
                    },
                },
            },
            // @ts-ignore
            series: [
                {
                    data,
                },
            ],
            title: {
                // @ts-ignore
                text: title,
            },
        });

        // compute total
        const total = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.y,
            0
        );

        // render total
        const x = chart.plotSizeX / 2 - chart.plotLeft / 2;
        const y = chart.plotSizeY / 2 + chart.plotTop;

        chart.totalValue = chart.renderer
            .text(total, x, y)
            .css({
                fontSize: '32px',
            })
            .add();

        chart.totalValueLabel = chart.renderer
            .text(totalLabel, 0, 0)
            .css({
                fontSize: '12px',
            })
            .add();

        chart.totalValueLabel.translate(
            x - chart.totalValueLabel.getBBox().width / 4,
            y + chart.totalValue.getBBox().height / 2
        );
    }, [title, totalLabel, pieSize, pieInnerSize, data]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            containerProps={{ style: { width: '100%', height: '100%' } }}
            options={chartOptions}
            ref={chartRef}
        />
    );
};
