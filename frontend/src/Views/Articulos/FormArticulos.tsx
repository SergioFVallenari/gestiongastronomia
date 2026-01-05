import { useForm } from 'react-hook-form';
import DonFaustinoLoad, { EnviarMensaje } from '../herramientas/General/General';
import { useEffect, useState } from 'react';
import api from '../../helpers';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

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
                })
                .catch(err => {
                    DonFaustinoLoad.DonFaustinoLoad(false);
                    EnviarMensaje('danger', err.response.data.msg);
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
        console.log(nuevaCategoria, 'este es el valor de la nueva categoria')
        if (nuevaCategoria.trim() === '') {
            EnviarMensaje('danger', 'El campo de categoría personalizada no puede estar vacío.');
            return;
        }
        await api.post('/tabla/insert_categoria', { modulo: 'categorias_articulos', valor_modulo: nuevaCategoria })
        setMostrarInputCategoria(false)
        setValue('categoria_nueva','')
        loadCategorias()
    }
    return (
        <>
            <form className='row mt-3' onSubmit={handleSubmit(onSubmit)}>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <TextField
                            label="Artículo"
                            fullWidth
                            variant="outlined"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register('nombre', { required: 'Obligatorio' })}
                            disabled={accion === 'c' && formDisabled}
                            error={!!errors.nombre}
                            helperText={errors.nombre?.message}
                        />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <TextField
                            label="Sku"
                            fullWidth
                            variant="outlined"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register('sku', { required: 'Obligatorio' })}
                            disabled={accion !== 'a' && formDisabled}
                            onBlur={handleSkuChange}
                            error={!!errors.sku}
                            helperText={errors.sku?.message}
                        />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <TextField
                            label="Precio Costo"
                            type="number"
                            fullWidth
                            variant="outlined"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register('precio_costo', { required: 'Obligatorio' })}
                            disabled={accion === 'c' && formDisabled}
                            error={!!errors.precio_costo}
                            helperText={errors.precio_costo?.message}
                        />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <TextField
                            label="Precio Venta"
                            type="number"
                            fullWidth
                            variant="outlined"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register('precio_venta', { required: 'Obligatorio' })}
                            disabled={accion === 'c' && formDisabled}
                            error={!!errors.precio_venta}
                            helperText={errors.precio_venta?.message}
                        />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <TextField
                            label="Cantidad"
                            type="number"
                            fullWidth
                            variant="outlined"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register('cantidad', { required: 'Obligatorio' })}
                            disabled={accion !== 'a' && formDisabled}
                            error={!!errors.cantidad}
                            helperText={errors.cantidad?.message}
                        />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <FormControl fullWidth variant="outlined" error={!!errors.categoria_articulo}>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                label="Categoría"
                                {...register('categoria_articulo', { required: 'Obligatorio' })}
                                disabled={accion === 'c' && formDisabled}
                                onChange={(e) => {
                                    // Si se selecciona 'Otra categoría', mostrar el input
                                    if (e.target.value === 'otra') {
                                        setMostrarInputCategoria(true);
                                    } else {
                                        setMostrarInputCategoria(false);
                                    }
                                }}
                                defaultValue=""
                            >
                                <MenuItem value="">Selecciona una categoría</MenuItem>
                                {categorias.map(categoria => (
                                    <MenuItem key={categoria.id_valor_modulo} value={categoria.id_valor_modulo}>
                                        {categoria.valor_modulo.toUpperCase()}
                                    </MenuItem>
                                ))}
                                <MenuItem value="otra">Otra categoría</MenuItem>
                            </Select>
                            {errors.categoria_articulo && <FormHelperText>{errors.categoria_articulo.message}</FormHelperText>}
                        </FormControl>

                        {/* Si la opción 'Otra categoría' es seleccionada, mostrar un campo de entrada */}
                        {mostrarInputCategoria && (
                            <>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Escribe una categoría personalizada"
                                    {...register('categoria_nueva', { required: 'Debes ingresar una categoría personalizada' })}
                                    error={!!errors.categoria_nueva}
                                    helperText={errors.categoria_nueva?.message}
                                    sx={{ mt: 2 }}
                                />
                                <Button 
                                    variant="outlined" 
                                    onClick={agregarCategoria} 
                                    type="button"
                                    sx={{ mt: 2, ml: 2 }}
                                >
                                    Agregar
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <hr></hr>
                <div className='col-md-6'>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        disabled={accion === 'c' && formDisabled}
                        sx={{ m: 2 }}
                    >
                        Guardar
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        type="button" 
                        onClick={() => onSubmitSuccess()}
                        sx={{ m: 2 }}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </>
    );
}

export default FormArticulos;