export interface Keyword {
    id: number;
    name: string;
}

export interface MovieLabels {
    id: number;
    keywords: Keyword[];
}