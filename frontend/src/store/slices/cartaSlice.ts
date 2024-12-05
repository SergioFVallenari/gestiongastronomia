import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../types/carta";
import { getCarta, getCartaById } from "../actions/carta";

export const CartaSlice = createSlice({
    name: 'carta',
    initialState: initialState, // Aseguramos que el tipo inicial se ajuste
    reducers: {},
    extraReducers: builder =>
        builder.addCase(getCarta.fulfilled, (state: any, action: any) => {
            return {
                ...state,
                getCarta: {
                    data: action.payload,
                    states: {
                        success: true,
                        loading: false,
                        error: false
                    }
                }
            }
        })
            .addCase(getCartaById.fulfilled, (state: any, action: any) => {
                return {
                    ...state,
                    getCartaById: {
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

export default CartaSlice.reducer;
