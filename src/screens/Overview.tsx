import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useEvents } from '../context/EventsContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { Ionicons } from '@expo/vector-icons';

type OverviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Overview'>;

export const Overview = () => {
  const { events, loading, removeEvent } = useEvents();
  const navigation = useNavigation<OverviewScreenNavigationProp>();

  const getEventTypeCount = (type: string) => {
    return events.filter(event => event.naturalEvent.type === type).length;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.card}>
        <Text style={styles.header}>Panorama Geral</Text>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Resumo dos Eventos</Text>
          <View style={styles.summaryList}>
            <Text style={styles.summaryText}>Total de Eventos: <Text style={styles.summaryValue}>{events.length}</Text></Text>
            <Text style={styles.summaryText}>Chuvas: <Text style={styles.summaryValue}>{getEventTypeCount('rain')}</Text></Text>
            <Text style={styles.summaryText}>Ventos: <Text style={styles.summaryValue}>{getEventTypeCount('wind')}</Text></Text>
            <Text style={styles.summaryText}>Deslizamentos: <Text style={styles.summaryValue}>{getEventTypeCount('landslide')}</Text></Text>
            <Text style={styles.summaryText}>Outros: <Text style={styles.summaryValue}>{getEventTypeCount('other')}</Text></Text>
          </View>
        </View>

        {/* Add New Event Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Location')}
        >
          <Text style={styles.buttonText}>Registrar Nova Ocorrência</Text>
        </TouchableOpacity>

        {/* Events List */}
        {events.length > 0 && (
          <View style={styles.recentEventsSection}>
            <Text style={styles.sectionHeader}>Ocorrências Recentes</Text>
            {events.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Text style={styles.eventTextBold}>Local: {event.location.neighborhood}, {event.location.city}</Text>
                <Text style={styles.eventText}>Data: {new Date(event.date).toLocaleDateString()}</Text>
                <Text style={styles.eventText}>Tipo: {event.naturalEvent.type}</Text>
                {/* Add more details if needed */}

                {/* Botões de Ação */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.viewButton]}
                    onPress={() => {
                      console.log('Ver evento:', event.id);
                      navigation.navigate('EventDetail', { eventId: event.id });
                    }}
                  >
                    <Ionicons name="eye-outline" size={20} color="#1f2937" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => {
                      console.log('Editar evento:', event.id);
                      navigation.navigate('Location', { eventId: event.id });
                    }}
                  >
                    <Ionicons name="pencil-outline" size={20} color="#1f2937" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.removeButton]}
                    onPress={() => removeEvent(event.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#1f2937" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

         {events.length === 0 && (
          <View style={styles.noEventsCard}>
             <Text style={styles.noEventsText}>Nenhuma ocorrência registrada ainda.</Text>
          </View>
        )}

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
    fontSize: 18,
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
    marginBottom: 32,
    textAlign: 'center',
    color: '#1f2937',
  },
  section: {
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingBottom: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginBottom: 12,
    color: '#1f2937',
  },
  summaryList: {
    paddingLeft: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#374151',
  },
  summaryValue: {
    fontWeight: 'semibold',
    color: '#1f2937',
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
    marginBottom: 24,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'semibold',
    fontSize: 18,
  },
  recentEventsSection: {
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  eventTextBold: {
    fontWeight: 'semibold',
    fontSize: 16,
    color: '#1f2937',
  },
  eventText: {
    color: '#4b5563',
    fontSize: 14,
  },
  noEventsCard: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  noEventsText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  viewButton: {
    backgroundColor: '#bbf7d0',
  },
  editButton: {
    backgroundColor: '#fde68a',
  },
  removeButton: {
    backgroundColor: '#fca5a5',
  },
  buttonTextSmall: {
    fontSize: 0,
  }
}); 