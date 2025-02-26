import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../helpers";

export const getCarta = createAsyncThunk('/carta/get_carta', async () => {
    try {
        const response = await api.get('/carta/get_carta');
        console.log(response)
        return response
    } catch (error) {
        return error;
    }
});

export const getCartaById = createAsyncThunk('/carta/get_carta_by_id', async (id: any) => {
    try {
        const response = await api.get(`/carta/get_carta_by_id/${id}`);
        return response
    } catch (error) {
        return error;
    }
});

export const deleteCarta = createAsyncThunk('/carta/delete_carta', async (body: any) => {
    try {
        const response = await api.delete('/carta/delete_carta', {data:body});
        return response
    } catch (error) {
        return error;
    }
});