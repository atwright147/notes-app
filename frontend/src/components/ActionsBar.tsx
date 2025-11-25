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
import DocumentIcon from "@spectrum-icons/workflow/Document";
import FolderIcon from "@spectrum-icons/workflow/Folder";
import SettingsIcon from "@spectrum-icons/workflow/Settings";
import { type FC, JSX, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { OpenDirectoryDialog, SaveFullConfig } from "../../wailsjs/go/main/App";
import { useConfigStoreQuery } from "../hooks/useConfigStoreQuery";
import styles from "./ActionsBar.module.scss";

interface FormValues {
	notesDir: string;
}

export const ActionsBar: FC = (): JSX.Element => {
	const [showSettingsDialog, setShowSettingsDialog] = useState(false);
	const [notesDir, setNotesDir] = useState("");
	const {
		data: config,
		isLoading: isConfigLoading,
		isError: isConfigError,
	} = useConfigStoreQuery();

	const saveSettingsMutation = useMutation({
		mutationFn: (values: FormValues): Promise<void> => {
			return SaveFullConfig(values);
		},
		onSuccess: () => {
			setShowSettingsDialog(false);
		},
		onError: () => console.info,
	});

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
			<Flex justifyContent="space-between" direction="column" height="100%">
				<button type="button" className={styles.button}>
					<DocumentIcon />
				</button>
				<button
					type="button"
					className={styles.button}
					onClick={handleOpenSettingsDialog}
				>
					<SettingsIcon />
				</button>
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
									<FolderIcon />
								</Button>
							</Flex>
						</Content>
					</Dialog>
				)}
			</DialogContainer>
		</>
	);
};
