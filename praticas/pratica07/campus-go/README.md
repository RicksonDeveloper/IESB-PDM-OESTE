# CampusGo

Projeto Expo Router da Prática 07. Reúne mural de avisos, tarefas, resumo de despesas e perfil com recursos nativos.

## Executar

Requer Node.js LTS e Expo Go no celular. Na pasta `campus-go`:

```bash
copy .env.example .env
npm install
npx expo start
```

No macOS/Linux, substitua o primeiro comando por `cp .env.example .env`. Se o arquivo `.env` acabou de ser criado, reinicie o Metro para carregar `EXPO_PUBLIC_API_URL`.

Para abrir no navegador, execute `npx expo start --web`. Para usar o Expo Go no celular, execute `npx expo start` e leia o QR Code.

## O que conferir

- Quatro abas em português; Tarefas abre `/new-task` como modal e também `/task/42`.
- Bolso calcula despesas do contexto e compartilha o total em reais.
- Perfil salva a foto em `@profile-photo`, oferece câmera/galeria e faz check-in com permissão em primeiro plano.
- Tarefas podem ser concluídas com retorno tátil e agendar lembrete local para cerca de 10 segundos.
- Início carrega dez posts, mostra carregamento/erro/lista, permite puxar para atualizar e criar aviso de demonstração.

O JSONPlaceholder aceita o POST de demonstração e retorna um id, mas não persiste os avisos criados. O arquivo `.env` é local e ignorado pelo Git; somente `.env.example` deve ser enviado.
