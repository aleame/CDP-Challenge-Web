//Interfaces para tipar los datos de la búsqueda.

export interface TripData {
    origin: string;
    destination: string;
    passengers: number;
}

// Búsqueda de solo ida
export interface OneWayTrip extends TripData {
    day: string;
    month: string;
}

// Búsqueda de ida y vuelta
export interface RoundTrip extends TripData {
    departureDay: string;
    returnDay: string;
    departureMonth: string | boolean;
    returnMonth: string | boolean;
}
