import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  BUTTON_LABEL,
  LIST_TITLE,
  SWITCH_LABEL,
  EMPTY_LIST_MESSAGE,
} from './labels';

export default function App() {
  const [disciplina, setDisciplina] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [somenteObrigatorias, setSomenteObrigatorias] = useState(false);
  const [botaoPressionado, setBotaoPressionado] = useState(false);

  function adicionarDisciplina() {
    const nome = disciplina.trim();
    if (nome.length === 0) return;

    const novaDisciplina = {
      id: Date.now().toString(),
      nome,
      // Regra simples só para exemplificar o switch:
      // toda disciplina adicionada é considerada obrigatória.
      // Você pode trocar isso por um segundo campo/switch se quiser.
      obrigatoria: true,
    };

    setDisciplinas((lista) => [...lista, novaDisciplina]);
    setDisciplina('');
  }

  const listaFiltrada = somenteObrigatorias
    ? disciplinas.filter((d) => d.obrigatoria)
    : disciplinas;

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{APP_TITLE}</Text>
      </View>

      {/* Linha do formulário: input + botão */}
      <View style={styles.formRow}>
        <TextInput
          style={styles.input}
          placeholder={INPUT_PLACEHOLDER}
          placeholderTextColor="#999"
          value={disciplina}
          onChangeText={setDisciplina}
        />
        <TouchableOpacity
          style={[styles.button, botaoPressionado && styles.buttonPressed]}
          onPressIn={() => setBotaoPressionado(true)}
          onPressOut={() => setBotaoPressionado(false)}
          onPress={adicionarDisciplina}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{BUTTON_LABEL}</Text>
        </TouchableOpacity>
      </View>

      {/* Switch de filtro */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>{SWITCH_LABEL}</Text>
        <Switch
          value={somenteObrigatorias}
          onValueChange={setSomenteObrigatorias}
        />
      </View>

      {/* Lista de disciplinas */}
      <Text style={styles.listTitle}>{LIST_TITLE}</Text>
      <ScrollView style={styles.list}>
        {listaFiltrada.length === 0 ? (
          <Text style={styles.emptyText}>{EMPTY_LIST_MESSAGE}</Text>
        ) : (
          listaFiltrada.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{item.nome}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container geral: coluna, ocupa toda a tela
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  // Linha do formulário: flexDirection 'row' para input + botão lado a lado
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flexBasis: '70%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginRight: '2%',
  },
  button: {
    flexBasis: '28%',
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#2E6DB4',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 15,
    color: '#333',
    flexShrink: 1,
    marginRight: 12,
  },

  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  listItemText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
