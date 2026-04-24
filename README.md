# LearnPath - Fase 1 (MVP)

Plataforma de aprendizado gamificado estilo Duolingo para ensino de tecnologia.

## Escopo desta entrega
Este projeto esta restrito a Fase 1 (MVP):

- Cadastro e login
- 2 cursos: Expo (React Native) e AWS Nuvem
- Trilha basica (curso -> modulo -> licao)
- Exercicios de multipla escolha
- Feedback imediato de acerto/erro
- XP, nivel e streak simples
- Painel basico de progresso

## Fora do escopo nesta versao
Estas partes ficam para fases futuras:

- Revisao inteligente
- Ranking
- Notificacoes push
- IA adaptativa
- CRUD administrativo completo

## Tecnologias

- Expo
- React Native
- React Navigation
- AsyncStorage

## Como executar

```bash
npm install
npx expo start
```

## Estrutura principal

- `App.js`
- `src/context/AuthContext.js`
- `src/data/mockData.js`
- `src/screens/LoginScreen.js`
- `src/screens/RegisterScreen.js`
- `src/screens/HomeScreen.js`
- `src/screens/CourseListScreen.js`
- `src/screens/TrailScreen.js`
- `src/screens/LessonScreen.js`
- `src/screens/ProfileScreen.js`

## Observacao
A persistencia nesta fase e local (AsyncStorage), sem backend AWS ativo.
