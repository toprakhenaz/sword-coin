import { PrismaClient } from "@prisma/client";
import { constants } from "buffer";

const prisma : PrismaClient = new PrismaClient();

export default prisma;