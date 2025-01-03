
import {create} from 'zustand';

export const useAuthStore = create((set) => ({
  user: localStorage.getItem('user') || null,
  access: localStorage.getItem('access') || null,
  refresh: localStorage.getItem('refresh') || null,
  login: (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    set({ user: data, access: data.access, refresh: data.refresh });
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    set({ user: null, access: null , refresh:null});
  },
  updateProfile: (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    set({ user: data });
  },
}));




