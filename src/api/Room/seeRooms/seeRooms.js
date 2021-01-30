import { prisma } from "../../../server";

export default {
  Query: {
    seeRooms: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return await prisma.room.findMany({
        where: {
          participants: { some: { id: user.id } },
        },
        include: {
          participants: true,
        },
      });
    },
  },
};
