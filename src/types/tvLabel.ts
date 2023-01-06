export interface Result {
    id: number;
    name: string;
}

export interface TvLabels {
    id: number;
    results: Result[];
}
