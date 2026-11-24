import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function scheduleReminder(title, seconds = 10) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('campusgo-reminders', {
      name: 'Lembretes',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#6759D4',
    });
  }

  const current = await Notifications.getPermissionsAsync();
  const permission = current.granted ? current : await Notifications.requestPermissionsAsync();
  if (!permission.granted) return false;

  await Notifications.scheduleNotificationAsync({
    content: { title: 'Lembrete CampusGo', body: title, sound: false },
    trigger: Platform.OS === 'android'
      ? { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds, channelId: 'campusgo-reminders' }
      : { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds },
  });
  return true;
}
