interface IGenres {
    id: number,
    name: string;
}

export interface IContent {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    genres: IGenres[];
    name: string;
    first_air_date: string;
    release_date: string;
}

export interface IStar {
    content: IContent;
    color: string;
    checkMedia: "MOVIE" | "TV"
}

export interface IGetContentsResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IContent[];
    total_pages: number;
    total_results: number;
}

export interface IApi {
    queryKeyName1: "MOVIE" | "TV",
    queryKeyName2: string,
    getApi: any,
    rowTitle: string,
}

export interface IIndexControl {
    queryKeyName2: string;
    data:IGetContentsResult | undefined;
}

export interface IBigModal {
    media:"movie"|"tv"|"favorite"
}

export interface IForm {
    keyword: string;
}
