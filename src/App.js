import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Welcome from './pages/Welcome';
import Onboarding1 from './pages/Onboarding1';
import Onboarding2 from './pages/Onboarding2';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import SelectRole from './pages/SelectRole';
import SelectHospital from './pages/SelectHospital';
import SelectDepartment from './pages/SelectDepartment';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import AddPatient from './pages/AddPatient';
import PatientDetails from './pages/PatientDetails';
import PatientHistory from './pages/PatientHistory';
import Monitor from './pages/Monitor';
import MonitorBed from './pages/MonitorBed';
import VitalsHistory from './pages/VitalsHistory';
import VentilatorSettings from './pages/VentilatorSettings';
import AIAssistant from './pages/AIAssistant';
import PredictiveAnalytics from './pages/PredictiveAnalytics';
import AiRiskAssessment from './pages/AiRiskAssessment';
import AnomalyDetection from './pages/AnomalyDetection';
import DeviceManagement from './pages/DeviceManagement';
import HospitalManagement from './pages/HospitalManagement';
import AuditLogs from './pages/AuditLogs';
import AccessControl from './pages/AccessControl';
import SmartAlarmAI from './pages/SmartAlarmAI';
import AdminConsole from './pages/AdminConsole';
import AlertsOverview from './pages/AlertsOverview';
import ViewAlerts from './pages/ViewAlerts';
import AlertDetails from './pages/AlertDetails';
import EscalateAlert from './pages/EscalateAlert';
import AlertSettings from './pages/AlertSettings';
import CriticalAlert from './pages/CriticalAlert';
import Settings from './pages/Settings';
import ProfileSettings from './pages/ProfileSettings';
import Appearance from './pages/Appearance';
import SecurityPrivacy from './pages/SecurityPrivacy';
import About from './pages/About';
import HelpSupport from './pages/HelpSupport';
import Notifications from './pages/Notifications';
import ReportsAndDocuments from './pages/ReportsAndDocuments';
import UserManagement from './pages/UserManagement';
import ICUMonitoring from './pages/ICUMonitoring';
import Analytics from './pages/Analytics';
import PatientSummary from './pages/PatientSummary';
import TrendsMechanics from './pages/TrendsMechanics';

import './App.css';

import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Initial Flow - Public */}
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding1" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />
          
          {/* Auth Flow - Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Authenticated Routes wrapped in MainLayout and ProtectedRoute */}
          <Route path="/select-role" element={<ProtectedRoute><MainLayout><SelectRole /></MainLayout></ProtectedRoute>} />
          <Route path="/select-hospital" element={<ProtectedRoute><MainLayout><SelectHospital /></MainLayout></ProtectedRoute>} />
          <Route path="/select-department" element={<ProtectedRoute><MainLayout><SelectDepartment /></MainLayout></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><MainLayout><Notifications /></MainLayout></ProtectedRoute>} />
          <Route path="/patients" element={<ProtectedRoute><MainLayout><Patients /></MainLayout></ProtectedRoute>} />
          <Route path="/add-patient" element={<ProtectedRoute><MainLayout><AddPatient /></MainLayout></ProtectedRoute>} />
          <Route path="/patient-details" element={<ProtectedRoute><MainLayout><PatientDetails /></MainLayout></ProtectedRoute>} />
          <Route path="/patient-history" element={<ProtectedRoute><MainLayout><PatientHistory /></MainLayout></ProtectedRoute>} />
          <Route path="/monitor" element={<ProtectedRoute><MainLayout><Monitor /></MainLayout></ProtectedRoute>} />
          <Route path="/monitor-bed" element={<ProtectedRoute><MainLayout><MonitorBed /></MainLayout></ProtectedRoute>} />
          <Route path="/vitals-history" element={<ProtectedRoute><MainLayout><VitalsHistory /></MainLayout></ProtectedRoute>} />
          <Route path="/ventilator-settings" element={<ProtectedRoute><MainLayout><VentilatorSettings /></MainLayout></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><MainLayout><ReportsAndDocuments /></MainLayout></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><MainLayout><AIAssistant /></MainLayout></ProtectedRoute>} />
          <Route path="/predictive-analytics" element={<ProtectedRoute><MainLayout><PredictiveAnalytics /></MainLayout></ProtectedRoute>} />
          <Route path="/risk-assessment" element={<ProtectedRoute><MainLayout><AiRiskAssessment /></MainLayout></ProtectedRoute>} />
          <Route path="/anomaly-detection" element={<ProtectedRoute><MainLayout><AnomalyDetection /></MainLayout></ProtectedRoute>} />
          <Route path="/smart-alarm" element={<ProtectedRoute><MainLayout><SmartAlarmAI /></MainLayout></ProtectedRoute>} />
          <Route path="/alerts-overview" element={<ProtectedRoute><MainLayout><AlertsOverview /></MainLayout></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><MainLayout><ViewAlerts /></MainLayout></ProtectedRoute>} />
          <Route path="/alert-details" element={<ProtectedRoute><MainLayout><AlertDetails /></MainLayout></ProtectedRoute>} />
          <Route path="/escalate-alert" element={<ProtectedRoute><MainLayout><EscalateAlert /></MainLayout></ProtectedRoute>} />
          <Route path="/icu-monitoring" element={<ProtectedRoute><MainLayout><ICUMonitoring /></MainLayout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><MainLayout><Analytics /></MainLayout></ProtectedRoute>} />
          <Route path="/patient-summary" element={<ProtectedRoute><MainLayout><PatientSummary /></MainLayout></ProtectedRoute>} />
          <Route path="/alert-settings" element={<ProtectedRoute><MainLayout><AlertSettings /></MainLayout></ProtectedRoute>} />
          <Route path="/critical-alert" element={<ProtectedRoute><MainLayout><CriticalAlert /></MainLayout></ProtectedRoute>} />
          <Route path="/admin-console" element={<ProtectedRoute allowedRole="adminastrator"><MainLayout><AdminConsole /></MainLayout></ProtectedRoute>} />
          <Route path="/user-management" element={<ProtectedRoute allowedRole="adminastrator"><MainLayout><UserManagement /></MainLayout></ProtectedRoute>} />
          <Route path="/device-management" element={<ProtectedRoute allowedRole="adminastrator"><MainLayout><DeviceManagement /></MainLayout></ProtectedRoute>} />
          <Route path="/hospital-management" element={<ProtectedRoute allowedRole="adminastrator"><MainLayout><HospitalManagement /></MainLayout></ProtectedRoute>} />
          <Route path="/audit-logs" element={<ProtectedRoute allowedRole="adminastrator"><MainLayout><AuditLogs /></MainLayout></ProtectedRoute>} />
          <Route path="/access-control" element={<ProtectedRoute allowedRole="adminastrator"><MainLayout><AccessControl /></MainLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfileSettings /></MainLayout></ProtectedRoute>} />
          <Route path="/profile-settings" element={<ProtectedRoute><MainLayout><ProfileSettings /></MainLayout></ProtectedRoute>} />
          <Route path="/appearance" element={<ProtectedRoute><MainLayout><Appearance /></MainLayout></ProtectedRoute>} />
          <Route path="/security-privacy" element={<ProtectedRoute><MainLayout><SecurityPrivacy /></MainLayout></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><MainLayout><About /></MainLayout></ProtectedRoute>} />
          <Route path="/help-support" element={<ProtectedRoute><MainLayout><HelpSupport /></MainLayout></ProtectedRoute>} />
          <Route path="/trends-mechanics" element={<ProtectedRoute><MainLayout><TrendsMechanics /></MainLayout></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
