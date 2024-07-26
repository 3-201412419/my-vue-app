export interface Post {
    id : number;
    title : string;
    content : string | {ops: Array<{insert : string}> };
    author : string;
    date : Date;
}

export enum SortOption {
    DATE_ASC = 'date_asc',
    DATE_DESC = 'date_desc',
    TITLE_ASC = 'title_asc',
    TITLE_DESC = 'title_desc',
}

export interface Pagination {
    currentPage : number;
    totalPages : number;
    postsPerPage : number;
}

export interface BoardFilter {
    searchTerm? : string;
    authorName? : string;
    dateRange? : {
        start : Date;
        end : Date;
    }

}

export interface ApiResponse<T> {
    data : T;
    message : string;
    status : 'succcess' | 'error' ;
}