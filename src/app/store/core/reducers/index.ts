import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import {routerReducer, RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';


export interface State {
    routerReducer: RouterReducerState<SerializedRouterStateSnapshot>;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer
};
/* create top level feature selectors */
export const getRouterState = createFeatureSelector<RouterReducerState<SerializedRouterStateSnapshot>>('routerReducer');
