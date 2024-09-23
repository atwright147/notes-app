import { useState } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { Greet, WalkFrontmatter } from "../wailsjs/go/main/App";

function App() {
	const [resultText, setResultText] = useState(
		"Please enter your name below 👇",
	);
	const [frontmatter, setFrontmatter] = useState({});
	const [name, setName] = useState("");
	const updateName = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setName(event.target.value);
	};
	const updateResultText = (result: string): void => setResultText(result);

	function greet(): void {
		Greet(name).then(updateResultText);
	}

	const handleWalkFrontmatter = async () => {
		const result = await WalkFrontmatter();
		setFrontmatter(result);
	};

	return (
		<div id="App">
			<img src={logo} id="logo" alt="logo" />
			<div id="result" className="result">
				{resultText}
			</div>
			<div id="input" className="input-box">
				<input
					id="name"
					className="input"
					onChange={updateName}
					autoComplete="off"
					name="input"
					type="text"
				/>
				<button className="btn" onClick={greet} type="button">
					Greet
				</button>
			</div>

			<button className="btn" onClick={handleWalkFrontmatter} type="button">
				Walk Frontmatter
			</button>
			<pre style={{ textAlign: "left" }}>
				{JSON.stringify(frontmatter, null, 2)}
			</pre>
		</div>
	);
}

export default App;
