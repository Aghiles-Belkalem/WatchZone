import { useState } from "react";
import "../Css/searchBar.css";
type SearchBarProps = {
	onSearch: (searchTerm: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearch(value);
	};

	return (
		<header className="searchBarContainer">
			<label htmlFor="searchBar" className="labelSearch">
				Recherche
			</label>
			<input
				type="search"
				id="searchBar"
				name="searchBar"
				className="search"
				placeholder="Que voulez vous regarder ?"
				value={searchTerm}
				onChange={handleSearch}
			/>
		</header>
	);
}
