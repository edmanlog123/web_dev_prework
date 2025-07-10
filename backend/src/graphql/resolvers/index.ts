import userResolver from "./user.resolver";
import creatorResolver from "./creator.resolver";
import { mergeResolvers } from "@graphql-tools/merge";

const mergedResolvers = mergeResolvers([userResolver, creatorResolver]);

export default mergedResolvers;