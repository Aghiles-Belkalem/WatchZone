import { useCallback, useEffect, useState } from "react";
import type { MoviesListProps } from "../types/moviesProps";
import { fetchMovies } from "../services/home/homePage";
import SearchBar from "../components/searchBar/searchBar";

const HomePage = () => {
	const [movies, setMovies] = useState<MoviesListProps[]>([]);
	const [displayedMovies, setDisplayedMovies] = useState<MoviesListProps[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const API_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

	const loadMovies = useCallback(async (page: number) => {
		setLoading(true);
		setError(null);
		try {
			const newMovies = await fetchMovies(page);
			setMovies(newMovies);
			setDisplayedMovies(newMovies);
		} catch (err) {
			setError("Impossible de charger les films.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadMovies(currentPage);
	}, [currentPage, loadMovies]);

	const handleSearch = useCallback((results: MoviesListProps[]) => {
		setDisplayedMovies(results);
	}, []);

	const handleNextPage = () => {
		setCurrentPage((prev) => prev + 1);
	};

	const handlePreviousPage = () => {
		setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
	};

	return (
		<section>
			<h1>Films Populaires</h1>
			<SearchBar movies={movies} onSearch={handleSearch} />

			{loading && <p>Chargement...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}

			<section className="movies-list">
				{displayedMovies.length > 0 ? (
					displayedMovies.map((movie) => (
						<article key={movie.id}>
							<figure>
								<img
									src={`${API_IMAGE_URL}${movie.poster_path}`}
									alt={movie.title}
								/>
							</figure>
						</article>
					))
				) : (
					<p>Aucun film trouvé.</p>
				)}
			</section>

			<div className="pagination">
				<button
					type="button"
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
				>
					Page Précédente
				</button>
				<span>Page {currentPage}</span>
				<button type="button" onClick={handleNextPage}>
					Page Suivante
				</button>
			</div>
		</section>
	);
};

export default HomePage;
