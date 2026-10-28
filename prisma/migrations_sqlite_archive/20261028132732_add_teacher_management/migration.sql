-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameBn" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "designationBn" TEXT NOT NULL,
    "designationEn" TEXT NOT NULL,
    "departmentBn" TEXT,
    "departmentEn" TEXT,
    "rank" TEXT NOT NULL DEFAULT 'lecturer',
    "email" TEXT,
    "phone" TEXT,
    "photoUrl" TEXT,
    "specialNote" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "teachers_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "teachers_createdById_idx" ON "teachers"("createdById");

-- CreateIndex
CREATE INDEX "teachers_rank_idx" ON "teachers"("rank");

-- CreateIndex
CREATE INDEX "teachers_departmentEn_idx" ON "teachers"("departmentEn");

-- CreateIndex
CREATE INDEX "teachers_email_idx" ON "teachers"("email");
