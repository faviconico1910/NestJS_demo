import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCat1773806377121 implements MigrationInterface {
    name = 'AddCat1773806377121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cats" ("cat_id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "age" integer NOT NULL, "breed" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2aabed624bea32dfc976918ee3a" PRIMARY KEY ("cat_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(15)`);
        // Set random 8-digit phone numbers for all existing users
        await queryRunner.query(`UPDATE "users" SET "phone" = LPAD(FLOOR(RANDOM() * 100000000)::text, 8, '0')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`DROP TABLE "cats"`);
    }

}
