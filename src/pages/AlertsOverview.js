import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAlertsSummary } from '../api';
import './AlertsOverview.css';

const AlertsOverview = () => {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getAlertsSummary();
      setSummary(data);
    } catch (err) {
      console.error('Failed to fetch alerts summary:', err);
    }
  };

  const kpis = [
    { label: 'ACTIVE', value: summary?.active_alerts || 0 },
    { label: 'TODAY', value: summary?.alerts_today || 0 },
    { label: 'WEEK', value: summary?.alerts_week || 0 }
  ];

  return (
    <div className="alerts-overview-container">
      <header className="overview-header">
        <h1>Alerts Overview</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="overview-content">
        {/* KPI Row */}
        <div className="kpi-row">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="kpi-card">
              <span className="kpi-value">{kpi.value}</span>
              <span className="kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="charts-main-row">
          <div className="chart-container-card trend-card">
            <h3>Alert Trend (7 Days)</h3>
            <div className="line-chart-svg-wrapper">
              <svg viewBox="0 0 500 200" className="trend-svg">
                <path 
                  d="M 50 120 L 115 100 L 180 110 L 245 70 L 310 90 L 375 130 L 440 140"
                  fill="none" 
                  stroke="#0066cc" 
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* Data points */}
                {[
                  {x: 50, y: 120}, {x: 115, y: 100}, {x: 180, y: 110}, 
                  {x: 245, y: 70}, {x: 310, y: 90}, {x: 375, y: 130}, {x: 440, y: 140}
                ].map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#0066cc" />
                ))}
                
                {/* Sun Tooltip as seen in screenshot */}
                <g className="sun-tooltip">
                  <rect x="400" y="80" width="60" height="45" rx="8" fill="white" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
                  <text x="410" y="100" fontSize="11" fontWeight="600" fill="#2d3748">Sun</text>
                  <text x="410" y="115" fontSize="10" fontWeight="500" fill="#0066cc">alerts : 8</text>
                  <line x1="440" y1="125" x2="440" y2="140" stroke="#e2e8f0" strokeWidth="1" />
                </g>

                {/* X Axis Labels */}
                <text x="115" y="180" fontSize="10" fill="#a0aec0" textAnchor="middle">Tue</text>
                <text x="180" y="180" fontSize="10" fill="#a0aec0" textAnchor="middle">Wed</text>
                <text x="245" y="180" fontSize="10" fill="#a0aec0" textAnchor="middle">Thu</text>
                <text x="310" y="180" fontSize="10" fill="#a0aec0" textAnchor="middle">Fri</text>
                <text x="375" y="180" fontSize="10" fill="#a0aec0" textAnchor="middle">Sat</text>
                <text x="440" y="180" fontSize="10" fill="#a0aec0" textAnchor="middle">Sun</text>
              </svg>
            </div>
          </div>

          <div className="chart-container-card distribution-card">
            <h3>Alert Distribution</h3>
            <div className="donut-chart-wrapper">
              <svg viewBox="0 0 200 200" className="donut-svg">
                {/* Warning Arc (Yellow) */}
                <circle cx="100" cy="100" r="60" fill="none" stroke="#ed8936" strokeWidth="20" strokeDasharray="100 277" strokeDashoffset="0" />
                {/* Critical Arc (Red) */}
                <circle cx="100" cy="100" r="60" fill="none" stroke="#f56565" strokeWidth="20" strokeDasharray="60 317" strokeDashoffset="-100" />
                {/* Info Arc (Blue) */}
                <circle cx="100" cy="100" r="60" fill="none" stroke="#4299e1" strokeWidth="20" strokeDasharray="150 227" strokeDashoffset="-160" />
                {/* Center hole for donut */}
                <circle cx="100" cy="100" r="50" fill="white" />
              </svg>
              <div className="donut-legend">
                <div className="legend-item"><span className="dot red"></span> Critical</div>
                <div className="legend-item"><span className="dot orange"></span> Warning</div>
                <div className="legend-item"><span className="dot blue"></span> Info</div>
              </div>
            </div>
          </div>
        </div>

        <button className="view-all-alerts-full-btn" onClick={() => navigate('/alerts')}>
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default AlertsOverview;
