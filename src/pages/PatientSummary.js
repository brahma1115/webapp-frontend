import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientSummary.css';

const PatientSummary = () => {
  const navigate = useNavigate();

  const hardcodedPatients = [
    { id: 1, name: 'Rajesh Kumar', bed: 'ICU-01', status: 'Critical', diagnosis: 'Severe ARDS', age: '65 yrs', dept: 'ICU' },
    { id: 2, name: 'Priya Sharma', bed: 'ICU-02', status: 'Warning', diagnosis: 'Pneumonia', age: '42 yrs', dept: 'ICU' },
    { id: 3, name: 'Arjun Deshmukh', bed: 'ICU-03', status: 'Normal', diagnosis: 'Post-Op CABG', age: '58 yrs', dept: 'ICU' },
    { id: 4, name: 'Ananya Rao', bed: 'NICU-04', status: 'Normal', diagnosis: 'COPD', age: '71 yrs', dept: 'NICU' },
    { id: 5, name: 'Vikram Singh', bed: 'ICU-05', status: 'Warning', diagnosis: 'Sepsis', age: '54 yrs', dept: 'ICU' },
    { id: 6, name: 'Kavitha Reddy', bed: 'CCU-06', status: 'Normal', diagnosis: 'Trauma', age: '33 yrs', dept: 'CCU' },
    { id: 7, name: 'Suresh Babu', bed: 'ICU-07', status: 'Critical', diagnosis: 'COVID-19', age: '68 yrs', dept: 'ICU' },
    { id: 8, name: 'Lakshmi Narayana', bed: 'CCU-08', status: 'Normal', diagnosis: 'Asthma', age: '29 yrs', dept: 'CCU' },
    { id: 9, name: 'Rahul Varma', bed: 'ER-09', status: 'Normal', diagnosis: 'Fracture', age: '25 yrs', dept: 'ER' },
    { id: 10, name: 'Sneha Iyer', bed: 'ER-10', status: 'Warning', diagnosis: 'Fever', age: '30 yrs', dept: 'ER' },
    { id: 11, name: 'Aditya Chopra', bed: 'ICU-11', status: 'Normal', diagnosis: 'Observation', age: '45 yrs', dept: 'ICU' },
    { id: 12, name: 'Meera Nair', bed: 'ICU-12', status: 'Critical', diagnosis: 'Stroke', age: '62 yrs', dept: 'ICU' },
    { id: 13, name: 'Sanjay Mehra', bed: 'ICU-13', status: 'Normal', diagnosis: 'Recovery', age: '55 yrs', dept: 'ICU' },
    { id: 14, name: 'Deepika Patel', bed: 'ICU-14', status: 'Warning', diagnosis: 'Renal', age: '48 yrs', dept: 'ICU' },
    { id: 15, name: 'Amit Gupta', bed: 'ICU-15', status: 'Normal', diagnosis: 'Routine', age: '37 yrs', dept: 'ICU' },
  ];

  const extraPatients = JSON.parse(localStorage.getItem('extra_patients') || '[]').map(p => ({
    ...p,
    dept: p.bed.includes('NICU') ? 'NICU' : p.bed.includes('CCU') ? 'CCU' : p.bed.includes('ER') ? 'ER' : 'ICU'
  }));
  
  const allPatients = [...hardcodedPatients, ...extraPatients];

  // Calculate Stats
  const stats = {
    total: allPatients.length,
    critical: allPatients.filter(p => p.status === 'Critical').length,
    stable: allPatients.filter(p => p.status === 'Normal').length,
    warning: allPatients.filter(p => p.status === 'Warning').length
  };

  // Department Distribution for Chart
  const deptData = [
    { name: 'ICU', count: allPatients.filter(p => p.dept === 'ICU').length },
    { name: 'NICU', count: allPatients.filter(p => p.dept === 'NICU').length },
    { name: 'CCU', count: allPatients.filter(p => p.dept === 'CCU').length },
    { name: 'ER', count: allPatients.filter(p => p.dept === 'ER').length },
  ];

  const maxCount = Math.max(...deptData.map(d => d.count), 1);

  // Attention Needed List
  const priorityPatients = allPatients
    .filter(p => p.status === 'Critical' || p.status === 'Warning')
    .sort((a, b) => (a.status === 'Critical' ? -1 : 1));

  return (
    <div className="patient-summary-container">
      <header className="summary-header">
        <h1>Patient Summary</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="summary-scroll-area">
        {/* KPI Cards Row */}
        <div className="kpi-grid">
          <div className="kpi-card total">
            <span className="kpi-value">{stats.total}</span>
            <span className="kpi-label">Total</span>
          </div>
          <div className="kpi-card critical">
            <span className="kpi-value">{stats.critical}</span>
            <span className="kpi-label">Critical</span>
          </div>
          <div className="kpi-card stable">
            <span className="kpi-value">{stats.stable}</span>
            <span className="kpi-label">Stable</span>
          </div>
          <div className="kpi-card improv">
            <span className="kpi-value">{stats.warning}</span>
            <span className="kpi-label">Improv</span>
          </div>
        </div>

        <div className="summary-main-grid">
          {/* Chart Section */}
          <section className="chart-card glass-card">
            <h3>Patients by Department</h3>
            <div className="chart-area-wrapper">
              {/* Horizontal Grid Lines */}
              <div className="chart-grid-lines">
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
                <div className="grid-line"></div>
              </div>
              
              <div className="bar-chart-container">
                {deptData.map((dept, i) => (
                  <div key={i} className="chart-column">
                    <div className="bar-wrapper">
                      {/* Background "Ghost" Bar */}
                      <div className="bar-background"></div>
                      
                      {/* Actual Data Bar */}
                      <div 
                        className={`bar ${dept.name === 'ICU' ? 'primary' : 'secondary'}`} 
                        style={{ height: `${(dept.count / (maxCount * 1.2)) * 100}%` }}
                      >
                        {dept.name === 'ER' && (
                          <div className="chart-tooltip">
                            ER<br/>
                            <span className="tooltip-sub">patients : {dept.count}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="bar-label">{dept.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Attention Needed Section */}
          <section className="attention-section">
            <h3>ATTENTION NEEDED</h3>
            <div className="priority-list">
              {priorityPatients.map(patient => (
                <div 
                  key={patient.id} 
                  className="priority-card"
                  onClick={() => {
                    if (patient.status === 'Warning') {
                      navigate('/alert-details', { state: { alert: { 
                        title: patient.diagnosis, 
                        patient: patient.name, 
                        bed: patient.bed, 
                        time: '15m ago',
                        currentValue: '35 bpm', 
                        limitSet: '30 bpm',
                        confidence: '87%',
                        cause: 'Patient agitation likely showing abnormal values.',
                        actions: ['Check patient state', 'Verify sensors', 'Review medication']
                      } } });
                    } else if (patient.status === 'Critical') {
                      navigate('/critical-alert', { state: { alert: { title: patient.diagnosis, value: '53', unit: 'cmH2O', label: 'PRESSURE' } } });
                    } else {
                      navigate('/patient-details', { state: { patient } });
                    }
                  }}
                >
                  <div className="priority-info">
                    <h4>{patient.name}</h4>
                    <p>{patient.diagnosis} • {patient.bed}</p>
                  </div>
                  <div className={`status-tag ${patient.status.toLowerCase()}`}>
                    • {patient.status}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatientSummary;
