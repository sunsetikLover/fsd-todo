import './styles/reset.css'
import './styles/globals.css'
import s from './page.module.css'
import { AddTaskForm } from '@/features/add-task/ui/AddTaskForm';
import { TaskList } from '@/features/task/ui/task-list/TaskList';

export default function Home() {
  return (
    <div className={`${s.wrapper} container`}>
      <AddTaskForm />
      <TaskList />
    </div>
  );
}
