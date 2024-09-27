import fm, { type FrontMatterResult } from "front-matter";
import { useMemo } from "react";
import type { Frontmatter } from "../../types/frontmatter";

export const useFrontmatter = (
	content?: string,
): FrontMatterResult<Frontmatter> => {
	return useMemo(() => {
		if (!content) {
			return {
				attributes: {
					title: "",
					isFavourite: false,
					tags: [],
					path: "",
					filename: "",
					createdAt: "",
					updatedAt: "",
				},
				body: "",
				bodyBegin: -1,
				frontmatter: "",
			};
		}

		return fm(content);
	}, [content]);
};
