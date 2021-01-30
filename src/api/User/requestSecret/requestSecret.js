import { prisma } from "../../../server";
import { generateSecret } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(loginSecret);
      try {
        await prisma.user.update({
          where: { email },
          data: { loginSecret },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
