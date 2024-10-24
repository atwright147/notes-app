// import "./styles.scss";

import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

export default () => {
	const editor = useEditor({
		extensions: [StarterKit, Markdown, Highlight, Typography],
		content: `
# Hello, World!

## This is an H2

> This is a blockquote

- This is an unordered list
- This is an unordered list
- This is an unordered list

1. This is an ordered list
1. This is an ordered list
1. This is an ordered list

[Link to google](https://google.com)`,
	});

	return <EditorContent editor={editor} />;
};
