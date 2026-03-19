import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeviceManagement.css';

const DeviceManagement = () => {
  const navigate = useNavigate();

  const devices = [
    { id: 1, name: 'PB840-01', model: 'Puritan Bennett 840', location: 'ICU-B04', lastMaint: 'Jan 10, 2025', status: 'Online', color: 'green' },
    { id: 2, name: 'PB840-02', model: 'Puritan Bennett 840', location: 'ICU-B02', lastMaint: 'Dec 15, 2024', status: 'Online', color: 'green' },
    { id: 3, name: 'SV300-01', model: 'Mindray SV300', location: 'Storage A', lastMaint: 'Nov 20, 2024', status: 'Offline', color: 'grey' },
    { id: 4, name: 'VG-PRO-01', model: 'VentGuard Pro X1', location: 'ICU-B01', lastMaint: 'Oct 05, 2024', status: 'Maint. Due', color: 'yellow' }
  ];

  return (
    <div className="device-mgmt-container">
      <header className="device-header">
        <h1>Device Management</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="device-content">
        <div className="search-controls">
          <div className="detailed-search">
            <span>🔍</span>
            <input type="text" placeholder="Search devices..." />
          </div>
          <button className="pulse-btn">⚡</button>
        </div>

        <div className="device-grid">
          {devices.map(device => (
            <div key={device.id} className="device-card">
              <div className="device-card-top">
                <div className="device-main-info">
                  <div className={`device-icon ${device.color}`}>
                    {device.status === 'Offline' ? '📵' : '📶'}
                  </div>
                  <div className="device-names">
                    <h3>{device.name}</h3>
                    <p>{device.model}</p>
                  </div>
                </div>
                <div className={`status-pill ${device.status.toLowerCase().replace(' ', '-')}`}>
                  <span className="dot"></span> {device.status}
                </div>
              </div>
              
              <div className="device-card-details">
                <div className="detail-box">
                  <span className="detail-lab">Location</span>
                  <span className="detail-val">{device.location}</span>
                </div>
                <div className="detail-box">
                  <span className="detail-lab">Last Maint.</span>
                  <span className="detail-val">{device.lastMaint}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="add-device-btn">
          <span>+</span> Add New Device
        </button>
      </div>
    </div>
  );
};

export default DeviceManagement;
