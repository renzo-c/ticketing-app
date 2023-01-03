import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  // - "this" represents the User Document that is being saved
  // - Conditional to avoid hashing a hashed password when
  // the request is for an updated email, and not password
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// Workaround so TS checks that we are providing
// the correct properties to create a new user
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

console.log({ test: JSON.stringify(userSchema) });
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
