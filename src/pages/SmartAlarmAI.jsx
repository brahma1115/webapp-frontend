import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SmartAlarmAI.css';

const SmartAlarmAI = () => {
  const navigate = useNavigate();

  const kpis = [
    { label: 'TOTAL ALARMS', value: '156', color: 'white' },
    { label: 'FALSE FILTERED', value: '89', color: 'purple-light' },
    { label: 'TRUE POSITIVES', value: '67', color: 'green-light' },
    { label: 'AI ACCURACY', value: '94.2%', color: 'blue-light' }
  ];

  const decisions = [
    { id: 1, title: 'SpO2 Drop', time: '2m ago', status: 'True Positive', conf: '98%', success: true },
    { id: 2, title: 'Artifact Noise', time: '15m ago', status: 'False Alarm', conf: '92%', success: false },
    { id: 3, title: 'Lead Disconnect', time: '28m ago', status: 'True Positive', conf: '89%', success: true },
    { id: 4, title: 'Patient Movement', time: '45m ago', status: 'False Alarm', conf: '95%', success: false },
    { id: 5, title: 'High Pressure', time: '1h ago', status: 'True Positive', conf: '88%', success: true }
  ];

  return (
    <div className="smart-alarm-container">
      <header className="smart-alarm-header">
        <h1>Smart Alarm AI</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="smart-alarm-grid">
        <div className="kpi-row">
          {kpis.map((kpi, i) => (
            <div key={i} className={`kpi-card ${kpi.color}`}>
              <span className="kpi-value">{kpi.value}</span>
              <span className="kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        <div className="main-stats-row">
          <div className="stats-left">
            <div className="chart-card donut-section">
              <h3>Alarm Classification</h3>
              <div className="donut-wrapper">
                <svg viewBox="0 0 100 100" className="donut-svg">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ced4da" strokeWidth="15" />
                  {/* True Critical - Red */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f56565" strokeWidth="15" strokeDasharray="62.8 251.2" strokeDashoffset="0" />
                  {/* True Warning - Orange */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ed8936" strokeWidth="15" strokeDasharray="50.2 251.2" strokeDashoffset="-62.8" />
                  {/* False Positive - Blue Grey */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#718096" strokeWidth="15" strokeDasharray="75.3 251.2" strokeDashoffset="-113" />
                  {/* Noise - Light Grey */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="15" strokeDasharray="62.9 251.2" strokeDashoffset="-188.3" />
                </svg>
              </div>
              <div className="donut-legend">
                <div className="legend-item"><span className="dot red"></span> True Critical</div>
                <div className="legend-item"><span className="dot orange"></span> True Warning</div>
                <div className="legend-item"><span className="dot slate"></span> False Positive</div>
                <div className="legend-item"><span className="dot light"></span> Noise</div>
              </div>
            </div>

            <div className="chart-card fatigue-section">
              <h3>Alarm Fatigue Reduction</h3>
              <div className="fatigue-chart">
                <div className="fatigue-row">
                  <span className="row-label">Without AI</span>
                  <div className="bar-wrapper">
                    <div className="bar-fill grey" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="fatigue-row">
                  <span className="row-label">With AI</span>
                  <div className="bar-wrapper">
                    <div className="bar-fill purple" style={{ width: '43%' }}></div>
                  </div>
                </div>
              </div>
              <p className="fatigue-footer">AI reduced alarm noise by <span className="highlight">57%</span> today</p>
            </div>
          </div>

          <div className="stats-right">
            <div className="decisions-card">
              <div className="decisions-header">
                <h3>Recent AI Decisions</h3>
              </div>
              <div className="decisions-list">
                {decisions.map(dec => (
                  <div key={dec.id} className="decision-item">
                    <div className="dec-left">
                      <div className="dec-title-group">
                        <h4>{dec.title}</h4>
                        <span className="dec-time">{dec.time}</span>
                      </div>
                      <div className={`dec-status ${dec.success ? 'success' : 'false'}`}>
                        <span className="status-icon">{dec.success ? '✓' : '✕'}</span>
                        {dec.status}
                      </div>
                    </div>
                    <div className="dec-right">
                      <div className="conf-pill">{dec.conf} Conf.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAlarmAI;
