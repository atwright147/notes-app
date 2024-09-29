import { useQuery } from '@tanstack/react-query';

import { GetConfig } from '@/../wailsjs/go/main/App';

const getConfig = async (): Promise<unknown> => {
	try {
		return GetConfig();
	} catch (err) {
		console.info(err);
		return Promise.reject(err);
	}
};

export const useConfigStoreQuery = () => {
	return useQuery<unknown, Error>({
		queryKey: ['config', 'all'],
		queryFn: () => getConfig(),
		staleTime: 0,
		gcTime: 0,
	});
};
