import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentPlace } from '../../services/location';
import { pickImage, takePhoto } from '../../services/media';

const PROFILE_PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);
  const [place, setPlace] = useState(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(PROFILE_PHOTO_KEY).then(setPhotoUri).catch(() => {});
  }, []);

  async function updatePhoto(getPhoto) {
    try {
      const uri = await getPhoto();
      if (!uri) return;
      await AsyncStorage.setItem(PROFILE_PHOTO_KEY, uri);
      setPhotoUri(uri);
    } catch {
      Alert.alert('Não foi possível abrir a imagem', 'Tente novamente em alguns instantes.');
    }
  }

  async function checkIn() {
    setIsCheckingIn(true);
    try {
      const currentPlace = await getCurrentPlace();
      setPlace(currentPlace);
      if (!currentPlace) Alert.alert('Localização indisponível', 'Permita a localização enquanto usa o app para fazer check-in.');
    } catch {
      Alert.alert('Não foi possível obter o local', 'Confira a permissão de localização e tente novamente.');
    } finally {
      setIsCheckingIn(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>SEU ESPAÇO NO CAMPUS</Text>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.profileCard}>
        <Pressable onPress={() => updatePhoto(pickImage)} style={styles.avatarButton} accessibilityLabel="Escolher foto de perfil">
          {photoUri ? <Image source={{ uri: photoUri }} style={styles.avatar} /> : (
            <View style={styles.avatarPlaceholder}><Ionicons name="person" size={42} color="#6759D4" /></View>
          )}
          <View style={styles.cameraBadge}><Ionicons name="camera" size={15} color="#FFFFFF" /></View>
        </Pressable>
        <Text style={styles.name}>Estudante CampusGo</Text>
        <Text style={styles.caption}>Toque na foto para escolher outra</Text>
        <View style={styles.photoActions}>
          <Pressable style={styles.secondaryButton} onPress={() => updatePhoto(pickImage)}><Ionicons name="images-outline" size={17} color="#6759D4" /><Text style={styles.secondaryText}>Galeria</Text></Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => updatePhoto(takePhoto)}><Ionicons name="camera-outline" size={17} color="#6759D4" /><Text style={styles.secondaryText}>Câmera</Text></Pressable>
        </View>
      </View>
      <View style={styles.checkinCard}>
        <View style={styles.checkinIcon}><Ionicons name="location" size={22} color="#6759D4" /></View>
        <Text style={styles.sectionTitle}>Check-in no campus</Text>
        <Text style={styles.checkinDescription}>Registre onde você está agora.</Text>
        {place && <View style={styles.placeBox}><Ionicons name="navigate-circle" size={18} color="#358568" /><Text style={styles.placeText}>{place.label}</Text></View>}
        <Pressable style={styles.primaryButton} onPress={checkIn} disabled={isCheckingIn}>
          {isCheckingIn ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryText}>Fazer check-in</Text>}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 22, paddingTop: 66, paddingBottom: 30 },
  eyebrow: { color: '#85849A', fontSize: 11, fontWeight: '700', letterSpacing: 1.3 },
  title: { color: '#202033', fontSize: 30, fontWeight: '800', marginTop: 5, marginBottom: 20 },
  profileCard: { alignItems: 'center', padding: 22, backgroundColor: '#FFFFFF', borderRadius: 22 },
  avatarButton: { position: 'relative', marginBottom: 13 },
  avatar: { width: 104, height: 104, borderRadius: 52, backgroundColor: '#ECEAFB' },
  avatarPlaceholder: { width: 104, height: 104, borderRadius: 52, backgroundColor: '#ECEAFB', alignItems: 'center', justifyContent: 'center' },
  cameraBadge: { position: 'absolute', right: 0, bottom: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: '#6759D4', borderWidth: 3, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  name: { color: '#252438', fontSize: 17, fontWeight: '800' },
  caption: { color: '#9291A2', fontSize: 12, marginTop: 5 },
  photoActions: { flexDirection: 'row', gap: 10, marginTop: 17 },
  secondaryButton: { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 13, backgroundColor: '#F2F0FF', paddingHorizontal: 15, paddingVertical: 10 },
  secondaryText: { color: '#6759D4', fontSize: 13, fontWeight: '700' },
  checkinCard: { padding: 19, marginTop: 16, backgroundColor: '#FFFFFF', borderRadius: 22 },
  checkinIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#F0EEFF', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  sectionTitle: { color: '#252438', fontSize: 16, fontWeight: '800' },
  checkinDescription: { color: '#9291A2', fontSize: 13, marginTop: 5 },
  placeBox: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, backgroundColor: '#EDF8F2', borderRadius: 13, marginTop: 14 },
  placeText: { flex: 1, color: '#337C60', fontSize: 13, fontWeight: '600' },
  primaryButton: { height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#6759D4', marginTop: 17 },
  primaryText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
