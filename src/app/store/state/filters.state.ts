import { IFilter, ISuodin } from '../../models/filters.interface';

export interface IFilterState {
    suodin: ISuodin;
    filters: IFilter[];
}

export const initialFilterState: IFilterState = {
    suodin: {column: '', string: ''},
    filters: [],
};
