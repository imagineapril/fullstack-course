"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = exports.pool = void 0;
const pg_1 = require("pg");
const errors_1 = require("../errors");
exports.pool = new pg_1.Pool({
    user: 'admin',
    host: 'localhost',
    database: 'food-server',
    password: '123456',
    port: 17000,
});
const dbQuery = async (sqlRaw, params = []) => {
    try {
        const dbResponse = await exports.pool.query(sqlRaw, params);
        // return { rows: dbResponse.rows, count: dbResponse.rowCount ?? 0 };
        return { rows: dbResponse.rows, count: dbResponse.rowCount ?? 0 };
    }
    catch (error) {
        console.error(error);
        throw new errors_1.DBError();
    }
};
exports.dbQuery = dbQuery;
// interface IUser {
//   id: number;
//   name: string;
// }
//# sourceMappingURL=index.js.map