import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { Greet, WalkFrontmatter } from "../wailsjs/go/main/App";

function App() {
	const [resultText, setResultText] = useState("Please enter your name below 👇");
	const [frontmatter, setFrontmatter] = useState({});
	const [name, setName] = useState('');
	const updateName = (e: any) => setName(e.target.value);
	const updateResultText = (result: string) => setResultText(result);

	function greet() {
		Greet(name).then(updateResultText);
	}

	const handleWalkFrontmatter = async () => {
		const result = await WalkFrontmatter();
		setFrontmatter(result);
	}

	return (
		<div id="App">
			<img src={logo} id="logo" alt="logo"/>
			<div id="result" className="result">{resultText}</div>
			<div id="input" className="input-box">
				<input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
				<button className="btn" onClick={greet}>Greet</button>
			</div>

			<pre style={{ textAlign: 'left' }}>{JSON.stringify(frontmatter, null, 2)}</pre>
			<button className="btn" onClick={handleWalkFrontmatter}>Walk Frontmatter</button>
		</div>
	)
}

export default App
