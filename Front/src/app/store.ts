import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { chartApi } from './chart/chart-service';
import listSliceReducer from './chartList/chartList-slice'


// Reducers
const rootReducer = combineReducers({
  list: listSliceReducer,
  [chartApi.reducerPath]: chartApi.reducer,
})

// Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) => defaultMiddleware().concat(chartApi.middleware),
});

// Store types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Select / Dispatch hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
