import yaml from 'js-yaml';

const FRONTMATTER_DELIMITER = '---';

// biome-ignore lint/suspicious/noExplicitAny: good enought for now
export const makeFrontmatter = (data: any): string => {
	if (!data) {
		return '';
	}

	return `${FRONTMATTER_DELIMITER}
${yaml.dump(data, { flowLevel: 1 })}${FRONTMATTER_DELIMITER}`;
};
