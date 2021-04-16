import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PizzaState } from './app.state';

export const selectPizzaFeature = createFeatureSelector('pizza');

export const isThePizzaReady = createSelector(
    selectPizzaFeature,
    (pizzaState: PizzaState) => pizzaState.isCooked
);
