import { prisma } from "../../../server";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, args, { pubsub }) => {
        const { roomId } = args;
        return pubsub.asyncIterator(`NEW_MESSAGE_${roomId}`);
      },
      resolve: (payload) => payload.newMessage,
    },
  },
};
