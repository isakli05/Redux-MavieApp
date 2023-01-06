export interface Part {
    adult: boolean;
    backdrop_path?: any;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieCollect {
    id: number;
    name: string;
    overview: string;
    poster_path?: any;
    backdrop_path: string;
    parts: Part[];
}

