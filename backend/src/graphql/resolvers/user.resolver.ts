import users from "../../dummy/data";
// Placeholder context types (can expand later)
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
    authUser: () => {
      // Placeholder auth logic — return first user for now
      return users[0]; // Replace later with real auth
    },

    user: (_: any, { userId }: { userId: string }) => {
      return users.find((user) => user._id === userId) || null;
    },
  },

  Mutation: {
    signUp: (_: any, { input }: { input: SignUpInput }) => {
      const { username, name, password, gender } = input;

      // Check if username exists
      const exists = users.some((u) => u.username === username);
      if (exists) throw new Error("Username already taken.");

      const newUser = {
        _id: (users.length + 1).toString(),
        username,
        name,
        password, // In production: NEVER store plain passwords
        gender,
        profilePicture: `https://avatar.iran.liara.run/public/${
          gender === "male" ? "boy" : "girl"
        }?username=${username}`,
        savedCreators: [],
      };

      users.push(newUser);
      return newUser;
    },

    login: (_: any, { input }: { input: LoginInput }) => {
      const { username, password } = input;
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) throw new Error("Invalid username or password.");
      return user;
    },

    logout: () => {
      // Placeholder logout message
      return { message: "Logged out successfully (dummy)" };
    },
  },
};

export default userResolver;

