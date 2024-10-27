import "@/App.css";

import { Grid, Provider, View, defaultTheme } from "@adobe/react-spectrum";
import { ActionsBar } from "./components/ActionsBar";
import { FileNav } from "./components/FileNav";
import { MdEditor } from "./components/MdEditor";
import { NoteView } from "./components/NoteView";
import { useConfigStoreQuery } from "./hooks/useConfigStoreQuery";

export const App = () => {
	const {
		data: config,
		isLoading: isConfigLoading,
		isError: isConfigError,
	} = useConfigStoreQuery();

	return (
		<Provider theme={defaultTheme} minHeight="100vh">
			<Grid
				UNSAFE_style={{ padding: "16px", boxSizing: "border-box" }}
				areas={["actionsbar sidebar content", "footer footer  footer"]}
				columns={["40px", "250px", "1fr"]}
				rows={["auto", "min-content"]}
				minHeight="100vh"
				gap="size-300"
			>
				<View gridArea="actionsbar">
					<ActionsBar />
				</View>

				<View gridArea="content">
					Content
					<MdEditor />
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
