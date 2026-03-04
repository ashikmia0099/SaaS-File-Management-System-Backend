var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";

// src/modules/SubscriptionPackage/SubscriptionPackage.router.ts
import { Router } from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.4.1",
  "engineVersion": "55ae170b1ced7fc6ed07a15f110549408c501bb3",
  "activeProvider": "postgresql",
  "inlineSchema": '// this model create for user authenication \n\nmodel User {\n  id               String                @id @default(uuid())\n  name             String\n  email            String                @unique\n  password         String\n  role             Role                  @default(USER)\n  createdAt        DateTime              @default(now())\n  selectedPackages UserSelectedPackage[]\n  folder           Folder[]\n  file             File[]\n}\n\nenum Role {\n  USER\n  ADMIN\n}\n\nmodel File {\n  id               String    @id @default(uuid())\n  originalFileName String\n  renameFileName   String\n  filePath         String\n  uploadFilePath   Int\n  uploadFileTypes  FileTypes\n  userId           String\n  folderId         String\n  createdAt        DateTime  @default(now())\n  updatedAt        DateTime  @updatedAt\n  user             User      @relation(fields: [userId], references: [id])\n  folder           Folder    @relation(fields: [folderId], references: [id])\n}\n\nenum FileTypes {\n  image\n  video\n  audio\n  pdf\n}\n\nmodel Folder {\n  id             String   @id @default(uuid())\n  name           String\n  userId         String\n  packageId      String?\n  parentFolderId String?\n  createdAt      DateTime @default(now())\n  user           User     @relation(fields: [userId], references: [id])\n  file           File[]\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\n// this model create for admin can create subscription package \n\nmodel SubscriptionPackage {\n  id               String                @id @default(uuid())\n  PackageName      String                @unique\n  MaxFolders       Int\n  MaxNestingFolder Int\n  AllowedFileTypes String[]\n  MaxFileSizeMB    Int\n  TotalFileLimit   Int\n  FilePerFolder    Int\n  createdAt        DateTime              @default(now())\n  updatedAt        DateTime              @updatedAt\n  selectedUser     UserSelectedPackage[]\n}\n\nmodel UserSelectedPackage {\n  id              String              @id @default(uuid())\n  userId          String\n  packageId       String\n  packageStatDate DateTime            @default(now())\n  packageEndDate  DateTime?\n  isActive        Boolean             @default(true)\n  user            User                @relation(fields: [userId], references: [id])\n  package         SubscriptionPackage @relation(fields: [packageId], references: [id])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"selectedPackages","kind":"object","type":"UserSelectedPackage","relationName":"UserToUserSelectedPackage"},{"name":"folder","kind":"object","type":"Folder","relationName":"FolderToUser"},{"name":"file","kind":"object","type":"File","relationName":"FileToUser"}],"dbName":null},"File":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"originalFileName","kind":"scalar","type":"String"},{"name":"renameFileName","kind":"scalar","type":"String"},{"name":"filePath","kind":"scalar","type":"String"},{"name":"uploadFilePath","kind":"scalar","type":"Int"},{"name":"uploadFileTypes","kind":"enum","type":"FileTypes"},{"name":"userId","kind":"scalar","type":"String"},{"name":"folderId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"FileToUser"},{"name":"folder","kind":"object","type":"Folder","relationName":"FileToFolder"}],"dbName":null},"Folder":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"packageId","kind":"scalar","type":"String"},{"name":"parentFolderId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"FolderToUser"},{"name":"file","kind":"object","type":"File","relationName":"FileToFolder"}],"dbName":null},"SubscriptionPackage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"PackageName","kind":"scalar","type":"String"},{"name":"MaxFolders","kind":"scalar","type":"Int"},{"name":"MaxNestingFolder","kind":"scalar","type":"Int"},{"name":"AllowedFileTypes","kind":"scalar","type":"String"},{"name":"MaxFileSizeMB","kind":"scalar","type":"Int"},{"name":"TotalFileLimit","kind":"scalar","type":"Int"},{"name":"FilePerFolder","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"selectedUser","kind":"object","type":"UserSelectedPackage","relationName":"SubscriptionPackageToUserSelectedPackage"}],"dbName":null},"UserSelectedPackage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"packageId","kind":"scalar","type":"String"},{"name":"packageStatDate","kind":"scalar","type":"DateTime"},{"name":"packageEndDate","kind":"scalar","type":"DateTime"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"user","kind":"object","type":"User","relationName":"UserToUserSelectedPackage"},{"name":"package","kind":"object","type":"SubscriptionPackage","relationName":"SubscriptionPackageToUserSelectedPackage"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","selectedUser","_count","package","selectedPackages","folder","file","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","File.findUnique","File.findUniqueOrThrow","File.findFirst","File.findFirstOrThrow","File.findMany","File.createOne","File.createMany","File.createManyAndReturn","File.updateOne","File.updateMany","File.updateManyAndReturn","File.upsertOne","File.deleteOne","File.deleteMany","_avg","_sum","File.groupBy","File.aggregate","Folder.findUnique","Folder.findUniqueOrThrow","Folder.findFirst","Folder.findFirstOrThrow","Folder.findMany","Folder.createOne","Folder.createMany","Folder.createManyAndReturn","Folder.updateOne","Folder.updateMany","Folder.updateManyAndReturn","Folder.upsertOne","Folder.deleteOne","Folder.deleteMany","Folder.groupBy","Folder.aggregate","SubscriptionPackage.findUnique","SubscriptionPackage.findUniqueOrThrow","SubscriptionPackage.findFirst","SubscriptionPackage.findFirstOrThrow","SubscriptionPackage.findMany","SubscriptionPackage.createOne","SubscriptionPackage.createMany","SubscriptionPackage.createManyAndReturn","SubscriptionPackage.updateOne","SubscriptionPackage.updateMany","SubscriptionPackage.updateManyAndReturn","SubscriptionPackage.upsertOne","SubscriptionPackage.deleteOne","SubscriptionPackage.deleteMany","SubscriptionPackage.groupBy","SubscriptionPackage.aggregate","UserSelectedPackage.findUnique","UserSelectedPackage.findUniqueOrThrow","UserSelectedPackage.findFirst","UserSelectedPackage.findFirstOrThrow","UserSelectedPackage.findMany","UserSelectedPackage.createOne","UserSelectedPackage.createMany","UserSelectedPackage.createManyAndReturn","UserSelectedPackage.updateOne","UserSelectedPackage.updateMany","UserSelectedPackage.updateManyAndReturn","UserSelectedPackage.upsertOne","UserSelectedPackage.deleteOne","UserSelectedPackage.deleteMany","UserSelectedPackage.groupBy","UserSelectedPackage.aggregate","AND","OR","NOT","id","userId","packageId","packageStatDate","packageEndDate","isActive","equals","not","in","notIn","lt","lte","gt","gte","contains","startsWith","endsWith","PackageName","MaxFolders","MaxNestingFolder","AllowedFileTypes","MaxFileSizeMB","TotalFileLimit","FilePerFolder","createdAt","updatedAt","has","hasEvery","hasSome","every","some","none","name","parentFolderId","originalFileName","renameFileName","filePath","uploadFilePath","FileTypes","uploadFileTypes","folderId","email","password","Role","role","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "xgIwUAwHAACgAQAgCAAArwEAIAkAALABACBiAACtAQAwYwAAFwAQZAAArQEAMGUBAAAAAX1AAJ8BACGFAQEAnQEAIY4BAQAAAAGPAQEAnQEAIZEBAACuAZEBIgEAAAABACALAwAAswEAIAYAALoBACBiAAC3AQAwYwAAAwAQZAAAtwEAMGUBAJ0BACFmAQCdAQAhZwEAnQEAIWhAAJ8BACFpQAC4AQAhaiAAuQEAIQMDAACmAgAgBgAAqAIAIGkAALsBACALAwAAswEAIAYAALoBACBiAAC3AQAwYwAAAwAQZAAAtwEAMGUBAAAAAWYBAJ0BACFnAQCdAQAhaEAAnwEAIWlAALgBACFqIAC5AQAhAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACABAAAAAwAgCwMAALMBACAJAACwAQAgYgAAtQEAMGMAAAkAEGQAALUBADBlAQCdAQAhZgEAnQEAIWcBALYBACF9QACfAQAhhQEBAJ0BACGGAQEAtgEAIQQDAACmAgAgCQAApQIAIGcAALsBACCGAQAAuwEAIAsDAACzAQAgCQAAsAEAIGIAALUBADBjAAAJABBkAAC1AQAwZQEAAAABZgEAnQEAIWcBALYBACF9QACfAQAhhQEBAJ0BACGGAQEAtgEAIQMAAAAJACABAAAKADACAAALACAPAwAAswEAIAgAALQBACBiAACxAQAwYwAADQAQZAAAsQEAMGUBAJ0BACFmAQCdAQAhfUAAnwEAIX5AAJ8BACGHAQEAnQEAIYgBAQCdAQAhiQEBAJ0BACGKAQIAngEAIYwBAACyAYwBIo0BAQCdAQAhAgMAAKYCACAIAACnAgAgDwMAALMBACAIAAC0AQAgYgAAsQEAMGMAAA0AEGQAALEBADBlAQAAAAFmAQCdAQAhfUAAnwEAIX5AAJ8BACGHAQEAnQEAIYgBAQCdAQAhiQEBAJ0BACGKAQIAngEAIYwBAACyAYwBIo0BAQCdAQAhAwAAAA0AIAEAAA4AMAIAAA8AIAEAAAANACADAAAADQAgAQAADgAwAgAADwAgAQAAAAMAIAEAAAAJACABAAAADQAgAQAAAAEAIAwHAACgAQAgCAAArwEAIAkAALABACBiAACtAQAwYwAAFwAQZAAArQEAMGUBAJ0BACF9QACfAQAhhQEBAJ0BACGOAQEAnQEAIY8BAQCdAQAhkQEAAK4BkQEiAwcAAN0BACAIAACkAgAgCQAApQIAIAMAAAAXACABAAAYADACAAABACADAAAAFwAgAQAAGAAwAgAAAQAgAwAAABcAIAEAABgAMAIAAAEAIAkHAAChAgAgCAAAogIAIAkAAKMCACBlAQAAAAF9QAAAAAGFAQEAAAABjgEBAAAAAY8BAQAAAAGRAQAAAJEBAgEPAAAcACAGZQEAAAABfUAAAAABhQEBAAAAAY4BAQAAAAGPAQEAAAABkQEAAACRAQIBDwAAHgAwAQ8AAB4AMAkHAACAAgAgCAAAgQIAIAkAAIICACBlAQC_AQAhfUAAwAEAIYUBAQC_AQAhjgEBAL8BACGPAQEAvwEAIZEBAAD_AZEBIgIAAAABACAPAAAhACAGZQEAvwEAIX1AAMABACGFAQEAvwEAIY4BAQC_AQAhjwEBAL8BACGRAQAA_wGRASICAAAAFwAgDwAAIwAgAgAAABcAIA8AACMAIAMAAAABACAWAAAcACAXAAAhACABAAAAAQAgAQAAABcAIAMFAAD8AQAgHAAA_gEAIB0AAP0BACAJYgAAqQEAMGMAACoAEGQAAKkBADBlAQCJAQAhfUAAigEAIYUBAQCJAQAhjgEBAIkBACGPAQEAiQEAIZEBAACqAZEBIgMAAAAXACABAAApADAbAAAqACADAAAAFwAgAQAAGAAwAgAAAQAgAQAAAA8AIAEAAAAPACADAAAADQAgAQAADgAwAgAADwAgAwAAAA0AIAEAAA4AMAIAAA8AIAMAAAANACABAAAOADACAAAPACAMAwAA8gEAIAgAAPsBACBlAQAAAAFmAQAAAAF9QAAAAAF-QAAAAAGHAQEAAAABiAEBAAAAAYkBAQAAAAGKAQIAAAABjAEAAACMAQKNAQEAAAABAQ8AADIAIAplAQAAAAFmAQAAAAF9QAAAAAF-QAAAAAGHAQEAAAABiAEBAAAAAYkBAQAAAAGKAQIAAAABjAEAAACMAQKNAQEAAAABAQ8AADQAMAEPAAA0ADAMAwAA8AEAIAgAAPoBACBlAQC_AQAhZgEAvwEAIX1AAMABACF-QADAAQAhhwEBAL8BACGIAQEAvwEAIYkBAQC_AQAhigECAMwBACGMAQAA7gGMASKNAQEAvwEAIQIAAAAPACAPAAA3ACAKZQEAvwEAIWYBAL8BACF9QADAAQAhfkAAwAEAIYcBAQC_AQAhiAEBAL8BACGJAQEAvwEAIYoBAgDMAQAhjAEAAO4BjAEijQEBAL8BACECAAAADQAgDwAAOQAgAgAAAA0AIA8AADkAIAMAAAAPACAWAAAyACAXAAA3ACABAAAADwAgAQAAAA0AIAUFAAD1AQAgHAAA-AEAIB0AAPcBACAuAAD2AQAgLwAA-QEAIA1iAAClAQAwYwAAQAAQZAAApQEAMGUBAIkBACFmAQCJAQAhfUAAigEAIX5AAIoBACGHAQEAiQEAIYgBAQCJAQAhiQEBAIkBACGKAQIAmAEAIYwBAACmAYwBIo0BAQCJAQAhAwAAAA0AIAEAAD8AMBsAAEAAIAMAAAANACABAAAOADACAAAPACABAAAACwAgAQAAAAsAIAMAAAAJACABAAAKADACAAALACADAAAACQAgAQAACgAwAgAACwAgAwAAAAkAIAEAAAoAMAIAAAsAIAgDAADzAQAgCQAA9AEAIGUBAAAAAWYBAAAAAWcBAAAAAX1AAAAAAYUBAQAAAAGGAQEAAAABAQ8AAEgAIAZlAQAAAAFmAQAAAAFnAQAAAAF9QAAAAAGFAQEAAAABhgEBAAAAAQEPAABKADABDwAASgAwCAMAAOIBACAJAADjAQAgZQEAvwEAIWYBAL8BACFnAQDhAQAhfUAAwAEAIYUBAQC_AQAhhgEBAOEBACECAAAACwAgDwAATQAgBmUBAL8BACFmAQC_AQAhZwEA4QEAIX1AAMABACGFAQEAvwEAIYYBAQDhAQAhAgAAAAkAIA8AAE8AIAIAAAAJACAPAABPACADAAAACwAgFgAASAAgFwAATQAgAQAAAAsAIAEAAAAJACAFBQAA3gEAIBwAAOABACAdAADfAQAgZwAAuwEAIIYBAAC7AQAgCWIAAKEBADBjAABWABBkAAChAQAwZQEAiQEAIWYBAIkBACFnAQCiAQAhfUAAigEAIYUBAQCJAQAhhgEBAKIBACEDAAAACQAgAQAAVQAwGwAAVgAgAwAAAAkAIAEAAAoAMAIAAAsAIA4EAACgAQAgYgAAnAEAMGMAAFwAEGQAAJwBADBlAQAAAAF2AQAAAAF3AgCeAQAheAIAngEAIXkAAJkBACB6AgCeAQAhewIAngEAIXwCAJ4BACF9QACfAQAhfkAAnwEAIQEAAABZACABAAAAWQAgDgQAAKABACBiAACcAQAwYwAAXAAQZAAAnAEAMGUBAJ0BACF2AQCdAQAhdwIAngEAIXgCAJ4BACF5AACZAQAgegIAngEAIXsCAJ4BACF8AgCeAQAhfUAAnwEAIX5AAJ8BACEBBAAA3QEAIAMAAABcACABAABdADACAABZACADAAAAXAAgAQAAXQAwAgAAWQAgAwAAAFwAIAEAAF0AMAIAAFkAIAsEAADcAQAgZQEAAAABdgEAAAABdwIAAAABeAIAAAABeQAA2wEAIHoCAAAAAXsCAAAAAXwCAAAAAX1AAAAAAX5AAAAAAQEPAABhACAKZQEAAAABdgEAAAABdwIAAAABeAIAAAABeQAA2wEAIHoCAAAAAXsCAAAAAXwCAAAAAX1AAAAAAX5AAAAAAQEPAABjADABDwAAYwAwCwQAAM4BACBlAQC_AQAhdgEAvwEAIXcCAMwBACF4AgDMAQAheQAAzQEAIHoCAMwBACF7AgDMAQAhfAIAzAEAIX1AAMABACF-QADAAQAhAgAAAFkAIA8AAGYAIAplAQC_AQAhdgEAvwEAIXcCAMwBACF4AgDMAQAheQAAzQEAIHoCAMwBACF7AgDMAQAhfAIAzAEAIX1AAMABACF-QADAAQAhAgAAAFwAIA8AAGgAIAIAAABcACAPAABoACADAAAAWQAgFgAAYQAgFwAAZgAgAQAAAFkAIAEAAABcACAFBQAAxwEAIBwAAMoBACAdAADJAQAgLgAAyAEAIC8AAMsBACANYgAAlwEAMGMAAG8AEGQAAJcBADBlAQCJAQAhdgEAiQEAIXcCAJgBACF4AgCYAQAheQAAmQEAIHoCAJgBACF7AgCYAQAhfAIAmAEAIX1AAIoBACF-QACKAQAhAwAAAFwAIAEAAG4AMBsAAG8AIAMAAABcACABAABdADACAABZACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAgDAADFAQAgBgAAxgEAIGUBAAAAAWYBAAAAAWcBAAAAAWhAAAAAAWlAAAAAAWogAAAAAQEPAAB3ACAGZQEAAAABZgEAAAABZwEAAAABaEAAAAABaUAAAAABaiAAAAABAQ8AAHkAMAEPAAB5ADAIAwAAwwEAIAYAAMQBACBlAQC_AQAhZgEAvwEAIWcBAL8BACFoQADAAQAhaUAAwQEAIWogAMIBACECAAAABQAgDwAAfAAgBmUBAL8BACFmAQC_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_AgAglAEAAMACACCaAQAAAQAgAxYAAL0CACCUAQAAvgIAIJoBAABZACAAAAAAAAWXAQIAAAABngECAAAAAZ8BAgAAAAGgAQIAAAABoQECAAAAAQKXAQEAAAAEnQEBAAAABQsWAADPAQAwFwAA1AEAMJQBAADQAQAwlQEAANEBADCWAQAA0gEAIJcBAADTAQAwmAEAANMBADCZAQAA0wEAMJoBAADTAQAwmwEAANUBADCcAQAA1gEAMAYDAADFAQAgZQEAAAABZgEAAAABaEAAAAABaUAAAAABaiAAAAABAgAAAAUAIBYAANoBACADAAAABQAgFgAA2gEAIBcAANkBACABDwAAvAIAMAsDAACzAQAgBgAAugEAIGIAALcBADBjAAADABBkAAC3AQAwZQEAAAABZgEAnQEAIWcBAJ0BACFoQACfAQAhaUAAuAEAIWogALkBACECAAAABQAgDwAA2QEAIAIAAADXAQAgDwAA2AEAIAliAADWAQAwYwAA1wEAEGQAANYBADBlAQCdAQAhZgEAnQEAIWcBAJ0BACFoQACfAQAhaUAAuAEAIWogALkBACEJYgAA1gEAMGMAANcBABBkAADWAQAwZQEAnQEAIWYBAJ0BACFnAQCdAQAhaEAAnwEAIWlAALgBACFqIAC5AQAhBWUBAL8BACFmAQC_AQAhaEAAwAEAIWlAAMEBACFqIADCAQAhBgMAAMMBACBlAQC_AQAhZgEAvwEAIWhAAMABACFpQADBAQAhaiAAwgEAIQYDAADFAQAgZQEAAAABZgEAAAABaEAAAAABaUAAAAABaiAAAAABAZcBAQAAAAQEFgAAzwEAMJQBAADQAQAwlgEAANIBACCaAQAA0wEAMAAAAAABlwEBAAAAAQUWAACxAgAgFwAAugIAIJQBAACyAgAglQEAALkCACCaAQAAAQAgCxYAAOQBADAXAADpAQAwlAEAAOUBADCVAQAA5gEAMJYBAADnAQAglwEAAOgBADCYAQAA6AEAMJkBAADoAQAwmgEAAOgBADCbAQAA6gEAMJwBAADrAQAwCgMAAPIBACBlAQAAAAFmAQAAAAF9QAAAAAF-QAAAAAGHAQEAAAABiAEBAAAAAYkBAQAAAAGKAQIAAAABjAEAAACMAQICAAAADwAgFgAA8QEAIAMAAAAPACAWAADxAQAgFwAA7wEAIAEPAAC4AgAwDwMAALMBACAIAAC0AQAgYgAAsQEAMGMAAA0AEGQAALEBADBlAQAAAAFmAQCdAQAhfUAAnwEAIX5AAJ8BACGHAQEAnQEAIYgBAQCdAQAhiQEBAJ0BACGKAQIAngEAIYwBAACyAYwBIo0BAQCdAQAhAgAAAA8AIA8AAO8BACACAAAA7AEAIA8AAO0BACANYgAA6wEAMGMAAOwBABBkAADrAQAwZQEAnQEAIWYBAJ0BACF9QACfAQAhfkAAnwEAIYcBAQCdAQAhiAEBAJ0BACGJAQEAnQEAIYoBAgCeAQAhjAEAALIBjAEijQEBAJ0BACENYgAA6wEAMGMAAOwBABBkAADrAQAwZQEAnQEAIWYBAJ0BACF9QACfAQAhfkAAnwEAIYcBAQCdAQAhiAEBAJ0BACGJAQEAnQEAIYoBAgCeAQAhjAEAALIBjAEijQEBAJ0BACEJZQEAvwEAIWYBAL8BACF9QADAAQAhfkAAwAEAIYcBAQC_AQAhiAEBAL8BACGJAQEAvwEAIYoBAgDMAQAhjAEAAO4BjAEiAZcBAAAAjAECCgMAAPABACBlAQC_AQAhZgEAvwEAIX1AAMABACF-QADAAQAhhwEBAL8BACGIAQEAvwEAIYkBAQC_AQAhigECAMwBACGMAQAA7gGMASIFFgAAswIAIBcAALYCACCUAQAAtAIAIJUBAAC1AgAgmgEAAAEAIAoDAADyAQAgZQEAAAABZgEAAAABfUAAAAABfkAAAAABhwEBAAAAAYgBAQAAAAGJAQEAAAABigECAAAAAYwBAAAAjAECAxYAALMCACCUAQAAtAIAIJoBAAABACADFgAAsQIAIJQBAACyAgAgmgEAAAEAIAQWAADkAQAwlAEAAOUBADCWAQAA5wEAIJoBAADoAQAwAAAAAAAFFgAArAIAIBcAAK8CACCUAQAArQIAIJUBAACuAgAgmgEAAAsAIAMWAACsAgAglAEAAK0CACCaAQAACwAgAAAAAZcBAAAAkQECCxYAAJgCADAXAACcAgAwlAEAAJkCADCVAQAAmgIAMJYBAACbAgAglwEAANMBADCYAQAA0wEAMJkBAADTAQAwmgEAANMBADCbAQAAnQIAMJwBAADWAQAwCxYAAIwCADAXAACRAgAwlAEAAI0CADCVAQAAjgIAMJYBAACPAgAglwEAAJACADCYAQAAkAIAMJkBAACQAgAwmgEAAJACADCbAQAAkgIAMJwBAACTAgAwCxYAAIMCADAXAACHAgAwlAEAAIQCADCVAQAAhQIAMJYBAACGAgAglwEAAOgBADCYAQAA6AEAMJkBAADoAQAwmgEAAOgBADCbAQAAiAIAMJwBAADrAQAwCggAAPsBACBlAQAAAAF9QAAAAAF-QAAAAAGHAQEAAAABiAEBAAAAAYkBAQAAAAGKAQIAAAABjAEAAACMAQKNAQEAAAABAgAAAA8AIBYAAIsCACADAAAADwAgFgAAiwIAIBcAAIoCACABDwAAqwIAMAIAAAAPACAPAACKAgAgAgAAAOwBACAPAACJAgAgCWUBAL8BACF9QADAAQAhfkAAwAEAIYcBAQC_AQAhiAEBAL8BACGJAQEAvwEAIYoBAgDMAQAhjAEAAO4BjAEijQEBAL8BACEKCAAA-gEAIGUBAL8BACF9QADAAQAhfkAAwAEAIYcBAQC_AQAhiAEBAL8BACGJAQEAvwEAIYoBAgDMAQAhjAEAAO4BjAEijQEBAL8BACEKCAAA-wEAIGUBAAAAAX1AAAAAAX5AAAAAAYcBAQAAAAGIAQEAAAABiQEBAAAAAYoBAgAAAAGMAQAAAIwBAo0BAQAAAAEGCQAA9AEAIGUBAAAAAWcBAAAAAX1AAAAAAYUBAQAAAAGGAQEAAAABAgAAAAsAIBYAAJcCACADAAAACwAgFgAAlwIAIBcAAJYCACABDwAAqgIAMAsDAACzAQAgCQAAsAEAIGIAALUBADBjAAAJABBkAAC1AQAwZQEAAAABZgEAnQEAIWcBALYBACF9QACfAQAhhQEBAJ0BACGGAQEAtgEAIQIAAAALACAPAACWAgAgAgAAAJQCACAPAACVAgAgCWIAAJMCADBjAACUAgAQZAAAkwIAMGUBAJ0BACFmAQCdAQAhZwEAtgEAIX1AAJ8BACGFAQEAnQEAIYYBAQC2AQAhCWIAAJMCADBjAACUAgAQZAAAkwIAMGUBAJ0BACFmAQCdAQAhZwEAtgEAIX1AAJ8BACGFAQEAnQEAIYYBAQC2AQAhBWUBAL8BACFnAQDhAQAhfUAAwAEAIYUBAQC_AQAhhgEBAOEBACEGCQAA4wEAIGUBAL8BACFnAQDhAQAhfUAAwAEAIYUBAQC_AQAhhgEBAOEBACEGCQAA9AEAIGUBAAAAAWcBAAAAAX1AAAAAAYUBAQAAAAGGAQEAAAABBgYAAMYBACBlAQAAAAFnAQAAAAFoQAAAAAFpQAAAAAFqIAAAAAECAAAABQAgFgAAoAIAIAMAAAAFACAWAACgAgAgFwAAnwIAIAEPAACpAgAwAgAAAAUAIA8AAJ8CACACAAAA1wEAIA8AAJ4CACAFZQEAvwEAIWcBAL8BACFoQADAAQAhaUAAwQEAIWogAMIBACEGBgAAxAEAIGUBAL8BACFnAQC_AQAhaEAAwAEAIWlAAMEBACFqIADCAQAhBgYAAMYBACBlAQAAAAFnAQAAAAFoQAAAAAFpQAAAAAFqIAAAAAEEFgAAmAIAMJQBAACZAgAwlgEAAJsCACCaAQAA0wEAMAQWAACMAgAwlAEAAI0CADCWAQAAjwIAIJoBAACQAgAwBBYAAIMCADCUAQAAhAIAMJYBAACGAgAgmgEAAOgBADAAAAMHAADdAQAgCAAApAIAIAkAAKUCACAEAwAApgIAIAkAAKUCACBnAAC7AQAghgEAALsBACABBAAA3QEAIAVlAQAAAAFnAQAAAAFoQAAAAAFpQAAAAAFqIAAAAAEFZQEAAAABZwEAAAABfUAAAAABhQEBAAAAAYYBAQAAAAEJZQEAAAABfUAAAAABfkAAAAABhwEBAAAAAYgBAQAAAAGJAQEAAAABigECAAAAAYwBAAAAjAECjQEBAAAAAQcDAADzAQAgZQEAAAABZgEAAAABZwEAAAABfUAAAAABhQEBAAAAAYYBAQAAAAECAAAACwAgFgAArAIAIAMAAAAJACAWAACsAgAgFwAAsAIAIAkAAAAJACADAADiAQAgDwAAsAIAIGUBAL8BACFmAQC_AQAhZwEA4QEAIX1AAMABACGFAQEAvwEAIYYBAQDhAQAhBwMAAOIBACBlAQC_AQAhZgEAvwEAIWcBAOEBACF9QADAAQAhhQEBAL8BACGGAQEA4QEAIQgHAAChAgAgCQAAowIAIGUBAAAAAX1AAAAAAYUBAQAAAAGOAQEAAAABjwEBAAAAAZEBAAAAkQECAgAAAAEAIBYAALECACAIBwAAoQIAIAgAAKICACBlAQAAAAF9QAAAAAGFAQEAAAABjgEBAAAAAY8BAQAAAAGRAQAAAJEBAgIAAAABACAWAACzAgAgAwAAABcAIBYAALMCACAXAAC3AgAgCgAAABcAIAcAAIACACAIAACBAgAgDwAAtwIAIGUBAL8BACF9QADAAQAhhQEBAL8BACGOAQEAvwEAIY8BAQC_AQAhkQEAAP8BkQEiCAcAAIACACAIAACBAgAgZQEAvwEAIX1AAMABACGFAQEAvwEAIY4BAQC_AQAhjwEBAL8BACGRAQAA_wGRASIJZQEAAAABZgEAAAABfUAAAAABfkAAAAABhwEBAAAAAYgBAQAAAAGJAQEAAAABigECAAAAAYwBAAAAjAECAwAAABcAIBYAALECACAXAAC7AgAgCgAAABcAIAcAAIACACAJAACCAgAgDwAAuwIAIGUBAL8BACF9QADAAQAhhQEBAL8BACGOAQEAvwEAIY8BAQC_AQAhkQEAAP8BkQEiCAcAAIACACAJAACCAgAgZQEAvwEAIX1AAMABACGFAQEAvwEAIY4BAQC_AQAhjwEBAL8BACGRAQAA_wGRASIFZQEAAAABZgEAAAABaEAAAAABaUAAAAABaiAAAAABCmUBAAAAAXYBAAAAAXcCAAAAAXgCAAAAAXkAANsBACB6AgAAAAF7AgAAAAF8AgAAAAF9QAAAAAF-QAAAAAECAAAAWQAgFgAAvQIAIAgIAACiAgAgCQAAowIAIGUBAAAAAX1AAAAAAYUBAQAAAAGOAQEAAAABjwEBAAAAAZEBAAAAkQECAgAAAAEAIBYAAL8CACADAAAAXAAgFgAAvQIAIBcAAMMCACAMAAAAXAAgDwAAwwIAIGUBAL8BACF2AQC_AQAhdwIAzAEAIXgCAMwBACF5AADNAQAgegIAzAEAIXsCAMwBACF8AgDMAQAhfUAAwAEAIX5AAMABACEKZQEAvwEAIXYBAL8BACF3AgDMAQAheAIAzAEAIXkAAM0BACB6AgDMAQAhewIAzAEAIXwCAMwBACF9QADAAQAhfkAAwAEAIQMAAAAXACAWAAC_AgAgFwAAxgIAIAoAAAAXACAIAACBAgAgCQAAggIAIA8AAMYCACBlAQC_AQAhfUAAwAEAIYUBAQC_AQAhjgEBAL8BACGPAQEAvwEAIZEBAAD_AZEBIggIAACBAgAgCQAAggIAIGUBAL8BACF9QADAAQAhhQEBAL8BACGOAQEAvwEAIY8BAQC_AQAhkQEAAP8BkQEiBAUACAcGAggMBQkSBgIDAAEGAAMCBAcCBQAEAQQIAAMDAAEFAAcJEAYCAwABCAAFAQkRAAMHEwAIFAAJFQAAAAADBQANHAAOHQAPAAAAAwUADRwADh0ADwIDAAEIAAUCAwABCAAFBQUAFBwAFx0AGC4AFS8AFgAAAAAABQUAFBwAFx0AGC4AFS8AFgEDAAEBAwABAwUAHRwAHh0AHwAAAAMFAB0cAB4dAB8AAAUFACQcACcdACguACUvACYAAAAAAAUFACQcACcdACguACUvACYCAwABBgADAgMAAQYAAwMFAC0cAC4dAC8AAAADBQAtHAAuHQAvCgIBCxYBDBkBDRoBDhsBEB0BER8JEiAKEyIBFCQJFSULGCYBGScBGigJHisMHywQIC0GIS4GIi8GIzAGJDEGJTMGJjUJJzYRKDgGKToJKjsSKzwGLD0GLT4JMEETMUIZMkMFM0QFNEUFNUYFNkcFN0kFOEsJOUwaOk4FO1AJPFEbPVIFPlMFP1QJQFccQVggQloDQ1sDRF4DRV8DRmADR2IDSGQJSWUhSmcDS2kJTGoiTWsDTmwDT20JUHAjUXEpUnICU3MCVHQCVXUCVnYCV3gCWHoJWXsqWn0CW38JXIABK12BAQJeggECX4MBCWCGASxhhwEw"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  FileScalarFieldEnum: () => FileScalarFieldEnum,
  FolderScalarFieldEnum: () => FolderScalarFieldEnum,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  SubscriptionPackageScalarFieldEnum: () => SubscriptionPackageScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  UserSelectedPackageScalarFieldEnum: () => UserSelectedPackageScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.4.1",
  engine: "55ae170b1ced7fc6ed07a15f110549408c501bb3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  File: "File",
  Folder: "Folder",
  SubscriptionPackage: "SubscriptionPackage",
  UserSelectedPackage: "UserSelectedPackage"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  role: "role",
  createdAt: "createdAt"
};
var FileScalarFieldEnum = {
  id: "id",
  originalFileName: "originalFileName",
  renameFileName: "renameFileName",
  filePath: "filePath",
  uploadFilePath: "uploadFilePath",
  uploadFileTypes: "uploadFileTypes",
  userId: "userId",
  folderId: "folderId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var FolderScalarFieldEnum = {
  id: "id",
  name: "name",
  userId: "userId",
  packageId: "packageId",
  parentFolderId: "parentFolderId",
  createdAt: "createdAt"
};
var SubscriptionPackageScalarFieldEnum = {
  id: "id",
  PackageName: "PackageName",
  MaxFolders: "MaxFolders",
  MaxNestingFolder: "MaxNestingFolder",
  AllowedFileTypes: "AllowedFileTypes",
  MaxFileSizeMB: "MaxFileSizeMB",
  TotalFileLimit: "TotalFileLimit",
  FilePerFolder: "FilePerFolder",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserSelectedPackageScalarFieldEnum = {
  id: "id",
  userId: "userId",
  packageId: "packageId",
  packageStatDate: "packageStatDate",
  packageEndDate: "packageEndDate",
  isActive: "isActive"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/SubscriptionPackage/SubscriptionPackage.service.ts
var SubscriptionPackageServicePost = async (data) => {
  try {
    const createSubscription = await prisma.subscriptionPackage.create({
      data
    });
    return createSubscription;
  } catch (err) {
    throw new Error(err.message);
  }
};
var SubscriptionPackageServiceGet = async () => {
  try {
    const getResult = await prisma.subscriptionPackage.findMany();
    return getResult;
  } catch (err) {
    throw new Error(err.message);
  }
};
var SingleSubscriptionPackageService = async (id) => {
  try {
    if (!id) {
      throw new Error("Subscription package not found");
    }
    const CheckData = await prisma.subscriptionPackage.findUnique({
      where: { id }
    });
    return CheckData;
  } catch (err) {
    throw new Error(err.message);
  }
};
var SubscriptionPackageServiceDelete = async (id) => {
  const packageData = await prisma.subscriptionPackage.findUnique({
    where: { id }
  });
  if (!packageData) {
    throw new Error("Subscription package not found");
  }
  const relatedFoldersCount = await prisma.folder.count({
    where: { packageId: id }
  });
  const relatedFilesCount = await prisma.file.count({
    where: { folder: { packageId: id } }
  });
  if (relatedFoldersCount > 0 || relatedFilesCount > 0) {
    throw new Error("Cannot delete subscription: related data exists");
  }
  const deletepackage = await prisma.subscriptionPackage.delete({
    where: { id }
  });
  return deletepackage;
};
var SubscriptionPackageServiceUpdate = async (id, payload) => {
  try {
    const CheckData = await prisma.subscriptionPackage.findUnique({
      where: { id }
    });
    if (!CheckData) {
      throw new Error("Subscription not found");
    }
    const UpdateData = await prisma.subscriptionPackage.update({
      where: { id },
      data: payload
    });
    return UpdateData;
  } catch (err) {
    throw new Error(err.message);
  }
};
var SubscriptionPackageService = {
  SubscriptionPackageServicePost,
  SubscriptionPackageServiceGet,
  SingleSubscriptionPackageService,
  SubscriptionPackageServiceDelete,
  SubscriptionPackageServiceUpdate
};

// src/modules/SubscriptionPackage/SubscriptionPackage.controller.ts
var SubscriptionPackageControllerPost = async (req, res, next) => {
  try {
    const subscriptionData = await SubscriptionPackageService.SubscriptionPackageServicePost(req.body);
    res.status(201).json({ success: true, result: subscriptionData });
  } catch (err) {
    next(err);
  }
};
var SubscriptionPackageControllerGet = async (req, res, next) => {
  try {
    const getSubscriptionData = await SubscriptionPackageService.SubscriptionPackageServiceGet();
    res.status(200).json(getSubscriptionData);
  } catch (err) {
    next(err);
  }
};
var SingleSubscriptionPackageController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const SingleSubscriptionData = await SubscriptionPackageService.SingleSubscriptionPackageService(id);
    res.status(200).json({
      success: true,
      data: SingleSubscriptionData
    });
  } catch (err) {
    next(err);
  }
};
var SubscriptionPackageControllerDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await SubscriptionPackageService.SubscriptionPackageServiceDelete(id);
    res.status(200).json({
      success: true,
      message: "Subscription package deleted successfully",
      data: deleted
    });
  } catch (err) {
    next(err);
  }
};
var SubscriptionPackageControllerUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const UpdateSubscriptionData = await SubscriptionPackageService.SubscriptionPackageServiceUpdate(id, payload);
    res.status(200).json({
      success: true,
      message: "Subscription package Updated successfully",
      data: UpdateSubscriptionData
    });
  } catch (err) {
    next(err);
  }
};
var SubscriptionPackageController = {
  SubscriptionPackageControllerPost,
  SubscriptionPackageControllerGet,
  SingleSubscriptionPackageController,
  SubscriptionPackageControllerDelete,
  SubscriptionPackageControllerUpdate
};

