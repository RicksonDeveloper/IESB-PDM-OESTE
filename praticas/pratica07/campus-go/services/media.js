import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.85,
  });
  return result.canceled ? null : result.assets?.[0]?.uri ?? null;
}

export async function takePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert(
      'Acesso à câmera',
      'Permita o acesso à câmera nas configurações para tirar uma foto.',
      [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ],
    );
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.85 });
  return result.canceled ? null : result.assets?.[0]?.uri ?? null;
}
