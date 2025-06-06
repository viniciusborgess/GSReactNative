import React, { createContext, useContext, useState, useEffect } from 'react';
import { PowerOutageEvent } from '../types/types';
import { getEvents, saveEvent, deleteEvent } from '../utils/storage';

interface EventsContextType {
  events: PowerOutageEvent[];
  addEvent: (event: PowerOutageEvent) => Promise<void>;
  removeEvent: (eventId: string) => Promise<void>;
  updateEvent: (event: PowerOutageEvent) => Promise<void>;
  loading: boolean;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<PowerOutageEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const loadedEvents = await getEvents();
      setEvents(loadedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (event: PowerOutageEvent) => {
    try {
      if (!events.some(e => e.id === event.id)) {
        await saveEvent(event);
        setEvents(prev => [...prev, event]);
      } else {
        console.warn(`Evento com ID ${event.id} já existe. Usando updateEvent em vez de addEvent.`);
        await updateEvent(event);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  const removeEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error removing event:', error);
      throw error;
    }
  };

  const updateEvent = async (event: PowerOutageEvent) => {
    try {
      await saveEvent(event);
      setEvents(prev => prev.map(e => (e.id === event.id ? event : e)));
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, removeEvent, updateEvent, loading }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}; 