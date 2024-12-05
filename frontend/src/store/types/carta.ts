import { iGetCarta } from "../interfaces/carta";

export const GET_CARTA_SUCCESS = 'GET_CARTA_SUCCESS';
export const GET_CARTA_ERROR = 'GET_CARTA_ERROR';
export const GET_CARTA_LOADING = 'GET_CARTA_LOADING';
export const GET_CARTA_BY_ID_SUCCESS = 'GET_CARTA_BY_ID_SUCCESS';
export const GET_CARTA_BY_ID_ERROR = 'GET_CARTA_BY_ID_ERROR';
export const GET_CARTA_BY_ID_LOADING = 'GET_CARTA_BY_ID_LOADING';
export const DELETE_CARTA_SUCCESS = 'DELETE_CARTA_SUCCESS';

export interface State {
    getCarta:{
        data: iGetCarta | null;
        states: {
            success: boolean;
            loading: boolean;
            error: boolean;
        }
    },
    getCartaById:{
        data: any | null;
        states: {
            success: boolean;
            loading: boolean;
            error: boolean;
        }
    },
    deleteCarta:{
        data: any | null;
        states: {
            success: boolean;
            loading: boolean;
            error: boolean;
        }
    }
}

export const initialState: State = {
    getCarta:{
        data: null,
        states: {
            success: false,
            loading: false,
            error: false
        }
    },
    getCartaById:{
        data: null,
        states: {
            success: false,
            loading: false,
            error: false
        }
    },
    deleteCarta:{
        data: null,
        states: {
            success: false,
            loading: false,
            error: false
        }
    }
}

export interface GetCartaSuccess {
    type: typeof GET_CARTA_SUCCESS;
    payload: iGetCarta;
}
export interface GetCartaByIdSuccess {
    type: typeof GET_CARTA_BY_ID_SUCCESS;
    payload: iGetCarta;
}

export type Actions = GetCartaSuccess | GetCartaByIdSuccess;