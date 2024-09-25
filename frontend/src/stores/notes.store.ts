import { create } from "zustand";

export interface State {
	selected: string | undefined;
	setSelected: (selected: string) => void;
}

export const useNotesStore = create<State>()((set) => ({
	selected: undefined,
	setSelected: (selected) => set({ selected }),
}));
