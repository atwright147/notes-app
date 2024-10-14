import {
	type MenuConfigItem,
	// defaultConfigItems,
	menu,
	menuConfigCtx,
} from "@milkdown-lab/plugin-menu";
import { Editor, rootCtx } from "@milkdown/kit/core";
import { commonmark } from "@milkdown/kit/preset/commonmark";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";
import type React from "react";
import "@milkdown-lab/plugin-menu/style.css";
import { menuItems } from "./menu-items";

const MilkdownEditor: React.FC = () => {
	const { get } = useEditor((root) =>
		Editor.make()
			.config(nord)
			.config((ctx) => {
				ctx.set(rootCtx, root);
			})
			.use(commonmark)
			.config((ctx) => {
				ctx.set(menuConfigCtx.key, {
					attributes: { class: "milkdown-menu", "data-menu": "true" },
					items: menuItems,
				});
				// ctx.set(rootCtx, document.querySelector("#app"));
			})
			.use(menu),
	);

	return <Milkdown />;
};

export const MilkdownEditorWrapper: React.FC = () => {
	return (
		<MilkdownProvider>
			<MilkdownEditor />
		</MilkdownProvider>
	);
};
