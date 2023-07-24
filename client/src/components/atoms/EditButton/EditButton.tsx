import "./EditButton.scss";

interface EditButtonProps {
  id: number;
  onEdit: (id: number) => void;
}

const EditButton = ({ id, onEdit }: EditButtonProps) => {
  return (
    <button className="edit-button" onClick={() => onEdit(id)}>
      Edit
    </button>
  );
};

export default EditButton;
