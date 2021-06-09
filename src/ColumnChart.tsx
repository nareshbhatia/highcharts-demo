import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataPoint } from './DataPoint';

export interface ColumnChartProps {
  title: string;
  data: Array<DataPoint>;
}

export const ColumnChart = ({ title, data }: ColumnChartProps) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'column',
      style: {
        fontFamily: 'Overpass',
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        allowPointSelect: true,
        dataLabels: {
          enabled: true,
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
    legend: {
      symbolRadius: 0,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      tickLength: 0,
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    title: {
      align: 'left',
      style: {
        fontSize: '16px',
      },
      text: title,
    },
    tooltip: {
      enabled: false,
    },
  });

  useEffect(() => {
    // set options from props
    const columnData = data.map((point) => ({
      name: point.name,
      data: [point.y],
    }));
    // overwrite the options - the new ones will be passed to chart.update()
    // see https://github.com/highcharts/highcharts-react#optimal-way-to-update
    setChartOptions({
      // @ts-ignore
      series: columnData,
    });
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      containerProps={{ style: { width: '100%', height: '100%' } }}
      options={chartOptions}
    />
  );
};
