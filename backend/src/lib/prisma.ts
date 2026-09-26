// One shared Prisma client for the whole server. Creating a client per request
// would open a new pool of database connections each time.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
