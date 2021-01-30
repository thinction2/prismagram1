import { prisma } from "../../../server";

export default {
  Query: {
    allUsers: () => prisma.user.findMany(),
  },
};
