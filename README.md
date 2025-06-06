# Medical App - Sistema de Gestão Médica

Um aplicativo React Native desenvolvido com Expo para gerenciamento de consultas médicas, permitindo agendamentos, administração de usuários e dashboards específicos para diferentes tipos de usuários.

## 🚀 Funcionalidades

### Para Pacientes
- ✅ Cadastro e login de pacientes
- 📅 Agendamento de consultas
- 👨‍⚕️ Visualização de médicos disponíveis
- 🕒 Seleção de horários disponíveis
- 📱 Visualização das próprias consultas

### Para Médicos
- 👨‍⚕️ Login com credenciais pré-cadastradas
- 📋 Dashboard com consultas agendadas
- ✅ Confirmação/cancelamento de consultas
- 👤 Visualização do próprio perfil

### Para Administradores
- 🛡️ Dashboard administrativo completo
- 👥 Gerenciamento de usuários
- 📊 Visualização de todas as consultas
- ⚙️ Controle de status de consultas

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **Styled Components** - Estilização
- **React Native Elements** - Componentes UI
- **AsyncStorage** - Armazenamento local
- **NativeWind** - Utility CSS

## 📦 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── AppointmentCard.tsx
│   ├── AppointmentForm.tsx
│   ├── AuthContext.tsx
│   ├── Button.tsx
│   ├── DoctorList.tsx
│   ├── Header.tsx
│   ├── Input.tsx
│   └── TimeSlotList.tsx
├── contexts/          # Contextos React
├── navigation/        # Configuração de navegação
├── screens/          # Telas do aplicativo
│   ├── AdminDashboardScreen.tsx
│   ├── CreateAppointmentScreen.tsx
│   ├── DoctorDashboardScreen.tsx
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── RegisterScreen.tsx
│   └── UserManagementScreen.tsx
├── services/         # Serviços e APIs
│   └── auth.ts
├── styles/           # Temas e estilos
├── types/            # Definições de tipos TypeScript
│   ├── auth.ts
│   ├── doctors.ts
│   └── navigation.ts
└── utils/            # Utilitários
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
# ou
yarn install
```

3. Inicie o projeto:
```bash
npm start
# ou
yarn start
# ou
expo start
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

## 👥 Usuários de Teste

### Administrador
- **Email:** admin@example.com
- **Senha:** 123456

### Médicos
- **Dr. João Silva**
  - Email: joao@example.com
  - Senha: 123456
  - Especialidade: Cardiologia

- **Dra. Maria Santos**
  - Email: maria@example.com
  - Senha: 123456
  - Especialidade: Pediatria

- **Dr. Pedro Oliveira**
  - Email: pedro@example.com
  - Senha: 123456
  - Especialidade: Ortopedia

### Pacientes
- Podem ser cadastrados através da tela de registro
- Senha padrão: 123456

## 📱 Telas Principais

### Autenticação
- **Login** - Tela de entrada no sistema
- **Registro** - Cadastro de novos pacientes

### Dashboards
- **Dashboard Admin** - Painel administrativo
- **Dashboard Médico** - Painel do médico
- **Dashboard Paciente** - Tela inicial do paciente

### Funcionalidades
- **Agendar Consulta** - Criação de novos agendamentos
- **Perfil** - Visualização e edição do perfil
- **Gerenciar Usuários** - Administração de usuários (admin)

## 💾 Armazenamento de Dados

O aplicativo utiliza AsyncStorage para persistência local dos dados:

- **@MedicalApp:user** - Dados do usuário logado
- **@MedicalApp:token** - Token de autenticação
- **@MedicalApp:appointments** - Lista de consultas
- **@MedicalApp:registeredUsers** - Usuários cadastrados

## 🔐 Sistema de Autenticação

O sistema possui três tipos de usuários:

1. **Admin** - Acesso completo ao sistema
2. **Doctor** - Gerenciamento das próprias consultas
3. **Patient** - Agendamento e visualização de consultas

## 🎨 Componentes Principais

### [`Header`](src/components/Header.tsx)
Cabeçalho com informações do usuário logado

### [`DoctorList`](src/components/DoctorList.tsx)
Lista de médicos disponíveis para agendamento

### [`TimeSlotList`](src/components/TimeSlotList.tsx)
Seleção de horários disponíveis

### [`AppointmentCard`](src/components/AppointmentCard.tsx)
Card de exibição de consultas

## 📋 Tipos de Dados

### User
```typescript
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  image?: string;
  specialty?: string; // Para médicos
};
```

### Appointment
```typescript
type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença 0BSD. Veja o arquivo `LICENSE` para mais detalhes.

## 🐛 Reportar Bugs

Para reportar bugs ou solicitar novas funcionalidades, abra uma issue no repositório do projeto.

## 📱 Screenshots

*Adicione screenshots das principais telas do aplicativo aqui*

---

Desenvolvido com ❤️ usando React Native e Expo
