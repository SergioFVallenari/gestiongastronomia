import { useForm } from 'react-hook-form';
import axios from 'axios';
import DonFaustinoLoad, { EnviarMensaje } from '../herramientas/General/General';
import { useEffect, useState } from 'react';

interface FormArticulosProps {
    accion: string; // 'a' para alta, 'm' para modificar, 'v' para visualizar (consulta)
    idArticulo: number | null; // Si es null, significa que es una alta
    onSubmitSuccess: () => void; // Callback para manejar éxito después de la operación
    formDisabled?: boolean; // Deshabilitar formulario
    setRecargaGridMateriaPrima: any; // Callback para recargar el grid de artículos
}

const FormMateriaPrima:  React.FC<FormArticulosProps> = ({ accion, idArticulo, onSubmitSuccess, formDisabled, setRecargaGridMateriaPrima }) => {
    const [categorias, setCategorias] = useState<any[]>([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            nombre: '',
            sku: '',
            precio_costo: 0,
            cantidad: 1,
            categoria_materia_prima:0,
            peso_gramos:0
        }
    });

    useEffect(() => {
        axios.post('http://localhost:3001/ingresos/lista_modulos',{modulo:'categorias_materia_prima'})
        .then(res => {
            setCategorias(res.data.content);
        })
        if (accion !== 'a' && idArticulo) {
            // Si es modificación o visualización, cargamos los datos del artículo
            axios.get(`http://localhost:3001/materia_prima/get_materia_prima/${idArticulo}`)
                .then(res => {
                    const articulo = res?.data?.content[0];
                    // Prellenamos el formulario con los datos del artículo
                    setValue('nombre', articulo.nombre);
                    setValue('sku', articulo.sku);
                    setValue('precio_costo', articulo.precio_costo);
                    setValue('cantidad', articulo.stock);
                    setValue('categoria_materia_prima', articulo.categoria_materia_prima);
                    setValue('peso_gramos', articulo.peso_gramos);
                });
        }
    }, []);
    const onSubmit = async (data:any) => {
        if (accion === 'a') {
            // Alta de un nuevo artículo
            await axios.post('http://localhost:3001/materia_prima/alta_materia_prima', data)
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
            await axios.put(`http://localhost:3001/materia_prima/modificar_materia_prima/${idArticulo}`, data)
                .then(res => {
                    console.log(res.data.content[0].msg)
                    if (res.status === 200) {
                        EnviarMensaje('success', res.data.content[0].msg);
                        onSubmitSuccess(); // Callback para recargar o cerrar modal
                        setRecargaGridMateriaPrima(new Date().toString());
                    }
                });
        }
    }
    return (
        <>
            <form className='row' onSubmit={handleSubmit(onSubmit)}>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Artículo</label>
                        <input type='text' className='form-control' {...register('nombre', {required:'Obligatorio'})} disabled={accion === 'c' && formDisabled} />
                        {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Sku</label>
                        <input type='text' className='form-control' {...register('sku', {required:'Obligatorio'})} disabled={accion !== 'a' && formDisabled} />
                        {errors.sku && <span className='text-danger'>{errors.sku.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Precio Costo (por kg)</label>
                        <input type='text' className='form-control' {...register('precio_costo', {required:'Obligatorio'})} disabled={accion === 'c' && formDisabled}/>
                        {errors.precio_costo && <span className='text-danger'>{errors.precio_costo.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Cantidad</label>
                        <input type='text' className='form-control' {...register('cantidad', {required:'Obligatorio'})} disabled/>
                        {errors.cantidad && <span className='text-danger'>{errors.cantidad.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Categoría</label>
                        <select className='form-control' {...register('categoria_materia_prima', {required:'Obligatorio'})} disabled={accion === 'c' && formDisabled}>
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria, index) => (
                                <option key={index} value={categoria.id_valor_modulo}>{categoria.valor_modulo.toUpperCase()}</option>
                            ))}
                        </select>
                        {errors.categoria_materia_prima && <span className='text-danger'>{errors.categoria_materia_prima.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Peso (gramos)</label>
                        <input type='text' className='form-control' {...register('peso_gramos', {required:'Obligatorio'})} disabled={accion === 'c' && formDisabled}/>
                        {errors.peso_gramos && <span className='text-danger'>{errors.peso_gramos.message}</span>}
                    </div>
                </div>
                <hr></hr>
                <div className='col-md-6'>
                    <button className='btn btn-primary m-2' type='submit' disabled={accion === 'c' && formDisabled}>
                        Guardar
                    </button>
                    <button className='btn btn-danger' type='button' onClick={()=>onSubmitSuccess()}>
                        Cancelar
                    </button>
                </div>
            </form>
        </>
    );
}

export default FormMateriaPrima;