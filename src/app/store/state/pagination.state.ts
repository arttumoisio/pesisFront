import { IPagination } from '../../models/pagination.interface';

export interface IPaginationState {
    currentPage: number;
    show: number;
    records: number;
    pages: number;
}

export const initialPaginationState: IPaginationState = {
    currentPage: 1,
    show: 20,
    records: 0,
    pages: 1,
};
