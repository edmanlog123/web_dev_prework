import passport from "passport";
import bcrypt from "bcryptjs"

import User from "../models/user.model"
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { info: false, message: "Incorrect username." });
        }
        if (typeof user.password !== "string") {
          return done(null, false, { info: false, message: "Invalid user password type." });
        }
        const isMatch = await bcrypt.compare(String(password), String(user.password));
        if (!isMatch) {
          return done(null, false, { info: false, message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};