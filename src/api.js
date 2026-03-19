const API_BASE_URL = 'http://localhost:8000';

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || 'Something went wrong');
  }

  return response.json();
};

export const login = (email, password) => {
  return apiRequest('/api/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const register = (userData) => {
  return apiRequest('/api/register/', {
    method: 'POST',
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      confirm_password: userData.confirmPassword,
      full_name: userData.fullName,
      phone: userData.phone,
      role: userData.role || 'doctor' // Default to doctor if not specified
    }),
  });
};

export const getDashboardStats = () => {
  return apiRequest('/api/dashboard/');
};

export const getRecentAlerts = () => {
  return apiRequest('/api/alerts/');
};

export const getNotifications = () => {
  return apiRequest('/api/notifications/');
};

export const getAlertsSummary = () => {
  return apiRequest('/api/alerts/summary/');
};

export const getUsers = (role = 'All') => {
  return apiRequest(`/api/user-management/list_users/?role=${role}`);
};

export const approveUser = (userId) => {
  return apiRequest(`/api/user-management/${userId}/approve/`, {
    method: 'POST'
  });
};

export const deactivateUser = (userId) => {
  return apiRequest(`/api/user-management/${userId}/deactivate/`, {
    method: 'POST'
  });
};

// Patient Endpoints
export const getPatients = (statusFilter = 'All') => {
  const query = statusFilter !== 'All' ? `?status_filter=${statusFilter}` : '';
  return apiRequest(`/api/patients/patients_list/${query}`);
};

export const createPatient = (patientData) => {
  return apiRequest('/api/patients/', {
    method: 'POST',
    body: JSON.stringify({
      full_name: patientData.name,
      patient_id: patientData.idNum,
      dob: patientData.dob,
      gender: patientData.gender,
      weight: patientData.weight ? parseFloat(patientData.weight) : null,
      primary_diagnosis: patientData.diagnosis,
      admission_date: patientData.admissionDate,
      bed_number: patientData.bed,
      attending_physician: patientData.physician
    }),
  });
};

export const getPatientDetails = (id) => {
  return apiRequest(`/api/patients/${id}/profile/`);
};

export const updateProfile = (profileData) => {
  return apiRequest('/api/profile/', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
};

export const getSecuritySettings = (userId) => {
  return apiRequest(`/api/security-settings/?user_id=${userId}`);
};

export const getLoginHistory = (userId) => {
  return apiRequest(`/api/login-history/?user_id=${userId}`);
};

export default apiRequest;
