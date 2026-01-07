import api from '../utils/api';

export const authService = {
  googleLogin: (googleToken) => {
    return api.post('/auth/google-login', { token: googleToken });
  },

  checkHealth: () => {
    return api.get('/auth/health');
  },
};
