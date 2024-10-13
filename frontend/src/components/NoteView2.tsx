import { Editor, rootCtx } from "@milkdown/kit/core";
import { commonmark } from "@milkdown/kit/preset/commonmark";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";
import type React from "react";

const MilkdownEditor: React.FC = () => {
	const { get } = useEditor((root) =>
		Editor.make()
			.config(nord)
			.config((ctx) => {
				ctx.set(rootCtx, root);
			})
			.use(commonmark),
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
