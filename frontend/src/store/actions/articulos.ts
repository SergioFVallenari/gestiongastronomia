import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../helpers";

export const getArticulos = createAsyncThunk('/articulos/get_articulos', async () => {
    try {
        const response = await api.post('/articulos/get_articulos');
        return response
    } catch (error) {
        return error;
    }
});