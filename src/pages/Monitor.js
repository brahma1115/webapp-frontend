import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Monitor.css';

const Monitor = () => {
  const navigate = useNavigate();

  const hardcodedPatients = [
    { id: 1, name: 'Rajesh Kumar', bed: 'ICU-01', status: 'Critical', initials: 'RK', spo2: '88%', hr: '115 bpm', is_ventilated: true },
    { id: 2, name: 'Priya Sharma', bed: 'ICU-02', status: 'Warning', initials: 'PS', spo2: '91%', hr: '102 bpm', is_ventilated: true },
    { id: 3, name: 'Arjun Deshmukh', bed: 'ICU-03', status: 'Normal', initials: 'AD', spo2: '98%', hr: '75 bpm', is_ventilated: true },
    { id: 4, name: 'Ananya Rao', bed: 'ICU-04', status: 'Normal', initials: 'AR', spo2: '97%', hr: '82 bpm', is_ventilated: true },
    { id: 5, name: 'Vikram Singh', bed: 'ICU-05', status: 'Warning', initials: 'VS', spo2: '93%', hr: '108 bpm', is_ventilated: true },
    { id: 6, name: 'Kavitha Reddy', bed: 'ICU-06', status: 'Normal', initials: 'KR', spo2: '99%', hr: '72 bpm', is_ventilated: true },
    { id: 7, name: 'Suresh Babu', bed: 'ICU-07', status: 'Critical', initials: 'SB', spo2: '82%', hr: '125 bpm', is_ventilated: true },
    { id: 8, name: 'Lakshmi Narayana', bed: 'ICU-08', status: 'Normal', initials: 'LN', spo2: '98%', hr: '78 bpm', is_ventilated: true },
    { id: 9, name: 'Rahul Varma', bed: 'ICU-09', status: 'Normal', initials: 'RV', spo2: '96%', hr: '85 bpm', is_ventilated: true },
    { id: 10, name: 'Sneha Iyer', bed: 'ICU-10', status: 'Warning', initials: 'SI', spo2: '94%', hr: '99 bpm', is_ventilated: true },
    { id: 11, name: 'Aditya Chopra', bed: 'ICU-11', status: 'Normal', initials: 'AC', spo2: '97%', hr: '74 bpm', is_ventilated: true },
    { id: 12, name: 'Meera Nair', bed: 'ICU-12', status: 'Critical', initials: 'MN', spo2: '85%', hr: '112 bpm', is_ventilated: true },
    { id: 13, name: 'Sanjay Mehra', bed: 'ICU-13', status: 'Normal', initials: 'SM', spo2: '98%', hr: '68 bpm' },
    { id: 14, name: 'Deepika Patel', bed: 'ICU-14', status: 'Warning', initials: 'DP', spo2: '93%', hr: '95 bpm' },
    { id: 15, name: 'Amit Gupta', bed: 'ICU-15', status: 'Normal', initials: 'AG', spo2: '98%', hr: '74 bpm' },
  ];

  const extraPatients = JSON.parse(localStorage.getItem('extra_patients') || '[]');
  const patients = [...hardcodedPatients, ...extraPatients];

  // Beds to show (18 total)
  const beds = Array.from({ length: 18 }, (_, i) => {
    const bedId = `ICU-${String(i + 1).padStart(2, '0')}`;
    const patient = patients.find(p => p.bed === bedId && p.is_ventilated === true);
    return { bedId, patient };
  });

  const stats = {
    total: 18,
    occupied: patients.filter(p => p.bed).length,
    ventilated: 12
  };

  return (
    <div className="monitor-grid-container">
      <header className="monitor-grid-header">
        <h1>ICU Monitoring</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="monitor-sub-header">
        <span>{stats.total} Total Beds</span>
        <span>{stats.occupied} Occupied</span>
        <span>{stats.ventilated} Ventilated</span>
      </div>

      <div className="bed-grid-compact">
        {beds.map((bed, idx) => (
          <div 
            key={idx} 
            className={`bed-card-compact ${!bed.patient ? 'empty' : ''} ${bed.patient?.status === 'Critical' ? 'critical-border' : ''}`}
            onClick={() => bed.patient && navigate('/vitals-history', { state: { patient: bed.patient } })}
          >
            {bed.patient && (
              <div className={`bed-status-bar ${bed.patient.status.toLowerCase()}`}></div>
            )}
            <span className="bed-id-label">{bed.bedId}</span>
            {bed.patient ? (
              <>
                <div className="patient-initials-circle">{bed.patient.initials}</div>
                <span className={`bed-spo2-value ${bed.patient.status === 'Critical' ? 'critical-text' : ''}`}>
                  {bed.patient.spo2} SpO2
                </span>
              </>
            ) : (
              <div className="empty-content">
                <div className="patient-initials-circle" style={{ backgroundColor: '#f1f5f9', color: '#cbd5e1' }}>?</div>
                <span className="empty-label">Empty</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Monitor;
