import { useState, useEffect } from "react";
import { Task } from "@/lib/types";

interface TaskFormProps {
  onSave: (task: Task) => void;
  taskToEdit?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Completada" | "Pendiente">("Pendiente");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status!);
      setDueDate(taskToEdit.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pendiente");
      setDueDate("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: Task = {
      id: taskToEdit ? taskToEdit.id : crypto.randomUUID(),
      title,
      description,
      status,
      dueDate: dueDate || undefined,
    };
    onSave(updatedTask);
    setTitle("");
    setDescription("");
    setStatus("Pendiente");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 max-w-md mx-auto"
    >
      <h2 className="text-center text-2xl font-semibold text-white mb-6">
        {taskToEdit ? "Editar Tarea" : "Nueva Tarea"}
      </h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        className="border border-gray-700 bg-gray-900 text-gray-200 rounded w-full p-3 mb-4 focus:outline-none focus:border-blue-500"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción de la tarea"
        className="border border-gray-700 bg-gray-900 text-gray-200 rounded w-full p-3 mb-4 focus:outline-none focus:border-blue-500"
        rows={4}
        required
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "Completada" | "Pendiente")
        }
        className="border border-gray-700 bg-gray-900 text-gray-200 rounded w-full p-3 mb-4 focus:outline-none focus:border-blue-500"
      >
        <option value="Pendiente">Pendiente</option>
        <option value="Completada">Completada</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-700 bg-gray-900 text-gray-200 rounded w-full p-3 mb-4 focus:outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition duration-300"
      >
        {taskToEdit ? "Actualizar Tarea" : "Agregar Tarea"}
      </button>
    </form>
  );
};

export default TaskForm;
