import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAIPredictions } from '../api';
import './PredictiveAnalytics.css';

const PredictiveAnalytics = () => {
  const navigate = useNavigate();
  const [predictions, setPredictions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await getAIPredictions();
        setPredictions(data);
      } catch (err) {
        console.error('Failed to fetch AI predictions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();
  }, []);

  return (
    <div className="predictive-container">
      <header className="predictive-header">
        <h1>AI Predictive Analytics</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="predictive-grid">
        <div className="forecast-overview-card">
          <div className="overview-header">
            <span className="brain-icon">🧠</span>
            <h2>Forecast Overview</h2>
          </div>
          <p className="overview-sub">AI predicts {predictions.length} potential critical events in the next 6 hours based on current patient trends.</p>
          
          <div className="overview-metrics">
            <div className="metric-box">
              <span className="metric-val">87%</span>
              <span className="metric-label">MAX CONFIDENCE</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">{predictions.length}</span>
              <span className="metric-label">PREDICTED EVENTS</span>
            </div>
          </div>
        </div>

        <div className="forecast-main-row">
          <div className="forecast-chart-card">
            <div className="card-header">
              <div className="header-left">
                <span className="chart-icon">📈</span>
                <h3>Aggregate Risk Forecast</h3>
              </div>
              <span className="time-badge">Next 6 Hours</span>
            </div>
            
            <div className="chart-area">
              <svg viewBox="0 0 400 150" className="risk-chart">
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#805ad5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#805ad5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0,130 Q50,110 100,80 T200,50 T300,100 T400,80 L400,150 L0,150 Z" 
                  fill="url(#purpleGrad)" 
                />
                <path 
                  d="M0,130 Q50,110 100,80 T200,50 T300,100 T400,80" 
                  fill="none" 
                  stroke="#805ad5" 
                  strokeWidth="3" 
                />
              </svg>
              <div className="chart-labels">
                <span>+1h</span>
                <span>+2h</span>
                <span>+3h</span>
                <span>+4h</span>
                <span>+5h</span>
                <span>+6h</span>
              </div>
            </div>
          </div>

          <div className="predicted-events-card">
            <h3>Predicted Events</h3>
            <div className="events-list">
              {loading ? (
                <div className="loading">Loading AI Predictions...</div>
              ) : predictions.length > 0 ? (
                predictions.map(pred => (
                  <div 
                    key={pred.id}
                    className="prediction-item" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      // Create a patient object to pass to details
                      const patientObj = {
                        id: pred.patient,
                        name: pred.patient_name,
                        bed: pred.bed_number,
                        status: 'Normal',
                        idNum: `P0${pred.patient}`
                      };
                      navigate('/patient-details', { state: { patient: patientObj } });
                    }}
                  >
                  <div className="item-top">
                    <div className="item-title-group">
                      <h4>{pred.event_name}</h4>
                      <p className="item-patient">{pred.patient_name} • {pred.bed_number}</p>
                    </div>
                    <span className="time-in">{pred.time_to_event}</span>
                  </div>
                  
                  <div className="conf-area">
                    <div className="conf-label">AI Confidence <span className="conf-val">{pred.confidence_score}%</span></div>
                    <div className="conf-bar-bg">
                      <div className="conf-bar-fill" style={{ width: `${pred.confidence_score}%` }}></div>
                    </div>
                  </div>

                  <div className="recommendation-bar">
                    <span className="rec-icon">💡</span>
                    <p>Recommendation: {pred.recommendation}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-users">No predictive events detected currently.</div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
