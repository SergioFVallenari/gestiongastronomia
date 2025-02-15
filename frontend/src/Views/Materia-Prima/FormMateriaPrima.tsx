import { useForm } from 'react-hook-form';
import api from '../../helpers';
import DonFaustinoLoad, { EnviarMensaje } from '../herramientas/General/General';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { Checkbox, FormControlLabel } from '@mui/material';

interface FormArticulosProps {
    accion: string;
    idArticulo: number | null;
    onSubmitSuccess: () => void;
    formDisabled?: boolean;
    setRecargaGridMateriaPrima: (value: string) => void;
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
            categoria_materia_prima: '',
            peso_gramos: 0,
            chkArticuloCompuesto: false,
            ingredientes: [] as any[],
            cantidad_ingrediente: 0,
            porciones: 0,
            chkPrecioUnidad: false,
        }
    });

    const isArticuloCompuesto = watch('chkArticuloCompuesto');
    const isPrecioUnidad = watch('chkPrecioUnidad')
    useEffect(() => {
        api.post('/tabla/lista_modulos', { modulo: 'categorias_materia_prima' })
            .then(res => setCategorias(res.data.content));

        if (accion !== 'a' && idArticulo) {
            api.get(`/materia_prima/get_materia_prima/${idArticulo}`)
                .then(res => {
                    const articulo = res?.data?.content[0];
                    console.log(typeof articulo.categoria_materia_prima);
                    setValue('nombre', articulo.nombre);
                    setValue('sku', articulo.sku);
                    setValue('precio_costo', articulo.precio_costo);
                    setValue('cantidad', articulo.stock);
                    setValue('peso_gramos', articulo.peso_gramos);
                    setValue('chkArticuloCompuesto', articulo.es_compuesto === 1 ? true : false);
                    setIngredientes(JSON.parse(articulo.json_ingredientes));
                });
        }
    }, []);

    const onSubmit = async (data: any) => {
        if (accion === 'a') {
            if (isArticuloCompuesto === false) {
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
                es_compuesto: data.chkArticuloCompuesto ? 1 : 0,
                es_contable: data.chkPrecioUnidad ? 1 : 0
            }
            console.log(body, 'alta');
            // Alta de un nuevo artículo
            await api.post('/materia_prima/alta_materia_prima', body)
                .then(res => {
                    DonFaustinoLoad.DonFaustinoLoad(true);
                    if (res.status === 200) {
                        DonFaustinoLoad.DonFaustinoLoad(false);
                        EnviarMensaje('success', res.data.content[0].msg);
                        onSubmitSuccess(); // Callback para recargar o cerrar modal
                    }
                });
        } else if (accion === 'm' && idArticulo) {
            await api.put(`/materia_prima/modificar_materia_prima/${idArticulo}`, data)
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
            api.post('/tabla/insert_categoria', { modulo: 'categorias_materia_prima', valor_modulo: nuevaCategoria })
                .then(res => {
                    setCategorias(prevCategorias => [...prevCategorias, res.data.content[0]]);
                    setValue('categoria_materia_prima', res.data.content[0].id_valor_modulo);
                });
        }
    }

    return (
        <>
            <form className='row mt-2' onSubmit={handleSubmit(onSubmit)}>
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
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            variant="outlined"
                            {...register('sku', { required: 'Obligatorio' })}
                            disabled={accion !== 'a' && formDisabled}
                            error={!!errors.sku}
                            helperText={errors.sku?.message}
                        />
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='mb-3'>
                        <TextField
                            label={`Precio costo (${isPrecioUnidad ? 'Por Unidad' : 'Por Kg'})`}
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            variant="outlined"
                            {...register('precio_costo', { required: 'Obligatorio' })}
                            disabled={accion === 'c' && formDisabled}
                            error={!!errors.precio_costo}
                            helperText={errors.precio_costo?.message}
                        />
                    </div>
                    <div className='mb-3 justify-content-end'>
                        <FormControlLabel 
                        control={
                        <Checkbox
                            {...register('chkPrecioUnidad')}
                        />} label={`Cambiar a precio por ${!isPrecioUnidad ? 'Unidad' : 'Kg'}`} />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='mb-3'>
                        <FormControl fullWidth error={!!errors.categoria_materia_prima}>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                label="Categoría"
                                {...register('categoria_materia_prima', { required: 'Obligatorio' })}
                                disabled={accion === 'c' && formDisabled}
                            >
                                <MenuItem value="">Seleccione una categoría</MenuItem>
                                {categorias?.map((categoria, index) => (
                                    <MenuItem key={index} value={categoria.id_valor_modulo.toString()}>
                                        {categoria?.valor_modulo?.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.categoria_materia_prima && <FormHelperText>{errors.categoria_materia_prima.message}</FormHelperText>}
                        </FormControl>

                        <TextField
                            label="Agregar nueva categoría"
                            size='small'
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            value={nuevaCategoria}
                            onChange={(e) => setNuevaCategoria(e.target.value)}
                            fullWidth
                            sx={{ mt: 2 }}
                            hidden={accion === 'c' && formDisabled}
                        />
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={addCategoria}
                            sx={{ mt: 2 }}
                            hidden={accion === 'c' && formDisabled}
                        >
                            Agregar
                        </Button>
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='mb-3'>
                        <TextField
                            label="Disponible (kg)"
                            fullWidth
                            variant="outlined"
                            {...register('peso_gramos', { required: 'Obligatorio' })}
                            disabled
                            error={!!errors.peso_gramos}
                            helperText={errors.peso_gramos?.message}
                        />
                    </div>
                </div>

                <div className='col-md-12'>
                    <FormControlLabel
                        control={
                            <Switch
                                {...register('chkArticuloCompuesto')}
                                disabled={accion === 'c' && formDisabled}
                            />
                        }
                        label="Artículo compuesto"
                    />
                </div>

                {isArticuloCompuesto && (
                    <>
                        <div className='col-md-3' hidden={accion === 'c' && formDisabled}>
                            <FormControl fullWidth>
                                <InputLabel>Ingrediente</InputLabel>
                                <Select
                                    value={ingredienteSeleccionado ?? ''}
                                    onChange={(e) => setIngredienteSeleccionado(Number(e.target.value))}
                                    disabled={accion === 'c' && formDisabled}
                                    label="Ingrediente"
                                >
                                    <MenuItem value="sel">Seleccione un ingrediente</MenuItem>
                                    {matPrimData.map((ingrediente: any, index: number) => {
                                        if (ingrediente.es_compuesto == 0) {
                                            return (<MenuItem key={index} value={ingrediente.id}>
                                                {ingrediente.nombre}
                                            </MenuItem>
                                            )
                                        }
                                    })}
                                </Select>
                            </FormControl>
                        </div>

                        <div className='col-md-3' hidden={accion === 'c' && formDisabled}>
                            <TextField
                                label="Cantidad (en gramos)"
                                type="number"
                                fullWidth
                                {...register('cantidad_ingrediente', { required: 'Obligatorio' })}
                                error={!!errors.cantidad_ingrediente}
                                helperText={errors.cantidad_ingrediente?.message}
                                disabled={accion === 'c' && formDisabled}
                            />
                        </div>

                        <div className='col-md-3' hidden={accion === 'c' && formDisabled}>
                            <TextField
                                label="Cant. Resultante"
                                type="number"
                                fullWidth
                                {...register('porciones', { required: 'Obligatorio' })}
                                error={!!errors.porciones}
                                helperText={errors.porciones?.message}
                                disabled={accion === 'c' && formDisabled}
                            />
                        </div>

                        <div className='col-md-3' hidden={accion === 'c' && formDisabled}>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={agregarIngredientes}
                                sx={{ mt: 2 }}
                                disabled={accion === 'c' && formDisabled}
                            >
                                Agregar
                            </Button>
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
                )}

                <div className='col-md-6'>
                    <Button
                        className='btn btn-primary'
                        variant="contained"
                        type="submit"
                        sx={{ m: 2 }}
                        disabled={accion === 'c' && formDisabled}
                    >
                        Guardar
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        sx={{ m: 2 }}
                        type="button"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </>
    );
}

export default FormMateriaPrima;
