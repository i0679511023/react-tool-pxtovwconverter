import React from "react";
// import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";

// const darkTheme = createTheme(themeOptions);

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
	<HashRouter>
		<App />
	</HashRouter>
);
