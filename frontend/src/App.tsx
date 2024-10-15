import styles from "@/App.module.scss";

import { Grid, Provider, View, defaultTheme } from "@adobe/react-spectrum";

import { useNotesStore } from "@/stores/notes.store";
import { FileNav } from "./components/FileNav";
import { MilkdownEditorWrapper } from "./components/NoteView2";
import { useFrontmatter } from "./hooks/useFrontmatter";
import { useNoteQuery } from "./hooks/useNoteQuery";

export const App = () => {
	const selected = useNotesStore((store) => store.selected);
	const {
		data: note,
		isLoading: isNoteLoading,
		isError: isNoteError,
	} = useNoteQuery(selected ?? "");

	const { attributes, body, bodyBegin, frontmatter } = useFrontmatter(note);

	return (
		<Provider theme={defaultTheme} minHeight="100vh">
			<Grid
				UNSAFE_style={{ padding: "16px", boxSizing: "border-box" }}
				areas={["sidebar content", "footer  footer"]}
				columns={["250px", "1fr"]}
				rows={["auto", "min-content"]}
				minHeight="100vh"
				gap="size-300"
			>
				<View gridArea="content" UNSAFE_className={styles.content}>
					<MilkdownEditorWrapper content={body} />
				</View>

				<View gridArea="sidebar" elementType="aside" padding="5px">
					<FileNav />
				</View>

				<View gridArea="footer" elementType="footer">
					Footer
				</View>
			</Grid>
		</Provider>
	);
};
