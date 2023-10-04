import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-moment';
import moment from 'moment';

function WeatherChart({ hourlyData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    createWeatherChart(hourlyData);
  }, [hourlyData]);

  const createWeatherChart = (hourlyData) => {
    const labels = hourlyData.map((hourData) =>
      moment(hourData.dt_txt).format('MMM D, HH:mm')
    );
    const temperatures = hourlyData.map((hourData) => hourData.main.temp);

    const ctx = document.getElementById('weather-chart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); 

  gradient.addColorStop(0, 'rgba(70, 130, 180, 1)');  
  gradient.addColorStop(1, 'rgba(173, 216, 230, 1)'); 


    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Current Temperature (°C)',
            data: temperatures,
            backgroundColor: gradient, 
          },
        ],
        
        
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
              unitStepSize: 10, // Display x-axis label every 10 minutes
              displayFormats: {
                minute: 'mm',
              },
            },
            title: {
              display: true,
              text: 'Time', 
              color: 'white',
              font: {
                size: 20,
                style: 'normal',
              },
            },
            ticks: {
              color: 'white',
              font: {
                size: 16,
                style: 'normal',
              },
            },
          },
          
        },
      },
      
    });
  };

  const currentTemperature = hourlyData.length > 0 ? hourlyData[hourlyData.length - 1].main.temp : '';

  return (
    <div>
      <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '10px' }}>Current Temperature</h3>
      <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>{currentTemperature}&deg;C</p>
      <canvas id="weather-chart" width="400" height="200"></canvas>
    </div>
  );
}

export default WeatherChart;
