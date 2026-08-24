-- Charts used to survive their owner: the foreign key was ON DELETE SET NULL,
-- from when a guest could save one before signing up. Saving needs an account
-- now, so an ownerless row is birth date, time and coordinates that nobody can
-- open, export or erase. Clear the ones already there, then make it impossible.
DELETE FROM "charts" WHERE "user_id" IS NULL;
--> statement-breakpoint
ALTER TABLE "charts" DROP CONSTRAINT "charts_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "charts" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "charts" ADD CONSTRAINT "charts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
