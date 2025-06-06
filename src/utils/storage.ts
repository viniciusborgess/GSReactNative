import AsyncStorage from '@react-native-async-storage/async-storage';
import { PowerOutageEvent } from '../types/types';

const STORAGE_KEY = '@power_outage_events';

export const saveEvent = async (event: PowerOutageEvent): Promise<void> => {
  try {
    const existingEvents = await getEvents();
    
    // Verifica se o evento já existe pelo ID
    const eventIndex = existingEvents.findIndex(e => e.id === event.id);

    let updatedEvents;
    if (eventIndex > -1) {
      // Se o evento existe, substitui a entrada antiga
      updatedEvents = [...existingEvents];
      updatedEvents[eventIndex] = event;
    } else {
      // Se o evento não existe, adiciona como um novo
      updatedEvents = [...existingEvents, event];
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
  } catch (error) {
    console.error('Error saving event:', error);
    throw error;
  }
};

export const getEvents = async (): Promise<PowerOutageEvent[]> => {
  try {
    const events = await AsyncStorage.getItem(STORAGE_KEY);
    return events ? JSON.parse(events) : [];
  } catch (error) {
    console.error('Error getting events:', error);
    return [];
  }
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    const events = await getEvents();
    const updatedEvents = events.filter(event => event.id !== eventId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}; 