import { useForm } from 'react-hook-form';
import axios from 'axios';


const FormArticulos: React.FC = () => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            nombre: 'Coca-Cola',
            sku: 'DF-COCA',
            precio_costo: 1200.00,
            precio_venta: 2000.00,
            cantidad: 10.00
        }
    });
    const onSubmit = async (data:any) => {
        await axios.post('http://localhost:3001/articulos/alta_articulos', data)
        .then(res => {
            console.log(res);
        })
    }
    return (
        <>
            <form className='row' onSubmit={handleSubmit(onSubmit)}>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Artículo</label>
                        <input type='text' className='form-control' {...register('nombre', {required:'Obligatorio'})} />
                        {errors.nombre && <span className='text-danger'>{errors.nombre.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Sku</label>
                        <input type='text' className='form-control' {...register('sku', {required:'Obligatorio'})} />
                        {errors.sku && <span className='text-danger'>{errors.sku.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Precio Costo</label>
                        <input type='text' className='form-control' {...register('precio_costo', {required:'Obligatorio'})} />
                        {errors.precio_costo && <span className='text-danger'>{errors.precio_costo.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Precio Venta</label>
                        <input type='text' className='form-control' {...register('precio_venta', {required:'Obligatorio'})} />
                        {errors.precio_venta && <span className='text-danger'>{errors.precio_venta.message}</span>}
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Cantidad</label>
                        <input type='text' className='form-control' {...register('cantidad', {required:'Obligatorio'})} />
                        {errors.cantidad && <span className='text-danger'>{errors.cantidad.message}</span>}
                    </div>
                </div>    
                <div>
                    <button className='btn btn-primary' type='submit'>
                        Guardar
                    </button>
                    <button className='btn btn-danger' type='button'>
                        Cancelar
                    </button>
                </div>
            </form>
        </>
    );
}

export default FormArticulos;