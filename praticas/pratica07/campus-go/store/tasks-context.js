import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_STORAGE_KEY = '@campusgo:tasks';
const TasksContext = createContext(null);
const starterTasks = [
  { id: '42', title: 'Conhecer a biblioteca', completed: false },
  { id: '43', title: 'Conferir os avisos do campus', completed: false },
];

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(starterTasks);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(TASKS_STORAGE_KEY)
      .then((stored) => {
        if (!isMounted || !stored) return;
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setTasks(parsed);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setIsReady(true);
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (isReady) AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks)).catch(() => {});
  }, [isReady, tasks]);

  const value = useMemo(() => ({
    tasks,
    addTask(title) {
      setTasks((current) => [{ id: String(Date.now()), title: title.trim(), completed: false }, ...current]);
    },
    completeTask(id) {
      setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: true } : task));
    },
  }), [tasks]);

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks precisa ser usado dentro de TasksProvider.');
  return context;
}