// src/middleware/auth.ts
import jwt from "jsonwebtoken";
var AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

// src/middleware/authorizeMiddleware.ts
var authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: "Forbidden access denied!"
      });
    }
    next();
  };
};

// src/modules/SubscriptionPackage/SubscriptionPackage.router.ts
var router = Router();
router.post("/", AuthMiddleware, authorizeRoles("ADMIN"), SubscriptionPackageController.SubscriptionPackageControllerPost);
router.get("/", AuthMiddleware, SubscriptionPackageController.SubscriptionPackageControllerGet);
router.get("/:id", AuthMiddleware, authorizeRoles("ADMIN"), SubscriptionPackageController.SingleSubscriptionPackageController);
router.delete("/delete/:id", AuthMiddleware, authorizeRoles("ADMIN"), SubscriptionPackageController.SubscriptionPackageControllerDelete);
router.put("/update/:id", AuthMiddleware, authorizeRoles("ADMIN"), SubscriptionPackageController.SubscriptionPackageControllerUpdate);
var SubscriptionPackageRouter = router;

// src/modules/Auth/Auth.router.ts
import { Router as Router2 } from "express";

// src/modules/Auth/Auth.Service.ts
import bcrypt from "bcryptjs";
import jwt2 from "jsonwebtoken";
var GetRegisterUserService = async () => {
  try {
    const GetregisterUser = await prisma.user.findMany();
    return GetregisterUser;
  } catch (err) {
    throw err;
  }
};
var RegisterService = async (data) => {
  try {
    const passwordHashed = await bcrypt.hash(data.password, 6);
    const registerUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHashed
      }
    });
    return registerUser;
  } catch (err) {
    throw err;
  }
};
var UpdateUserDataService = async (id, data) => {
  try {
    const CheckData = await prisma.user.findUnique({
      where: { id }
    });
    if (!CheckData) {
      throw new Error("User not found");
    }
    const UpdateData = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role
      }
    });
    return UpdateData;
  } catch (err) {
    throw new Error();
  }
};
var LoginService = async (data) => {
  try {
    const findEmail = await prisma.user.findUnique({
      where: { email: data.email }
    });
    if (!findEmail) {
      throw new Error("This user not exist");
    }
    const compirePassword = await bcrypt.compare(
      data.password,
      findEmail.password
    );
    if (!compirePassword) {
      throw new Error("Invalid Credintials");
    }
    const token = jwt2.sign(
      {
        id: findEmail.id,
        email: findEmail.email,
        role: findEmail.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );
    return {
      token,
      user: {
        id: findEmail.id,
        name: findEmail.name,
        email: findEmail.email,
        role: findEmail.role
      }
    };
  } catch (err) {
    throw new Error("Login failed", err.message);
  }
};
var AuthService = {
  RegisterService,
  GetRegisterUserService,
  UpdateUserDataService,
  LoginService
};

// src/modules/Auth/Auth.Controller.ts
var GetRegisterUserController = async (req, res, next) => {
  try {
    const getalluser = await AuthService.GetRegisterUserService();
    res.status(200).json({ success: true, data: getalluser });
  } catch (err) {
    next(err);
  }
  ;
};
var RegisterController = async (req, res, next) => {
  try {
    const userData = await AuthService.RegisterService(req.body);
    res.status(201).json({ success: true, data: userData });
  } catch (err) {
    next(err);
  }
  ;
};
var UpdateUserDataController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userDataupdate = await AuthService.UpdateUserDataService(id, req.body);
    res.status(200).json({
      success: true,
      message: "User Data Updated successfully",
      data: userDataupdate
    });
  } catch (err) {
    next(err);
  }
};
var LoginController = async (req, res, next) => {
  try {
    const userData = await AuthService.LoginService(req.body);
    res.status(200).json({
      success: true,
      message: "User login successfully",
      data: userData
    });
  } catch (err) {
    next(err);
  }
};
var AuthContrller = {
  RegisterController,
  GetRegisterUserController,
  UpdateUserDataController,
  LoginController
};

