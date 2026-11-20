-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "visitorId" TEXT,
    "isEntry" BOOLEAN NOT NULL DEFAULT false,
    "referrer" TEXT,
    "utmSource" TEXT,
    "utmCampaign" TEXT,
    "device" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");

-- CreateIndex
CREATE INDEX "PageView_isEntry_createdAt_idx" ON "PageView"("isEntry", "createdAt");
