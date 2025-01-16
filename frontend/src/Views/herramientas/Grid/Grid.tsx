import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-colreorder/js/dataTables.colReorder';
import 'datatables.net-bs5/js/dataTables.bootstrap5';
import 'datatables.net-buttons-dt/js/buttons.dataTables.mjs';
import 'datatables.net-buttons/js/buttons.print.min';
import 'datatables.net-buttons/js/buttons.html5.min';
import { useCallback, useEffect, useRef } from 'react';
import moment from 'moment-timezone';
import { Table } from 'react-bootstrap';
import { Order } from 'datatables.net';
import { useDispatch } from 'react-redux';
import { setDataForGrid } from '../../../store/slices/DataGridSlice';
const VITE_API_URL_DONFAUSTINO = import.meta.env.VITE_API_URL_DONFAUSTINO;

interface IFiltro {
    id?: number;
    idarticulo?: number;
}


const Grid = (manejo_acciones: Function, origen: string, gridCarga: any, recargaGrid: Function, _filtro?: IFiltro): JSX.Element => {
    const groupColumn = 2;
    const dispatch = useDispatch();
    const getButtonOpciones = (data: number, origen: string, _full: any) => {
        const newData = data;
        let btn = '';
        const btnBaja = "<li><a key='" + newData + "' accion='b' class='dropdown-item'>Eliminar</a></li>";
        const btnConsulta = "<li><a key='" + data + "' accion='c' class='dropdown-item'>Consultar</a></li>";
        const btnModificar = "<li><a key='" + data + "' accion='m' class='dropdown-item'>Modificar</a></li>";
        switch (origen) {
            case 'articulos':
                btn = btnConsulta + btnModificar + btnBaja
                break;
            case 'ingresos':
                btn = btnConsulta;
                break;
            case 'materia_prima':
                btn = btnConsulta + btnModificar + btnBaja;
                break;
            case 'ventas':
                btn = btnConsulta;
                break;    
            default:
                btn = '';
        }
        return "<div class='dropdown pb-1 pt-1 ps-3 pe-3'>" + 
        "<button title='" + data + "' class='btn-default p-0 btn-sm dropdown-toggle btn-grid' type='button' data-bs-toggle='dropdown' aria-expanded='false'>"
         + "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-gear' viewBox='0 0 16 16'>" + "<path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z'/>" + "<path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z'/>" + '</svg>' + '</button>' + "<ul class='dropdown-menu'>" + btn + '</ul>' + '</div>';
    }
    const getColumnsByOrigen = (origen: string) => {
        let columns: any = [];
        switch (origen) {
            case 'articulos': {
                columns = [
                    { data: 'id', title: '', searcheable: false, width: '1%', class: 'text-center' },
                    { data: 'nombre', title: 'Nombre', class: 'text-center' },
                    { data: 'sku', title: 'SKU', class: 'text-center' },
                    { data: 'precio_costo', title: 'Precio Costo', class: 'text-center' },
                    { data: 'precio_venta', title: 'Precio Venta', class: 'text-center' },
                    { data: 'stock', title: 'Disponibles', class: 'text-center' },
                    { data: 'fecha_mod', title: 'Ultima Modificación', class: 'text-center' },
                ];
                break;
            }
            case 'ingresos': {
                columns = [
                    { data: 'id', title: '', searcheable: false, width: '1%', class: 'text-center' },
                    { data: 'fecha', title: 'Fecha de Ingreso', class: 'text-center' },
                    { data: 'importe_total', title: 'Importe Total', class: 'text-center' },
                    { data: 'info', title: 'Información', class: 'text-center' },
                ]
                break;
            }
            case 'materia_prima': {
                columns=[
                    { data: 'id', title: '', searcheable: false, width: '1%', class: 'text-center' },
                    { data: 'nombre', title: 'Nombre', class: 'text-center' },
                    { data: 'sku', title: 'SKU', class: 'text-center' },
                    { data: 'precio_costo', title: 'Precio Costo', class: 'text-center' },
                    { data: 'stock', title: 'Cantidad disponible', class: 'text-center' },
                    // { data: 'peso', title: 'Cantidad Disponible', class: 'text-center' },
                    { data: 'fecha_mod', title: 'Ultima Modificación', class: 'text-center' },
                ]
            break;
            }
            case 'ventas': {
                columns = [
                    { data: 'id', title: '', searcheable: false, width: '1%', class: 'text-center' },
                    { data: 'fecha', title: 'Fecha de Venta', class: 'text-center' },
                    { data: 'importe_total', title: 'Importe Total', class: 'text-center' },
                    { data: 'ganancia', title: 'Ganancia', class: 'text-center' },
                ]
            }
            break;
            default:
                columns = [];
        }
        return columns;
    }

    const getRenderColumns = (origen: string) => {
        switch (origen) {
            case 'articulos':
                return [
                    {
                        targets: [0],
                        render: function (data: any, _type: any, full: any) {
                            return getButtonOpciones(data, origen, full);
                        },
                    },
                ];
            case 'ingresos':
                return [
                    {
                        targets: [0],
                        render: function (data: any, _type: any, full: any) {
                            return getButtonOpciones(data, origen, full);
                        },
                    },
                    {
                        targets: [3],
                        render: function (data: any, _type: any, _full: any) {
                            if (typeof data === 'string') {
                                try {
                                    data = JSON.parse(data);
                                } catch (error) {
                                    console.error('Error parsing JSON:', error);
                                    return ''; 
                                }
                            }
            

                            if (!Array.isArray(data)) {
                                console.warn('Expected an array but got:', data);
                                return '';
                            }
                            const formateo = data.map((articulo: any) => {
                                return {
                                    sku: articulo.sku,
                                    nombre: articulo.articulo,
                                    cantidad: articulo.cantidad,
                                };
                            });
            
                            const jsonString = JSON.stringify(formateo);
                            
                            const maxLength = 50
            
                            const formattedString = jsonString.replace(/\\/g, '').replace(/"/g, '');
            
                            return formattedString.length > maxLength 
                                ? formattedString.substring(0, maxLength) + '...' 
                                : formattedString;
                        },
                    },
                ];
                case 'materia_prima':
                   return [
                        {
                            targets: [0],
                            render: function (data: any, _type: any, full: any) {
                                return getButtonOpciones(data, origen, full);

                            },
                        },
                        {
                            targets: [3],
                            render: function(data:any, _type:any, _full:any){
                                return '$ ' + data
                            }
                        },
                        {
                            targets:[4],
                            render: function (data:any,_type:any,_full:any){
                                return data + 'kg'
                            }
                        }
                        
                    ]
            default:
                return [
                    {
                        targets: [0],
                        render: function (data: any, _type: any, full: any) {
                            return getButtonOpciones(data, origen, full);
                        },
                    },
                ];
        }
    }
    const getUrlOrigen = (origen: string) => {
        let url = '';
        switch (origen) {
            case 'articulos':
                url = `${VITE_API_URL_DONFAUSTINO}/articulos/get_articulos`;
                break;
            case 'ingresos':
                url = `${VITE_API_URL_DONFAUSTINO}/ingresos/get_ingresos`;
                break;
            case 'materia_prima':
                url = `${VITE_API_URL_DONFAUSTINO}/materia_prima/get_materia_prima`;
                break;
            case 'ventas':
                url = `${VITE_API_URL_DONFAUSTINO}/ventas/get_ventas`;
                break;    
            default:
                return '';
        }
        return url;
    }

    const getMetodoOrigen = (origen: string) => {
        switch (origen) {
            case 'articulos':
                return 'POST';
            case 'ingresos':
                return 'POST';
            case 'materia_prima':
                return 'POST';
            case 'ventas':
                return 'POST';        
            default:
                return 'POST';
        }
    }
    const getTipoTable = (origen: string) => {
        switch (origen) {
            default:
                return 'table-bordered tabla-generica';
        }
    };
    const orderfixedtogroup_grid = (tipo: string, _groupColumn: any): Order | Order[] | { pre?: Order | Order[]; post: Order | Order[] } | undefined => {
        switch (tipo) {
            default:
                return undefined;
        }
    };
    const getColumnasExportar = (origen: string) => {
        switch (origen) {
            case 'articulos':
                return [1, 2, 3, 4, 5, 6];
            case 'materia_prima':
                return [1, 2, 3, 4, 5];    
            default:
                return [];
        }
    }
    const getExportOrientation = (origen: string) => {
        switch (origen) {
            default:
                return 'portrait';
        }
    };
    const ManejoOrigenAcciones = useCallback((origen: string, e: any) => {
        switch (origen) {
            default:
                return manejo_acciones(origen, e?.target?.attributes?.key?.value, e?.target?.attributes?.accion?.value, e);
        }
    }, []);

    function getButtonsGrids(origen: string) {
        return [
            {
                extend: 'collection',
                text: 'Exportar',
                className: 'btn btn-primary rounded-pill',
                buttons: [
                    { extend: 'excel', title:'DonFaustino ' + origen, orientation: getExportOrientation(origen), exportOptions: { columns: getColumnasExportar(origen), grouped_array_index: [groupColumn] } },
                    { extend: 'pdfHtml5',title:'DonFaustino ' + origen ,orientation: getExportOrientation(origen), exportOptions: { columns: getColumnasExportar(origen), grouped_array_index: [groupColumn] } },
                    { extend: 'csv',title:'DonFaustino ' + origen, orientation: getExportOrientation(origen), exportOptions: { columns: getColumnasExportar(origen) } },
                    { extend: 'print', orientation: getExportOrientation(origen), exportOptions: { columns: getColumnasExportar(origen) } },
                ],
            },
            {
                text: 'Refresh',
                className: 'btn btn-primary rounded-pill',
                action: function (_e: any, _dt: any, _node: any, _config: any) {
                    recargaGrid(moment().format('YYYY-MM-DD HH:mm:ss'));
                },
            },
            {
                text: "<button accion='f' class='a-filtro'>Filtros</button>",
                className: 'btn btn-primary rounded-pill',
                action: function (e: any, _dt: any, _node: any, _config: any) {
                    ManejoOrigenAcciones('', e);
                },
            },
        ];
    }
    function getDomOrigen(origen: string) {
        switch (origen) {
            case 'stock':
                return '<"row"<"col-12"<"row"<"col-12 div-btn-grid"B>>><"col-12 d-flex justify-content-start mb-2"<"row"<"col-12 div-filter-table"f>>>><"row"<"col-12 content-grid-referencia">><"row"<"col-12"t>><"row grid-footer mt-2"<"col-12 col-lg-4"l><"col-12 col-lg-8"<"row"<"col-12 col-lg-4 col-xl-4"i><"col-12 col-lg-8 col-xl-8"p>>>>';
            default:
                return '<"row"<"col-12"<"row"<"col-12 div-btn-grid"B>>><"col-12 d-flex justify-content-start mb-2"<"row"<"col-12 div-filter-table"f>>>><"row"<"col-12 content-grid-referencia">><"row"<"col-12"t>><"row grid-footer mt-2"<"col-12 col-lg-4"l><"col-12 col-lg-8"<"row"<"col-12 col-lg-4 col-xl-4"i><"col-12 col-lg-8 col-xl-8"p>>>>';
        }
    }
    const getDataOrigen = (origen: string) => {
        let data: any = {};
        switch (origen) {
            case 'articulos':
                {
                    data['nombre'] = '';
                    data['id'] = 0;
                    data['sku'] = 0;
                    data['precio_costo'] = 0;
                    data['precio_venta'] = 0;
                }
                break;
            default:
                data = [];
        }
        return JSON.stringify(data);
    };


    const tableOp: React.RefObject<HTMLTableElement> = useRef(null);
    useEffect(() => { 
        if (tableOp.current) {

            $(tableOp.current).DataTable({
                colReorder: true,
                destroy: true,
                responsive: false,
                processing: true,
                ajax: {
                    contentType: 'application/json',
                    type: getMetodoOrigen(origen),
                    url: getUrlOrigen(origen),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agrega el token de autenticación
                    },
                    dataSrc: function (json: any) {
                        if (json && json.content) {
                            dispatch(setDataForGrid({ origen: origen, data: json.content }));
                            return json.content; // Retorna los datos en el formato que DataTables espera
                        }
                        return []; // Si no hay datos, retornar un array vacío
                    },
                    data: function () {
                        return getDataOrigen(origen);
                    },
                },
                dom: getDomOrigen(origen),
                buttons: getButtonsGrids(origen),
                drawCallback: function (_settings: any) {
                    if ($('.tabla-agrupada').length > 0) {
                        const api = ($(this) as any).api();
                        const rows = api.rows({ page: 'current' }).nodes();
                        let last: any = null;
                        api
                            .column(groupColumn, { page: 'current' })
                            .data()
                            .each(function (group: any, i: any) {
                                if (last !== group) {
                                    $(rows)
                                        .eq(i)
                                        .before('<tr class="group tr_agrupado"><td class="table-secondary" colspan="11">' + group + '</td></tr>');
                                    last = group;
                                }
                            });
                    }
                    $('.div-btn-grid .btn,.btn-group-sm .btn').addClass('btn-sm');
                    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
                    $('#tabla_' + origen + ' .dropdown-item').on('click', function (e: any) {
                        ManejoOrigenAcciones(origen, e);
                    });
                    $('.a-filtro').on('click', function (e: any) {
                        ManejoOrigenAcciones(origen, e);
                    });
                },
                orderFixed: orderfixedtogroup_grid(origen, groupColumn),
                columns: getColumnsByOrigen(origen),
                displayLength: 10,
                autoWidth: false,
                columnDefs: getRenderColumns(origen),
                language: {
                    paginate: {
                        previous: '<',
                        next: '>',
                        last: '>>',
                        first: '<<',
                    },
                    lengthMenu: 'Mostrar <select>' + '<option selected value="10">10</option>' + '<option value="25">25</option>' + '<option value="50">50</option>' + '<option value="75">75</option>' + '<option value="100">100</option>' + '<option value="-1">Todos</option>' + '</select> registros',
                    info: 'Mostrando del _START_ a _END_ (Total: _TOTAL_ resultados)',
                    infoFiltered: ' - filtrados de _MAX_ registros',
                    infoEmpty: 'No hay resultados de b&uacute;squeda',
                    zeroRecords: 'No hay registros a mostrar',
                    processing: 'Espere, por favor...',
                    search: 'Buscar: ',
                    emptyTable: 'No hay datos disponibles en la tabla',
                    loadingRecords: 'Cargando...',
                },
            } as any);
        }
    }, [origen, gridCarga /*, ManejoOrigenAcciones, getButtonsGrids, getDataOrigen, getRenderColumns, getUrlOrigen */]);
    return <Table responsive='xl' id={'tabla_' + origen} className={getTipoTable(origen)} bordered hover ref={tableOp}></Table>;
}

export default Grid