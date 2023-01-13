export interface Result {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_name: string;
    original_language: string;
    title: string;
    name: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
    media_type: string;
}

export interface Movies {
    page: number;
    results: Result[];
    total_results: number;
    total_pages: number;
}

export interface PopularMovies {
    page: number;
    results: Result[];
    total_results: number;
    total_pages: number;
}