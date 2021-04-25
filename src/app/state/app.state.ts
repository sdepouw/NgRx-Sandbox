export interface AppState {
  pizza: PizzaState;
  apiCallCount: number;
  message: string;
}

export interface PizzaState {
  isCooked: boolean;
  description: string;
}
