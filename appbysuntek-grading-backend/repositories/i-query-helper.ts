export interface IQueryHelper {
    getOffset(currentPage: number, listPerPage: number): number;
    emptyOrRows<T>(rows: Array<T>): [] | Array<T>
}