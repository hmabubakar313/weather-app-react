import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import "chartjs-adapter-moment";
import moment from 'moment';

function WeatherChart({ hourlyData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    createWeatherChart(hourlyData);
  }, [hourlyData]);

  const createWeatherChart = (hourlyData) => {
    const labels = hourlyData.map((hourData) => moment(hourData.dt_txt).format('MMM D, HH:mm'));
    const temperatures = hourlyData.map((hourData) => hourData.main.temp);

    const ctx = document.getElementById('weather-chart').getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            borderColor: 'white',
            backgroundColor: '#58697a',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Hourly Temperature Forecast',
          fontSize: 16,
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                hour: 'MMM D, HH:mm',
              },
            },
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)',
            },
          },
        },
      },
    });
  };

  return <canvas id="weather-chart" width="400" height="200"></canvas>;
}

export default WeatherChart;
