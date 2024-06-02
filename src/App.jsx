
import React from 'react';
import LineChartComponent from './components/LineChart';
import PieChartComponent from './components/PieChart';
import HistogramComponent from './components/Histogram';
import Heatmap from './components/Heatmap';
import { networkData } from './data/data'


const processData = (data) => {
  
  const lineChartData = data
    .filter(entry => entry.event_type === 'alert')
    .reduce((acc, entry) => {
      const timestamp = new Date(entry.timestamp);
      const hour = new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate(), timestamp.getHours());
      const hourString = hour.toISOString();

      if (!acc[hourString]) {
        acc[hourString] = { timestamp: hourString, alertCount: 0 };
      }
      acc[hourString].alertCount += 1;

      return acc;
    }, {});

  const lineChartArray = Object.values(lineChartData);

  const severityCounts = {};
  data.forEach(entry => {
    if (entry.alert) {
      const severity = `Severity ${entry.alert.severity}`;
      severityCounts[severity] = (severityCounts[severity] || 0) + 1;
    }
  });

  const pieChartData = Object.keys(severityCounts).map(key => ({
    name: key,
    value: severityCounts[key],
  }));

  
  const sourceIPCounts = {};
  const destIPCounts = {};
  const sourcePortCounts = {};
  const destPortCounts = {};

  data.forEach(entry => {
    if (entry.alert) {
      sourceIPCounts[entry.src_ip] = (sourceIPCounts[entry.src_ip] || 0) + 1;
      destIPCounts[entry.dest_ip] = (destIPCounts[entry.dest_ip] || 0) + 1;
      sourcePortCounts[entry.src_port] = (sourcePortCounts[entry.src_port] || 0) + 1;
      destPortCounts[entry.dest_port] = (destPortCounts[entry.dest_port] || 0) + 1;
    }
  });

  const histogramDataSourceIP = Object.keys(sourceIPCounts).map(key => ({
    sourceIP: key,
    count: sourceIPCounts[key],
  }));

  const histogramDataDestIP = Object.keys(destIPCounts).map(key => ({
    destIP: key,
    count: destIPCounts[key],
  }));

  const heatmapDataSourcePort = Object.keys(sourcePortCounts).map(key => ({
    sourcePort: key,
    count: sourcePortCounts[key],
  }));

  const heatmapDataDestPort = Object.keys(destPortCounts).map(key => ({
    destPort: key,
    count: destPortCounts[key],
  }));

  return {
    lineChartData: lineChartArray,
    pieChartData,
    histogramDataSourceIP,
    histogramDataDestIP,
    heatmapDataSourcePort,
    heatmapDataDestPort,
  };
};
const { lineChartData, pieChartData, histogramDataSourceIP, histogramDataDestIP, heatmapDataSourcePort, heatmapDataDestPort } = processData(networkData);

function App() {
  return (
    <div className="App bg-gray-800">
      <div className='container py-5 px-10 text-6xl font-bold text-gray-50'>
      <h1>Network Security Dashboard</h1>
      </div>

      <div className='container p-8'>
      <div className='flex mb-4 w-full flex-1 gap-2 '>
        <div className='w-1/3 p-4 bg-gray-900 rounded-xl shadow shadow-gray-500'>
      <h2 className='text-xl font-bold text-gray-50'>Distribution of Alert Severities</h2>
      <PieChartComponent data={pieChartData} />
      </div>
      <div className='w-2/3 p-4 bg-gray-900 rounded-xl shadow shadow-gray-500'>
      <h2 className='text-xl font-bold text-gray-50'>Top Source Ports</h2>
      <Heatmap data={heatmapDataSourcePort} xKey="sourcePort" yKey="count" />
      </div>
      </div>

      <div className='flex gap-2 w-full flex-1 mb-4'>
        <div className='w-2/3 p-4 bg-gray-900 rounded-xl shadow shadow-gray-500'>
        <h2 className='text-xl font-bold text-gray-50'>Top Destination IPs</h2>
      <HistogramComponent data={histogramDataSourceIP} dataKey="sourceIP" barKey="count" value="IP address" />
      </div>
      <div className='w-1/3 p-4 bg-gray-900 rounded-xl shadow shadow-gray-500'>
      <h2 className='text-xl font-bold text-gray-50 justify-item-center'>Top Source IPs</h2>
      <HistogramComponent data={histogramDataDestIP} dataKey="destIP" barKey="count" value="IP address" />
      </div>
      </div>

      <div className='flex gap-2 w-full flex-1'>
        <div className='w-1/3 p-4 bg-gray-900 rounded-xl shadow shadow-gray-500'>
        <h2 className='text-xl font-bold text-gray-50'>Alert Trend Over Time</h2>
      <LineChartComponent data={lineChartData} />
      </div>
      <div className='w-2/3 p-4 bg-gray-900 rounded-xl shadow shadow-gray-500'>
      <h2 className='text-xl font-bold text-gray-50 justify-item-center'>Top Destination Ports</h2>
      <Heatmap data={heatmapDataDestPort} xKey="destPort" yKey="count" />
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;