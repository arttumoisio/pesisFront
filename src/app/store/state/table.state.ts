import { ITable } from '../../models/table.interface';

export interface ITableState {
    tableState: ITable;
    visibleData: object[];
    tableScroll: number;
}

export const initialTableState: ITableState = {
    tableState: {
        data: null,
        length: null,
        otsikot: null,
        errorMsg: null,
        loading: false,
    },
    tableScroll: 0,
    visibleData: [],
};
