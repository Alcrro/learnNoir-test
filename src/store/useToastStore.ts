import { create } from "zustand";

export type Toast = {
	id: string;
	message: string;
	type: "success" | "info";
};

type ToastStore = {
	toasts: Toast[];
	show: (message: string, type?: Toast["type"]) => void;
	dismiss: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
	toasts: [],
	show: (message, type = "success") => {
		const id = crypto.randomUUID();
		set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
		setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 5000);
	},
	dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
