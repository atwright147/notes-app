import { Link } from "@adobe/react-spectrum";

import { useFrontmatterQuery } from "@/hooks/useFrontmatterQuery";
import { useNotesStore } from "@/stores/notes.store";
import styles from "./FileNav.module.scss";

export const FileNav = () => {
	const {
		data: frontmatter,
		isLoading: isFrontmatterLoading,
		isError: isFrontmatterError,
		refetch: refetchFrontmatter,
		isFetching: isFrontmatterFetching,
	} = useFrontmatterQuery();

	const { setSelected } = useNotesStore();

	const handleClick = (filePath: string): void => {
		setSelected(filePath);
	};

	if (isFrontmatterLoading || isFrontmatterError) {
		return <div>Loading...</div>;
	}

	return (
		<nav aria-label="files" className={styles.linkList}>
			{frontmatter?.map((file) => (
				<Link
					UNSAFE_className={styles.link}
					href=""
					onPress={() => handleClick(file.path)}
					key={file.path}
				>
					{file.title}
				</Link>
			))}
		</nav>
	);
};
