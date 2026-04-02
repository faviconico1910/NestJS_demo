import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategory1775122917969 implements MigrationInterface {
    name = 'CreateCategory1775122917969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_name" character varying(20) NOT NULL, CONSTRAINT "UQ_872bff57db2b6fe48c0913d8daa" UNIQUE ("category_name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
