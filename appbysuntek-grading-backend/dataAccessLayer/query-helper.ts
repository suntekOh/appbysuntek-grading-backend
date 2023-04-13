import { injectable } from "tsyringe";

export interface IQueryHelper {
    getOffset(currentPage: number, listPerPage: number): number;
    emptyOrRows<T>(rows: Array<T>): [] | Array<T>
}

@injectable()
export class QueryHelper implements IQueryHelper {
    getOffset(currentPage = 1, listPerPage) {
        return (currentPage - 1) * listPerPage;
    }

    emptyOrRows(rows) {
        if (!rows) {
            return [];
        }
        return rows;
    }
}

