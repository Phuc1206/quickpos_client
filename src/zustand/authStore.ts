import type { TNavigationConfig } from "@/types/routesType";
import { create } from "zustand";

interface User {
	_id: string;
	name: string;
	phoneNumber: string;
	address: string;
	level: string;
}
interface AuthState {
	user: User | null;
	setUser: (user: User | null) => void;
	logout: () => void;
	navigationConfig: TNavigationConfig | undefined;
	setNavigationConfig: (config: TNavigationConfig | undefined) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,

	setUser: (user) => set({ user }),

	logout: () => set({ user: null }),

	navigationConfig: undefined,

	setNavigationConfig: (config) => set({ navigationConfig: config })
}));
