import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getPatients } from '../api';
import './Clinical.css';

const Patients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatients();
  }, [filterStatus]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await getPatients(filterStatus);
      setPatients(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => {
    const name = p.name || '';
    const bed = p.bed_number || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           bed.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="patients-page">
      <div className="patients-controls">
        <div className="patients-search">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search patients by name or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {['All', 'Critical', 'Warning', 'Normal'].map(status => (
            <button 
              key={status} 
              className={`filter-tab ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <Link to="/add-patient" className="add-patient-btn">
          <span>+</span> Add Patient
        </Link>
      </div>

      <div className="patients-grid">
        {loading ? (
          <div className="loading-spinner">Loading patients...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : filteredPatients.length > 0 ? (
          filteredPatients.map(patient => (
            <div key={patient.id} className="patient-card">
              <div className="patient-card-header">
                <div className="patient-info-top">
                  <h2>{patient.name}</h2>
                  <p>{patient.bed_number}</p>
                </div>
                <div className={`severity-pill ${patient.status.toLowerCase()}`}>
                  <span className="severity-dot"></span>
                  {patient.status}
                </div>
              </div>

              <div className="patient-stats">
                <div className="stat-row">
                  <span>Diagnosis</span>
                  <span>{patient.condition}</span>
                </div>
                <div className="stat-row">
                  <span>Age</span>
                  <span>{patient.age}</span>
                </div>
                <div className="stat-row">
                  <span>ID</span>
                  <span>{patient.patient_id}</span>
                </div>
              </div>

              <div className="patient-card-footer">
                <span className="view-profile-link" onClick={() => navigate('/patient-details', { state: { patient } })}>
                  View Profile
                </span>
                <div className="patient-initials-mini">
                  {patient.name ? patient.name.split(' ').map(n => n[0]).join('').toUpperCase() : '??'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-patients">No patients found.</div>
        )}
      </div>
    </div>
  );
};

export default Patients;
