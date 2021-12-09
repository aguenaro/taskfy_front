import { Task } from './Task';

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}
