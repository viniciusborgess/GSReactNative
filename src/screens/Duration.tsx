import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useEvents } from '../context/EventsContext';

type DurationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Duration'>;
type DurationScreenRouteProp = RouteProp<RootStackParamList, 'Duration'>;

export const Duration = () => {
  const navigation = useNavigation<DurationScreenNavigationProp>();
  const route = useRoute<DurationScreenRouteProp>();
  const { eventId } = route.params || {};
  const { events, addEvent, updateEvent } = useEvents();

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const currentEvent = eventId ? events.find(e => e.id === eventId) : events[events.length - 1];

  useEffect(() => {
    if (currentEvent?.duration) {
      setStartTime(new Date(currentEvent.duration.startTime));
      if (currentEvent.duration.endTime) {
        setEndTime(new Date(currentEvent.duration.endTime));
      } else {
        setEndTime(new Date());
      }
    } else {
      setStartTime(new Date());
      setEndTime(new Date());
    }
  }, [currentEvent]);

  const handleSubmit = async () => {
    if (!currentEvent) return;

    const updatedEvent = {
      ...currentEvent,
      duration: {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    };

    try {
      await updateEvent(updatedEvent);
      navigation.navigate('Damages', { eventId: updatedEvent.id });
    } catch (error) {
      console.error('Error saving duration:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.card}>
        <Text style={styles.header}>Tempo de Interrupção</Text>

        <View style={styles.formContainer}>
          <View style={styles.timeInputGroup}>
            <Text style={styles.label}>Horário de Início:</Text>
            <TouchableOpacity
              style={styles.timeDisplay}
              onPress={() => setShowStartTimePicker(true)}
            >
              <Text style={styles.timeText}>
                {startTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
          </View>

          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'default' : 'spinner'}
              onChange={(event, selectedDate) => {
                setShowStartTimePicker(false);
                if (selectedDate) {
                  setStartTime(selectedDate);
                }
              }}
            />
          )}

          <View style={styles.timeInputGroup}>
            <Text style={styles.label}>Horário de Término:</Text>
            <TouchableOpacity
              style={styles.timeDisplay}
              onPress={() => setShowEndTimePicker(true)}
            >
              <Text style={styles.timeText}>
                {endTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
          </View>

          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'default' : 'spinner'}
              onChange={(event, selectedDate) => {
                setShowEndTimePicker(false);
                if (selectedDate) {
                  setEndTime(selectedDate);
                }
              }}
            />
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
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
  formContainer: {
    marginBottom: 16,
  },
  timeInputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#374151',
  },
  timeDisplay: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  timeText: {
    fontSize: 16,
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
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'semibold',
    fontSize: 18,
  },
}); 