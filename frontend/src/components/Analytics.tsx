import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartTypeRegistry,
} from 'chart.js';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const chartRef1 = useRef<ChartJSOrUndefined<'bar'>>(null);
  const chartRef2 = useRef<ChartJSOrUndefined<'bar'>>(null);
  const chartRef3 = useRef<ChartJSOrUndefined<'bar'>>(null);

  useEffect(() => {
    return () => {
      chartRef1.current?.destroy();
      chartRef2.current?.destroy();
      chartRef3.current?.destroy();
    };
  }, []);

  const data1 = {
    labels: ['Company A', 'Company B', 'Company C', 'Company D', 'Company E'],
    datasets: [
      {
        label: 'Number of Students Placed',
        data: [10, 20, 30, 40, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const data2 = {
    labels: ['Course A', 'Course B', 'Course C'],
    datasets: [
      {
        label: 'Number of Students Placed',
        data: [15, 25, 35],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const data3 = {
    labels: ['<3 LPA', '3-5 LPA', '5-7 LPA', '7-10 LPA', '>10 LPA'],
    datasets: [
      {
        label: 'Number of Students',
        data: [5, 15, 10, 20, 5],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  return (
    <div className="min-h-80 flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Analytics</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Number of Students Placed in Companies (Month Wise)</h3>
          <Bar ref={chartRef1} data={data1} />
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Students Per Course Placed (Academic Year)</h3>
          <Bar ref={chartRef2} data={data2} />
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Number of Students Per Package Range</h3>
          <Bar ref={chartRef3} data={data3} />
          <p className="mt-4">Highest Package: 20 LPA</p>
          <p>Median Package: 5 LPA</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Highest Paying Companies</h3>
          <ul>
            <li>Company A: 20 LPA</li>
            <li>Company B: 15 LPA</li>
            <li>Company C: 10 LPA</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
