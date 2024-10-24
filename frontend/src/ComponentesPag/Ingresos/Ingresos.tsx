import { useForm } from "react-hook-form";
import PageLayout from "../../layouts/PageLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Tab, Tabs } from "react-bootstrap";
import Grid from "../herramientas/Grid/Grid";
import ModalDinamico from "../herramientas/ModalDinamico/ModalDinamico";
import FormIngresos from "./FormIngresos";

const Ingresos: React.FC = (): JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            cantidad: 0,
            articulo: ''
        }
    });

    const [articulos, setArticulos] = useState<any[]>([]);
    // const [materiaPrima, setMateriaPrima] = useState<any[]>([]);
    const [ingresos, setIngresos] = useState<any[]>([]); // Array para los ingresos
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [costoTotal, setCostoTotal] = useState(0);
    const [modalIngresos, setModalIngresos] = useState({
        show: false,
        id: 0,
        accion: 'a',
    });
    const [formDisabled, setFormDisabled] = useState(false);
    const [recargaGridArticulos, setRecargaGridArticulos] = useState<string>('');

    const SetRefresh = (date: string) => setRecargaGridArticulos(date);
    const ModalClose = () => setModalIngresos({ show: false, id: 0, accion: 'a' });
    const ModalShow = (id: number, accion: string) => setModalIngresos({ show: true, id: id, accion: accion });

    useEffect(() => {
        // Cargar los datos de los artículos
        axios.post('http://localhost:3001/articulos/get_articulos')
            .then(res => {
                setArticulos(res.data.content); // Aquí guardamos todos los artículos correctamente
            })  
            .catch(error => {
                console.error("Error cargando artículos:", error);
            });
        axios.post('http://localhost:3001/materia_prima/get_materia_prima')
            .then(res => {
                setArticulos(prevArticulos => [...prevArticulos, ...res.data.content]); // Aquí guardamos todos los artículos correctamente
            })  
            .catch(error => {
                console.error("Error cargando materia prima:", error);
            })
    }, []);
    
    const onSubmit = (data: any) => {
        const articuloSeleccionado = articulos.find(articulo => articulo.sku === data.articulo);
        if (articuloSeleccionado) {
            const nuevoIngreso = {
                sku: articuloSeleccionado.sku,
                nombre: articuloSeleccionado.nombre,
                cantidad: data.cantidad,
                precioXarticulo: articuloSeleccionado.precio_costo * data.cantidad,
                categoria: articuloSeleccionado.categoria
            }
            setIngresos([...ingresos, nuevoIngreso]);
            setButtonDisabled(false);
            setCostoTotal(costoTotal + nuevoIngreso.precioXarticulo);
        }
    };

    const eliminarIngreso = (index: number) => {
        const nuevosIngresos = [...ingresos];
        nuevosIngresos.splice(index, 1);
        setIngresos(nuevosIngresos);
        if (nuevosIngresos.length === 0) setButtonDisabled(true);
        setCostoTotal(costoTotal - ingresos[index].precioXarticulo);
    }

    const updateStock = () => {
        const body = ingresos.map(ingreso => ({
            cantidad: ingreso.cantidad,
            articulo: ingreso.nombre,
            sku: ingreso.sku,
            categoria: ingreso.categoria
        }));
        axios.post('http://localhost:3001/ingresos/alta_ingreso', {body:body, costo_total:costoTotal})
        SetRefresh(new Date().toString());
    }

    const manejo_acciones = (_origen: string, registro: number, accion: string) => {
        switch (accion) {
            case 'c': {
                ModalShow(registro, accion);
                setFormDisabled(true);
                break;
            }
            default:
                break;
        }
    }

    return (
        <PageLayout label='Adm. Ingresos'>
            <Tabs defaultActiveKey="ingresos" id="fill-tab-example" fill>
                <Tab eventKey="ingresos" title="Ingresos">
                    <hr></hr>
                    <Card>
                        <Card.Body>
                            <h3>Alta de ingresos</h3>
                            <form className="row mt-3" onSubmit={handleSubmit(onSubmit)}>
                                <div className="col-md-6">
                                    <label>Selecciona un artículo</label>
                                    <select {...register("articulo", { required: true })} className="form-select">
                                        <option value="">Seleccione un artículo</option>
                                        {articulos.map((articulo, index) => (
                                            <option key={index} value={articulo.sku}>{articulo.sku} - {articulo.nombre}</option>
                                        ))}
                                    </select>
                                    {errors.articulo && <span className="text-danger">Debes seleccionar un artículo</span>}
                                </div>

                                <div className="col-md-6">
                                    <label>Cantidad</label>
                                    <input
                                        type="number"
                                        {...register("cantidad", { required: true, min: 1 })}
                                        className="form-control"
                                    />
                                    {errors.cantidad && <span className="text-danger">Debes ingresar una cantidad válida</span>}
                                </div>

                                <div className="col-md-12 mt-3">
                                    <button type="submit" className="btn btn-success">Agregar</button>
                                </div>
                            </form>

                            <h3 className="mt-4">Ingresos Registrados</h3>
                            {ingresos.length > 0 ? (
                                <table className="table table-bordered mt-2">
                                    <thead>
                                        <tr className="text-center">
                                            <th>SKU</th>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ingresos.map((ingreso, index) => (
                                            <tr key={index} className="text-center">
                                                <td>{ingreso.sku}</td>
                                                <td>{ingreso.nombre}</td>
                                                <td>{ingreso.cantidad}</td>
                                                <td>${ingreso.precioXarticulo}</td>
                                                <td>
                                                    <button
                                                        onClick={() => eliminarIngreso(index)} // Función para eliminar un ingreso
                                                        className="btn btn-danger"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No hay ingresos registrados aún.</p>
                            )}
                            <label>Costo total de Ingreso: </label>
                            <span> ${costoTotal}</span>
                            <hr />
                            <button className="btn btn-primary" onClick={updateStock} disabled={buttonDisabled}>Guardar Ingresos</button>
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="historial" title="Historial">
                    <hr></hr>
                    <Card>
                        <Card.Body>
                            <h3>Historial de Ingresos</h3>
                            {Grid(manejo_acciones, 'ingresos', recargaGridArticulos, setRecargaGridArticulos)}
                            <ModalDinamico id="modal_ingresos" manejador={modalIngresos} modalTitulo="Consulta" sizeModal="lg" handleClose={ModalClose}>
                                <FormIngresos idIngreso={modalIngresos.id} disabled={formDisabled} />
                            </ModalDinamico>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </PageLayout>
    );
};

export default Ingresos;