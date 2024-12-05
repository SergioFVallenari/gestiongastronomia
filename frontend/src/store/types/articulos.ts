import { iArticulos } from "../interfaces/articulos";

export const GET_ARTICULOS_SUCCESS = 'GET_ARTICULOS_SUCCESS';
export const GET_ARTICULOS_ERROR = 'GET_ARTICULOS_ERROR';
export const GET_ARTICULOS_LOADING = 'GET_ARTICULOS_LOADING';

export interface State{
    getArticulos:{
        data: iArticulos[] | null;
        states:{
            success: boolean;
            loading: boolean;
            error: boolean;
        }
    }
}

export const initialState: State = {
    getArticulos:{
        data: null,
        states:{
            success: false,
            loading: false,
            error: false
        }
    }
}

export interface GetARticulosSuccess{
    type: typeof GET_ARTICULOS_SUCCESS;
    payload: iArticulos[];
}

export type Actions = GetARticulosSuccess;