import api from '../utils/api';

export const roomService = {
  getAllRooms: () => {
    return api.get('/rooms');
  },

  getRoomById: (id) => {
    return api.get(`/rooms/${id}`);
  },

  getAvailableRooms: (params) => {
    return api.get('/rooms/available', { params });
  },

  searchRooms: (params) => {
    return api.get('/rooms/search', { params });
  },

  getRoomsByType: (type) => {
    return api.get(`/rooms/type/${type}`);
  },
};
