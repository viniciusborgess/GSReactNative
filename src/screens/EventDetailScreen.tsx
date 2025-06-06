import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { useEvents } from '../context/EventsContext';
import { PowerOutageEvent } from '../types/types';

type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

export const EventDetailScreen = () => {
  const route = useRoute<EventDetailScreenRouteProp>();
  const { eventId } = route.params;
  const { events, loading: eventsLoading } = useEvents();
  const [event, setEvent] = useState<PowerOutageEvent | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar o evento específico pelo ID
    const foundEvent = events.find(e => e.id === eventId);
    setEvent(foundEvent);
    setLoading(false);
  }, [eventId, events]); // Dependências: eventId e events (para reagir a mudanças na lista)

  if (loading || eventsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando detalhes do evento...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Evento não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.card}>
        <Text style={styles.header}>Detalhes da Ocorrência</Text>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Local:</Text>
          <Text style={styles.value}>{event.location.neighborhood}, {event.location.city} - CEP: {event.location.zipCode}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Data:</Text>
          <Text style={styles.value}>{new Date(event.date).toLocaleDateString()}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Tipo de Desastre:</Text>
          <Text style={styles.value}>{event.naturalEvent.type}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Horário de Início:</Text>
          <Text style={styles.value}>{new Date(event.duration.startTime).toLocaleTimeString()}</Text>
        </View>

        {event.duration.endTime && (
          <View style={styles.detailItem}>
            <Text style={styles.label}>Horário de Término:</Text>
            <Text style={styles.value}>{new Date(event.duration.endTime).toLocaleTimeString()}</Text>
          </View>
        )}

        {event.damages.description && (
           <View style={styles.detailItem}>
            <Text style={styles.label}>Descrição dos Prejuízos:</Text>
            <Text style={styles.value}>{event.damages.description}</Text>
          </View>
        )}

        {event.damages.affectedHouses > 0 && (
          <View style={styles.detailItem}>
            <Text style={styles.label}>Residências Afetadas:</Text>
            <Text style={styles.value}>{event.damages.affectedHouses}</Text>
          </View>
        )}

        {event.damages.affectedBusinesses > 0 && (
          <View style={styles.detailItem}>
            <Text style={styles.label}>Estabelecimentos Afetados:</Text>
            <Text style={styles.value}>{event.damages.affectedBusinesses}</Text>
          </View>
        )}

        {event.damages.otherDamages && (
           <View style={styles.detailItem}>
            <Text style={styles.label}>Outros Prejuízos:</Text>
            <Text style={styles.value}>{event.damages.otherDamages}</Text>
          </View>
        )}

        {/* Botão para Voltar (opcional, o header back button já existe) */}
        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.goBack() }>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity> */}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f3f4f6',
  },
   loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4b5563',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1f2937',
  },
  detailItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#1f2937',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#374151',
  },
   button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'semibold',
  },
}); 