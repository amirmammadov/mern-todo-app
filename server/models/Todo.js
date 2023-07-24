import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, "Please,provide userID"],
    },
    username: {
      type: String,
      required: [true, "Please,provide username"],
    },
    title: {
      type: String,
      required: [true, "Please,provide the title!"],
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
