import { prisma } from "../../../server";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id } = args;
      const canSee = await prisma.room.findMany({
        where: { participants: { some: { id: user.id } } },
      });
      if (canSee) {
        const room = await prisma.room.findUnique({
          where: { id },
          include: { participants: true },
        });
        const messages = await prisma.message.findMany({
          where: { roomId: id },
          include: { to: true, from: true },
        });
        return { room, messages };
      } else {
        throw Error("You can't see this");
      }
    },
  },
};
