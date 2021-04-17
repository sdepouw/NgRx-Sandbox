import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PizzaState } from './app.state';

export const pizzaFeatureName = 'pizza';

export const selectPizzaFeature = createFeatureSelector(pizzaFeatureName);

export const isThePizzaReady = createSelector(selectPizzaFeature, (pizzaState: PizzaState) => pizzaState.isCooked);
