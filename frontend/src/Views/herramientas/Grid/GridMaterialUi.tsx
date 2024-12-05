import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, CircularProgress, Typography } from '@mui/material';
import api from '../../../helpers';

interface DataTableProps {
    origen: string; // Define la fuente de los datos
    pageSize?: number; // Tamaño de página, opcional
    onRowClick?: (row: any) => void; // Evento al hacer clic en una fila
}

const DataTable: React.FC<DataTableProps> = ({
    origen,
    pageSize = 5,
    onRowClick,
}) => {
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<Array<Record<string, any>>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getColumnsByOrigen = (origen: string) => {
        switch (origen) {
            case 'articulos':
                return [
                    { field: 'actions', headerName: '', width: 50, sortable:false },
                    { field: 'nombre', headerName: 'Nombre', width: 200 },
                    { field: 'sku', headerName: 'Precio', width: 100 },
                    { field: 'precio_costo', headerName: 'Stock', width: 100 },
                    { field: 'stock', headerName: 'Stock', width: 100 },
                    { field: 'fecha_mod', headerName: 'Ultima Modificacion', width: 200 },
                    { field: 'fecha_alta', headerName: 'Fecha Alta', width: 100 },
                ];
            case 'usuarios':
                return [
                    { field: 'id', headerName: 'ID', width: 100 },
                    { field: 'nombre', headerName: 'Nombre', width: 200 },
                    { field: 'email', headerName: 'Email', width: 250 },
                    { field: 'rol', headerName: 'Rol', width: 150 },
                ];
            default:
                return [];
        }
    };

    // Función para obtener los datos según el `origen`
    const fetchData = async (origen: string) => {
        setLoading(true);
        setError(null);
        try {
            let url = '';
    
            // Configuración dinámica de la URL
            switch (origen) {
                case 'articulos':
                    url = '/materia_prima/get_materia_prima';
                    break;
                case 'usuarios':
                    url = '/usuarios';
                    break;
                default:
                    throw new Error('Origen no válido');
            }
    
            // Llamada a la API usando el cliente de API
            const response = await api.post(url); // Supongo que estás usando Axios o similar
            setRows(response.data.content);
        } catch (err: any) {
            setError(err.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        // Configura las columnas y datos dinámicamente
        setColumns(getColumnsByOrigen(origen));
        fetchData(origen);
    }, [origen]);

    console.log('rows:', rows);
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 20]}
                    onRowClick={(params) => onRowClick && onRowClick(params.row)}
                    disableSelectionOnClick
                />
            )}
        </Box>
    );
};

export default DataTable;