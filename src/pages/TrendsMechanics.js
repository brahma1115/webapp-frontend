import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TrendsMechanics.css';

const TrendsMechanics = () => {
  const navigate = useNavigate();

  const timeLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];

  const LineChart = () => (
    <div className="chart-container-inner">
      <svg viewBox="0 0 1000 250" className="svg-chart">
        {/* Horizontal Grid Lines */}
        <line x1="20" y1="50" x2="980" y2="50" className="grid-line" />
        <line x1="20" y1="100" x2="980" y2="100" className="grid-line" />
        <line x1="20" y1="150" x2="980" y2="150" className="grid-line" />
        
        {/* Line Path */}
        <path 
          className="line-path" 
          d="M20,120 L212,140 L404,110 L596,105 L788,115 L980,125" 
        />
        
        {/* Data Points */}
        {[20, 212, 404, 596, 788, 980].map((x, i) => {
          const ys = [120, 140, 110, 105, 115, 125];
          return (
            <circle key={i} cx={x} cy={ys[i]} r="6" className="data-point" />
          );
        })}

        {/* X-Axis Labels */}
        {timeLabels.map((time, i) => (
          <text key={i} x={20 + i * 192} y="220" className="axis-label">{time}</text>
        ))}
        <line x1="20" y1="200" x2="980" y2="200" className="axis-line" />
      </svg>
    </div>
  );

  const BarChart = () => (
    <div className="chart-container-inner">
      <svg viewBox="0 0 1000 250" className="svg-chart">
        {/* Horizontal Grid Lines */}
        <line x1="20" y1="50" x2="980" y2="50" className="grid-line" />
        <line x1="20" y1="100" x2="980" y2="100" className="grid-line" />
        <line x1="20" y1="150" x2="980" y2="150" className="grid-line" />

        {/* Bars */}
        {[100, 120, 110, 110, 115, 115].map((h, i) => (
          <rect 
            key={i} 
            x={45 + i * 180} 
            y={200 - h} 
            width="100" 
            height={h} 
            className="bar-rect" 
          />
        ))}

        {/* X-Axis Labels */}
        {timeLabels.map((time, i) => (
          <text key={i} x={95 + i * 180} y="220" className="axis-label" textAnchor="middle">{time}</text>
        ))}
        <line x1="20" y1="200" x2="980" y2="200" className="axis-line" />
      </svg>
    </div>
  );

  return (
    <div className="trends-mechanics-container">
      <header className="trends-header">
        <button className="back-btn-minimal" onClick={() => navigate(-1)}>
          <span>‹</span>
        </button>
        <h1>Trends & Mechanics</h1>
      </header>

      <section className="chart-section">
        <div className="chart-card">
          <h3>Lung Compliance (mL/cmH2O)</h3>
          <LineChart />
        </div>
        <div className="chart-card">
          <h3>Airway Resistance (cmH2O/L/s)</h3>
          <BarChart />
        </div>
      </section>
    </div>
  );
};

export default TrendsMechanics;
