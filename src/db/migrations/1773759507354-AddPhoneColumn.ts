import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneColumn1773759507354 implements MigrationInterface {
    name = 'AddPhoneColumn1773759507354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(15)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
