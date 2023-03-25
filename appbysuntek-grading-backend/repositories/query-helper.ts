interface IQueryHelper {
    getOffset(currentPage: number, listPerPage: number): number;
    emptyOrRows<T>(rows: Array<T>): [] | Array<T>
}

class QueryHelper implements IQueryHelper {
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

const queryHelper = new QueryHelper();
export default queryHelper;
