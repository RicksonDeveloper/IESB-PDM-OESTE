import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { titulo } from './util.js';
import outro_nome from './util.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{margin: 20}}>{titulo}</Text>
      <Text style={styles.text}>{outro_nome}</Text>
      <Button title="clique aqui" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    text:{
      margin: 20,
      fontSize: 25,
      color: 'blue'
    }
});
