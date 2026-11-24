import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (permission.status !== 'granted') return null;

  const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  const [place] = await Location.reverseGeocodeAsync(position.coords);
  if (!place) return null;

  const label = [place.name, place.street, place.district, place.city, place.region]
    .filter((part, index, parts) => part && parts.indexOf(part) === index)
    .join(', ');
  return { label: label || `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}` };
}
