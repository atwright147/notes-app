import { useQuery } from "@tanstack/react-query";

import { WalkFrontmatter } from "@/../wailsjs/go/main/App";

type FrontmatterType = ReturnType<typeof WalkFrontmatter>;

const QUERY_KEY = ["frontmatter", "all"];

const getFrontmatter = async (): Promise<FrontmatterType> => {
	try {
		return WalkFrontmatter();
	} catch (err) {
		console.info(err);
		return Promise.reject(err);
	}
};

export const useFrontmatterQuery = () => {
	return useQuery<FrontmatterType, Error>({
		queryKey: QUERY_KEY,
		queryFn: getFrontmatter,
		staleTime: 0,
		gcTime: 0,
	});
};
