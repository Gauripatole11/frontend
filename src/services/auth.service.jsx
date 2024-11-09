import axioxInstance from './api.service';

export const authService = {
  loginBegin: async (payload) => {
    try {
      const response = await axioxInstance.post('/user/login/begin', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  loginComplete: async (payload) => {
    try {
      const response = await axioxInstance.post('/user/login/complete', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  registerBegin: async (payload) => {
    try {
      const response = await axioxInstance.post('/user/register/begin', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  registerComplete: async (payload) => {
    try {
      const response = await axioxInstance.post('/user/register/complete', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  adminLogin: async (payload) => {
    try {
      const response = await axioxInstance.post('/admin/login', payload);
      return response.data;
    } catch (error) {
        
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    try {
      const response = await axioxInstance.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: async () => {
    try {
      await axioxInstance.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove items even if axioxInstance call fails
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  },

  getProfile: async () => {
    try {
      let user = await localStorage.getItem('user');
      return JSON.parse(user);
    } catch (error) {
      throw error.response?.data || error.message;
      return null;
      
    }
  }
};