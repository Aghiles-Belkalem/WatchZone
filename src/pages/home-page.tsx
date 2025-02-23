import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/moviesTypes";
import { fetchMovies } from "../services/home/homePage";
import SearchBar from "../components/searchBar/searchBar";
import Fuse from "fuse.js";
import { fuseOptions } from "../services/Fuseoptions/fuseOption";
import "../components/Css/homePage.css";

const HomePage = () => {
	const navigate = useNavigate();

	const [movies, setMovies] = useState<Movie[]>([]);
	const [allMovies, setAllMovies] = useState<Movie[]>([]);
	const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const API_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

	const loadMovies = useCallback(
		async (page: number) => {
			if (loading) return;
			setLoading(true);
			setError(null);
			try {
				const newMovies = await fetchMovies(page);
				setMovies(newMovies);
				setDisplayedMovies(newMovies);
				setAllMovies((prev) => {
					const existingIds = new Set(prev.map((m) => m.id));
					const uniqueNewMovies = newMovies.filter(
						(m) => !existingIds.has(m.id),
					);
					return [...prev, ...uniqueNewMovies];
				});
			} catch (err) {
				setError("Impossible de charger les films.");
			} finally {
				setLoading(false);
			}
		},
		[loading],
	);

	const loadAllMovies = useCallback(async () => {
		setLoading(true);
		try {
			const pagesToLoad = 5;
			const promises = Array.from({ length: pagesToLoad }, (_, i) =>
				fetchMovies(i + 1),
			);
			const allResults = await Promise.all(promises);
			const allMoviesFlat = allResults.flat();
			const uniqueMovies = Array.from(
				new Map(allMoviesFlat.map((movie) => [movie.id, movie])).values(),
			);
			setAllMovies(uniqueMovies);
			setDisplayedMovies(uniqueMovies);
		} catch (err) {
			setError("Impossible de charger tous les films.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadAllMovies();
	}, [loadAllMovies]);

	const handleSearch = useCallback(
		(searchTerm: string) => {
			setIsSearching(!!searchTerm);
			if (!searchTerm.trim()) {
				loadMovies(currentPage);
				return;
			}

			const fuse = new Fuse(allMovies, fuseOptions);
			const results = fuse.search(searchTerm).map((result) => result.item);
			setDisplayedMovies(results);
		},
		[allMovies, currentPage, loadMovies],
	);

	const handleNextPage = useCallback(() => {
		if (!isSearching) {
			setCurrentPage((prev) => prev + 1);
			window.scrollTo(0, 0);
		}
	}, [isSearching]);

	const handlePreviousPage = useCallback(() => {
		if (!isSearching) {
			setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
			window.scrollTo(0, 0);
		}
	}, [isSearching]);

	const handleMovieClick = (id: number) => {
		navigate(`/movie-details/${id}`);
	};

	return (
		<section>
			<h1 className="popularMovies">Films Populaires</h1>
			<SearchBar onSearch={handleSearch} />

			{loading && <p>Chargement...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}

			<section className="movies-list">
				{displayedMovies.length > 0 ? (
					displayedMovies
						.slice((currentPage - 1) * 10, currentPage * 10)
						.map((movie) => (
							<article
								key={movie.id}
								onClick={() => handleMovieClick(movie.id)}
								onKeyUp={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleMovieClick(movie.id);
									}
								}}
								tabIndex={0}
							>
								<figure>
									<img
										src={`${API_IMAGE_URL}${movie.poster_path}`}
										alt={movie.title}
									/>
									<figcaption>
										<h3>{movie.title}</h3>
										<p>Note: {movie.vote_average}</p>
									</figcaption>
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
					disabled={currentPage === 1 || loading || isSearching}
				>
					Page Précédente
				</button>
				<span>Page {currentPage}</span>
				<button
					type="button"
					onClick={handleNextPage}
					disabled={loading || isSearching}
				>
					Page Suivante
				</button>
			</div>
		</section>
	);
};

export default HomePage;