// src/modules/Auth/Auth.router.ts
var router2 = Router2();
router2.get("/users", AuthContrller.GetRegisterUserController);
router2.post("/register", AuthContrller.RegisterController);
router2.post("/login", AuthContrller.LoginController);
router2.put("/update/:id", AuthContrller.UpdateUserDataController);
var AuthRouter = router2;

// src/modules/UserSelectedPackage/UserSelectedPackage.router.ts
import { Router as Router3 } from "express";

// src/modules/UserSelectedPackage/UserSelectedPackage.service.ts
var getSelectedPackageByUserWise = async (userId) => {
  try {
    const getResult = await prisma.userSelectedPackage.findMany({
      where: {
        userId
      },
      include: {
        package: true
      }
    });
    return getResult;
  } catch (err) {
    throw new Error(err.message);
  }
};
var userSelectedPackageSericePost = async (userId, packageId) => {
  try {
    const CheckActivePackage = await prisma.userSelectedPackage.findFirst({
      where: {
        userId,
        isActive: true
      }
    });
    if (CheckActivePackage) {
      await prisma.userSelectedPackage.update({
        where: { id: CheckActivePackage.id },
        data: {
          isActive: false,
          packageEndDate: /* @__PURE__ */ new Date()
        }
      });
    }
    const newSubscripiton = await prisma.userSelectedPackage.create({
      data: {
        userId,
        packageId,
        packageStatDate: /* @__PURE__ */ new Date(),
        isActive: true
      }
    });
    return newSubscripiton;
  } catch (err) {
    throw new Error(err.message);
  }
};
var userSelectedPackage = {
  userSelectedPackageSericePost,
  getSelectedPackageByUserWise
};

