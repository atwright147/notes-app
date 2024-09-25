import "@/App.css";

import { Grid, Provider, View, defaultTheme } from "@adobe/react-spectrum";
import { FileNav } from "./components/FileNav";
import { NoteView } from "./components/NoteView";

export const App = () => {
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
				<View gridArea="content">
					<NoteView />
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
