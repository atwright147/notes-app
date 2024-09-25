import { Editor, rootCtx } from '@milkdown/kit/core';
import { defaultValueCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { type FC, useMemo } from 'react';

import { useNoteQuery } from '@/hooks/useNoteQuery';
import { useNotesStore } from '@/stores/notes.store';

interface MilkdownEditorProps {
	defaultValue: string;
}

const stripFrontmatter = (markdown: string | undefined): string => {
	if (!markdown) return '';

	const frontmatterRegex = /^---\s*[\s\S]*?\s*---\s*/;
	return markdown.replace(frontmatterRegex, '');
};

const defaultValue = 'Click a note to open it here';

const MilkdownEditor: FC = (): JSX.Element => {
	const { selected } = useNotesStore();
	const { data: note, isLoading: isNoteLoading, isError: isNoteError } = useNoteQuery(selected ?? '');

	const markdown = useMemo(() => stripFrontmatter(note), [note]);

	useEditor(
		(root) =>
			Editor.make()
				.config(nord)
				.config((ctx) => {
					ctx.set(defaultValueCtx, markdown);
					ctx.set(rootCtx, root);
					// ctx.set(defaultValueCtx, defaultValue);
					ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
						console.log('Updated markdown:', markdown);
					});
				})
				.use(commonmark)
				.use(listener),
		[markdown],
	);

	return <Milkdown />;
};

export const NoteView = () => {
	const { selected } = useNotesStore();

	const { data: note, isLoading: isNoteLoading, isError: isNoteError } = useNoteQuery(selected ?? '');

	const markdown = useMemo(() => stripFrontmatter(note), [note]);

	return (
		<div>
			<h1>Note View</h1>
			<pre>{JSON.stringify(markdown, null, 2)}</pre>

			<hr />
			<MilkdownProvider>
				<MilkdownEditor />
			</MilkdownProvider>
			<hr />
		</div>
	);
};
