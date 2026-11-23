import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../store/tasks-context';

export default function NewTaskScreen() {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  function handleCreate() {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      Alert.alert('Falta um título', 'Escreva o que você precisa fazer.');
      return;
    }
    addTask(normalizedTitle);
    router.back();
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.grabber} />
      <Pressable onPress={() => router.back()} style={styles.close} accessibilityLabel="Fechar">
        <Ionicons name="close" size={23} color="#5D5D70" />
      </Pressable>
      <Text style={styles.eyebrow}>UM PASSO DE CADA VEZ</Text>
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.subtitle}>O que você quer realizar?</Text>
      <TextInput
        autoFocus
        value={title}
        onChangeText={setTitle}
        placeholder="Ex.: estudar na biblioteca"
        placeholderTextColor="#AAA9B8"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={handleCreate}
        maxLength={100}
      />
      <Pressable onPress={handleCreate} style={styles.submit}><Text style={styles.submitText}>Adicionar tarefa</Text></Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 24, paddingTop: 12, backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  grabber: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: '#E1E0E8', marginBottom: 20 },
  close: { alignSelf: 'flex-end', width: 40, height: 40, borderRadius: 14, backgroundColor: '#F1F1F6', alignItems: 'center', justifyContent: 'center' },
  eyebrow: { color: '#85849A', fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginTop: 20 },
  title: { color: '#202033', fontSize: 30, fontWeight: '800', marginTop: 5 },
  subtitle: { color: '#85849A', fontSize: 15, marginTop: 8, marginBottom: 22 },
  input: { height: 56, paddingHorizontal: 16, borderRadius: 15, borderWidth: 1, borderColor: '#E6E5EF', color: '#252438', fontSize: 15 },
  submit: { height: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#6759D4', marginTop: 16 },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});
