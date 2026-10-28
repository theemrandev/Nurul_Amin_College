-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorId" TEXT,
    "actorName" TEXT NOT NULL,
    "actorRole" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "targetId" TEXT,
    "details" TEXT,
    "ipAddress" TEXT,
    "outcome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_students" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "studentClass" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "section" TEXT NOT NULL DEFAULT 'A',
    "personalPhone" TEXT,
    "personalEmail" TEXT,
    "guardianName" TEXT NOT NULL,
    "guardianRelationship" TEXT NOT NULL,
    "guardianPhone" TEXT,
    "guardianEmail" TEXT,
    "homeAddress" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "students_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_students" ("createdAt", "createdById", "group", "guardianEmail", "guardianName", "guardianPhone", "guardianRelationship", "homeAddress", "id", "name", "personalEmail", "personalPhone", "roll", "section", "studentClass", "updatedAt") SELECT "createdAt", "createdById", "group", "guardianEmail", "guardianName", "guardianPhone", "guardianRelationship", "homeAddress", "id", "name", "personalEmail", "personalPhone", "roll", "section", "studentClass", "updatedAt" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE INDEX "students_createdById_idx" ON "students"("createdById");
CREATE INDEX "students_studentClass_group_section_idx" ON "students"("studentClass", "group", "section");
CREATE UNIQUE INDEX "students_studentClass_group_section_roll_key" ON "students"("studentClass", "group", "section", "roll");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_actorId_idx" ON "audit_logs"("actorId");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");
