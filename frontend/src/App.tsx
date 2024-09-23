import "@/App.css";

import { useFrontmatterQuery } from "@/hooks/getFrontmatter";

export const App = () => {
	const {
		data: frontmatter,
		isSuccess: isFrontmatterSuccess,
		isError: isFrontmatterError,
		refetch: refetchFrontmatter,
		isFetching: isFrontmatterFetching,
	} = useFrontmatterQuery();

	const handleClick = async () => {
		await refetchFrontmatter();
	};

	return (
		<div id="App">
			<h1>Notes</h1>

			<button type="button" onClick={handleClick}>
				Refresh
			</button>

			{isFrontmatterSuccess && !isFrontmatterError && (
				<pre>{JSON.stringify(frontmatter, null, 2)}</pre>
			)}
		</div>
	);
};
