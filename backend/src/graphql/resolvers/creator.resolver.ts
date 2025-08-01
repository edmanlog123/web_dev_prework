import CreatorModel from "../../models/creator.model";
import type { ICreator } from "../../models/creator.model";
import { fetchCreatorSuggestion } from "../../services/geminiService";
import { getTop5Thumbnails } from '../../services/googleImage';
import { Types } from "mongoose";

interface GraphQLContext {
  getUser: () => { _id: string } | null;
}

interface LinkInput {
  type: string;
  url: string;
}

interface CreatorInput {
  name: string;
  links?: LinkInput[]
  bio?: string;
  image?: string;
}

interface UpdateCreatorInput {
  name?: string;
  links?: LinkInput[]
  bio?: string;
  image?: string;
}

const creatorResolver = {
  Query: {
    allCreators: async (_: any, __: any, context: GraphQLContext): Promise<ICreator[]> => {
      const user = context.getUser();
      if (!user) throw new Error("Unauthorized");

      return await CreatorModel.find({ userId: user._id });
    },

    creator: async (_: any, { creatorId }: { creatorId: string }, context: GraphQLContext): Promise<ICreator | null> => {
      const user = context.getUser();
      if (!user) throw new Error("Unauthorized");

      return await CreatorModel.findOne({ _id: creatorId, userId: user._id });
    },

    getCreatorSuggestion: async (
      _: any,
      { name }: { name: string },
      context: GraphQLContext
    ): Promise<ICreator> => {
      const user = context.getUser();
      if (!user) throw new Error("Unauthorized");
    
      const result = await fetchCreatorSuggestion(name);

      const thumbnails = await getTop5Thumbnails(name);

      return {
        _id: new Types.ObjectId(), // temporary ID since this is not from Mongo
        name,
        userId: new Types.ObjectId(user._id),
        bio: result.bio || "",
        image: thumbnails[0] || "",
        links: result.links || [],
      };
    },
    
  },

  Mutation: {
    createCreator: async (_: any, { input }: { input: CreatorInput }, context: GraphQLContext): Promise<ICreator> => {
      const user = context.getUser();
      if (!user) throw new Error("Unauthorized");

      const newCreator = new CreatorModel({ ...input, userId: user._id });
      await newCreator.save();
      return newCreator;
    },

    updateCreator: async (_: any, { creatorId, input }: { creatorId: string, input: UpdateCreatorInput }, context: GraphQLContext): Promise<ICreator> => {
      const user = context.getUser();
      if (!user) throw new Error("Unauthorized");

      const updated = await CreatorModel.findOneAndUpdate(
        { _id: creatorId, userId: user._id },
        input,
        { new: true }
      );

      if (!updated) throw new Error("Creator not found or unauthorized");

      return updated;
    },

    deleteCreator: async (_: any, { creatorId }: { creatorId: string }, context: GraphQLContext): Promise<ICreator> => {
      const user = context.getUser();
      if (!user) throw new Error("Unauthorized");

      const deleted = await CreatorModel.findOneAndDelete({ _id: creatorId, userId: user._id });
      if (!deleted) throw new Error("Creator not found or unauthorized");

      return deleted;
    },
  },
};

export default creatorResolver;
