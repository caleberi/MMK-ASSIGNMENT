import { readSqlFile } from "@shared/utils";
import { MigrationInterface, QueryRunner } from "typeorm"

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
