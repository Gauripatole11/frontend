import axioxInstance from './api.service';

export const adminService = {
  getDashboardStats: async () => {
    try {
      const response = await axioxInstance.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAllUsers: async (page = 1, limit = 10) => {
    try {
      const response = await axioxInstance.get(`/admin/users?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axioxInstance.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axioxInstance.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};