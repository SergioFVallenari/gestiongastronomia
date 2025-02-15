import { useForm } from "react-hook-form";
import PageLayout from "../../layouts/PageLayout";
import { useEffect, useState } from "react";
import {
  Card,
  Form,
  OverlayTrigger,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import Grid from "../herramientas/Grid/Grid";
import ModalDinamico from "../herramientas/ModalDinamico/ModalDinamico";
import FormIngresos from "./FormIngresos";
import { EnviarMensaje } from "../herramientas/General/General";
import api from "../../helpers";

const Ingresos: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      cantidad: 0,
      articulo: "",
      checkPrecio: false,
      precio_modificado: 0,
    },
  });

  const [articulos, setArticulos] = useState<any[]>([]);
  const [ingresos, setIngresos] = useState<any[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [costoTotal, setCostoTotal] = useState(0);
  const [modalIngresos, setModalIngresos] = useState({
    show: false,
    id: 0,
    accion: "a",
  });
  const [formDisabled, setFormDisabled] = useState(false);
  const [recargaGridArticulos, setRecargaGridArticulos] = useState<string>("");
  const [isPrecioModificadoEnabled, setIsPrecioModificadoEnabled] =
    useState(false);

  const SetRefresh = (date: string) => setRecargaGridArticulos(date);
  const ModalClose = () =>
    setModalIngresos({ show: false, id: 0, accion: "a" });
  const ModalShow = (id: number, accion: string) =>
    setModalIngresos({ show: true, id: id, accion: accion });

  const fetchArticulos = async () => {
    try {
      const articulosRes = await api.post("/articulos/get_articulos");
      const materiaPrimaRes = await api.post(
        "/materia_prima/get_materia_prima"
      );
      const articulosNoCompuestos = materiaPrimaRes?.data?.content.filter(
        (articulo: any) => articulo.es_compuesto == 0
      );

      if (articulosRes?.data?.content && articulosNoCompuestos) {
        setArticulos([...articulosRes.data.content, ...articulosNoCompuestos]);
      }
    } catch (error) {
      console.error("Error cargando artículos:", error);
    }
  };

  useEffect(() => {
    fetchArticulos(); // Llama a la función que obtiene los artículos
  }, []);

  useEffect(() => {
    const selectedArticulo = getValues("articulo");
    const articuloSeleccionado = articulos.find(
      (articulo) => articulo.sku === selectedArticulo
    );
    if (articuloSeleccionado) {
      setValue("precio_modificado", articuloSeleccionado.precio_costo); // Establecer el precio de costo en el input
    } else {
      setValue("precio_modificado", 0); // Restablecer si no hay selección
    }
  }, [articulos, getValues, setValue]);

  const onSubmit = (data: any) => {
    const articuloSeleccionado = articulos.find(
      (articulo) => articulo.sku === data.articulo
    );
    if (articuloSeleccionado) {
      // Utiliza `precio_modificado` si está habilitado y es mayor que 0, de lo contrario usa `precio_costo`
      const precioArticulo =
        isPrecioModificadoEnabled && data.precio_modificado > 0
          ? data.precio_modificado
          : articuloSeleccionado.precio_costo;

      const nuevoIngreso = {
        sku: articuloSeleccionado.sku,
        nombre: articuloSeleccionado.nombre,
        cantidad: data.cantidad,
        precioXarticulo: precioArticulo * data.cantidad, // Calcula el precio total usando `precioArticulo`
        categoria: articuloSeleccionado.categoria,
        chkPrecio: getValues("checkPrecio"),
      };

      setIngresos([...ingresos, nuevoIngreso]);
      setButtonDisabled(false);
      setCostoTotal(costoTotal + nuevoIngreso.precioXarticulo);

      // Opcional: restablece `precio_modificado` después de agregar el ingreso si deseas limpiar el campo
      setValue("articulo", "");
      setValue("cantidad", 0);
      setValue("checkPrecio", false);
      setValue("precio_modificado", 0);
    }
  };

  const eliminarIngreso = (index: number) => {
    const nuevosIngresos = [...ingresos];
    nuevosIngresos.splice(index, 1);
    setIngresos(nuevosIngresos);
    if (nuevosIngresos.length === 0) setButtonDisabled(true);
    setCostoTotal(costoTotal - ingresos[index].precioXarticulo);
  };

  const updateStock = () => {
    const body = ingresos.map((ingreso) => ({
      cantidad: ingreso.cantidad,
      articulo: ingreso.nombre,
      sku: ingreso.sku,
      categoria: ingreso.categoria,
      chkPrecio: ingreso.chkPrecio ? 1 : 0,
      precio_total: ingreso.precioXarticulo,
      precio_modificado: ingreso.chkPrecio
        ? ingreso.precioXarticulo / ingreso.cantidad
        : 0,
    }));

    api
      .post("/ingresos/alta_ingreso", { body: body, costo_total: costoTotal })
      .then((res) => {
        if (res.data.info) {
          EnviarMensaje("success", "Ingresos registrados correctamente");
          setIngresos([]);
          setButtonDisabled(true);
          setCostoTotal(0);
        }
      });
    SetRefresh(new Date().toString());
  };

  const manejo_acciones = (
    _origen: string,
    registro: number,
    accion: string
  ) => {
    switch (accion) {
      case "c": {
        ModalShow(registro, accion);
        setFormDisabled(true);
        break;
      }
      default:
        break;
    }
  };

  const handleCheckPrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsPrecioModificadoEnabled(isChecked);
    setValue("checkPrecio", isChecked);
    const selectedArticulo = getValues("articulo");
    const articuloSeleccionado = articulos.find(
      (articulo) => articulo.sku === selectedArticulo
    );
    if (articuloSeleccionado && isChecked) {
      setValue("precio_modificado", articuloSeleccionado.precio_costo); // Establecer el precio de costo en el input
    } else {
      setValue("precio_modificado", 0); // Restablecer si no hay selección
    }
  };

  return (
    <PageLayout label="Adm. Ingresos">
      <Tabs
        defaultActiveKey="ingresos"
        className="custom-tab"
        id="fill-tab-example"
        fill
        variant="pills"
      >
        <Tab eventKey="ingresos" title="Ingresos">
          <hr></hr>
          <Card>
            <Card.Body>
              <h3>Alta de ingresos</h3>
              <form className="row mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6">
                  <label>Selecciona un artículo</label>
                  <select
                    {...register("articulo", { required: true })}
                    className="form-select"
                  >
                    <option value="">Seleccione un artículo</option>
                    {articulos.map((articulo, index) => (
                      <option key={index} value={articulo.sku}>
                        {articulo.sku} - {articulo.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.articulo && (
                    <span className="text-danger">
                      Debes seleccionar un artículo
                    </span>
                  )}
                </div>

                <div className="col-md-3">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="cantidad-tooltip">
                        Kg / Litros / Unidades a ingresar
                      </Tooltip>
                    }
                  >
                    <div>
                      <label htmlFor="cantidad">Cantidad</label>
                      <input
                        id="cantidad"
                        type="number"
                        step="0.01"
                        min="0.01"
                        max="9999999999.99"
                        {...register("cantidad", {
                          required: "Debes ingresar una cantidad válida",
                          min: {
                            value: 0.01,
                            message: "El valor mínimo es 0.01",
                          },
                        })}
                        className={`form-control ${
                          errors.cantidad ? "is-invalid" : ""
                        }`}
                        aria-describedby="cantidad-tooltip"
                      />
                    </div>
                  </OverlayTrigger>
                  {errors.cantidad && (
                    <span className="text-danger">
                      {errors.cantidad.message}
                    </span>
                  )}
                </div>

                <div className="col-md-3">
                  <Form>
                    <Form.Check
                      id="checkPrecio"
                      type="switch"
                      label="Modificar Precio?"
                      {...register("checkPrecio")}
                      onChange={handleCheckPrecio}
                    />
                  </Form>
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="9999999999.99"
                      {...register("precio_modificado")}
                      className="form-control"
                      disabled={!isPrecioModificadoEnabled}
                    />
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <button type="submit" className="btn btn-success">
                    Agregar
                  </button>
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
                            onClick={() => eliminarIngreso(index)}
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
              <button
                className="btn btn-primary"
                onClick={updateStock}
                disabled={buttonDisabled}
              >
                Guardar Ingresos
              </button>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="historial" title="Historial">
          <hr></hr>
          <Card>
            <Card.Body>
              <h3>Historial de Ingresos</h3>
              {Grid(
                manejo_acciones,
                "ingresos",
                recargaGridArticulos,
                setRecargaGridArticulos
              )}
              <ModalDinamico
                id="modal_ingresos"
                manejador={modalIngresos}
                modalTitulo="Consulta"
                sizeModal="lg"
                handleClose={ModalClose}
              >
                <FormIngresos
                  idIngreso={modalIngresos.id}
                  disabled={formDisabled}
                />
              </ModalDinamico>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </PageLayout>
  );
};

export default Ingresos;
