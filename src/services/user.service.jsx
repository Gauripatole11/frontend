import axioxInstance from './api.service';

export const userService = {
  updateProfile: async (userData) => {
    try {
      const response = await axioxInstance.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await axioxInstance.put('/users/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};