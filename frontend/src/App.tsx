import axios from 'axios';
import './App.css';
import * as Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

highchartsAccessibility(Highcharts);

interface Temperature {
  Date: Date;
  AverageTemperature: number;
  AverageHumidity: number;
}

interface Energy {
  Timestamp: Date;
  Consumption: number;
  anomaly: boolean;
}

interface ChartData {
  temperatureData: Temperature[];
  energyData: Energy[];
}

const App = () => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    chart: {
      type: 'line',
      height: (2 / 4) * 100 + '%',
    },
    title: {
      text: 'Energy consumption and temperature data',
      align: 'left',
    },
    yAxis: [
      {
        title: {
          text: 'Energy Consumption',
          textAlign: 'left',
        },
      },
      {
        title: {
          text: 'Temperature data',
          textAlign: 'right',
        },
        opposite: true,
      },
    ],
    xAxis: {
      title: {
        text: 'Date Range',
      },
      accessibility: {
        rangeDescription: 'Date range',
      },
    },
    series: [
      {
        yAxis: 0,
        name: 'Consumption',
        type: 'line',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<ChartData>(
        'http://localhost:8080/tempsAndEnergy'
      );
      setChartOptions({
        xAxis: {
          categories: data?.energyData.map((energy) =>
            energy?.Timestamp.toString()
          ),
        },
        series: [
          {
            name: 'Consumption',
            type: 'line',
            data: data?.energyData.map((energy) => {
              return {
                y: energy.Consumption,
                marker: {
                  enabled: energy.anomaly,
                  fillColor: 'red'
                },
                dataLabels: {
                  enabled: energy.anomaly
                }
              }
            })
          },
          {
            yAxis: 1,
            name: 'Humidity',
            type: 'line',
            data: data?.temperatureData.map(
              (temperature) => temperature.AverageHumidity
            ),
          },
          {
            yAxis: 1,
            name: 'Temperature',
            type: 'line',
            data: data?.temperatureData.map(
              (temperature) => temperature.AverageTemperature
            ),
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default App;
