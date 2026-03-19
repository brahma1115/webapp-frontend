import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Analytics.css';

const Analytics = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('7d');

  const AreaChart = () => (
    <div className="area-chart-container">
      <svg viewBox="0 0 800 300" className="svg-area-chart">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2196F3" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2196F3" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid Lines */}
        <line x1="0" y1="100" x2="800" y2="100" className="grid-line" strokeDasharray="4" />
        <line x1="0" y1="200" x2="800" y2="200" className="grid-line" strokeDasharray="4" />

        {/* Area */}
        <path 
          d="M0,200 Q100,160 200,180 T400,140 T600,210 T800,230 L800,300 L0,300 Z" 
          fill="url(#areaGradient)" 
        />
        
        {/* Line */}
        <path 
          d="M0,200 Q100,160 200,180 T400,140 T600,210 T800,230" 
          fill="none" 
          stroke="#2196F3" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />

        {/* X-Axis Labels */}
        {['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
          <text key={i} x={100 + i * 130} y="280" className="axis-label" textAnchor="middle">{day}</text>
        ))}
      </svg>
    </div>
  );

  const BarChartHorizontal = () => (
    <div className="bar-chart-horizontal">
      {[
        { label: 'Low TV', value: 90 },
        { label: 'High RR', value: 75 },
        { label: 'Low SpO2', value: 60 },
        { label: 'Power', value: 15 },
      ].map((item, i) => (
        <div key={i} className="bar-row-container">
          <label className="bar-label-side">{item.label}</label>
          <div className="bar-bg-full">
            <div className="bar-fill-actual" style={{ width: `${item.value}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="analytics-dashboard-container">
      <header className="analytics-header">
        <h1>Analytics</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="analytics-sub-header">
        <div className="time-filter-pills">
          {['24h', '7d', '30d'].map(p => (
            <button 
              key={p} 
              className={`pill-btn ${timeFilter === p ? 'active' : ''}`}
              onClick={() => setTimeFilter(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="analytics-stats-row">
        <div className="stat-card-simple">
          <h3>2.3m</h3>
          <p>Avg Response Time</p>
        </div>
        <div className="stat-card-simple">
          <h3>12%</h3>
          <p>False Alarm Rate</p>
        </div>
        <div className="stat-card-simple">
          <h3>8%</h3>
          <p>Escalation Rate</p>
        </div>
      </div>

      <div className="analytics-main-grid">
        <div className="chart-card large">
          <h3>Alarm Frequency</h3>
          <AreaChart />
        </div>

        <div className="analytics-right-col">
          <div className="ai-forecast-card-purple">
            <div className="ai-icon-sparkle">✨ AI Forecast</div>
            <p>AI predicts <strong>23% fewer alarms</strong> next week based on current optimization trends.</p>
            <div className="ai-card-footer">
              <span className="ai-tag">High Accuracy</span>
              <span className="ai-tag">Trend Analysis</span>
              <span className="ai-arrow">→</span>
            </div>
          </div>

          <div className="chart-card">
            <h3>Alarms by Type</h3>
            <BarChartHorizontal />
          </div>
        </div>
      </div>

      <footer className="analytics-footer-action">
        <button className="generate-report-btn" onClick={() => navigate('/reports')}>
          <span>📄</span> Generate Full Report
        </button>
      </footer>
    </div>
  );
};

export default Analytics;
