import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1668475787979 implements MigrationInterface {
    name = 'initialMigration1668475787979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("transaction_id" uuid NOT NULL, "value" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "transactionsDebit" uuid, "transactionsCredit" uuid, CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" uuid NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "account_id" uuid, CONSTRAINT "REL_6acfec7285fdf9f463462de3e9" UNIQUE ("account_id"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("account_id" uuid NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_ea08b54a9d7322975ffc57fc612" PRIMARY KEY ("account_id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_22734ce3bb343ced29ec885ead8" FOREIGN KEY ("transactionsDebit") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_c0b389ab34484f36c977ad42aad" FOREIGN KEY ("transactionsCredit") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_c0b389ab34484f36c977ad42aad"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_22734ce3bb343ced29ec885ead8"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
