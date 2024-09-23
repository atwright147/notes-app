import "@/App.css";

import { useFrontmatterQuery } from "@/hooks/useFrontmatterQuery";

export const App = () => {
	const {
		data: frontmatter,
		isLoading: isFrontmatterLoading,
		isError: isFrontmatterError,
		refetch: refetchFrontmatter,
		isFetching: isFrontmatterFetching,
	} = useFrontmatterQuery();

	const handleClick = async () => {
		await refetchFrontmatter();
	};

	if (isFrontmatterLoading || isFrontmatterError) {
		return <div>Loading...</div>;
	}

	return (
		<div id="App">
			<h1>Notes</h1>

			<button type="button" onClick={handleClick}>
				Refresh
			</button>

			<nav aria-label="files">
				{frontmatter?.map((item) => (
					<a href={item.path} key={item.path}>
						{item.title}
					</a>
				))}
			</nav>

			{!isFrontmatterLoading && !isFrontmatterError && (
				<pre>{JSON.stringify(frontmatter, null, 2)}</pre>
			)}
		</div>
	);
};
