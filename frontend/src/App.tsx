import { useEffect, useState } from "react";

import { WalkFrontmatter } from "../wailsjs/go/main/App";
import "@/App.css";

export const App = () => {
	const [frontmatter, setFrontmatter] = useState({});

	useEffect(() => {
		async () => {
			try {
				const result = await WalkFrontmatter();
				setFrontmatter(result);
			} catch (err) {
				console.info(err);
			}
		};
	}, []);

	const handleClick = async () => {
		try {
			const result = await WalkFrontmatter();
			setFrontmatter(result);
		} catch (err) {
			console.info(err);
		}
	};

	return (
		<div id="App">
			<h1 style={{ textAlign: "left" }}>Notes</h1>

			<button type="button" onClick={handleClick}>
				Refresh
			</button>

			<pre style={{ textAlign: "left" }}>
				{JSON.stringify(frontmatter, null, 2)}
			</pre>
		</div>
	);
};
