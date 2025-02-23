import "../components/Css/movieDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MoviesListProps } from "../types/moviesProps";

const MovieDetails = () => {
	const { id } = useParams();
	const [movieDetails, setMovieDetails] = useState<MoviesListProps | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [cast, setCast] = useState<{ name: string; character: string }[]>([]);
	const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
	useEffect(() => {
		const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

		const fetchMovieDetails = async () => {
			setLoading(true);
			setError(null);

			try {
				const movieResponse = await fetch(
					`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr`,
				);
				const movieData = await movieResponse.json();

				const creditsResponse = await fetch(
					`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=fr`,
				);
				const creditsData = await creditsResponse.json();

				const videosResponse = await fetch(
					`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=fr`,
				);
				const videosData = await videosResponse.json();

				const movie: MoviesListProps = {
					id: movieData.id,
					title: movieData.title,
					name: movieData.name,
					poster_path: movieData.poster_path,
					overview: movieData.overview,
					vote_average: movieData.vote_average,
					vote_count: movieData.vote_count,
					release_date: movieData.release_date,
					runtime: movieData.runtime,
					genres: movieData.genres || [],
					cast: creditsData.cast || [],
					trailer_url: videosData.results?.[0]?.key
						? `https://www.youtube.com/watch?v=${videosData.results[0].key}`
						: null,
				};

				setMovieDetails(movie);
				setCast(creditsData.cast);
				setTrailerUrl(movie.trailer_url);
			} catch (err) {
				setError("Impossible de charger les détails du film.");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchMovieDetails();
		}
	}, [id]);

	if (loading) {
		return <p>Chargement...</p>;
	}

	if (error) {
		return <p style={{ color: "red" }}>{error}</p>;
	}

	if (!movieDetails) {
		return <p>Film non trouvé.</p>;
	}

	return (
		<section className="moviesDetailsBlock">
			<h2 className="movieTitle">{movieDetails.title}</h2>
			<article className="moviePoster">
				<img
					src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
					alt={movieDetails.title}
				/>
			</article>
			<article className="movieDetails">
				<p>
					<strong>Synopsis:</strong> {movieDetails.overview}
				</p>
				<p>
					<strong>Note:</strong> {movieDetails.vote_average}
				</p>
				<p>
					<strong>Durée:</strong> {movieDetails.runtime} minutes
				</p>
				<p>
					<strong>Date de sortie:</strong> {movieDetails.release_date}
				</p>

				<p>
					<strong>Genres:</strong>{" "}
					{movieDetails.genres?.map((genre) => genre.name).join(", ") ||
						"Aucun genre disponible"}
				</p>
			</article>

			<article className="movieActors">
				<h3>Acteurs principaux :</h3>
				{cast.length > 0 ? (
					<select>
						{cast.map((actor) => (
							<option key={id} value={actor.name}>
								{actor.name} - {actor.character}
							</option>
						))}
					</select>
				) : (
					<p>Aucun acteur principal disponible.</p>
				)}
			</article>

			<article className="movieTrailer">
				{trailerUrl ? (
					<div>
						<h3>Bande-annonce:</h3>
						<iframe src={trailerUrl} title="Bande-annonce" allowFullScreen />
					</div>
				) : (
					<p>Aucune bande-annonce disponible.</p>
				)}
			</article>
		</section>
	);
};

export default MovieDetails;
