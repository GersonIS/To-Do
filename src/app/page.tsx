"use client";
import { useState, useEffect } from "react";
import { Task } from "../lib/types";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<
    "Todos" | "Completada" | "Pendiente"
  >("Todos");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSave = (newTask: Task) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...newTask } : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddNewTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const filteredTasks =
    filterStatus === "Todos"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-white">
        Lista de Tareas
      </h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={handleAddNewTask}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Crear Nueva Tarea
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="filter" className="text-white font-medium mb-2 block">
          Filtrar por estado:
        </label>
        <select
          id="filter"
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value as "Todos" | "Completada" | "Pendiente"
            )
          }
          className="w-full p-2 rounded-lg border-2 border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500 transition duration-300"
        >
          <option value="Todos">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Completada">Completada</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-400 text-center">
            No hay tareas que coincidan con el filtro.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm onSave={handleSave} taskToEdit={editingTask} />
      </Modal>
    </div>
  );
}
