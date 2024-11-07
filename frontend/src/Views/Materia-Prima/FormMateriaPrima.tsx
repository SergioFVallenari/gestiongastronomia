import { useForm } from 'react-hook-form';
import api from '../../helpers';
import DonFaustinoLoad, { EnviarMensaje } from '../herramientas/General/General';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

interface FormArticulosProps {
    accion: string;
    idArticulo: number | null;
    onSubmitSuccess: () => void;
    formDisabled?: boolean;
    setRecargaGridMateriaPrima: any;
}

const FormMateriaPrima: React.FC<FormArticulosProps> = ({ accion, idArticulo, onSubmitSuccess, formDisabled, setRecargaGridMateriaPrima }) => {
    const matPrimData = useSelector((state: any) => state?.grid?.data.materia_prima);
    const [categorias, setCategorias] = useState<any[]>([]);
    const [ingredientes, setIngredientes] = useState<any[]>([]);
    const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState<any | null>(null);
    const [nuevaCategoria, setNuevaCategoria] = useState<string>('');

    const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm({
        defaultValues: {
            nombre: '',
            sku: '',
            precio_costo: 0,
            cantidad: 0,
            categoria_materia_prima: 0,
            peso_gramos: 0,
            chkArticuloCompuesto: false,
            ingredientes: [] as any[],
            cantidad_ingrediente: 0,
            porciones: 0
        }
    });

    const isArticuloCompuesto = watch('chkArticuloCompuesto');

    useEffect(() => {
        api.post('http://localhost:3001/tabla/lista_modulos', { modulo: 'categorias_materia_prima' })
            .then(res => setCategorias(res.data.content));

        if (accion !== 'a' && idArticulo) {
            api.get(`http://localhost:3001/materia_prima/get_materia_prima/${idArticulo}`)
                .then(res => {
                    const articulo = res?.data?.content[0];
                    setValue('nombre', articulo.nombre);
                    setValue('sku', articulo.sku);
                    setValue('precio_costo', articulo.precio_costo);
                    setValue('cantidad', articulo.stock);
                    setValue('categoria_materia_prima', articulo.categoria_materia_prima);
                    setValue('peso_gramos', articulo.peso_gramos);
                    setValue('chkArticuloCompuesto', articulo.es_compuesto === 1 ? true : false);
                    setIngredientes(JSON.parse(articulo.json_ingredientes));
                });
        }
    }, []);

    const onSubmit = async (data: any) => {
        if (accion === 'a') {
            if(isArticuloCompuesto === false){
                data.ingredientes = [];
            }
            const ingredientesFormatt = JSON.stringify(data.ingredientes);
            const body = {
                nombre: data.nombre,
                sku: data.sku,
                precio_costo: data.precio_costo,
                cantidad: data.cantidad,
                categoria_materia_prima: data.categoria_materia_prima,
                peso_gramos: data.peso_gramos,
                json_ingredientes: ingredientesFormatt,
                es_compuesto: data.chkArticuloCompuesto? 1 : 0
            }
            console.log(body, 'alta');
            // Alta de un nuevo artículo
            await api.post('http://localhost:3001/materia_prima/alta_materia_prima', body)
                .then(res => {
                    DonFaustinoLoad.DonFaustinoLoad(true);
                    if (res.status === 200) {
                        DonFaustinoLoad.DonFaustinoLoad(false);
                        EnviarMensaje('success', res.data.content[0].msg);
                        onSubmitSuccess(); // Callback para recargar o cerrar modal
                    }
                });
        } else if (accion === 'm' && idArticulo) {
            await api.put(`http://localhost:3001/materia_prima/modificar_materia_prima/${idArticulo}`, data)
                .then(res => {
                    if (res.status === 200) {
                        EnviarMensaje('success', res.data.content[0].msg);
                        onSubmitSuccess();
                        setRecargaGridMateriaPrima(new Date().toString());
                    }
                });
        }
    }

    const agregarIngredientes = () => {
        if (ingredienteSeleccionado && watch('cantidad_ingrediente') > 0) {
            const ingredienteExistente = matPrimData.find((item: any) => item.id === ingredienteSeleccionado);
            const nuevoIngrediente = {
                id: ingredienteSeleccionado,
                nombre: ingredienteExistente?.nombre,
                sku: ingredienteExistente?.sku,
                precio_costo: ingredienteExistente?.precio_costo,
                cantidad: watch('cantidad_ingrediente'), // en gramos
                porciones: watch('porciones')
            };
            console.log(nuevoIngrediente);

            setIngredientes(prevIngredientes => {
                const updatedIngredientes = [...prevIngredientes, nuevoIngrediente];
                setValue('ingredientes', updatedIngredientes);

                // Calcula el nuevo precio total de costo considerando el precio por kilo y cantidad en gramos
                const nuevoPrecioCosto = updatedIngredientes.reduce((acc, item) =>
                    acc + (Math.round(item.precio_costo * (item.cantidad / 1000) / item.porciones)), 0 // convierte gramos a kilos
                );
                setValue('precio_costo', nuevoPrecioCosto);

                return updatedIngredientes;
            });
        }
    };

    const addCategoria = () => {
        if (nuevaCategoria) {
            api.post('http://localhost:3001/tabla/insert_categoria', { modulo: 'categorias_materia_prima', valor_modulo: nuevaCategoria })
                .then(res => {
                    setCategorias(prevCategorias => [...prevCategorias, res.data.content[0]]);
                    setValue('categoria_materia_prima', res.data.content[0].id_valor_modulo);
                });
        }
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
                        <input type='text' className='form-control' {...register('sku', { required: 'Obligatorio' })} disabled={accion !== 'a' && formDisabled} />
                        {errors.sku && <span className='text-danger'>{errors.sku.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Precio Costo (por kg)</label>
                        <input type='text' className='form-control' {...register('precio_costo', { required: 'Obligatorio' })} disabled={accion === 'c' && formDisabled} />
                        {errors.precio_costo && <span className='text-danger'>{errors.precio_costo.message}</span>}
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='mb-3'>
                        <label className='form-label'>Categoría</label>
                        <select className='form-control' {...register('categoria_materia_prima', { required: 'Obligatorio' })} disabled={accion === 'c' && formDisabled}>
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria, index) => (
                                <option key={index} value={categoria.id_valor_modulo}>{categoria.valor_modulo.toUpperCase()}</option>
                            ))}
                        </select>
                        {errors.categoria_materia_prima && <span className='text-danger'>{errors.categoria_materia_prima.message}</span>}
                        <input
                            type="text"
                            className='form-control mt-2'
                            placeholder='Agregar nueva categoría'
                            value={nuevaCategoria}
                            onChange={(e) => setNuevaCategoria(e.target.value)}
                            hidden={accion === 'c' && formDisabled}
                        />
                        <button type="button" className='btn btn-warning mt-2' onClick={addCategoria} hidden={accion === 'c' && formDisabled} >Agregar</button>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='mb-3'>
                        <label className='form-label'>Disponible (kg)</label>
                        <input type='text' className='form-control' {...register('peso_gramos', { required: 'Obligatorio' })} disabled />
                        {errors.peso_gramos && <span className='text-danger'>{errors.peso_gramos.message}</span>}
                    </div>
                </div>
                <div className='col-md-12'>
                    <Form.Check
                        type='switch'
                        label='Artículo compuesto'
                        {...register('chkArticuloCompuesto')}
                        disabled={accion === 'c' && formDisabled}
                    />
                </div>
                {
                    isArticuloCompuesto && (
                        <>
                            <div className='col-md-3' hidden={accion === 'c' && formDisabled}>
                                <div className='mb-3'>
                                    <label className='form-label'>Seleccionar ingredientes</label>
                                    <select className='form-control' onChange={(e) => setIngredienteSeleccionado(Number(e.target.value))} disabled={accion === 'c' && formDisabled}>
                                        <option value='sel'>Seleccione un ingrediente</option>
                                        {matPrimData?.map((matPrim: any, index: number) => (
                                            <option key={index} value={matPrim.id}>{matPrim.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-3' hidden={accion === 'c' && formDisabled}>
                                <div className='mb-3'>
                                    <label className='form-label'>Cantidad (en gramos)</label>
                                    <input type='number'
                                        className='form-control'
                                        min='0'
                                        max='9999999999.99'
                                        step='0.01'
                                        {...register('cantidad_ingrediente', { required: 'Obligatorio' })}
                                        disabled={accion === 'c' && formDisabled} />
                                    {errors.cantidad_ingrediente && <span className='text-danger'>{errors.cantidad_ingrediente.message}</span>}
                                </div>
                            </div>
                            <div className='col-md-3' hidden={accion === 'c' && formDisabled}>
                                <div className='mb-3'>
                                    <label className='form-label'>Cant. Resultante</label>
                                    <input type='number'
                                        className='form-control'
                                        min='0'
                                        max='9999999999'
                                        step='1'
                                        {...register('porciones', { required: 'Obligatorio' })}
                                        disabled={accion === 'c' && formDisabled} />
                                    {errors.porciones && <span className='text-danger'>{errors.porciones.message}</span>}
                                </div>
                            </div>
                            <div className='col-md-3' hidden={accion === 'c' && formDisabled}>
                                <button className='btn btn-warning mt-4' type='button' onClick={agregarIngredientes} disabled={accion === 'c' && formDisabled}>
                                    Agregar
                                </button>
                            </div>
                            <div className='col-md-12'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Ingrediente</th>
                                            <th>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ingredientes.map((ingrediente, index) => (
                                            <tr key={index}>
                                                <td>{ingrediente.nombre}</td>
                                                <td>{ingrediente.cantidad} g</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                }
                <div className='col-md-6'>
                    <button className='btn btn-primary m-2' type='submit' disabled={accion === 'c' && formDisabled}>
                        Guardar
                    </button>
                    <button className='btn btn-secondary m-2' type='button'>
                        Cancelar
                    </button>
                </div>
            </form>
        </>
    );
}

export default FormMateriaPrima;