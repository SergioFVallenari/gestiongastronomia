import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './slices/DataGridSlice';

const store = configureStore({
    reducer: {
        grid: gridReducer,
    },
});

export default store;