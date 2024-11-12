import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import api from "../../helpers";

interface iFormCarta {
    formDisabled?: boolean;
}

const FormCarta:React.FC<iFormCarta> = ({formDisabled}) => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            producto: '',
            precio_costo: 0,
            precio_venta: 0,
            descripcion: '',
            ingredientes: []
        }
    });

    const [ingredientes, setIngredientes] = useState<any[]>([]);
    const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<any[]>([]);

    useEffect(() => {
        api.get('/materia_prima/lista_ingredientes')
            .then(res => {
                const options = res.data.content.map((ingrediente: any) => ({
                    value: ingrediente.id,
                    label: `${ingrediente.nombre}`,
                    ingrediente: ingrediente 
                }));
                setIngredientes(options);
            });
    }, []);

    const handleSelectChange = (selectedOptions: any) => {
        // Crear una copia de ingredientes seleccionados existentes con sus cantidades actuales
        const ingredientesConCantidad = selectedOptions.map((option: any) => {
            const ingredienteExistente = ingredientesSeleccionados.find(
                (ingrediente) => ingrediente.id === option.ingrediente.id
            );
            return {
                ...option.ingrediente,
                cantidad: ingredienteExistente ? ingredienteExistente.cantidad : 0 // Mantener cantidad previa o iniciar en 0
            };
        });
    
        // Actualizar el estado y el valor en react-hook-form
        setIngredientesSeleccionados(ingredientesConCantidad);
        setValue('ingredientes', ingredientesConCantidad);
    };
    
    const handleCantidadChange = (e: any, index: number) => {
        const nuevaCantidad = Number(e.target.value);
    
        // Crear una copia actualizada de ingredientes seleccionados con la nueva cantidad
        const updatedIngredientes:any = ingredientesSeleccionados.map((ingrediente, i) =>
            i === index ? { ...ingrediente, cantidad: nuevaCantidad } : ingrediente
        );
    
        // Actualizar estado y sincronizar con react-hook-form
        setIngredientesSeleccionados(updatedIngredientes);
        setValue('ingredientes', updatedIngredientes);
    };

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const calcularCosto = () => {
        const json_ingredientes = getValues('ingredientes')
        api.post('/materia_prima/calcular_precio_costo', { json_ingredientes: JSON.stringify(json_ingredientes) })
            .then(res => {
                setValue('precio_costo', res.data.content[0].costo_total);
            });
    }

    return (
        <>
            <form className="row mt-2 mb-2" onSubmit={handleSubmit(onSubmit)}>
                <Tabs defaultActiveKey='datos' id="fill-tab-exasmple" fill>
                    <Tab eventKey='datos' title='Datos'>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Producto</label>
                                <input type="text" className="form-control" {...register('producto', { required: 'Obligatorio' })} disabled={formDisabled}/>
                                {errors.producto && <span className="text-danger">{errors.producto.message}</span>}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Precio Costo</label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        {...register('precio_costo', { 
                                            required: 'Obligatorio', 
                                            min: {
                                                value: 1,
                                                message: 'El precio costo debe ser mayor a 0'
                                            }
                                        })}
                                        disabled
                                    />
                                    <button type="button" className="btn btn-primary" onClick={calcularCosto}>
                                        Calcular
                                    </button>
                                    {errors.precio_costo && <span className="text-danger">{errors.precio_costo.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Precio Venta</label>
                                <input type="number" className="form-control" {...register('precio_venta', { required: 'Obligatorio' })} />
                                {errors.precio_venta && <span className="text-danger">{errors.precio_venta.message}</span>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <textarea className="form-control" {...register('descripcion', { required: 'Obligatorio' })} />
                                {errors.descripcion && <span className="text-danger">{errors.descripcion.message}</span>}
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey='ingredientes' title="Ingredientes">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Ingredientes</label>
                                <Select
                                    options={ingredientes}
                                    isMulti
                                    onChange={handleSelectChange}
                                    classNamePrefix="select"
                                    placeholder="Selecciona los ingredientes"
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                />
                                {errors.ingredientes && <span className="text-danger">{errors.ingredientes.message}</span>}
                            </div>
                        </div>

                        {/* Listado dinámico para ingredientes y cantidades */}
                        {ingredientesSeleccionados.map((option, index) => (
                            <div key={index} className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={option.nombre} // Mostramos el nombre del ingrediente
                                        disabled
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Cantidad"
                                        onChange={(e) => handleCantidadChange(e, index)}
                                    />
                                </div>
                            </div>
                        ))}
                    </Tab>
                </Tabs>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
            </form>
        </>
    );
};

export default FormCarta;