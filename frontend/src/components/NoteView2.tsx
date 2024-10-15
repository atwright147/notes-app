import { menu, menuConfigCtx } from "@milkdown-lab/plugin-menu";
import { Editor, defaultValueCtx, rootCtx } from "@milkdown/kit/core";
import { commonmark } from "@milkdown/kit/preset/commonmark";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";
import type React from "react";
import "@milkdown-lab/plugin-menu/style.css";

import { menuItems } from "./menu-items";

interface Props {
	content: string;
}

const MilkdownEditor: React.FC<Props> = ({ content }): JSX.Element => {
	const { get } = useEditor((root) =>
		Editor.make()
			.config(nord)
			.config((ctx) => {
				ctx.set(rootCtx, root);
				ctx.set(defaultValueCtx, content ?? "");
			})
			.use(commonmark)
			.config((ctx) => {
				ctx.set(menuConfigCtx.key, {
					attributes: { class: "milkdown-menu", "data-menu": "true" },
					items: menuItems,
				});
			})
			.use(menu),
	);

	return <Milkdown />;
};

export const MilkdownEditorWrapper: React.FC<Props> = ({
	content,
}): JSX.Element => {
	return (
		<MilkdownProvider>
			<MilkdownEditor content={content} />
		</MilkdownProvider>
	);
};
