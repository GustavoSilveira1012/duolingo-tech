export const courses = [
  {
    id: 'expo',
    name: 'Expo (React Native)',
    description: 'Aprenda mobile com trilhas curtas e praticas',
    color: '#0B7A75',
    icon: 'EX',
    modules: [
      {
        id: 'expo-mod-1',
        order: 1,
        title: 'Fundamentos do Expo',
        lessons: [
          {
            id: 'expo-lesson-1',
            title: 'Criando projeto Expo',
            explanation: 'Entenda a estrutura inicial de um app Expo e como executar no dispositivo.',
            exercises: [
              {
                type: 'multiple',
                question: 'Qual comando cria um novo projeto com template padrao do Expo?',
                options: ['expo create app', 'npx create-expo-app', 'expo new', 'npm expo init only'],
                correct: 1,
              },
              {
                type: 'multiple',
                question: 'Expo Go permite testar rapidamente o app sem build nativo completo.',
                options: ['Verdadeiro', 'Falso'],
                correct: 0,
              },
            ],
          },
          {
            id: 'expo-lesson-2',
            title: 'Componentes e layout',
            explanation: 'Use View, Text, ScrollView e StyleSheet para montar telas mobile.',
            exercises: [
              {
                type: 'multiple',
                question: 'Qual componente deve ser usado para listas com melhor performance?',
                options: ['View', 'FlatList', 'TextInput', 'StatusBar'],
                correct: 1,
              },
            ],
          },
        ],
      },
      {
        id: 'expo-mod-2',
        order: 2,
        title: 'Navegacao e APIs',
        lessons: [
          {
            id: 'expo-lesson-3',
            title: 'React Navigation',
            explanation: 'Crie fluxos com stack navigator e passe parametros entre telas.',
            exercises: [
              {
                type: 'multiple',
                question: 'Qual pacote e base para navegacao no React Native?',
                options: ['@react-navigation/native', '@expo/navigation', 'react-router-native', 'expo-router-core'],
                correct: 0,
              },
            ],
          },
          {
            id: 'expo-lesson-4',
            title: 'Storage e deploy',
            explanation: 'Persista dados com AsyncStorage e entenda fluxo de build e publicacao.',
            exercises: [
              {
                type: 'multiple',
                question: 'AsyncStorage e util para guardar progresso local no MVP.',
                options: ['Verdadeiro', 'Falso'],
                correct: 0,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'aws',
    name: 'AWS Nuvem',
    description: 'Conceitos essenciais de cloud para iniciantes',
    color: '#F59E0B',
    icon: 'AWS',
    modules: [
      {
        id: 'aws-mod-1',
        order: 1,
        title: 'Conceitos de Cloud e IAM',
        lessons: [
          {
            id: 'aws-lesson-1',
            title: 'Fundamentos de cloud',
            explanation: 'Entenda modelos de servico e vantagens de computacao em nuvem.',
            exercises: [
              {
                type: 'multiple',
                question: 'Qual modelo oferece mais controle da infraestrutura?',
                options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
                correct: 2,
              },
              {
                type: 'multiple',
                question: 'Escalabilidade automatica e um dos beneficios da nuvem.',
                options: ['Verdadeiro', 'Falso'],
                correct: 0,
              },
            ],
          },
          {
            id: 'aws-lesson-2',
            title: 'IAM na pratica',
            explanation: 'Aprenda usuarios, grupos, politicas e principio do menor privilegio.',
            exercises: [
              {
                type: 'multiple',
                question: 'Qual servico gerencia identidade e acesso na AWS?',
                options: ['CloudFront', 'IAM', 'Route 53', 'CloudWatch'],
                correct: 1,
              },
            ],
          },
        ],
      },
      {
        id: 'aws-mod-2',
        order: 2,
        title: 'S3, EC2 e Serverless',
        lessons: [
          {
            id: 'aws-lesson-3',
            title: 'Armazenamento com S3',
            explanation: 'Veja buckets, objetos e politicas basicas de seguranca.',
            exercises: [
              {
                type: 'multiple',
                question: 'S3 e mais indicado para armazenar:',
                options: ['Objetos e arquivos', 'Processos em execucao', 'Consultas SQL', 'Filas de mensagens'],
                correct: 1,
              },
            ],
          },
          {
            id: 'aws-lesson-4',
            title: 'Lambda e API Gateway',
            explanation: 'Entenda como criar APIs serverless para seu app.',
            exercises: [
              {
                type: 'multiple',
                question: 'AWS Lambda executa codigo sob demanda sem gerenciar servidor.',
                options: ['Verdadeiro', 'Falso'],
                correct: 0,
              },
            ],
          },
        ],
      },
    ],
  },
];
