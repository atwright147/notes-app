import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	DiffSourceToggleWrapper,
	InsertCodeBlock,
	InsertTable,
	InsertThematicBreak,
	ListsToggle,
	MDXEditor,
	Separator,
	UndoRedo,
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
	frontmatterPlugin,
	headingsPlugin,
	imagePlugin,
	linkPlugin,
	listsPlugin,
	quotePlugin,
	tablePlugin,
	toolbarPlugin,
} from "@mdxeditor/editor";
import { type FC, JSX, useMemo } from "react";

import { useFrontmatter } from "../hooks/useFrontmatter";
import { useNoteQuery } from "../hooks/useNoteQuery";
import { useNotesStore } from "../stores/notes.store";

import "@mdxeditor/editor/style.css";

export const MdEditor: FC = (): JSX.Element | undefined => {
	const { selected } = useNotesStore();
	const {
		data: note,
		isLoading: isNoteLoading,
		isError: isNoteError,
	} = useNoteQuery(selected ?? "");

	const { attributes, body, bodyBegin, frontmatter } = useFrontmatter(note);
	const sanitizedMarkdown = useMemo(() => body?.trim() || "", [body]);

	return (
		<MDXEditor
			key={note}
			className="dark-theme dark-editor"
			markdown={body || ""}
			onChange={console.info}
			plugins={[
				diffSourcePlugin({
					diffMarkdown: sanitizedMarkdown || "",
					viewMode: "source",
				}),
				headingsPlugin({
					allowedHeadingLevels: [1, 2, 3, 4, 5, 6],
				}),
				codeBlockPlugin({ defaultCodeBlockLanguage: "ts" }),
				codeMirrorPlugin({
					codeBlockLanguages: {
						ts: "TypeScript",
						js: "JavaScript",
						css: "CSS",
					},
				}),
				frontmatterPlugin(),
				listsPlugin(),
				quotePlugin(),
				tablePlugin(),
				linkPlugin(),
				imagePlugin(),
				toolbarPlugin({
					toolbarContents: () => (
						<>
							<UndoRedo />
							<Separator />
							<BlockTypeSelect />
							<BoldItalicUnderlineToggles />
							<Separator />
							<ListsToggle />
							<InsertThematicBreak />
							<InsertCodeBlock />
							<InsertTable />
							<Separator />
							<DiffSourceToggleWrapper>
								<UndoRedo />
							</DiffSourceToggleWrapper>
						</>
					),
				}),
			]}
		/>
	);
};
