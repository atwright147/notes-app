import { useQuery } from "@tanstack/react-query";

import { GetConfig } from "@/../wailsjs/go/main/App";
import type { main } from "../../wailsjs/go/models";

const getConfig = async (): Promise<main.Config> => {
	try {
		return GetConfig();
	} catch (err) {
		console.info(err);
		return Promise.reject(err);
	}
};

export const useConfigStoreQuery = () => {
	return useQuery<main.Config, Error>({
		queryKey: ["config", "all"],
		queryFn: () => getConfig(),
		staleTime: 0,
		gcTime: 0,
	});
};
