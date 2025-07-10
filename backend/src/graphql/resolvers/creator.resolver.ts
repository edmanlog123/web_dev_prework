import { creators } from "../../dummy/data";

const creatorResolver = {
  Query: {
    allCreators: () => {
      return creators;
    },
    creator: (_: any, args: { creatorId: string }) => {
      return creators.find((c) => c._id === args.creatorId);
    }
  },
};

export default creatorResolver;