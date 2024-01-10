import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

// telling jest that we are mocking the file in this location
// jest then will take the file located in the __mocks__ folder instead
jest.mock("../nats-wrapper");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdaf";
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks(); // to ensure that new assertions will not be polluted with results from previous tests, like toHaveBeenCalled assertion.
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
    await mongo.connection.close();
  }
});

// Overall purpose of this function is to create a cookie
// Unlike in auth service, we do not have the signup endpoint available.
// Then we are creating our own cookie from scratch.
global.signin = () => {
  // build the jwt payload (id and password)
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    password: "test123",
  };
  // create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build session object {jwt: MY_JWT}
  const session = { jwt: token };
  // turn that session into a json Object
  const sessionJSON = JSON.stringify(session);
  // take session and encode it as a base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string, which is the cookie with the encoded data
  return [`session=${base64}`];
};
