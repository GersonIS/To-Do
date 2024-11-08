export interface Task {
  id: string;
  title: string;
  description: string;
  status?: "Completada" | "Pendiente";
  dueDate?: string;
}
