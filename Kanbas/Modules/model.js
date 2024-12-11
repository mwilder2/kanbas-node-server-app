import mongoose from "mongoose";
import schema from "./schema.js";

// Create a Mongoose model to interact with the 'modules' collection
const model = mongoose.model("ModuleModel", schema);

export default model;
