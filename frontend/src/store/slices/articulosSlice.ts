import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../types/articulos";
import { getArticulos } from "../actions/articulos";

export const ArticulosSlice = createSlice({
    name: 'articulos',
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder.addCase(getArticulos.fulfilled, (state: any, action: any) => {
            return {
                ...state,
                getArticulos: {
                    data: action.payload,
                    states: {
                        success: true,
                        loading: false,
                        error: false
                    }
                }
            }
        })
});

export default ArticulosSlice.reducer;