import { useMutation } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";

import { SaveNote } from "@/../wailsjs/go/main/App";
import { useFrontmatter } from "@/hooks/useFrontmatter";
import { useNoteQuery } from "@/hooks/useNoteQuery";
import { useNotesStore } from "@/stores/notes.store";

export const NoteView = () => {
	const { selected } = useNotesStore();

	const {
		data: note,
		isLoading: isNoteLoading,
		isError: isNoteError,
	} = useNoteQuery(selected ?? "");

	const saveNoteMutation = useMutation({
		mutationFn: (): Promise<void> => {
			if (!selected || !value) return Promise.resolve();
			return SaveNote(selected, value);
		},
		onSuccess: () => console.info,
		onError: () => console.info,
	});

	const { attributes, body, bodyBegin, frontmatter } = useFrontmatter(note);

	const [value, setValue] = useState<string | undefined>(body);

	useEffect(() => {
		setValue(body);
	}, [body]);

	const handleSave = async () => {
		console.info("handleSave", selected, value);
		saveNoteMutation.mutate();
	};

	return (
		<>
			<button onClick={handleSave} type="button">
				Save
			</button>
			<pre>{JSON.stringify(value, null, 2)}</pre>
			<MDEditor value={value} onChange={setValue} height="100%" />
		</>
	);
};
