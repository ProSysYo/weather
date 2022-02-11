import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";

const reHydrateStore = () => {
  if (localStorage.getItem('state') !== null) {
    return JSON.parse(localStorage.getItem('state') || '{}');
  }
};

export const store = configureStore({
    reducer: {
        weather: weatherReducer,        
    },
    preloadedState: reHydrateStore()
    
});

store.subscribe(() => {
    localStorage.setItem("state", JSON.stringify(store.getState()));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
