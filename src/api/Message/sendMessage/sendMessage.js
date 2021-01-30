import { prisma } from "../../../server";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated, pubsub }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (roomId === undefined) {
        if (user.id !== toId) {
          room = await prisma.room.create({
            data: {
              participants: {
                connect: [{ id: user.id }, { id: toId }],
              },
            },
            include: { participants: true },
          });
        }
      } else {
        room = await prisma.room.findUnique({
          where: {
            id: roomId,
          },
          include: { participants: true },
        });
      }
      if (!room) {
        throw Error("Room not found");
      }
      const getTo = room.participants.filter(
        (participants) => participants.id !== user.id
      )[0];
      const newMessage = prisma.message.create({
        data: {
          text: message,
          from: {
            connect: { id: user.id },
          },
          to: {
            connect: { id: roomId ? getTo.id : toId },
          },
          room: {
            connect: {
              id: room.id,
            },
          },
        },
      });
      pubsub.publish(`NEW_MESSAGE_${roomId}`, { newMessage: newMessage });
      return newMessage;
    },
  },
};
