import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1662891070401 implements MigrationInterface {
    name = '$npmConfigName1662891070401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying(40) NOT NULL, "sortOrder" integer NOT NULL DEFAULT '0', "creator" uuid, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "nickname" character varying(30) NOT NULL, CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid")); COMMENT ON COLUMN "user"."email" IS 'Email'; COMMENT ON COLUMN "user"."password" IS 'Пароль'; COMMENT ON COLUMN "user"."nickname" IS 'Никнейм'`);
        await queryRunner.query(`CREATE TABLE "user_tags_tag" ("userUid" uuid NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_c41bca5e2414d8ce45228d59418" PRIMARY KEY ("userUid", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26803958fcfaa45f86ffd3dbde" ON "user_tags_tag" ("userUid") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff76db199db490dda3ed74231e" ON "user_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_3fb92e3be865664f45498ea1a39" FOREIGN KEY ("creator") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tags_tag" ADD CONSTRAINT "FK_26803958fcfaa45f86ffd3dbded" FOREIGN KEY ("userUid") REFERENCES "user"("uid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_tags_tag" ADD CONSTRAINT "FK_ff76db199db490dda3ed74231e8" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tags_tag" DROP CONSTRAINT "FK_ff76db199db490dda3ed74231e8"`);
        await queryRunner.query(`ALTER TABLE "user_tags_tag" DROP CONSTRAINT "FK_26803958fcfaa45f86ffd3dbded"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_3fb92e3be865664f45498ea1a39"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff76db199db490dda3ed74231e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26803958fcfaa45f86ffd3dbde"`);
        await queryRunner.query(`DROP TABLE "user_tags_tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
