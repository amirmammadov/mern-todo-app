import { useNavigate } from "react-router-dom";
import TaskDetail from "../../molecules/TaskDetail/TaskDetail";

import "./TaskDetailPage.scss";

const TaskDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="task-detail-page">
      <h2 className="task-detail-page__title">Task Detail Page</h2>
      <TaskDetail />
      <button onClick={() => navigate(-1)} className="task-detail-page__btn">
        Go back
      </button>
    </div>
  );
};

export default TaskDetailPage;
