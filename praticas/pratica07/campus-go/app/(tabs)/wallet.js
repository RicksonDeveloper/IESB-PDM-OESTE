import { Share, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses } = useExpenses();
  const total = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const totalLabel = `R$ ${total.toFixed(2).replace('.', ',')}`;

  async function shareSummary() {
    await Share.share({ message: `Meu resumo do CampusGo: despesas registradas no total de ${totalLabel}.` });
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>CONTROLE COM LEVEZA</Text>
      <Text style={styles.title}>Meu bolso</Text>
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <View style={styles.walletIcon}><Ionicons name="wallet-outline" size={21} color="#FFFFFF" /></View>
          <Text style={styles.balanceCaption}>TOTAL DE DESPESAS</Text>
        </View>
        <Text style={styles.amount}>{totalLabel}</Text>
        <Text style={styles.balanceFoot}>{expenses.length} {expenses.length === 1 ? 'lançamento' : 'lançamentos'} registrados</Text>
        <View style={styles.decorCircle} />
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoIcon}><Ionicons name="information-circle-outline" size={20} color="#6759D4" /></View>
        <Text style={styles.infoText}>Seu histórico fica salvo neste aparelho.</Text>
      </View>
      <Pressable style={styles.shareButton} onPress={shareSummary} accessibilityRole="button">
        <Ionicons name="share-social-outline" size={19} color="#6759D4" />
        <Text style={styles.shareText}>Compartilhar resumo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 22, paddingTop: 72 },
  eyebrow: { color: '#85849A', fontSize: 11, fontWeight: '700', letterSpacing: 1.3 },
  title: { color: '#202033', fontSize: 30, fontWeight: '800', marginTop: 5, marginBottom: 24 },
  balanceCard: { position: 'relative', overflow: 'hidden', borderRadius: 24, padding: 23, backgroundColor: '#6759D4', minHeight: 190 },
  balanceHeader: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  walletIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  balanceCaption: { color: '#E1DDFE', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  amount: { color: '#FFFFFF', fontSize: 34, fontWeight: '800', marginTop: 17 },
  balanceFoot: { color: '#E1DDFE', fontSize: 13, marginTop: 6 },
  decorCircle: { position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 28, borderColor: 'rgba(255,255,255,0.08)', right: -38, top: 72 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 23, padding: 15, borderRadius: 15, backgroundColor: '#FFFFFF' },
  infoIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0EEFF' },
  infoText: { flex: 1, color: '#68677B', fontSize: 13 },
  shareButton: { height: 54, marginTop: 18, borderWidth: 1, borderColor: '#D9D5F7', borderRadius: 16, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  shareText: { color: '#6759D4', fontSize: 15, fontWeight: '700' },
});
