import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface AuthState {
  userRole: string | null;
  setRole: (role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userRole: null,
      setRole: (role) => set({ userRole: role }),
      logout: () => {
        set({ userRole: null });
        Cookies.remove('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const value = Cookies.get(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => Cookies.set(name, JSON.stringify(value), { expires: 7 }),
        removeItem: (name) => Cookies.remove(name),
      },
    }
  )
);