// src/modules/UserSelectedPackage/UserSelectedPackage.controller.ts
var userSelectedPackageControllerPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { packageId } = req.body;
    if (!packageId) {
      return res.status(404).json({
        success: false,
        message: "Package id is required"
      });
    }
    const packageData = await userSelectedPackage.userSelectedPackageSericePost(
      userId,
      packageId
    );
    res.status(201).json({
      success: true,
      data: packageData,
      message: "Subscripiton package create successfully"
    });
  } catch (err) {
    next(err);
  }
};
var userSelectedPackageControllerGet = async (req, res, next) => {
  try {
    const result = await prisma.userSelectedPackage.findMany();
    console.log(result);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
var getSelectedPackageByUserWise2 = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = await userSelectedPackage.getSelectedPackageByUserWise(userId);
    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (err) {
    next(err);
  }
};
var userSelectedPackageController = {
  userSelectedPackageControllerPost,
  userSelectedPackageControllerGet,
  getSelectedPackageByUserWise: getSelectedPackageByUserWise2
};

// src/modules/UserSelectedPackage/UserSelectedPackage.router.ts
var router3 = Router3();
router3.get("/", userSelectedPackageController.userSelectedPackageControllerGet);
router3.get("/:id", AuthMiddleware, userSelectedPackageController.getSelectedPackageByUserWise);
router3.post("/", AuthMiddleware, userSelectedPackageController.userSelectedPackageControllerPost);
var UserSelectedPackageRouter = router3;

// src/modules/Folder/Folder.router.ts
import { Router as Router4 } from "express";

// src/modules/Folder/Folder.service.ts
var folderServicePost = async (data) => {
  try {
    const checkActivePackage = await prisma.userSelectedPackage.findFirst({
      where: {
        userId: data.userId,
        isActive: true
      },
      include: {
        package: true
      }
    });
    if (!checkActivePackage) {
      throw new Error("This package is not active");
    }
    await prisma.folder.updateMany({
      where: {
        userId: data.userId,
        packageId: null
      },
      data: {
        packageId: checkActivePackage.packageId
      }
    });
    const countFolder = await prisma.folder.count({
      where: {
        userId: data.userId,
        packageId: checkActivePackage.packageId
      }
    });
    if (countFolder >= checkActivePackage.package.MaxFolders) {
      throw new Error("Maximum folder limit reached");
    }
    if (data.parentFolderId) {
      const findParentFolder = await prisma.folder.findUnique({
        where: { id: data.parentFolderId }
      });
      if (!findParentFolder) {
        throw new Error("Parent folder not found");
      }
      if (checkActivePackage.package.MaxNestingFolder <= 0) {
        throw new Error("Sub folder not allowed in this package");
      }
    }
    const createfolder = await prisma.folder.create({
      data: {
        userId: data.userId,
        name: data.name,
        parentFolderId: data.parentFolderId || null
      }
    });
    return createfolder;
  } catch (err) {
    throw new Error(err.message);
  }
};
var folderServiceGet = async () => {
  try {
    const result = await prisma.folder.findMany();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
var GetUserWiseCreatedAllFolderService = async (userId) => {
  try {
    const getFolder = await prisma.folder.findMany({
      where: { userId }
    });
    return getFolder;
  } catch (err) {
    throw new Error(err.message);
  }
};
var DeleteUserWiseCreatedAllFolderService = async (userId, folderId) => {
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId }
    });
    if (!folder || folder.userId !== userId) {
      throw new Error("Not folder found and you ar not valid user in this folder");
    }
    const subFolder = await prisma.folder.findMany({
      where: { parentFolderId: folderId }
    });
    for (const sub of subFolder) {
      await DeleteUserWiseCreatedAllFolderService(userId, sub.id);
    }
    const deletedFiles = await prisma.file.deleteMany({
      where: { folderId }
    });
    const deleteFolder = await prisma.folder.delete({
      where: { id: folderId }
    });
    return { deleteFolder, deletedFiles };
  } catch (err) {
    throw new Error(err.message);
  }
};
var RenameFolderNameSerivce = async (userId, folderId, name) => {
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId }
    });
    if (!folder || folder.userId !== userId) {
      throw new Error("Not folder found and you ar not valid user in this folder");
    }
    const FolderRename = prisma.folder.update({
      where: { id: folderId },
      data: { name }
    });
    return FolderRename;
  } catch (err) {
    throw new Error(err.message);
  }
};
var folderService = {
  folderServicePost,
  RenameFolderNameSerivce,
  folderServiceGet,
  GetUserWiseCreatedAllFolderService,
  DeleteUserWiseCreatedAllFolderService
};

