import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRefreshToken1774542742491 implements MigrationInterface {
    name = 'CreateRefreshToken1774542742491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
    }

}
