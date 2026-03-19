import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ICUMonitoring.css';

const ICUMonitoring = () => {
  const navigate = useNavigate();

  const patients = [
    { id: 1, name: 'Rajesh Kumar', bed: 'Bed ICU-01', status: 'Normal', tv: '450', rr: '18', fio2: '40%', spo2: '98%' },
    { id: 2, name: 'Priya Sharma', bed: 'Bed ICU-02', status: 'Warning', tv: '380', rr: '24', fio2: '50%', spo2: '94%' },
    { id: 3, name: 'Arjun Deshmukh', bed: 'Bed ICU-03', status: 'Critical', tv: '290', rr: '32', fio2: '80%', spo2: '88%' },
    { id: 4, name: 'Ananya Rao', bed: 'Bed ICU-04', status: 'Normal', tv: '460', rr: '16', fio2: '35%', spo2: '99%' },
    { id: 5, name: 'Vikram Singh', bed: 'Bed ICU-05', status: 'Normal', tv: '440', rr: '19', fio2: '40%', spo2: '97%' },
    { id: 6, name: 'Kavitha Reddy', bed: 'Bed ICU-06', status: 'Normal', tv: '420', rr: '16', fio2: '35%', spo2: '98%' },
    { id: 7, name: 'Suresh Babu', bed: 'Bed ICU-07', status: 'Warning', tv: '350', rr: '28', fio2: '60%', spo2: '92%' },
    { id: 8, name: 'Lakshmi Narayana', bed: 'Bed ICU-08', status: 'Normal', tv: '480', rr: '14', fio2: '30%', spo2: '100%' },
    { id: 9, name: 'Rahul Varma', bed: 'Bed ICU-09', status: 'Normal', tv: '440', rr: '12', fio2: '21%', spo2: '99%' },
    { id: 10, name: 'Sneha Iyer', bed: 'Bed ICU-10', status: 'Warning', tv: '380', rr: '20', fio2: '30%', spo2: '95%' },
    { id: 11, name: 'Aditya Chopra', bed: 'Bed ICU-11', status: 'Normal', tv: '420', rr: '14', fio2: '21%', spo2: '97%' },
    { id: 12, name: 'Meera Nair', bed: 'Bed ICU-12', status: 'Critical', tv: '300', rr: '26', fio2: '70%', spo2: '89%' },
    { id: 13, name: 'Sanjay Mehra', bed: 'Bed ICU-13', status: 'Normal', tv: '460', rr: '14', fio2: '21%', spo2: '98%' },
    { id: 14, name: 'Deepika Patel', bed: 'Bed ICU-14', status: 'Warning', tv: '390', rr: '22', fio2: '40%', spo2: '93%' },
    { id: 15, name: 'Amit Gupta', bed: 'Bed ICU-15', status: 'Normal', tv: '450', rr: '16', fio2: '21%', spo2: '98%' },
  ];

  const stats = {
    active: 18,
    warning: 3,
    critical: 1
  };

  return (
    <div className="icu-monitoring-container">
      <header className="monitoring-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>←</button>
        <h1>Live Monitor</h1>
      </header>

      <div className="status-summary-bar">
        <div className="status-item">
          <span className="status-dot active"></span>
          {stats.active} Active
        </div>
        <div className="status-item">
          <span className="status-dot warning"></span>
          {stats.warning} Warning
        </div>
        <div className="status-item">
          <span className="status-dot critical"></span>
          {stats.critical} Critical
        </div>
      </div>

      <div className="monitoring-grid">
        {patients.map(patient => (
          <div 
            key={patient.id} 
            className="patient-monitor-card" 
            onClick={() => navigate('/monitor-bed', { state: { patient } })}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-header">
              <div className="patient-basic-info">
                <h3>{patient.name}</h3>
                <p>{patient.bed}</p>
              </div>
              <div className={`status-badge ${patient.status.toLowerCase()}`}>
                <span className="badge-dot"></span>
                {patient.status}
              </div>
            </div>

            <div className="parameters-grid">
              <div className="parameter-box">
                <label>TV</label>
                <div className="value">{patient.tv}</div>
              </div>
              <div className="parameter-box">
                <label>RR</label>
                <div className="value">{patient.rr}</div>
              </div>
              <div className="parameter-box">
                <label>FiO2</label>
                <div className="value">{patient.fio2}</div>
              </div>
              <div className={`parameter-box ${patient.status === 'Critical' ? 'highlight' : ''}`}>
                <label>SpO2</label>
                <div className="value">{patient.spo2}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ICUMonitoring;
