export interface FormProps {
  onSubmit: (username: string, password: string) => void;
}

export interface TodosProps {
  _id: number;
  userID: number;
  username: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export interface StateProps {
  user: string;
  token: string;
  userID: number;
  todos: TodosProps[];
}
