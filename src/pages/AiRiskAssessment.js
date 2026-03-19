import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AiRiskAssessment.css';

const AiRiskAssessment = () => {
  const navigate = useNavigate();

  const highRiskPatients = [
    { name: 'Rajesh Kumar', bed: 'Bed ICU-01', risk: '92%' },
    { name: 'Suresh Babu', bed: 'Bed ICU-07', risk: '88%' }
  ];

  const distribution = [
    { label: 'High', count: 4, color: '#f56565', width: '15%' },
    { label: 'Medium', count: 12, color: '#ed8936', width: '35%' },
    { label: 'Low', count: 36, color: '#48bb78', width: '50%' }
  ];

  const recentChanges = [
    { name: 'Priya Sharma', from: '54%', to: '65%', diff: '11', up: true, color: 'orange' },
    { name: 'Vikram Singh', from: '68%', to: '72%', diff: '4', up: true, color: 'orange' },
    { name: 'Ananya Rao', from: '42%', to: '22%', diff: '20', up: false, color: 'green' }
  ];

  return (
    <div className="risk-assessment-container">
      <header className="risk-header">
        <h1>AI Risk Assessment</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="risk-grid">
        <div className="high-risk-overview-card">
          <div className="overview-left">
            <span className="risk-count-big">4</span>
            <div className="risk-title-group">
              <h3>HIGH RISK PATIENTS</h3>
              <p>Critical intervention suggested for 2 patients.</p>
            </div>
          </div>
          <div className="overview-right">
            <h4>High Likelihood</h4>
            <div className="likelihood-list">
              {highRiskPatients.map((p, i) => (
                <div key={i} className="likelihood-item">
                  <div className="p-info">
                    <span className="p-name">{p.name}</span>
                    <span className="p-bed">{p.bed}</span>
                  </div>
                  <span className="p-risk-pct">{p.risk} Risk</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="risk-bottom-row">
          <div className="distribution-card h-full">
            <h3>Risk Distribution</h3>
            <div className="dist-chart">
              {distribution.map((d, i) => (
                <div key={i} className="dist-row">
                  <div className="dist-label-group">
                    <span className="dist-label">{d.label}</span>
                    <span className="dist-count">{d.count}</span>
                  </div>
                  <div className="dist-bar-bg">
                    <div className="dist-bar-fill" style={{ width: d.width, backgroundColor: d.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="changes-card h-full">
            <h3>Recent Risk Changes</h3>
            <div className="changes-list">
              {recentChanges.map((c, i) => (
                <div key={i} className="change-item">
                  <div className="change-left">
                    <span className="change-name">{c.name}</span>
                    <span className="change-range">{c.from} → {c.to}</span>
                  </div>
                  <div className={`change-trend ${c.color}`}>
                    {c.up ? '↑' : '↓'} {c.diff}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiRiskAssessment;
