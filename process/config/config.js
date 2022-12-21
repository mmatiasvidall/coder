import * as dotenv from "dotenv";
dotenv.config({});

export default {
  mongoDB: {
    uri: "mongodb://" + process.env.MONGO_LOCAL,
    options: {
      serverSelectionTimeoutMS: 5000,
    },
  },
};
