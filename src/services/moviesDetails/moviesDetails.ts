// services/movieDetails.ts

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Assure-toi d'avoir ta clé dans .env

export const fetchMovieDetails = async (movieId: number) => {
	try {
		const response = await fetch(
			`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`,
		);

		if (!response.ok) {
			throw new Error("Erreur lors de la récupération des détails du film");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Erreur:", error);
		throw error;
	}
};
