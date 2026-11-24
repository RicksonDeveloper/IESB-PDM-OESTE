import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const icons = {
  index: ['home-outline', 'home'],
  tasks: ['checkbox-outline', 'checkbox'],
  wallet: ['wallet-outline', 'wallet'],
  profile: ['person-circle-outline', 'person-circle'],
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6759D4',
        tabBarInactiveTintColor: '#9292A3',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', paddingBottom: 3 },
        tabBarStyle: { height: 66, paddingTop: 8, borderTopColor: '#ECECF2', backgroundColor: '#FFFFFF' },
        tabBarIcon: ({ focused, color, size }) => {
          const [outline, filled] = icons[route.name] ?? icons.index;
          return <Ionicons name={focused ? filled : outline} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Bolso' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
