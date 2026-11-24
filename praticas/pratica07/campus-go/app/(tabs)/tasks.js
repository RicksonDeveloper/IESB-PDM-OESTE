import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTasks } from '../../store/tasks-context';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const { tasks, completeTask } = useTasks();
  const [filter, setFilter] = useState('Todas');
  const visibleTasks = filter === 'Pendentes' ? tasks.filter((task) => !task.completed) : tasks;

  async function handleComplete(task) {
    try { await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); } catch {}
    completeTask(task.id);
    Alert.alert('Tarefa concluída', `Boa! Você concluiu “${task.title}”.`);
  }

  async function handleReminder(task) {
    try {
      const scheduled = await scheduleReminder(task.title, 10);
      Alert.alert(scheduled ? 'Lembrete agendado' : 'Permissão necessária', scheduled ? 'Você receberá um lembrete em cerca de 10 segundos.' : 'Ative as notificações para receber lembretes.');
    } catch {
      Alert.alert('Não foi possível agendar', 'Tente novamente em alguns instantes.');
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View><Text style={styles.eyebrow}>ORGANIZE SEU DIA</Text><Text style={styles.title}>Tarefas</Text></View>
        <Link href="/new-task" asChild>
          <Pressable style={styles.addButton} accessibilityRole="button" accessibilityLabel="Nova tarefa">
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </Pressable>
        </Link>
      </View>
      <View style={styles.filters}>
        {['Todas', 'Pendentes'].map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]}>
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Tudo em dia por aqui ✨</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable onPress={() => handleComplete(item)} style={[styles.check, item.completed && styles.checked]} accessibilityLabel="Concluir tarefa">
              {item.completed && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
            </Pressable>
            <View style={styles.taskCopy}>
              <Text style={[styles.taskTitle, item.completed && styles.completed]}>{item.title}</Text>
              <Link href={`/task/${item.id}`} asChild><Pressable><Text style={styles.detail}>Ver detalhes · #{item.id}</Text></Pressable></Link>
              {!item.completed && <Pressable onPress={() => handleReminder(item)}><Text style={styles.reminder}>Lembrete em 10 s</Text></Pressable>}
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A5A5B2" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 22, paddingTop: 64 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  eyebrow: { color: '#85849A', fontSize: 11, fontWeight: '700', letterSpacing: 1.3 },
  title: { color: '#202033', fontSize: 30, fontWeight: '800', marginTop: 4 },
  addButton: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6759D4' },
  filters: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  filter: { borderRadius: 20, paddingHorizontal: 17, paddingVertical: 9, backgroundColor: '#ECECF3' },
  filterActive: { backgroundColor: '#6759D4' },
  filterText: { color: '#737387', fontWeight: '700', fontSize: 13 },
  filterTextActive: { color: '#FFFFFF' },
  list: { gap: 12, paddingBottom: 20 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 18, backgroundColor: '#FFFFFF' },
  check: { width: 23, height: 23, borderWidth: 1.5, borderColor: '#D7D6E4', borderRadius: 8, marginRight: 13 },
  checked: { borderColor: '#6759D4', backgroundColor: '#6759D4', alignItems: 'center', justifyContent: 'center' },
  taskCopy: { flex: 1 },
  taskTitle: { color: '#252438', fontSize: 15, fontWeight: '700' },
  completed: { color: '#9B9AA7', textDecorationLine: 'line-through' },
  detail: { color: '#88879A', fontSize: 12, marginTop: 5 },
  reminder: { color: '#6759D4', fontSize: 12, fontWeight: '700', marginTop: 9 },
  empty: { color: '#88879A', textAlign: 'center', padding: 30 },
});
