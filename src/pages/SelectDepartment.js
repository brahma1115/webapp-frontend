import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectDepartment.css';

const SelectDepartment = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('icu');

  const departments = [
    { 
      id: 'icu', 
      name: 'Intensive Care Unit (ICU)', 
      subtitle: 'For critical care monitoring',
      icon: '📈', 
      color: '#0066cc' 
    },
    { 
      id: 'ccu', 
      name: 'Coronary Care Unit (CCU)', 
      subtitle: 'For cardiac care management',
      icon: '❤️', 
      color: '#0066cc' 
    },
    { 
      id: 'er', 
      name: 'Emergency Room (ER)', 
      subtitle: 'For trauma and urgent care',
      icon: '🩺', 
      color: '#0066cc' 
    },
    { 
      id: 'nicu', 
      name: 'Neonatal ICU (NICU)', 
      subtitle: 'For newborn intensive care',
      icon: '👶', 
      color: '#0066cc' 
    }
  ];

  const handleComplete = () => {
    const dept = departments.find(d => d.id === selected);
    localStorage.setItem('selected_department', dept.name);
    navigate('/dashboard');
  };

  return (
    <div className="dept-select-container">
      <div className="dept-select-card white-card">
        <header className="dept-header">
          <h1>Select Department</h1>
          <p>Which department will you be monitoring primarily?</p>
        </header>

        <div className="dept-grid">
          {departments.map((dept) => (
            <div 
              key={dept.id} 
              className={`dept-card-new ${selected === dept.id ? 'active' : ''}`}
              onClick={() => setSelected(dept.id)}
            >
              <div className="dept-icon-circle">
                <span className="icon-span">{dept.icon}</span>
              </div>
              <div className="dept-text">
                <h3>{dept.name}</h3>
              </div>
              {selected === dept.id && <div className="selection-indicator"></div>}
            </div>
          ))}
        </div>

        <button className="complete-setup-btn" onClick={handleComplete}>
          <span className="btn-text">Proceed to Dashboard</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default SelectDepartment;
