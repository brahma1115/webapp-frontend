import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const HelpSupport = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  
  const userFullName = localStorage.getItem('user_full_name') || 'Dr. Sarah Williams';

  const faqs = [
    {
      id: 1,
      question: "How do I acknowledge an alarm?",
      answer: "Tap the \"Acknowledge\" button on the alert details screen or swipe left on the alert in the list view."
    },
    {
      id: 2,
      question: "How to add a new patient?",
      answer: "Go to the Patients tab and tap the + icon in the top right corner. Fill in the required details and save."
    },
    {
      id: 3,
      question: "Ventilator shows \"Offline\" status",
      answer: "Check the physical connection and ensure the IoT module is powered on. If issue persists, contact IT support."
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Help & Support</h1>
        <div className="header-right">
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search patients, alerts..." />
          </div>
          <button className="icon-btn">🔔</button>
          <div className="user-initials">{userFullName.split(' ').map(n => n[0]).join('')}</div>
        </div>
      </header>

      <div className="settings-scroll-content">
        <section className="help-hero">
          <h2>How can we help?</h2>
          <p>Search our knowledge base or contact support</p>
          <div className="hero-search">
            <span>🔍</span>
            <input type="text" placeholder="Search for help..." />
          </div>
        </section>

        <div className="help-content-grid">
          <section className="help-section faq-column">
            <h2 className="help-section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map(faq => (
                <div 
                  key={faq.id} 
                  className={`faq-card ${openFaq === faq.id ? 'open' : ''}`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="faq-header">
                    <h3>{faq.question}</h3>
                    <span className="faq-chevron">⌄</span>
                  </div>
                  <div className="faq-body">
                    <p>{faq.answer}</p>
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

export default HelpSupport;
