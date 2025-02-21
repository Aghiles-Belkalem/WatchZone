import type { Movie, MovieResponse } from "../../types/moviesTypes";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
if (!API_KEY) {
	throw new Error("La clé API TMDB est manquante dans le fichier .env");
}

const API_URL = "https://api.themoviedb.org/3/movie/popular";

export const fetchMovies = async (page: number): Promise<Movie[]> => {
	try {
		const response = await fetch(
			`${API_URL}?api_key=${API_KEY}&language=fr-FR&page=${page}`,
		);
		if (!response.ok) {
			throw new Error(`Erreur API: ${response.status}`);
		}
		const data: MovieResponse = await response.json();
		return data.results;
	} catch (error) {
		console.error("Erreur lors de la récupération des films", error);
		return [];
	}
};
