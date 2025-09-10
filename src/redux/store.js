import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from '../redux/expenesSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer,persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";


const rootReducer=combineReducers({
  expenses:expenseReducer,
});

const persistConfig={
  key:'root',
  storage,
};
const persistedReducer=persistReducer(persistConfig,rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);