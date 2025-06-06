import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventsProvider } from './src/context/EventsContext';
import { Overview } from './src/screens/Overview';
import { Location } from './src/screens/Location';
import { Duration } from './src/screens/Duration';
import { Damages } from './src/screens/Damages';
import { Recommendations } from './src/screens/Recommendations';
import { EventDetailScreen } from './src/screens/EventDetailScreen';
import { RootStackParamList } from './src/types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <EventsProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Overview"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3b82f6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Overview"
            component={Overview}
            options={{ 
              title: 'Alerta de Desastre',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Location"
            component={Location}
            options={{ title: 'Localização' }}
          />
          <Stack.Screen
            name="Duration"
            component={Duration}
            options={{ title: 'Duração' }}
          />
          <Stack.Screen
            name="Damages"
            component={Damages}
            options={{ title: 'Prejuízos' }}
          />
          <Stack.Screen
            name="Recommendations"
            component={Recommendations}
            options={{ title: 'Recomendações' }}
          />
          <Stack.Screen
            name="EventDetail"
            component={EventDetailScreen}
            options={{ title: 'Detalhes da Ocorrência' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EventsProvider>
  );
}