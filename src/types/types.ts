export interface PowerOutageEvent {
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
    type: 'rain' | 'wind' | 'landslide' | 'other';
    description: string;
  };
}

export type RootStackParamList = {
  Overview: undefined;
  Location: undefined | { eventId?: string };
  Duration: undefined | { eventId?: string };
  Damages: undefined | { eventId?: string };
  Recommendations: undefined;
  EventDetail: { eventId: string };
}; 