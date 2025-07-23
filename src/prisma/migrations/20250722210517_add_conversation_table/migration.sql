-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "level" "EnumLevel" NOT NULL,
    "category" TEXT NOT NULL,
    "duration" TEXT,
    "conversation" JSONB NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);
