import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8002',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const submitAssessment = async (data: any) => {
    const response = await api.post('/api/assessment/submit', data);
    return response.data;
};

export const getCareers = async () => {
    const response = await api.get('/api/careers');
    return response.data;
};

export const getCareerDetails = async (careerName: string) => {
    const response = await api.get(`/api/careers/${careerName}`);
    return response.data;
};

export const getProgress = async () => {
    const response = await api.get(`/api/progress`);
    return response.data;
};

export const saveProgress = async (completedTasks: string[]) => {
    const response = await api.post('/api/progress', { completed_tasks: completedTasks });
    return response.data;
};

export default api;
