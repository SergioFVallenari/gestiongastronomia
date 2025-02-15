import { useForm } from 'react-hook-form';
import DonFaustinoLoad, { EnviarMensaje } from '../herramientas/General/General';
import { useEffect, useState } from 'react';
import api from '../../helpers';

interface FormArticulosProps {
    accion: string; // 'a' para alta, 'm' para modificar, 'v' para visualizar (consulta)
    idArticulo: number | null; // Si es null, significa que es una alta
    onSubmitSuccess: () => void; // Callback para manejar éxito después de la operación
    formDisabled?: boolean; // Deshabilitar formulario
    setRecargaGridArticulos: (value: string) => void; // Callback para recargar el grid de artículos
}

interface Categoria {
    id_valor_modulo: number;
    valor_modulo: string;
}
const FormArticulos: React.FC<FormArticulosProps> = ({ accion, idArticulo, onSubmitSuccess, formDisabled, setRecargaGridArticulos }) => {
    const { register, handleSubmit, setValue, formState: { errors },getValues } = useForm({
        defaultValues: {
            nombre: '',
            sku: 'DF-',
            precio_costo: 0,
            precio_venta: 0,
            cantidad: 0,
            categoria_articulo: '',
            categoria_nueva: ''
        }
    });
    const [mostrarInputCategoria, setMostrarInputCategoria] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const loadCategorias = () =>{
        api.post(`/tabla/lista_modulos`, { modulo: 'categorias_articulos' })
        .then(res => {
            setCategorias(res.data.content);
        })
    }
    useEffect(() => {
       loadCategorias()
        if (accion !== 'a' && idArticulo) {
            // Si es modificación o visualización, cargamos los datos del artículo
            api.get(`/articulos/get_articulo/${idArticulo}`)
                .then(res => {
                    const articulo = res?.data?.content[0];
                    // Prellenamos el formulario con los datos del artículo
                    setValue('nombre', articulo.nombre);
                    setValue('sku', articulo.sku);
                    setValue('precio_costo', articulo.precio_costo);
                    setValue('precio_venta', articulo.precio_venta);
                    setValue('cantidad', articulo.stock);
                    setValue('categoria_articulo', articulo.categoria_articulo);
                });
        }
    }, [accion, idArticulo, setValue]);
    const onSubmit = async (data: unknown) => {
        if (accion === 'a') {
            // Alta de un nuevo artículo
            await api.post(`/articulos/alta_articulos`, data)
                .then(res => {
                    DonFaustinoLoad.DonFaustinoLoad(true);
                    if (res.status === 200) {
                        DonFaustinoLoad.DonFaustinoLoad(false);
                        EnviarMensaje('success', res.data.content[0].msg);
                        onSubmitSuccess(); // Callback para recargar o cerrar modal
                    }
                });
        } else if (accion === 'm' && idArticulo) {
            // Modificación de un artículo existente
            await api.put(`/articulos/modificar_articulo/${idArticulo}`, data)
                .then(res => {
                    if (res.status === 200) {
                        EnviarMensaje('success', res.data.content[0].msg);
                        onSubmitSuccess(); // Callback para recargar o cerrar modal
                        setRecargaGridArticulos(new Date().toString());
                    }
                });
        }
    }
    const handleSkuChange = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (!value.startsWith('DF-')) {
            setValue('sku', `DF-${value}`);
        }
    };
    const agregarCategoria=async()=>{
        const nuevaCategoria = getValues('categoria_nueva')
        await api.post('/tabla/insert_categoria', { modulo: 'categorias_articulos', valor_modulo: nuevaCategoria })
        setMostrarInputCategoria(false)
        setValue('categoria_nueva','')
        loadCategorias()
    }
    return (
        <>
            <form className='row' onSubmit={handleSubmit(onSubmit)}>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Artículo</label>
                        <input type='text' className='form-control' {...register('nombre', { required: 'Obligatorio' })} disabled={accion === 'c' && formDisabled} />
                        {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Sku</label>
                        <input type='text' className='form-control' {...register('sku', { required: 'Obligatorio' })} disabled={accion !== 'a' && formDisabled} onBlur={handleSkuChange} />
                        {errors.sku && <span className='text-danger'>{errors.sku.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Precio Costo</label>
                        <input type='text' className='form-control' {...register('precio_costo', { required: 'Obligatorio' })} disabled={accion === 'c' && formDisabled} />
                        {errors.precio_costo && <span className='text-danger'>{errors.precio_costo.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Precio Venta</label>
                        <input type='text' className='form-control' {...register('precio_venta', { required: 'Obligatorio' })} disabled={accion === 'c' && formDisabled} />
                        {errors.precio_venta && <span className='text-danger'>{errors.precio_venta.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Cantidad</label>
                        <input type='text' className='form-control' {...register('cantidad', { required: 'Obligatorio' })} disabled={accion !== 'a' && formDisabled} />
                        {errors.cantidad && <span className='text-danger'>{errors.cantidad.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Categoría</label>
                        <select
                            className='form-control'
                            {...register('categoria_articulo', { required: 'Obligatorio' })}
                            disabled={accion === 'c' && formDisabled}
                            onChange={(e) => {
                                // Si se selecciona 'Otra categoría', mostrar el input
                                if (e.target.value === 'otra') {
                                    setMostrarInputCategoria(true); // Cambia esta variable de estado según lo necesites
                                } else {
                                    setMostrarInputCategoria(false);
                                }
                            }}
                        >
                            <option value=''>Selecciona una categoría</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id_valor_modulo} value={categoria.id_valor_modulo}>
                                    {categoria.valor_modulo.toUpperCase()}
                                </option>
                            ))}
                            <option value='otra'>Otra categoría</option> {/* Opción extra */}
                        </select>
                        {errors.categoria_articulo && <span className='text-danger'>{errors.categoria_articulo.message}</span>}

                        {/* Si la opción 'Otra categoría' es seleccionada, mostrar un campo de entrada */}
                        {mostrarInputCategoria && (
                            <>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    placeholder="Escribe una categoría personalizada"
                                    {...register('categoria_nueva', { required: 'Debes ingresar una categoría personalizada' })}
                                />
                                <button className='btn btn-secondary m-2' onClick={agregarCategoria}>Agregar</button>
                            </>
                        )}
                    </div>
                </div>

                <hr></hr>
                <div className='col-md-6'>
                    <button className='btn btn-primary m-2' type='submit' disabled={accion === 'c' && formDisabled}>
                        Guardar
                    </button>
                    <button className='btn btn-danger' type='button' onClick={() => onSubmitSuccess()}>
                        Cancelar
                    </button>
                </div>
            </form>
        </>
    );
}

export default FormArticulos;