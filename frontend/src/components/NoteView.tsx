import { useNoteQuery } from "@/hooks/useNoteQuery";
import { useNotesStore } from "@/stores/notes.store";

export const NoteView = () => {
	const { selected } = useNotesStore();

	const {
		data: note,
		isLoading: isNoteLoading,
		isError: isNoteError,
	} = useNoteQuery(selected ?? "");

	return (
		<div>
			<h1>Note View</h1>
			<pre>{JSON.stringify(note, null, 2)}</pre>
		</div>
	);
};
