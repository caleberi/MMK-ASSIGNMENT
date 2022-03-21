import { MigrationInterface, QueryRunner } from "typeorm"
import fs from "fs";
import path from "path";
 const readSqlFile = (filepath: string): string[]|string => {
  return fs
    .readFileSync(path.join(__dirname, filepath))
    .toString()
    .replace(/\r?\n|\r/g, '')
    .replace(/\t/g, ' ')
    .split(';')
    .filter((query) => query?.length);
};
export class MMKdatabase16778244518798 implements MigrationInterface {

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("");
    }

     async up(queryRunner: QueryRunner): Promise<void> {
      const queries = readSqlFile('../../schema.sql');
      for (let i = 0; i < queries.length; i++) {
        console.log("[Running query]: ",queries[i]);
        await queryRunner.query(queries[i]+";");
      }
    }
}
