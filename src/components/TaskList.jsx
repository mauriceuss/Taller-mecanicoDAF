import TaskCard from './TaskCard';
import './TaskList.css';

function TaskList({ tasks, onEdit, onDelete }) {
    if (tasks.length === 0) {
        return null;
    }

    return (
        <div className="task-list">
            {tasks.map((task, index) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    style={{ animationDelay: `${index * 0.05}s` }}
                />
            ))}
        </div>
    );
}

export default TaskList;
