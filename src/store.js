import { createStore } from 'redux';
import  appReducers  from './reducers/reducer.js';
export const store = createStore(appReducers)