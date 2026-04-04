import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePet1775188779406 implements MigrationInterface {
    name = 'CreatePet1775188779406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pets" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer NOT NULL, "name" character varying(50) NOT NULL, "age" integer NOT NULL, "breed" character varying(50) NOT NULL, "price" numeric(10,2) NOT NULL, "status" "public"."pets_status_enum" NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pets" ADD CONSTRAINT "FK_acae2054b27b27b9f0797fbd62d" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pets" DROP CONSTRAINT "FK_acae2054b27b27b9f0797fbd62d"`);
        await queryRunner.query(`DROP TABLE "pets"`);
    }

}
