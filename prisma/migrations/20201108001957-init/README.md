# Migration `20201108001957-init`

This migration has been generated by Andrew at 11/7/2020, 7:19:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"title" text   NOT NULL ,
"content" text   ,
"authorId" integer   ,
"voteTotal" integer   NOT NULL DEFAULT 1,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" SERIAL,
"username" text   NOT NULL ,
"password" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Vote" (
"id" SERIAL,
"value" integer   NOT NULL ,
"postId" integer   NOT NULL ,
"userId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Comment" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"authorId" integer   NOT NULL ,
"postId" integer   NOT NULL ,
"content" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.username_unique" ON "public"."User"("username")

CREATE UNIQUE INDEX "postId_userId" ON "public"."Vote"("postId", "userId")

ALTER TABLE "public"."Post" ADD FOREIGN KEY("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Vote" ADD FOREIGN KEY("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Vote" ADD FOREIGN KEY("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY("postId")REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201108001957-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,52 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id          Int        @default(autoincrement()) @id
+  createdAt   DateTime   @default(now())
+  title       String
+  content     String?
+  authorId    Int?
+  author      User?       @relation(fields: [authorId], references: [id])
+  votes       Vote[]
+  voteTotal   Int        @default(1)
+  comments    Comment[]
+}
+
+model User {
+  id          Int      @default(autoincrement()) @id
+  username    String   @unique
+  password    String
+  posts       Post[]
+  votes       Vote[]
+}
+
+model Vote {
+  id     Int  @default(autoincrement()) @id
+  value  Int
+  postId Int
+  userId Int
+  post   Post @relation(fields: [postId], references: [id])
+  user   User @relation(fields: [userId], references: [id])
+
+  @@unique(fields: [postId, userId], name: "postId_userId")
+}
+
+model Comment {
+  id          Int         @default(autoincrement()) @id
+  createdAt   DateTime    @default(now())
+  authorId    Int
+  postId      Int
+  content     String 
+  author      User       @relation(fields: [authorId], references: [id])
+  post        Post        @relation(fields: [postId], references: [id])
+}
```

