import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import { GraphQLContext } from "../types/context";
import { IUser } from "../../models/user.model";
import CreatorModel, { ICreator } from "../../models/creator.model";

interface SignUpInput {
  username: string;
  name: string;
  password: string;
  gender: string;
}

interface LoginInput {
  username: string;
  password: string;
}

const userResolver = {
  Query: {
    authUser: async (_parent: any, _args: any, context: GraphQLContext): Promise<IUser | null> => {
      try {
        const user = context.getUser();
        if (!user) {
          return null;
        }
        // Fetch the full user document from database
        const fullUser = await User.findById(user._id);
        return fullUser;
      } catch (err: unknown) {
        console.error("Error in authUser: ", err);
        throw new Error("Internal server error");
      }
    },

    user: async (_parent: any, { userId }: { userId: string }): Promise<IUser | null> => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err: unknown) {
        console.error("Error in user query:", err);
        const errorMessage = err instanceof Error ? err.message : "Error getting user";
        throw new Error(errorMessage);
      }
    },
  },

  User: {
    savedCreators: async (parent: IUser): Promise<ICreator[]> => {
      try {
        if (!parent.savedCreators || parent.savedCreators.length === 0) {
          return [];
        }
        const creators = await CreatorModel.find({ _id: { $in: parent.savedCreators } });
        return creators;
      } catch (err: unknown) {
        console.error("Error in user.savedCreators resolver: ", err);
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        throw new Error(errorMessage);
      }
    },
  },

  Mutation: {
    signUp: async (_: any, { input }: { input: SignUpInput }, context: GraphQLContext): Promise<IUser> => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        // Validate gender
        if (!["male", "female"].includes(gender)) {
          throw new Error("Gender must be either 'male' or 'female'");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("Username already taken.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err: unknown) {
        console.error("Error in signUp: ", err);
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        throw new Error(errorMessage);
      }
    },

    login: async (_: any, { input }: { input: LoginInput }, context: GraphQLContext): Promise<IUser> => {
      try {
        const { username, password } = input;
        if (!username || !password) {
          throw new Error("All fields are required");
        }
        const { user, info } = await context.authenticate("graphql-local", { username, password });
        if (!user) {
          let message = "Invalid username or password.";
          if (info && typeof info === "object" && "message" in info) {
            message = (info as any).message;
          } else if (typeof info === "string") {
            message = info;
          }
          throw new Error(message);
        }
        await context.login(user);
        return user;
      } catch (err: unknown) {
        console.error("Error in login:", err);
        const errorMessage = err instanceof Error ? err.message : "Invalid username or password";
        throw new Error(errorMessage);
      }
    },

    logout: async (_: any, __: any, context: GraphQLContext): Promise<{ message: string }> => {
      try {
        await context.logout();
        // Properly handle session destruction
        const req = context.req as import("express").Request;
        const res = context.res as import("express").Response;
        return new Promise((resolve, reject) => {
          req.session.destroy((err: any) => {
            if (err) {
              console.error("Error destroying session:", err);
              reject(new Error("Failed to destroy session"));
            } else {
              res.clearCookie("connect.sid");
              resolve({ message: "Logged out successfully" });
            }
          });
        });
      } catch (err: unknown) {
        console.error("Error in logout:", err);
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        throw new Error(errorMessage);
      }
    },
  },
};

export default userResolver;

