import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HospitalManagement.css';

const HospitalManagement = () => {
  const navigate = useNavigate();

  const facilities = [
    { 
      id: 1, 
      name: 'General Hospital (HQ)', 
      address: '123 Medical Center Blvd', 
      beds: 450, 
      units: 12, 
      phone: '(555) 123-4567' 
    },
    { 
      id: 2, 
      name: "St. Mary's Center", 
      address: '45 Westside Ave', 
      beds: 200, 
      units: 5, 
      phone: '(555) 987-6543' 
    },
    { 
      id: 3, 
      name: 'Northview Clinic', 
      address: '789 North Blvd', 
      beds: 150, 
      units: 3, 
      phone: '(555) 456-7890' 
    }
  ];

  return (
    <div className="hospital-mgmt-container">
      <header className="hospital-header">
        <h1>Hospital Management</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="hospital-content">
        <div className="network-overview-bar">
          <div className="overview-text">
            <h3>Network Overview</h3>
            <p>3 Facilities • 800 Total Beds</p>
          </div>
          <button className="add-facility-btn">Add Facility</button>
        </div>

        <div className="facilities-list">
          {facilities.map(f => (
            <div key={f.id} className="facility-card">
              <div className="facility-card-header">
                <div className="facility-icon">🏢</div>
                <div className="facility-title-group">
                  <h3>{f.name}</h3>
                  <p className="facility-addr">📍 {f.address}</p>
                </div>
              </div>

              <div className="facility-stats">
                <div className="f-stat">
                  <span className="f-icon">🛌</span>
                  <span>{f.beds} Beds</span>
                </div>
                <div className="f-stat">
                  <span className="f-icon">🏥</span>
                  <span>{f.units} Active Units</span>
                </div>
                <div className="f-stat">
                  <span className="f-icon">📞</span>
                  <span>{f.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalManagement;
