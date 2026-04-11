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

  const filteredPatients = Array.isArray(patients) ? patients.filter(p => {
    if (!p) return false;
    const name = p.full_name || p.name || '';
    const bed = p.bed_number || p.bed || '';
    const searchQueryLower = searchQuery.toLowerCase();
    return name.toLowerCase().includes(searchQueryLower) || 
           bed.toLowerCase().includes(searchQueryLower) ||
           (p.patient_id && p.patient_id.toLowerCase().includes(searchQueryLower));
  }) : [];

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
            <div key={patient.id} className="patient-card clickable" onClick={() => navigate('/patient-details', { state: { patient } })}>
              <div className="patient-card-main">
                <div className="patient-icon-container">
                  <div className="patient-icon-circle">
                    {patient.gender === 'Female' ? '👩' : '👨'}
                  </div>
                </div>
                
                <div className="patient-info-content">
                  <div className="patient-card-header-row">
                    <div className="name-id-group">
                      <h2 className="patient-name-text">{patient.full_name || patient.name}</h2>
                      <p className="patient-id-text">{patient.formatted_details || `ID: ${patient.patient_id} • ${patient.age}`}</p>
                      <p className="patient-bed-text">{patient.formatted_bed || `Bed: ${patient.bed_number}`}</p>
                    </div>
                    
                    <div className="status-condition-group">
                      <div className={`status-pill-android ${(patient.status || 'Normal').toLowerCase()}`}>
                        <span className="dot">●</span> {patient.status || 'Normal'}
                      </div>
                      <p className="condition-text-android">{patient.condition || patient.diagnosis}</p>
                    </div>
                  </div>
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
