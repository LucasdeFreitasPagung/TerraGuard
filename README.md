# 🛰️ TerraGuard - Sistema de Monitoramento Climático Global

O **TerraGuard** é um aplicativo mobile desenvolvido em React Native com Expo, projetado para monitorar desastres naturais e eventos climáticos extremos ao redor do planeta em tempo real. O projeto consome dados geoespaciais oficiais de satélites e fornece uma interface intuitiva para que os usuários acompanhem incêndios, tempestades, erupções vulcânicas e mudanças nas calotas polares.

Este projeto foi desenvolvido como parte da entrega da **Global Solution** da **FIAP**.

---

## 🧑‍💻 Informações do Desenvolvedor

* **Nome Completo:** Lucas de Freitas Pagung
* **RM:** 553242
* **Turma:** 3ESPR
* **Instituição:** FIAP (Faculdade de Informática e Administração Paulista)

---

## 🚀 Funcionalidades Principais (Critérios de Avaliação)

1. **Consumo de API Externa (NASA EONET):**
   * Conexão assíncrona com a API *Earth Observatory Natural Event Tracker* da NASA.
   * Captação automática dos eventos mais recentes catalogados por agências espaciais internacionais.

2. **Persistência Local Offline (AsyncStorage):**
   * Sistema de salvamento de eventos favoritos diretamente no disco do dispositivo.
   * Utilização de serialização/deserialização JSON para garantir que os dados fiquem salvos mesmo se o aplicativo ou o celular forem fechados.

3. **Filtros e Listagem Avançada:**
   * Mecanismo de busca em tempo real por texto (região, país ou nome do evento).
   * Filtragem por categorias nativas da NASA (Incêndios, Tempestades, Vulcões, Gelo) organizadas em componentes de pílulas interativas (*Chips*).

4. **Gerenciamento de Estado Global (Context API):**
   * Implementação de arquitetura de Contexto para controle de Tema (Modo Claro / Modo Escuro).
   * Centralização da paleta de cores, permitindo que todo o ecossistema do app mude de cor instantaneamente através de um interruptor (*Switch*) nas Configurações.

5. **Interface Moderna e Responsiva (UI/UX):**
   * Navegação estruturada em abas inferiores (*Tab Navigation*), garantindo excelente usabilidade.
   * Feedback visual de carregamento com loaders assíncronos (`ActivityIndicator`).

---

## 🏗️ Arquitetura do Projeto

A estrutura de arquivos foi planejada seguindo os padrões de clean code e separação de responsabilidades:

```text
TerraGuard/
 ├── App.tsx                        # Ponto de entrada e Provedor Global do Contexto
 └── src/
      ├── context/
      │    └── ThemeContext.tsx     # Motor de gerenciamento do Dark Mode (Context API)
      ├── hooks/
      │    └── useNasaEvents.ts     # Custom Hook isolador de requisições à API da NASA
      ├── navigation/
      │    └── AppNavigator.tsx     # Configuração das rotas e abas de navegação
      ├── screens/
      │    ├── HomeScreen.tsx       # Feed principal com os últimos eventos captados
      │    ├── EventsScreen.tsx     # Explorador avançado com filtros e barra de busca
      │    ├── FavoritesScreen.tsx  # Painel de monitoramentos salvos offline
      │    └── SettingsScreen.tsx   # Painel de controle de preferências e tema
      ├── services/
      │    └── api.ts               # Configuração base do Axios para a API da NASA
      ├── storage/
      │    └── favoritesStorage.ts  # Camada de persistência local (AsyncStorage)
      └── types/
           └── Event.ts             # Tipagem estrita de dados do TypeScript

🛠️ Pré-requisitos para Execução
Antes de iniciar, certifique-se de ter instalado em sua máquina:

Node.js (Versão LTS recomendada)

Git

Gerenciador de pacotes npm (instalado automaticamente com o Node)

💻 Como Executar o Projeto Localmente
Siga o passo a passo abaixo no seu terminal para colocar o projeto no ar:

1. Clonar o Repositório
Bash
git clone [https://github.com/seu-usuario/TerraGuard.git](https://github.com/seu-usuario/TerraGuard.git)
2. Entrar na Pasta do Projeto
Bash
cd TerraGuard
3. Instalar as Dependências
Instale todas as bibliotecas e pacotes necessários declarados no package.json:

Bash
npm install
4. Iniciar o Servidor do Expo (Limpando o Cache)
Execute o comando do Expo utilizando a flag -c para garantir que o empacotador leia toda a estrutura limpa de arquivos e contextos:

Bash
npx expo start -c
5. Abrir a Aplicação
No Navegador (Web): Assim que o QR Code gigante aparecer no terminal, basta apertar a tecla w no seu teclado. O Expo abrirá uma aba automaticamente no Google Chrome.

No Celular (Android/iOS): Baixe o aplicativo Expo Go na Google Play Store ou App Store, abra a câmera do seu celular e escaneie o QR Code exibido no terminal.

📄 Licença
Este projeto foi desenvolvido estritamente para fins acadêmicos na FIAP. Todos os dados consumidos pertencem à API pública EONET da NASA.
