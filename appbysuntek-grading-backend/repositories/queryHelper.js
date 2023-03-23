"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryHelper {
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
exports.default = queryHelper;
//# sourceMappingURL=queryHelper.js.map