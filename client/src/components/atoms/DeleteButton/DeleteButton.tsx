import "./DeleteButton.scss";

interface DeleteButtonProps {
  onDelete: (id: number) => void;
  id: number;
}

const DeleteButton = ({ id, onDelete }: DeleteButtonProps) => {
  return (
    <button className="delete-button" onClick={() => onDelete(id)}>
      Delete
    </button>
  );
};

export default DeleteButton;
