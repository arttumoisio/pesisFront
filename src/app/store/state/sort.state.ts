export interface ISortState {
    sarake: string;
    reversed: boolean;
}

export const initialSortState: ISortState = {
    sarake: 'Ottelut',
    reversed: false,
};
