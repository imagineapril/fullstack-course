import { Pool, QueryResultRow } from 'pg';
export declare const pool: Pool;
export declare const dbQuery: <T extends QueryResultRow>(sqlRaw: string, params?: (string | number)[]) => Promise<{
    rows: T[];
    count: number;
}>;
//# sourceMappingURL=index.d.ts.map