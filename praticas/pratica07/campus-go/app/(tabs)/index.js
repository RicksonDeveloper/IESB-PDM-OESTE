import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FadeIn from '../../components/FadeIn';
import useNotices from '../../hooks/useNotices';
import { api } from '../../services/api';

function NoticeCard({ item, index }) {
  return (
    <FadeIn delay={Math.min(index * 45, 360)}>
      <View style={styles.noticeCard}>
        <View style={styles.noticeMeta}><View style={styles.noticeDot} /><Text style={styles.noticeLabel}>AVISO DO CAMPUS</Text><Text style={styles.noticeNumber}>#{item.id}</Text></View>
        <Text style={styles.noticeTitle}>{item.title}</Text>
        <Text style={styles.noticeBody}>{item.body}</Text>
      </View>
    </FadeIn>
  );
}

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();
  const [showComposer, setShowComposer] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  async function createNotice() {
    const title = noticeTitle.trim();
    const body = noticeBody.trim();
    if (!title || !body) {
      Alert.alert('Preencha os campos', 'Adicione título e conteúdo ao aviso.');
      return;
    }
    setIsCreating(true);
    try {
      const result = await api.create('posts', { title, body, userId: 1 });
      setShowComposer(false);
      setNoticeTitle('');
      setNoticeBody('');
      Alert.alert('Aviso criado', `O JSONPlaceholder retornou o aviso #${result.id}. A API de demonstração não salva alterações.`);
    } catch (createError) {
      Alert.alert('Não foi possível criar o aviso', createError.message || 'Tente novamente.');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={isLoading || error ? [] : notices}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item, index }) => <NoticeCard item={item} index={index} />}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reload} tintColor="#6759D4" colors={['#6759D4']} />}
      ListHeaderComponent={(
        <View>
          <View style={styles.topRow}>
            <View><Text style={styles.eyebrow}>OLÁ, ESTUDANTE 👋</Text><Text style={styles.title}>Seu campus,{ '\n' }em um só lugar.</Text></View>
            <View style={styles.brandMark}><Ionicons name="school" size={24} color="#6759D4" /></View>
          </View>
          <View style={styles.sectionRow}>
            <View><Text style={styles.sectionTitle}>Mural de avisos</Text><Text style={styles.sectionCaption}>Novidades da comunidade</Text></View>
            <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveText}>AO VIVO</Text></View>
          </View>
          {showComposer && (
            <View style={styles.composer}>
              <Text style={styles.composerTitle}>Novo aviso de teste</Text>
              <TextInput value={noticeTitle} onChangeText={setNoticeTitle} placeholder="Título" placeholderTextColor="#AAA9B8" style={styles.input} maxLength={100} />
              <TextInput value={noticeBody} onChangeText={setNoticeBody} placeholder="Escreva o aviso" placeholderTextColor="#AAA9B8" style={[styles.input, styles.bodyInput]} multiline maxLength={300} />
              <View style={styles.composerActions}>
                <Pressable onPress={() => setShowComposer(false)} style={styles.cancelButton}><Text style={styles.cancelText}>Cancelar</Text></Pressable>
                <Pressable onPress={createNotice} disabled={isCreating} style={styles.createButton}><Text style={styles.createText}>{isCreating ? 'Enviando…' : 'Publicar'}</Text></Pressable>
              </View>
            </View>
          )}
        </View>
      )}
      ListEmptyComponent={(
        <View style={styles.stateCard}>
          {isLoading ? <ActivityIndicator size="large" color="#6759D4" /> : (
            <>
              <View style={[styles.stateIcon, error && styles.errorIcon]}><Ionicons name={error ? 'cloud-offline-outline' : 'megaphone-outline'} size={24} color={error ? '#C75A69' : '#6759D4'} /></View>
              <Text style={styles.stateTitle}>{error ? 'Não carregou desta vez' : 'Ainda não há avisos'}</Text>
              <Text style={styles.stateText}>{error || 'Puxe a tela para atualizar ou volte mais tarde.'}</Text>
              {error && <Pressable onPress={reload} style={styles.retryButton}><Text style={styles.retryText}>Tentar novamente</Text></Pressable>}
            </>
          )}
        </View>
      )}
      ListFooterComponent={(
        <Pressable style={styles.bonusButton} onPress={() => setShowComposer((visible) => !visible)}>
          <Ionicons name="add-circle-outline" size={19} color="#6759D4" />
          <Text style={styles.bonusText}>{showComposer ? 'Fechar formulário' : 'Criar aviso de teste'}</Text>
          <Text style={styles.bonusTag}>BÔNUS</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F7FB' },
  content: { paddingHorizontal: 20, paddingTop: 68, paddingBottom: 24 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 },
  eyebrow: { color: '#85849A', fontSize: 11, fontWeight: '700', letterSpacing: 1.1 },
  title: { color: '#202033', fontSize: 27, lineHeight: 33, fontWeight: '800', marginTop: 7 },
  brandMark: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#ECEAFB', alignItems: 'center', justifyContent: 'center' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
  sectionTitle: { color: '#252438', fontSize: 18, fontWeight: '800' },
  sectionCaption: { color: '#9291A2', fontSize: 12, marginTop: 4 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#E8F7F0', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 12 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#43A67D' },
  liveText: { color: '#358568', fontSize: 9, fontWeight: '800', letterSpacing: 0.7 },
  noticeCard: { padding: 17, borderRadius: 19, backgroundColor: '#FFFFFF', marginBottom: 12 },
  noticeMeta: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 11 },
  noticeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#6759D4' },
  noticeLabel: { color: '#85849A', fontSize: 9, fontWeight: '800', letterSpacing: 0.8, flex: 1 },
  noticeNumber: { color: '#AAA9B8', fontSize: 10, fontWeight: '700' },
  noticeTitle: { color: '#252438', fontSize: 15, lineHeight: 21, fontWeight: '800', textTransform: 'capitalize' },
  noticeBody: { color: '#77768A', fontSize: 13, lineHeight: 20, marginTop: 6, textTransform: 'capitalize' },
  stateCard: { minHeight: 190, padding: 24, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  stateIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#F0EEFF', alignItems: 'center', justifyContent: 'center', marginBottom: 11 },
  errorIcon: { backgroundColor: '#FFF0F1' },
  stateTitle: { color: '#252438', fontSize: 16, fontWeight: '800', textAlign: 'center' },
  stateText: { color: '#9291A2', fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 6 },
  retryButton: { paddingHorizontal: 16, paddingVertical: 10, marginTop: 13, borderRadius: 12, backgroundColor: '#F0EEFF' },
  retryText: { color: '#6759D4', fontSize: 13, fontWeight: '700' },
  composer: { padding: 16, borderRadius: 18, backgroundColor: '#FFFFFF', marginBottom: 16 },
  composerTitle: { color: '#252438', fontSize: 15, fontWeight: '800', marginBottom: 12 },
  input: { height: 46, borderWidth: 1, borderColor: '#E7E6EF', borderRadius: 12, paddingHorizontal: 13, color: '#252438', marginBottom: 9, fontSize: 14 },
  bodyInput: { height: 76, textAlignVertical: 'top', paddingTop: 12 },
  composerActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 9, marginTop: 3 },
  cancelButton: { paddingHorizontal: 15, paddingVertical: 11 },
  cancelText: { color: '#77768A', fontWeight: '700' },
  createButton: { paddingHorizontal: 17, paddingVertical: 11, borderRadius: 12, backgroundColor: '#6759D4' },
  createText: { color: '#FFFFFF', fontWeight: '700' },
  bonusButton: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 15, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#D4D0F3', marginTop: 6, backgroundColor: '#FAF9FF' },
  bonusText: { color: '#6759D4', fontSize: 13, fontWeight: '700', flex: 1 },
  bonusTag: { color: '#8A7BCE', fontSize: 9, fontWeight: '800', letterSpacing: 0.7 },
});
