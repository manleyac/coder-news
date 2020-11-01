# Migration `20201018163229-connecting-comments-posts`

This migration has been generated by Andrew at 10/18/2020, 12:32:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201017201824-comments..20201018163229-connecting-comments-posts
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -19,9 +19,9 @@
   authorId    Int?
   author      User?       @relation(fields: [authorId], references: [id])
   votes       Vote[]
   voteTotal   Int        @default(1)
-  
+  comments    Comment[]
 }
 model User {
   id          Int      @default(autoincrement()) @id
```

