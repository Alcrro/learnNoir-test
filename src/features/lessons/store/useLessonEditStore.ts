import { create } from "zustand";
import { useLessonDataStore } from "./useLessonDataStore";

type LessonEditStore = {
	isEditing: boolean;
	editTitle: string;
	editDescription: string;
	isSaving: boolean;
	setIsEditing: (v: boolean) => void;
	setEditTitle: (v: string) => void;
	setEditDescription: (v: string) => void;
	cancelEdit: () => void;
	save: () => void;
	_patch: (data: Partial<LessonEditStore>) => void;
	reset: () => void;
};

const initialState = {
	isEditing: false,
	editTitle: "",
	editDescription: "",
	isSaving: false,
} satisfies Partial<LessonEditStore>;

export const useLessonEditStore = create<LessonEditStore>((set) => ({
	...initialState,

	setIsEditing: (v) => set({ isEditing: v }),
	setEditTitle: (v) => set({ editTitle: v }),
	setEditDescription: (v) => set({ editDescription: v }),

	cancelEdit: () => {
		const lesson = useLessonDataStore.getState().lesson;
		set({
			editTitle: lesson?.title ?? "",
			editDescription: lesson?.description ?? "",
			isEditing: false,
		});
	},

	save: () => {},

	_patch: (data) => set(data),
	reset: () => set({ ...initialState }),
}));
