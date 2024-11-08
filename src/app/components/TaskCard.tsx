import { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const currentDate = new Date();
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;

  let statusMessage = "";

  if (dueDate) {
    const timeDiff = dueDate.getTime() - currentDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

    if (dayDiff === 0) {
      statusMessage = "¡Hoy es el día de entrega!";
    } else if (dayDiff < 0) {
      statusMessage = `Retrasada por ${Math.abs(dayDiff)} días`;
    } else {
      statusMessage = `Faltan ${dayDiff} días`;
    }
  }

  return (
    <div className="border border-gray-700 rounded-lg p-4 mb-4 bg-gray-900 shadow-md">
      <h3 className="text-xl font-semibold text-white mb-2">{task.title}</h3>
      <p className="text-gray-300 mb-2">{task.description}</p>

      <p className="text-sm text-gray-400 mb-1">
        Estado:
        <span
          className={`ml-2 font-medium ${
            task.status === "Completada" ? "text-green-400" : "text-yellow-400"
          }`}
        >
          {task.status}
        </span>
      </p>

      {task.dueDate && (
        <p className="text-sm text-gray-400 mb-4">
          Fecha de vencimiento:{" "}
          <span className="font-medium">{task.dueDate}</span>
        </p>
      )}
      {task.dueDate && (
        <p
          className={`text-sm mb-4 ${
            statusMessage.includes("Retrasada")
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {statusMessage}
        </p>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-400 hover:text-blue-500 font-medium transition duration-300"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-400 hover:text-red-500 font-medium transition duration-300"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
