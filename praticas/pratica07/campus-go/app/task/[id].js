import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.screen}>
      <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={21} color="#39384D" /><Text style={styles.backText}>Voltar</Text></Pressable>
      <View style={styles.icon}><Ionicons name="checkbox" size={34} color="#6759D4" /></View>
      <Text style={styles.eyebrow}>DETALHE DA TAREFA</Text>
      <Text style={styles.title}>Tarefa #{Array.isArray(id) ? id[0] : id}</Text>
      <Text style={styles.description}>Esta tarefa foi aberta pela rota dinâmica do CampusGo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, paddingTop: 65 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  backText: { color: '#39384D', fontSize: 15, fontWeight: '600' },
  icon: { width: 68, height: 68, borderRadius: 22, backgroundColor: '#EAE8FB', alignItems: 'center', justifyContent: 'center', marginTop: 72, marginBottom: 24 },
  eyebrow: { color: '#85849A', fontSize: 11, fontWeight: '700', letterSpacing: 1.3 },
  title: { color: '#202033', fontSize: 29, fontWeight: '800', marginTop: 8 },
  description: { color: '#85849A', fontSize: 15, lineHeight: 23, marginTop: 12 },
});
