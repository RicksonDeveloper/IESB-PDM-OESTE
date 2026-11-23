import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TasksProvider } from '../store/tasks-context';

export default function RootLayout() {
  return (
    <TasksProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F7F7FB' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="task/[id]"
          options={{ headerShown: true, title: 'Detalhe da tarefa', headerBackTitle: 'Voltar' }}
        />
        <Stack.Screen
          name="new-task"
          options={{ presentation: 'modal', headerShown: false, animation: 'slide_from_bottom' }}
        />
      </Stack>
    </TasksProvider>
  );
}
