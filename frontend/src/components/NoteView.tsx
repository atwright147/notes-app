import {
	Button,
	ButtonGroup,
	Content,
	Dialog,
	DialogContainer,
	Divider,
	Flex,
	Heading,
	TextField,
} from "@adobe/react-spectrum";
import IconFolder from "@spectrum-icons/workflow/Folder";
import { useMutation } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";

import {
	OpenDirectoryDialog,
	SaveFullConfig,
	SaveNote,
} from "@/../wailsjs/go/main/App";
import { useFrontmatter } from "@/hooks/useFrontmatter";
import { useNoteQuery } from "@/hooks/useNoteQuery";
import { useNotesStore } from "@/stores/notes.store";
import { makeFrontmatter } from "@/utils/makeFrontmatter";
import { useConfigStoreQuery } from "../hooks/useConfigStoreQuery";

interface FormValues {
	notesDir: string;
}

export const NoteView = () => {
	const { selected } = useNotesStore();
	const [showSettingsDialog, setShowSettingsDialog] = useState(false);
	const [notesDir, setNotesDir] = useState("");
	const {
		data: note,
		isLoading: isNoteLoading,
		isError: isNoteError,
	} = useNoteQuery(selected ?? "");
	const {
		data: config,
		isLoading: isConfigLoading,
		isError: isConfigError,
	} = useConfigStoreQuery();

	const saveNoteMutation = useMutation({
		mutationFn: (): Promise<void> => {
			if (!selected || !markdown) return Promise.resolve();

			const frontmatter = makeFrontmatter(attributes);
			const content = `${frontmatter}\n\n${markdown}`;

			return SaveNote(selected, content);
		},
		onSuccess: () => console.info,
		onError: () => console.info,
	});

	const saveSettingsMutation = useMutation({
		mutationFn: (values: FormValues): Promise<void> => {
			return SaveFullConfig(values);
		},
		onSuccess: () => {
			setShowSettingsDialog(false);
		},
		onError: () => console.info,
	});

	const { attributes, body, bodyBegin, frontmatter } = useFrontmatter(note);

	const [markdown, setMarkdown] = useState<string | undefined>(body);

	useEffect(() => {
		setMarkdown(body);
	}, [body]);

	const handleSaveNote = async () => {
		await saveNoteMutation.mutate();
	};

	const handleSaveSettings = async (data: FormValues): Promise<void> => {
		await saveSettingsMutation.mutate(data);
	};

	const handleOpenSettingsDialog = (): void => {
		if (config?.notesDir) {
			setNotesDir(config.notesDir);
		}

		setShowSettingsDialog(true);
	};

	const handleCloseSettingsDialog = (): void => {
		setShowSettingsDialog(false);
	};

	const handleLocationDialog = async (): Promise<void> => {
		const result = await OpenDirectoryDialog();
		setNotesDir(result);
	};

	return (
		<>
			<Flex direction="column" height="100%">
				<Flex>
					<button onClick={handleSaveNote} type="button">
						Save
					</button>
					<button onClick={handleOpenSettingsDialog} type="button">
						Settings
					</button>
				</Flex>
				<MDEditor value={markdown} onChange={setMarkdown} height="100%" />
			</Flex>

			<DialogContainer type="modal" onDismiss={handleCloseSettingsDialog}>
				{showSettingsDialog && (
					<Dialog>
						<Heading>Settings</Heading>
						<Divider />
						<ButtonGroup>
							<Button variant="secondary" onPress={handleCloseSettingsDialog}>
								Cancel
							</Button>
							<Button
								autoFocus
								variant="accent"
								onPress={() => handleSaveSettings({ notesDir })}
							>
								Save
							</Button>
						</ButtonGroup>

						<Content>
							<Flex gap="size-100" direction="row" alignItems="end">
								<TextField
									label="Notes Folder"
									name="notesDir"
									value={notesDir}
									onChange={setNotesDir}
									isRequired
									width="100%"
								/>
								<Button
									type="button"
									variant="secondary"
									onPress={handleLocationDialog}
									aria-label="Select a folder"
								>
									<IconFolder />
								</Button>
							</Flex>
						</Content>
					</Dialog>
				)}
			</DialogContainer>
		</>
	);
};
