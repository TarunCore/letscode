CREATE TABLE "contest_registrations" (
  "contest_id" BIGINT NOT NULL,
  "user_id" BIGINT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("contest_id") REFERENCES "contest" ("id"),
  FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);