# Power Outage Tracker 🔌⚡

Um aplicativo React Native desenvolvido com Expo para rastrear e documentar interrupções de energia elétrica causadas por eventos naturais como chuvas, ventos, deslizamentos e outros fenômenos.

## 📱 Funcionalidades

### Registro de Eventos

- 📍 **Localização**: Registro de endereço completo com integração à API ViaCEP
- ⏰ **Duração**: Controle de horário de início e fim da interrupção
- 🏠 **Danos**: Documentação de casas e estabelecimentos afetados
- 🌧️ **Tipo de Evento**: Classificação por tipo (chuva, vento, deslizamento, outros)

### Visualização e Gestão

- 📊 **Panorama Geral**: Dashboard com estatísticas dos eventos registrados
- 📋 **Lista de Eventos**: Visualização completa de todas as ocorrências
- ✏️ **Edição**: Possibilidade de editar eventos já registrados
- 🗑️ **Exclusão**: Remoção de eventos desnecessários

### Recomendações

- 💡 **Orientações**: Guia com recomendações antes, durante e após interrupções
- 🚨 **Preparação**: Dicas de preparação para emergências

## 🛠️ Tecnologias Utilizadas

- **React Native** `0.76.7` - Framework principal
- **Expo** `~52.0.38` - Plataforma de desenvolvimento
- **TypeScript** `^5.3.3` - Tipagem estática
- **React Navigation** `^7.0.17` - Navegação entre telas
- **AsyncStorage** `^2.1.2` - Armazenamento local
- **NativeWind** `^2.0.11` - Estilização com Tailwind CSS
- **DateTimePicker** `^8.3.0` - Seleção de data e hora
- **Vector Icons** `^14.0.4` - Ícones do app

## 📦 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis (não utilizados atualmente)
├── context/             # Contextos React
│   └── EventsContext.tsx    # Gerenciamento de estado dos eventos
├── screens/             # Telas do aplicativo
│   ├── Overview.tsx         # Dashboard principal
│   ├── Location.tsx         # Registro de localização
│   ├── Duration.tsx         # Registro de duração
│   ├── Damages.tsx          # Registro de danos
│   ├── Recommendations.tsx  # Tela de recomendações
│   └── EventDetailScreen.tsx # Detalhes do evento
├── types/               # Definições TypeScript
│   └── types.ts             # Tipos principais (PowerOutageEvent, etc.)
└── utils/               # Utilitários
    └── storage.ts           # Funções de armazenamento local
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo Android/iOS ou emulador

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd GSReactNative
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o projeto:

```bash
npm start
```

4. Execute no dispositivo:

```bash
# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web
```

## 📋 Fluxo do Aplicativo

### 1. Tela Overview (Principal)

- Exibe resumo estatístico dos eventos registrados
- Lista todos os eventos com opções de visualizar, editar ou excluir
- Botão para registrar nova ocorrência

### 2. Fluxo de Registro

**Etapa 1 - Localização:**

- Inserção do bairro, cidade e CEP
- Integração com API ViaCEP para preenchimento automático
- Seleção do tipo de evento natural

**Etapa 2 - Duração:**

- Seleção do horário de início da interrupção
- Seleção do horário de fim (se já resolvido)

**Etapa 3 - Danos:**

- Descrição dos danos causados
- Número de casas afetadas
- Número de estabelecimentos afetados
- Outros danos (opcional)

### 3. Recomendações

- Guia completo com orientações para antes, durante e após interrupções

## 🗃️ Estrutura de Dados

### PowerOutageEvent

```typescript
interface PowerOutageEvent {
  id: string;
  date: string;
  location: {
    neighborhood: string;
    city: string;
    zipCode: string;
  };
  duration: {
    startTime: string;
    endTime: string;
    estimatedDuration?: string;
  };
  damages: {
    description: string;
    affectedHouses: number;
    affectedBusinesses: number;
    otherDamages?: string;
  };
  naturalEvent: {
    type: "rain" | "wind" | "landslide" | "other";
    description: string;
  };
}
```

## 🔧 Funcionalidades Técnicas

### Armazenamento Local

- Utiliza AsyncStorage para persistir dados localmente
- Chave de armazenamento: `@power_outage_events`
- Operações CRUD completas (Create, Read, Update, Delete)

### Integração com APIs

- **ViaCEP**: Busca automática de endereço por CEP
- Endpoint: `https://viacep.com.br/ws/{cep}/json/`

### Context API

- EventsContext gerencia o estado global dos eventos
- Funções disponíveis: `addEvent`, `updateEvent`, `removeEvent`
- Loading states para melhor UX

## 🎨 Interface

### Design System

- Cores principais: Azul (`#3b82f6`) e tons de cinza
- Estilização com StyleSheet nativo
- Cards com sombras e bordas arredondadas
- Tipografia hierárquica com tamanhos definidos

### Navegação

- Stack Navigator com headers customizados
- Navegação condicional baseada no estado dos eventos
- Suporte a parâmetros para edição de eventos

## 📊 Estatísticas Disponíveis

- Total de eventos registrados
- Eventos por tipo (chuva, vento, deslizamento, outros)
- Lista cronológica de ocorrências
- Detalhes completos de cada evento

## 🔄 Fluxo de Estados

1. **Loading**: Durante carregamento inicial dos dados
2. **Empty**: Quando não há eventos registrados
3. **Populated**: Lista com eventos existentes
4. **Creating**: Durante criação de novo evento
5. **Editing**: Durante edição de evento existente

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença 0BSD. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para reportar bugs ou solicitar novas funcionalidades, abra uma issue no repositório do projeto.

---

**Desenvolvido para auxiliar no monitoramento e documentação de interrupções de energia elétrica causadas por eventos naturais** ⚡🌧️
