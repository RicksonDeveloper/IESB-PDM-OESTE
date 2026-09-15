<img width="576" height="1280" alt="WhatsApp Image 2026-09-08 at 21 13 34" src="https://github.com/user-attachments/assets/c557c3ff-03df-403e-ab8a-79214f40adc0" />
<img width="576" height="1280" alt="WhatsApp Image 2026-09-08 at 21 13 33 (1)" src="https://github.com/user-attachments/assets/c6fd5ed8-0b1b-4495-8471-319f68175380" />
<img width="576" height="1280" alt="WhatsApp Image 2026-09-08 at 21 13 33" src="https://github.com/user-attachments/assets/25b3b48b-546f-4380-8c6b-11fc3b52c9d8" />

# MetasSemestre — Prática 05/06 (React Native / Expo)

App de metas acadêmicas com componentização, eventos e persistência local
com AsyncStorage.

## Estrutura do projeto

```
MetasSemestre/
├── App.js
├── components/
│   ├── MetaInput.js   -> input de texto + botão "Adicionar"
│   ├── MetaList.js    -> FlatList que renderiza os itens
│   └── MetaItem.js    -> card de cada meta (texto, data, riscar, excluir)
└── assets/
    └── icon.png       -> logo usada no cabeçalho (troque pela sua)
```

## Onde está cada requisito obrigatório

- **useState**: `App.js`, linhas do topo do componente (`texto`, `metas`, `carregando`).
- **Componentização**: `components/MetaInput.js` e `components/MetaList.js`
  (que usa `MetaItem.js` internamente).
- **id único**: gerado com `Date.now().toString()` em `handleAdicionar`.
- **Remoção com filter**: função `handleRemover` em `App.js`.
- **useEffect de CARGA (leitura do AsyncStorage)**: `App.js`, primeiro
  `useEffect`, logo abaixo dos `useState`. Roda uma única vez (`[]`) na
  montagem do app, lê a chave `@metas_semestre` e faz `JSON.parse`.
- **useEffect de SALVAMENTO**: `App.js`, segundo `useEffect`, com
  dependência `[metas, carregando]`. Roda toda vez que a lista de metas
  muda e grava com `JSON.stringify`. Ele só salva depois que o
  carregamento inicial terminou (`if (carregando) return;`), para não
  sobrescrever os dados salvos com um array vazio antes de carregar.
- **Validação com Alert**: em `handleAdicionar`, se o texto (após `trim()`)
  estiver vazio, mostra `Alert.alert(...)` e não adiciona.
- **android_ripple**: usado nos `Pressable` de `MetaInput.js` (botão
  Adicionar) e `MetaItem.js` (botão de excluir).
- **SafeAreaProvider / SafeAreaView**: em `App.js`, envolvendo toda a tela.
- **FlatList**: em `components/MetaList.js`, com `keyExtractor` usando
  `item.id` (nunca o índice).

## Desafio opcional implementado

- Campo `concluida: boolean` em cada meta.
- Tocar no texto da meta (em `MetaItem.js`) alterna `concluida` e aplica
  `textDecorationLine: 'line-through'`.
- Contador no cabeçalho: **"X pendentes / Y concluídas"**, calculado em
  `App.js` a partir do array `metas`.

## Como rodar

```bash
npx create-expo-app@latest MetasSemestre --template blank
cd MetasSemestre
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context

# Substitua o App.js gerado pelo App.js deste repositório
# Copie a pasta components/ para dentro do projeto
# Substitua (ou mantenha) o assets/icon.png

npx expo start
```

Abra no celular com o app **Expo Go** (escaneando o QR code) ou em um
emulador Android/iOS.


## Erros comuns evitados neste código

- ✅ AsyncStorage instalado com `npx expo install` (não `npm install` puro).
- ✅ `id` gerado com `Date.now().toString()`, nunca o índice do array.
- ✅ `setMetas` sempre cria um **novo array** (`[...metasAtuais, novaMeta]`,
  `.filter(...)`, `.map(...)`) — nunca `push`/`splice` diretamente.
- ✅ Carregamento inicial feito em `useEffect` separado, antes de qualquer
  salvamento.
