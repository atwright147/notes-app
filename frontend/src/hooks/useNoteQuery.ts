import { useQuery } from "@tanstack/react-query";

import { GetNote } from "@/../wailsjs/go/main/App";

const getNote = async (path: string): Promise<string> => {
	try {
		return GetNote(path);
	} catch (err) {
		console.info(err);
		return Promise.reject(err);
	}
};

export const useNoteQuery = (path: string) => {
	return useQuery<string, Error>({
		queryKey: ["file", path],
		queryFn: () => getNote(path),
		staleTime: 0,
		gcTime: 0,
	});
};
