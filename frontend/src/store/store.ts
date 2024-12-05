import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './slices/DataGridSlice';
import { CartaSlice } from './slices/cartaSlice';
import { ArticulosSlice } from './slices/articulosSlice';

export const store = configureStore({
    reducer: {
        grid: gridReducer,
        carta: CartaSlice.reducer,
        articulos: ArticulosSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>