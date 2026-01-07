import api from '../utils/api';

export const packageService = {
  getAllPackages: () => {
    return api.get('/packages');
  },

  getPackageById: (id) => {
    return api.get(`/packages/${id}`);
  },

  getPackageByName: (name) => {
    return api.get(`/packages/name/${name}`);
  },
};
