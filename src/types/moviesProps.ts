// Définir le type pour les détails du film
export type MoviesListProps = {
	id: number;
	title: string;
	name?: string;
	poster_path: string;
	overview: string;
	vote_average: string;
	vote_count: number;
	release_date: string;
	runtime: number; // Durée du film en minutes
	genres: { id: number; name: string }[]; // Liste des genres
	cast: { name: string; character: string }[]; // Liste des acteurs principaux
	trailer_url: string | null; // URL de la bande-annonce YouTube
};
