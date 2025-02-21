import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import { fuseOptions } from "../../services/Fuseoptions/fuseOption";
import type { MoviesListProps } from "../../types/moviesProps";

type SearchBarProps = {
	movies: MoviesListProps[];
	onSearch: (results: MoviesListProps[]) => void;
};

export default function SearchBar({ movies, onSearch }: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const fuse = useMemo(() => new Fuse(movies, fuseOptions), [movies]);

	useEffect(() => {
		if (!searchTerm.trim()) {
			onSearch(movies);
			return;
		}

		const results = fuse.search(searchTerm).map((result) => result.item);
		onSearch(results);
	}, [searchTerm, movies, fuse, onSearch]);

	const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return (
		<header className="navHeader searchBarContainer">
			<label htmlFor="searchBar">Recherche</label>
			<input
				type="search"
				id="searchBar"
				name="searchBar"
				className="search"
				placeholder="Que voulez vous regarder ?"
				value={searchTerm}
				onChange={handleSearchTerm}
			/>
		</header>
	);
}
