import { useMutation } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';

import { SaveNote } from '@/../wailsjs/go/main/App';
import { useFrontmatter } from '@/hooks/useFrontmatter';
import { useNoteQuery } from '@/hooks/useNoteQuery';
import { useNotesStore } from '@/stores/notes.store';
import { makeFrontmatter } from '@/utils/makeFrontmatter';

export const NoteView = () => {
	const { selected } = useNotesStore();

	const { data: note, isLoading: isNoteLoading, isError: isNoteError } = useNoteQuery(selected ?? '');

	const saveNoteMutation = useMutation({
		mutationFn: (): Promise<void> => {
			if (!selected || !value) return Promise.resolve();

			const frontmatter = makeFrontmatter(attributes);
			const content = `${frontmatter}\n\n${value}`;

			return SaveNote(selected, content);
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
		saveNoteMutation.mutate();
	};

	return (
		<>
			<button onClick={handleSave} type="button">
				Save
			</button>
			<MDEditor value={value} onChange={setValue} height="100%" />
		</>
	);
};
