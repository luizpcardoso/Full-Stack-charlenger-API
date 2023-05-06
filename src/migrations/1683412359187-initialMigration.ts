import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1683412359187 implements MigrationInterface {
    name = 'initialMigration1683412359187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" uuid NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "account" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_4ab2df0a57a74fdf904e0e2708" UNIQUE ("account"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("transaction_id" uuid NOT NULL, "value" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "debitedAccountAccountId" uuid, "creditedAccountAccountId" uuid, "user_id" uuid, CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("account_id" uuid NOT NULL, "balance" double precision NOT NULL, "user_id" uuid, CONSTRAINT "REL_efef1e5fdbe318a379c06678c5" UNIQUE ("user_id"), CONSTRAINT "PK_ea08b54a9d7322975ffc57fc612" PRIMARY KEY ("account_id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_4ab2df0a57a74fdf904e0e27086" FOREIGN KEY ("account") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_bbbfcdb3330cc4e5846f2d23200" FOREIGN KEY ("debitedAccountAccountId") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_4ece0117a7c2689832bab37209b" FOREIGN KEY ("creditedAccountAccountId") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_efef1e5fdbe318a379c06678c51" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_efef1e5fdbe318a379c06678c51"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_b4a3d92d5dde30f3ab5c34c5862"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_4ece0117a7c2689832bab37209b"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_bbbfcdb3330cc4e5846f2d23200"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4ab2df0a57a74fdf904e0e27086"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