// src/modules/Folder/Folder.controller.ts
var FolderControllerPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, parentFolderId } = req.body;
    if (!name) {
      return res.status(404).json({
        success: false,
        message: "Folder name is required"
      });
    }
    const folderData = await folderService.folderServicePost({ userId, name, parentFolderId });
    res.status(201).json({
      success: true,
      data: folderData,
      message: "Folder created successfully"
    });
  } catch (err) {
    next(err);
  }
};
var FolderControllerGet = async (req, res, next) => {
  try {
    const result = await folderService.folderServiceGet();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
var GetUserWiseCreatedAllFolderController = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const folderResult = await folderService.GetUserWiseCreatedAllFolderService(userId);
    res.status(200).json({
      success: true,
      data: folderResult
    });
    return folderResult;
  } catch (err) {
    throw new Error(err.message);
  }
};
var DeleteUserWiseCreatedFolderController = async (req, res) => {
  try {
    const userId = req.user?.id;
    const folderId = req.params.folderId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User does not exist" });
    }
    if (!folderId) {
      return res.status(400).json({ success: false, message: "Folder id is required" });
    }
    const folderResult = await folderService.DeleteUserWiseCreatedAllFolderService(userId, folderId);
    return res.status(200).json({
      success: true,
      data: folderResult
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
var RenameFolderNameController = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const folderId = req.params.folderId;
    const { name } = req.body;
    if (!userId) {
      throw new Error("User does not exist");
    }
    if (!folderId) {
      throw new Error("Folder id is required");
    }
    const folderResult = await folderService.RenameFolderNameSerivce(userId, folderId, name);
    res.status(200).json({
      success: true,
      data: folderResult
    });
    return folderResult;
  } catch (err) {
    throw new Error(err.message);
  }
};
var folderController = {
  FolderControllerPost,
  FolderControllerGet,
  GetUserWiseCreatedAllFolderController,
  DeleteUserWiseCreatedFolderController,
  RenameFolderNameController
};

// src/modules/Folder/Folder.router.ts
var router4 = Router4();
router4.get("/", folderController.FolderControllerGet);
router4.get("/:id", folderController.GetUserWiseCreatedAllFolderController);
router4.post("/", AuthMiddleware, folderController.FolderControllerPost);
router4.delete("/delete/:folderId", AuthMiddleware, folderController.DeleteUserWiseCreatedFolderController);
router4.patch("/rename/:folderId", AuthMiddleware, folderController.RenameFolderNameController);
var FolderRouter = router4;

// src/modules/Files/Files.router.ts
import { Router as Router5 } from "express";

// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var cloudinary_default = cloudinary;

// src/modules/Files/utils/FilesCloudinery.ts
var UploadFileToCloudinery = async (buffer, fileTypeDetected) => {
  return new Promise((resolve, reject) => {
    let resourceType = "image";
    if (fileTypeDetected === "image") resourceType = "image";
    else if (fileTypeDetected === "video") resourceType = "video";
    else resourceType = "raw";
    cloudinary_default.uploader.upload_stream(
      { folder: fileTypeDetected, resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else if (!result) reject(new Error("Cloudinary Upload Failed"));
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
};

// src/modules/Files/Files.service.ts
import { v4 as uuidv4 } from "uuid";
var createFilesService = async (data) => {
  try {
    const checkActivePackage = await prisma.userSelectedPackage.findFirst({
      where: {
        userId: data.userId,
        isActive: true
      },
      include: {
        package: true
      }
    });
    const packageData = checkActivePackage?.package;
    if (!checkActivePackage) {
      throw new Error("This package is not active");
    }
    ;
    const totalUserFiles = await prisma.file.count({
      where: { userId: data.userId }
    });
    if (totalUserFiles >= packageData?.TotalFileLimit) {
      throw new Error("Total file limit exceeded");
    }
    ;
    const folderFilecount = await prisma.file.count({
      where: { folderId: data.folderId }
    });
    if (folderFilecount >= packageData?.FilePerFolder) {
      throw new Error("File per folder exceeded");
    }
    const fileSize = data.file.size / (1024 * 1024);
    if (fileSize >= packageData.MaxFileSizeMB) {
      throw new Error("File size exceeded");
    }
    const fileType = data.file.mimetype;
    let fileTypeDetected;
    if (fileType.startsWith("image")) {
      fileTypeDetected = "image";
    } else if (fileType.startsWith("video")) {
      fileTypeDetected = "video";
    } else if (fileType.startsWith("audio")) {
      fileTypeDetected = "audio";
    } else if (fileType === "application/pdf") {
      fileTypeDetected = "pdf";
    } else {
      throw new Error("Unsupported file type");
    }
    if (!packageData?.AllowedFileTypes.includes(fileTypeDetected)) {
      throw new Error("This file type is not allowed on you package");
    }
    const fileUrl = await UploadFileToCloudinery(
      data.file.buffer,
      fileTypeDetected
    );
    const uploadfile = await prisma.file.create({
      data: {
        originalFileName: data.file.originalname,
        renameFileName: `${uuidv4()}-${data.file.originalname}`,
        filePath: fileUrl,
        uploadFilePath: data.file.size,
        uploadFileTypes: fileTypeDetected,
        userId: data.userId,
        folderId: data.folderId
      }
    });
    return uploadfile;
  } catch (err) {
    throw new Error(err.message);
  }
};
var GetAllfilesService = async () => {
  try {
    const result = await prisma.file.findMany();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
var GetUserWiseUploadedFilesService = async (userId, folderId) => {
  try {
    const getFiles = await prisma.file.findMany({
      where: {
        userId,
        folderId
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return getFiles;
  } catch (err) {
    throw new Error(err.message);
  }
};
var DeleteUserWiseCreatedAllFilesService = async (userId, fileId) => {
  try {
    const filesData = await prisma.file.findUnique({
      where: { id: fileId }
    });
    if (!filesData || filesData.userId !== userId) {
      throw new Error("Not file found and you ar not valid user.");
    }
    const deletefile = prisma.file.delete({
      where: { id: fileId }
    });
    return deletefile;
  } catch (err) {
    throw new Error(err.message);
  }
};
var RenameFileNameSerivce = async (userId, fileId, originalFileName) => {
  try {
    const fileData = await prisma.file.findUnique({
      where: { id: fileId }
    });
    if (!fileData || fileData.userId !== userId) {
      throw new Error("File not found you are not authorized user ");
    }
    const fileRename = await prisma.file.update({
      where: { id: fileId },
      data: {
        originalFileName,
        renameFileName: `${uuidv4()}-${originalFileName}`
      }
    });
    return fileRename;
  } catch (err) {
    throw new Error(err.message);
  }
};
var FilesService = {
  createFilesService,
  GetAllfilesService,
  GetUserWiseUploadedFilesService,
  DeleteUserWiseCreatedAllFilesService,
  RenameFileNameSerivce
};

// src/modules/Files/Files.controller.ts
var createFilesController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const packageId = req.params.id;
    const folderId = req.params.id;
    const file = req.file;
    if (!file) {
      throw new Error("File not uploaded");
    }
    const fileData = await FilesService.createFilesService({ userId, packageId, folderId, file });
    res.status(201).json({
      success: true,
      data: fileData,
      message: "File uplaod successfully"
    });
  } catch (err) {
    next(err);
  }
};
var GetAllfilesController = async (req, res, next) => {
  try {
    const result = await FilesService.GetAllfilesService();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
var GetUserWiseUploadedFilesController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const folderId = req.params.folderId;
    const result = await FilesService.GetUserWiseUploadedFilesService(userId, folderId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var DeleteUserWiseUploadedFilesController = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const fileId = req.params.fileId;
    if (!userId) {
      throw new Error("User does not exist");
    }
    if (!fileId) {
      throw new Error("File id is required");
    }
    const fileResult = await FilesService.DeleteUserWiseCreatedAllFilesService(userId, fileId);
    res.status(200).json({
      success: true,
      data: fileResult
    });
    return fileResult;
  } catch (err) {
    next(err);
  }
};
var RenameFilesNameController = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const fileId = req.params.fileId;
    const { originalFileName } = req.body;
    const fileResult = await FilesService.RenameFileNameSerivce(userId, fileId, originalFileName);
    res.status(200).json({
      success: true,
      data: fileResult,
      message: "File renamed successfully"
    });
    return fileResult;
  } catch (err) {
    next(err);
  }
};
var FilesController = {
  createFilesController,
  GetAllfilesController,
  GetUserWiseUploadedFilesController,
  DeleteUserWiseUploadedFilesController,
  RenameFilesNameController
};

// src/middleware/multer.ts
import multer from "multer";
var storage = multer.memoryStorage();
var upload = multer({ storage });
var multer_default = upload;

// src/modules/Files/Files.router.ts
var router5 = Router5();
router5.get("/", FilesController.GetAllfilesController);
router5.get("/:folderId", AuthMiddleware, FilesController.GetUserWiseUploadedFilesController);
router5.post("/upload/:id", AuthMiddleware, multer_default.single("file"), FilesController.createFilesController);
router5.delete("/delete/:fileId", AuthMiddleware, FilesController.DeleteUserWiseUploadedFilesController);
router5.patch("/rename/:fileId", AuthMiddleware, FilesController.RenameFilesNameController);
var FilesRouter = router5;

// src/middleware/globalErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorMessage = "Internal server error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Invalid input data or missing required fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    statusCode = 500;
    errorMessage = "Database connection failed. Please try again later.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = `Duplicate value for field: ${err.meta?.target}`;
    } else if (err.code === "P2025") {
      statusCode = 404;
      errorMessage = "Record not found";
    } else {
      statusCode = 400;
      errorMessage = "Database request error";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = "Database engine crashed. Please contact support.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 404;
      errorMessage = "Record not found";
    } else if (err.code === "P2003") {
      statusCode = 409;
      errorMessage = "Cannot delete because related data exists";
    }
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    ...process.env.NODE_ENV === "development" && { error: err.message }
  });
};

// src/middleware/NotFound404.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl
  });
}

// src/app.ts
var app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/subscription/package", SubscriptionPackageRouter);
app.use("/auth", AuthRouter);
app.use("/selected/package", UserSelectedPackageRouter);
app.use("/folder", FolderRouter);
app.use("/files", FilesRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(notFound);
app.use(globalErrorHandler);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
