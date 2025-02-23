import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import HomePage from "./pages/home-page";
import MovieDetails from "./pages/movieDetails";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />, // App est le parent ici
		children: [
			{
				path: "/", // Pour la page d'accueil
				element: <HomePage />,
			},
			{
				path: "/movie-details/:id", // Page de détails d'un film
				element: <MovieDetails />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
	throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
