import { mergeTypeDefs } from "@graphql-tools/merge";   
import userTypeDef from "./user.typeDef";
import creatorTypeDef from "./creator.typeDef";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, creatorTypeDef]);

export default mergedTypeDefs;