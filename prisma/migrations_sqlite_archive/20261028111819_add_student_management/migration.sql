-- CreateTable
CREATE TABLE "students" (
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
    CONSTRAINT "students_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "students_createdById_idx" ON "students"("createdById");

-- CreateIndex
CREATE INDEX "students_studentClass_group_section_idx" ON "students"("studentClass", "group", "section");

-- CreateIndex
CREATE UNIQUE INDEX "students_studentClass_group_section_roll_key" ON "students"("studentClass", "group", "section", "roll");
