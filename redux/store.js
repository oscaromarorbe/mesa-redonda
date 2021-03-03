import { createStore } from "redux";
import { reducer } from "./reducer";

let store = null;

export const getStore = () => {
  return store;
}

export const initializeStore = (initialState) => {
  store = createStore(reducer, initialState);
  return store;
}