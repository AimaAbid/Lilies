import React from "react";
import Router from "./Routes/Router";
import { RouterProvider } from "react-router-dom";

export default function App() {
	return (
		<div>
			<RouterProvider router={Router} />
		</div>
	);
}
