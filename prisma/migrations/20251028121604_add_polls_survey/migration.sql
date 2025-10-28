-- CreateTable
CREATE TABLE "Poll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "titleTamil" TEXT,
    "question" TEXT NOT NULL,
    "questionTamil" TEXT,
    "constituencyId" INTEGER,
    "type" TEXT NOT NULL DEFAULT 'prediction',
    "status" TEXT NOT NULL DEFAULT 'active',
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME,
    "totalVotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Poll_constituencyId_fkey" FOREIGN KEY ("constituencyId") REFERENCES "Constituency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PollOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pollId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "textTamil" TEXT,
    "partyId" INTEGER,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "percentage" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PollOption_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PollOption_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PollVote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pollId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL,
    "voterIp" TEXT,
    "voterSession" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PollVote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PollVote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "PollOption" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PollVote_pollId_voterSession_key" ON "PollVote"("pollId", "voterSession");
