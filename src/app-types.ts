export interface SearchFormData {
  city: string;
  checkin: Date;
  checkout: Date;
  maxprice: number | null;
  coordinates: string;
}

export interface Place {
  id: number | string;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}

export interface Favorite {
  id: number;
  name: string;
  image: string;
}


export interface IMessage {
  type: string;
  text: string;
}

export interface IAction {
  name?: string;
  handler?: () => void;
}

export interface Provider {
  find(filter: SearchFormData): Promise<Place[]>
}

export interface SM {
  [a: string]: sort
}

interface sort {
  name: string,
  fnc: (one: Place, two: Place) => number;
}
