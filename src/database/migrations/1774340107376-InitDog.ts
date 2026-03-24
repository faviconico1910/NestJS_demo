import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDog1774340107376 implements MigrationInterface {
    name = 'InitDog1774340107376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dogs" ("dog_id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "breed" character varying NOT NULL, "price" numeric NOT NULL, "status" character varying NOT NULL DEFAULT 'available', CONSTRAINT "PK_e3325f74e6d26ecdbb1af493e8a" PRIMARY KEY ("dog_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dogs"`);
    }

}
