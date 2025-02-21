export type Movie = {
	id: number;
	title: string;
	name?: string;
	poster_path: string;
	overview: string;
	vote_average: string;
	vote_count: number;
	release_date: string;
};

export type MovieResponse = {
	results: Movie[];
};
