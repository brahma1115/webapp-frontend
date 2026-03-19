import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ReportsAndDocuments.css';

const ReportsAndDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient || { name: 'Rajesh Kumar', idNum: 'P001' };

  const reports = [
    { id: 1, name: 'Daily Progress Note', date: 'Oct 14, 2023', size: '1.2 MB' },
    { id: 2, name: 'Ventilator Event Log', date: 'Oct 14, 2023', size: '850 KB' },
    { id: 3, name: 'Lab Results Summary', date: 'Oct 13, 2023', size: '2.4 MB' },
    { id: 4, name: 'Admission Report', date: 'Oct 12, 2023', size: '3.1 MB' },
  ];

  const handleShare = async (report) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: report.name,
          text: `Check out this report: ${report.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = (report) => {
    const dummyContent = `Format: PDF\nReport: ${report.name}\nDate: ${report.date}\nSize: ${report.size}\n\nThis is a generated report for clinical demonstration.`;
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.replace(/\s+/g, '_')}_${report.date.replace(/,?\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert(`${report.name} has been downloaded to your PC!`);
  };

  return (
    <div className="reports-page-container">
      <header className="reports-header-row">
        <h1>Reports & Documents</h1>
        <div className="header-right" style={{marginLeft: 'auto'}}>
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">SW</div>
        </div>
      </header>

      <div className="back-link-breadcrumb" onClick={() => navigate(-1)}>
        <span>‹</span> Reports & Documents for <strong>{patient.name}</strong>
      </div>

      <div className="reports-list-container">
        {reports.map((report) => (
          <div key={report.id} className="report-item-card">
            <div className="report-info-side">
              <div className="file-icon-bg">📄</div>
              <div className="report-text-details">
                <h3>{report.name}</h3>
                <p>{report.date} • {report.size}</p>
              </div>
            </div>
            <div className="report-actions-side">
              <button 
                className="action-icon-btn" 
                title="Share"
                onClick={() => handleShare(report)}
              >
                🔗
              </button>
              <button 
                className="action-icon-btn" 
                title="Download"
                onClick={() => handleDownload(report)}
              >
                📥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsAndDocuments;
