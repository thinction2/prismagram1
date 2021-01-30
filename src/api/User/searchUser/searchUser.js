import { prisma } from "../../../server";

export default {
  Query: {
    searchUser: async (_, args) => {
      const { term } = args;
      return await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: term } },
            { firstName: { contains: term } },
            { lastName: { contains: term } },
          ],
        },
      });
    },
  },
};
