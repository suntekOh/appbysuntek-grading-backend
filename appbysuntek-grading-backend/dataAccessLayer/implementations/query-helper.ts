import { injectable } from "tsyringe";
import { IQueryHelper } from "../i-query-helper";

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

