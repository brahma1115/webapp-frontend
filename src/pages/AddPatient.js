import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../api';
import './AddPatient.css';

const AddPatient = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    idNum: '',
    dob: '',
    gender: 'Male',
    weight: '',
    diagnosis: '',
    admissionDate: '',
    bed: '',
    physician: 'Dr. Sarah Wilson',
    status: 'Stable'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const data = await createPatient(formData);
      // Navigate to the new patient's profile using the ID from the backend
      navigate('/patient-details', { state: { patient: data } });
    } catch (err) {
      setError(err.message || 'Failed to save patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-patient-page-container">
      {/* Header matching screenshot */}
      <header className="add-patient-header">
        <div className="header-title-section">
          <h1>Add Patient</h1>
        </div>
        <div className="header-tools">
          <div className="top-search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="notification-btn">🔔<span className="dot"></span></button>
          <div className="profile-circle">SW</div>
        </div>
      </header>

      <div className="add-patient-content">
        <div className="breadcrumb-nav" onClick={() => navigate(-1)}>
          <span className="back-arrow">‹</span>
          <h2>Add New Patient</h2>
        </div>

        {error && <div className="error-message" style={{ color: '#F44336', marginBottom: '16px', fontWeight: 'bold' }}>{error}</div>}

        <form onSubmit={handleSave} className="add-patient-form">
          {/* Section: Personal Information */}
          <div className="form-card-section">
            <h3 className="section-header">Personal Information</h3>
            
            <div className="form-field full-width">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Patient ID</label>
                <input 
                  type="text" 
                  name="idNum"
                  placeholder="e.g. P-12345"
                  value={formData.idNum}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <label>Weight (kg)</label>
                <input 
                  type="number" 
                  name="weight"
                  placeholder="70"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section: Medical Details */}
          <div className="form-card-section">
            <h3 className="section-header">Medical Details</h3>
            
            <div className="form-field full-width">
              <label>Primary Diagnosis</label>
              <input 
                type="text" 
                name="diagnosis"
                placeholder="e.g. ARDS"
                value={formData.diagnosis}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Admission Date</label>
                <input 
                  type="date" 
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Bed Number</label>
                <input 
                  type="text" 
                  name="bed"
                  placeholder="e.g. ICU-05"
                  value={formData.bed}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Attending Physician</label>
                <select name="physician" value={formData.physician} onChange={handleChange}>
                  <option value="Dr. Sarah Wilson">Dr. Sarah Wilson</option>
                  <option value="Dr. Rajesh Gupta">Dr. Rajesh Gupta</option>
                  <option value="Dr. Priya Sharma">Dr. Priya Sharma</option>
                </select>
              </div>
              <div className="form-field">
                <label>Patient Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Stable">Stable (Green)</option>
                  <option value="Critical">Critical (Red)</option>
                  <option value="Warning">Warning (Yellow)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="primary-save-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save Patient Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
