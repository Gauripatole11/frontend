import axioxInstance from './api.service';

export const adminService = {

  getAllKeys: async () => {
    try {
      const response = await axioxInstance.get(`/admin/keys`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  generateKey: async () => {
    try {
      const response = await axioxInstance.post(`/admin/keys`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  revoke: async (payload) => {
    try {
      const response = await axioxInstance.post(`/admin/keys/revoke`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  assign: async (payload) => {
    try {
      const response = await axioxInstance.post(`/admin/keys/assign`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  

};