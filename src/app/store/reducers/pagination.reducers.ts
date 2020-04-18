import { PaginationActions, EPaginationActions } from '../actions/pagination.actions';
import { initialPaginationState, IPaginationState } from '../state/pagination.state';

const countMaxPage = (records: number, show: number) => {
   return Math.ceil(records / show);
};

const countNewPage = (newPage: number, pages: number) => {
    newPage = Number(newPage);
    if (newPage < 1) {
      newPage = 1;
    } else if (newPage > pages) {
      newPage = pages;
    }
    return newPage;
};

export const paginationReducers = (
        state = initialPaginationState,
        action: PaginationActions,
    ): IPaginationState => {
        switch (action.type) {
            case EPaginationActions.SetPaginationSuccess: {
                return {
                    ...state,
                    ...action.payload,
                };
            }
            case EPaginationActions.SetRecords: {
                const newRecords = Number(action.payload);
                const newMaxPages = countMaxPage(newRecords, state.show);
                const newCurrentPage = countNewPage(state.currentPage, newMaxPages);
                return {
                    ...state,
                    records: newRecords,
                    pages: newMaxPages,
                    currentPage: newCurrentPage,
                };
            }
            case EPaginationActions.ChangeShow: {
                const newShow = Number(action.payload);
                console.log(newShow);
                console.log(state);

                const newMaxPage = countMaxPage(state.records, newShow);
                const newCurrentPage = countNewPage(state.currentPage, newMaxPage);
                const newState = {
                    ...state,
                    show: newShow,
                    pages: newMaxPage,
                    currentPage: newCurrentPage,
                };
                return newState;
            }
            case EPaginationActions.ChangeCurrentPage: {
                const newCurrentPage = countNewPage(Number(action.payload), state.pages);
                return {
                    ...state,
                    currentPage: newCurrentPage,
                };
            }
            case EPaginationActions.ToFirstPage: {
                return {
                    ...state,
                    currentPage: 1,
                };
            }
            case EPaginationActions.ToLastPage: {
                return {
                    ...state,
                    currentPage: state.pages,
                };
            }
            case EPaginationActions.ToNextPage: {
                const newPage = countNewPage(state.currentPage + 1, state.pages);
                return {
                    ...state,
                    currentPage: newPage,
                };
            }
            case EPaginationActions.ToPreviousPage: {
                const newPage = countNewPage(state.currentPage - 1, state.pages);
                return {
                    ...state,
                    currentPage: newPage,
                };
            }
            default:
                return state;
        }
};
