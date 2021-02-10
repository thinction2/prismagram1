import { prisma } from "../../../server";
import { generateSecret } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await prisma.user.update({
          where: { email },
          data: { loginSecret },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
