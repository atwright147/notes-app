import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { createRoot } from "react-dom/client";

import "@material-design-icons/font";
import "./milkdown.scss";
import "./style.css";
import { App } from "./App";

const container = document.getElementById("root");

const root = createRoot(container as HTMLElement);

const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
		</QueryClientProvider>
	</React.StrictMode>,
);
