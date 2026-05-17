import { create } from "zustand";

type LessonEditStore = {
	isEditing: boolean;
	editTitle: string;
	editDescription: string;
	setIsEditing: (v: boolean) => void;
	setEditTitle: (v: string) => void;
	setEditDescription: (v: string) => void;
	cancelEdit: (title: string, description: string) => void;
	_patch: (data: Partial<LessonEditStore>) => void;
	reset: () => void;
};

const initialState = {
	isEditing: false,
	editTitle: "",
	editDescription: "",
} satisfies Partial<LessonEditStore>;

export const useLessonEditStore = create<LessonEditStore>((set) => ({
	...initialState,

	setIsEditing: (v) => set({ isEditing: v }),
	setEditTitle: (v) => set({ editTitle: v }),
	setEditDescription: (v) => set({ editDescription: v }),

	cancelEdit: (title, description) =>
		set({ isEditing: false, editTitle: title, editDescription: description }),

	_patch: (data) => set(data),
	reset: () => set({ ...initialState }),
}));
