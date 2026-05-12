-- DropForeignKey
ALTER TABLE "short_url" DROP CONSTRAINT "short_url_user_id_fkey";

-- AddForeignKey
ALTER TABLE "short_url" ADD CONSTRAINT "short_url_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
