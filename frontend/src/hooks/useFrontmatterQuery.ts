import { useQuery } from "@tanstack/react-query";

import type { Frontmatter } from "@/../types/frontmatter";
import { WalkFrontmatter } from "@/../wailsjs/go/main/App";

const QUERY_KEY = ["frontmatter", "all"];

const getFrontmatter = async (): Promise<Frontmatter[]> => {
	try {
		return WalkFrontmatter();
	} catch (err) {
		console.info(err);
		return Promise.reject(err);
	}
};

export const useFrontmatterQuery = () => {
	return useQuery<Frontmatter[], Error>({
		queryKey: QUERY_KEY,
		queryFn: getFrontmatter,
		staleTime: 0,
		gcTime: 0,
	});
};
