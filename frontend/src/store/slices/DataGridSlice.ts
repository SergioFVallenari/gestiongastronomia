import { createSlice } from '@reduxjs/toolkit';

const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        data: {} as { [key: string]: any },
    },
    reducers: {
        setDataForGrid: (state, action) => {
            const { origen, data } = action.payload;
            state.data[origen] = data; // Guarda los datos por origen
        },
    },
});

export const { setDataForGrid } = gridSlice.actions;
export default gridSlice.reducer;