export interface Result {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path?: any;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}

export interface Network {
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
}

export interface TvNetwork {
    page: number;
    results: Result[];
    networks: Network[];
    total_results: number;
    total_pages: number;
}
