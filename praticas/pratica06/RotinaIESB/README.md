# RotinaIESB

Organizador simples da rotina acadêmica — atividade integradora (Aulas 02 a 06).

## 1. Comando usado para criar o projeto

```
npx create-expo-app@latest RotinaIESB --template blank
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## 2. Prints

> ⚠️ Adicionar aqui os 3 prints pedidos pelo enunciado:
- [ ] Tela vazia (sem compromissos)
- [ ] Tela com itens cadastrados
- [ ] Tela após fechar e reabrir o app (mostrando que os dados persistiram)

## 3. Onde está o useEffect de carga e o de salvamento

Ambos ficam em `App.js`:

- **Carregar (useEffect nº 1)** — roda uma vez, ao montar o componente (`[]` como dependência).
  Lê o AsyncStorage com a chave `@rotina_iesb_compromissos` e faz `JSON.parse` para
  transformar de volta em array.

- **Salvar (useEffect nº 2)** — roda toda vez que `compromissos` muda (dependência `[compromissos, carregado]`).
  Faz `JSON.stringify` da lista e grava no AsyncStorage na mesma chave.
  A variável `carregado` evita que o app sobrescreva o storage com `[]` antes
  de terminar de carregar os dados salvos.

## 4. Arquivos criados

- `labels.js` — rótulos/textos do app (export nomeado)
- `components/CompromissoInput.js` — input + botão de adicionar
- `components/CompromissoList.js` — lista de compromissos com botão de excluir

## Observação sobre o assets/logo.png

Substitua `assets/logo.png` por uma imagem sua (ex: logo do IESB ou um ícone
qualquer) — o `App.js` já está referenciando esse caminho com `require()`.
