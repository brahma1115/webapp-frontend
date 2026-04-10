import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStatus } from '../clinicalLogic';
import './MonitorBed.css';

const MonitorBed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patient } = location.state || { 
    patient: { name: 'Unknown', bed: 'ICU-??', ppeak: '24', peep: '5.0', tv: '450', rr: '18', fio2: '40', ie: '1:2.0' } 
  };

  const Waveform = ({ color, label }) => (
    <div className="waveform-box">
      <div className={`wave-label ${color === '#00e5ff' ? 'blue' : ''}`}>{label}</div>
      <svg className="wave-svg" viewBox="0 0 800 200">
        <line x1="0" y1="100" x2="800" y2="100" className="grid-line-monitor" />
        <path 
          className="wave-line" 
          stroke={color} 
          d={color === '#ffd600' 
            ? "M0,100 Q50,20 100,100 T200,100 T300,100 T400,100 T500,20 T600,100 T700,100 T800,100" 
            : "M0,150 Q40,50 80,150 T160,150 T240,150 T320,150 T400,150 T480,50 T560,150 T640,150 T720,150 T800,150"} 
        />
      </svg>
    </div>
  );

  const ppeakStatus = getStatus('PIP', patient.ppeak || '24');
  const peepStatus = getStatus('PEEP', patient.peep || '5.0');
  const rrStatus = getStatus('RR', patient.rr || '18');
  const fio2Status = getStatus('FIO2', (patient.fio2 || '40').replace('%', ''));

  return (
    <div className="monitor-bed-container">
      <header className="monitor-bed-header">
        <div className="header-left">
          <button className="back-btn-minimal" onClick={() => navigate('/icu-monitoring')}>←</button>
          <h1>Monitor: {patient.bed ? `Bed ${patient.bed.replace('Bed ', '')}` : 'Unknown Bed'}</h1>
        </div>
        <div className="header-actions">
          <div className="search-mini">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="status-operation-bar">
        <div className="status-label">
          <span className="status-dot-green"></span>
          Normal Operation
        </div>
        <div className="op-actions">
          <div className="op-item">⚙️ Settings</div>
          <div className="op-item">📶 Connected</div>
        </div>
      </div>

      <div className="monitor-main-layout">
        <div className="waveforms-section">
          {patient.is_connected ? (
            <>
              <Waveform color="#ffd600" label="Paw (cmH2O)" />
              <Waveform color="#00e5ff" label="Flow (L/min)" />
            </>
          ) : (
            <div className="waveforms-placeholder">
              <p>Connect to Ventilator to see live waveforms</p>
            </div>
          )}
        </div>

        <div className="vitals-grid-right">
          <div 
            className="vital-card-detailed" 
            onClick={() => navigate('/trends-mechanics')}
            style={{ cursor: 'pointer', borderColor: ppeakStatus.color }}
          >
            <label>PPEAK</label>
            <div className="value-box">
              <span className="vital-value-large" style={{ color: ppeakStatus.color }}>{patient.ppeak || '24'}</span>
              <span className="vital-unit-small">cmH2O</span>
            </div>
            {ppeakStatus.level !== 'NORMAL' && <div className="status-label-small" style={{ background: ppeakStatus.color }}>{ppeakStatus.label}</div>}
          </div>
          <div className="vital-card-detailed" style={{ borderColor: peepStatus.color }}>
            <label>PEEP</label>
            <div className="value-box">
              <span className="vital-value-large" style={{ color: peepStatus.color }}>{patient.peep || '5.0'}</span>
              <span className="vital-unit-small">cmH2O</span>
            </div>
            {peepStatus.level !== 'NORMAL' && <div className="status-label-small" style={{ background: peepStatus.color }}>{peepStatus.label}</div>}
          </div>
          <div className="vital-card-detailed green">
            <label>VTE</label>
            <div className="value-box">
              <span className="vital-value-large">{patient.tv || '450'}</span>
              <span className="vital-unit-small">mL</span>
            </div>
          </div>
          <div className="vital-card-detailed" style={{ borderColor: rrStatus.color }}>
            <label>RR</label>
            <div className="value-box">
              <span className="vital-value-large" style={{ color: rrStatus.color }}>{patient.rr || '18'}</span>
              <span className="vital-unit-small">bpm</span>
            </div>
            {rrStatus.level !== 'NORMAL' && <div className="status-label-small" style={{ background: rrStatus.color }}>{rrStatus.label}</div>}
          </div>
          <div className="vital-card-detailed" style={{ borderColor: fio2Status.color }}>
            <label>FIO2</label>
            <div className="value-box">
              <span className="vital-value-large" style={{ color: fio2Status.color }}>{(patient.fio2 || '40').replace('%', '')}</span>
              <span className="vital-unit-small">%</span>
            </div>
            {fio2Status.level !== 'NORMAL' && <div className="status-label-small" style={{ background: fio2Status.color }}>{fio2Status.label}</div>}
          </div>
          <div className="vital-card-detailed">
            <label>I:E</label>
            <div className="value-box">
              <span className="vital-value-large">{patient.ie || '1:2.0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorBed;
