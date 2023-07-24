import User from "../models/User.js";
import Todo from "../models/Todo.js";

export const GetTodos = async (req, res) => {
  try {
    const { userID } = req.params;

    const todos = await Todo.find({ userID });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const GetTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    res.status(200).json(todo.title);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const CreateTodo = async (req, res) => {
  try {
    const { userID, title } = req.body;

    const user = await User.findById(userID);

    const newTodo = new Todo({
      userID,
      username: user.username,
      title,
    });

    await newTodo.save();

    const todos = await Todo.find({ userID });

    res.status(201).json(todos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const UpdateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const { title } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title },
      {
        run: true,
        runValidators: true,
      }
    );

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const DeleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    res.status(202).json(id);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
