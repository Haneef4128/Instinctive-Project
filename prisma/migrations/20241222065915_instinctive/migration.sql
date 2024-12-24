-- CreateTable
CREATE TABLE "Instinctive" (
    "Student Name" TEXT NOT NULL,
    "Cohort" TEXT NOT NULL,
    "Courses" TEXT NOT NULL,
    "Date Joined" TIMESTAMP(3) NOT NULL,
    "Last login" TIMESTAMP(3) NOT NULL,
    "Status" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Instinctive_Student Name_key" ON "Instinctive"("Student Name");
