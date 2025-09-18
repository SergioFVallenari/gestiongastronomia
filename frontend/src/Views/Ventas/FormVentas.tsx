import React from "react";
import { Button, Form, Modal, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Box as BoxMui } from "@mui/material";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { PostGeneral } from "../../helpers";
import { EnviarMensaje } from "../herramientas/General/General";
import { Loading } from "notiflix";

const FormVentas: React.FC = () => {
  const dataCarta = useSelector((state: any) => state.carta.getCarta.data);
  const carta = dataCarta?.data?.content;
  const dataArticulos = useSelector(
    (state: any) => state.articulos.getArticulos.data
  );
  const articulos = dataArticulos?.data?.content;

  const [comandas, setComandas] = React.useState<any[]>([]);
  const [showModalDiscount, setShowModalDiscount] = React.useState(false);
  const [discount, setDiscount] = React.useState<number>(0);
  const [selectedComandas, setSelectedComandas] = React.useState<Set<number>>(
    new Set()
  );
  const {
    register,
    setValue,
    watch,
    getValues,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      cantidadArticulo: 0,
      cantidadCarta: 0,
      articulo: "",
      carta: "",
      fecha: new Date().toISOString().split("T")[0],
      importeTotal: 0,
      ganancia: 0,
      importeReal: 0,
    },
  });

  const watchedFields = watch([
    "articulo",
    "carta",
    "cantidadArticulo",
    "cantidadCarta",
  ]);

  const handleAddArticulo = () => {
    const articuloSeleccionado = articulos?.find(
      (art: any) => art.sku === watchedFields[0]
    );
    if (articuloSeleccionado && watchedFields[2] > 0) {
      console.log("Articulo seleccionado:", articuloSeleccionado);
      setComandas((prev) => [
        ...prev,
        {
          id: articuloSeleccionado.id,
          tipo: "Bebidas",
          nombre: articuloSeleccionado.nombre,
          sku: articuloSeleccionado.sku,
          cantidad: watchedFields[2],
          precio_venta: articuloSeleccionado.precio_venta,
        },
      ]);
      setValue("cantidadArticulo", 0);
      setValue("articulo", "");
      setValue(
        "importeTotal",
        getValues("importeTotal") +
          articuloSeleccionado.precio_venta * watchedFields[2]
      );
      setValue(
        "ganancia",
        getValues("ganancia") +
          (Number(articuloSeleccionado.precio_venta) -
            Number(articuloSeleccionado.precio_costo)) *
            watchedFields[2]
      );
    }
  };

  const handleAddCarta = () => {
    const cartaSeleccionada = carta?.find(
      (crt: any) => crt.sku === watchedFields[1]
    );
    if (cartaSeleccionada && watchedFields[3] > 0) {
      console.log("Carta seleccionada:", cartaSeleccionada);
      setComandas((prev) => [
        ...prev,
        {
          id: cartaSeleccionada.idcarta,
          tipo: "Carta",
          nombre: cartaSeleccionada.nombre,
          sku: cartaSeleccionada.sku,
          cantidad: watchedFields[3],
          jsoningredinetes: cartaSeleccionada.ingredientes_json,
          precio_venta: cartaSeleccionada.precio_venta,
        },
      ]);
      setValue("cantidadCarta", 0);
      setValue("carta", "");
      setValue(
        "importeTotal",
        getValues("importeTotal") +
          cartaSeleccionada.precio_venta * watchedFields[3]
      );
      setValue(
        "ganancia",
        getValues("ganancia") +
          Number(cartaSeleccionada.ganancia) * watchedFields[3]
      );
    }
  };

  const handleGuardar = (data: any) => {
    if(data.importeReal < data.importeTotal) {
      EnviarMensaje("danger", "El importe con propina no puede ser menor al importe sin propina");
      return;
    }
    Loading.pulse();
    PostGeneral("/ventas/insert_venta", {
      json_comanda: JSON.stringify(comandas),
      fecha_venta: data.fecha,
      importe_total: data.importeTotal - discount,
      ganancia: data.ganancia,
      propina: data.importeReal > data.importeTotal ? data.importeReal - data.importeTotal : 0,
    }).then((response) => {
      console.log(response)
      if (response.info) {
        Loading.remove();
        EnviarMensaje("success", "Venta guardada exitosamente");
      } else {
        Loading.remove()
        EnviarMensaje("danger", "Error al guardar la venta");
      }
    });
    // PostGeneral("/ccorriente/insert_ccorriente",{ganancia: data.ganancia, importe_total: data.importeTotal - discount});
    setComandas([]);
    setDiscount(0);
    reset({
      cantidadArticulo: 0,
      cantidadCarta: 0,
      articulo: "",
      carta: "",
      fecha: new Date().toISOString().split("T")[0],
      importeTotal: 0,
      importeReal:0,
      ganancia:0
    });
  };

  const handleDiscount = () => {
    const importeTotal = getValues("importeTotal");
    if (discount <= importeTotal) {
      setValue("importeTotal", importeTotal - discount);
      setValue("ganancia", getValues("ganancia") - discount);
      setShowModalDiscount(false);
    } else {
      alert("El descuento no puede ser mayor al importe total.");
    }
  };

  const toggleComandaSelection = (index: number) => {
    const updatedSelection = new Set(selectedComandas);
    if (updatedSelection.has(index)) {
      updatedSelection.delete(index);
    } else {
      updatedSelection.add(index);
    }
    setSelectedComandas(updatedSelection);
  };
  const handleEliminarComanda = (index: number) => {
    const comandaEliminar = comandas[index];
    const updatedComandas = [...comandas];
    updatedComandas.splice(index, 1);
  
    const newImporteTotal =
      updatedComandas.reduce(
        (total, comanda) => total + comanda.precio_venta * comanda.cantidad,
        0
      ) - discount;
    const newGanancia =
      updatedComandas.reduce(
        (total, comanda) =>
          total +
          (Number(comanda.precio_venta) - Number(comanda.precio_costo)) *
            comanda.cantidad,
        0
      ) - discount;
  
    setComandas(updatedComandas);
    setValue("importeTotal", newImporteTotal);
    setValue("ganancia", newGanancia);
  
    if (comandaEliminar.tipo === "Bebidas") {
      setValue("articulo", ""); // 
    } else if (comandaEliminar.tipo === "Carta") {
      setValue("carta", ""); // Deseleccionar la Carta
    }
  };
  

  return (
    <BoxMui className="row mt-2 mb-2">
      <h3>Ventas - Comandas</h3>
      <form>
        <Row className="mb-3">
          <div className="col-md-5">
            <label>Bebidas</label>
            <Select
              options={articulos?.map((articulo: any) => ({
                label: articulo.nombre,
                value: articulo.sku,
              }))}
              onChange={(e: any) => setValue("articulo", e ? e.value : "")}
              isSearchable
              isClearable
              placeholder="Seleccione una bebida"
            />
          </div>
          <div className="col-md-4">
            <label>Cantidad</label>
            <input
              type="number"
              className="form-control"
              min="0"
              disabled={watchedFields[0] === ""}
              {...register("cantidadArticulo")}
            />
          </div>
          <div className="col-md-3">
            <Button
              variant="success"
              className="mt-4"
              onClick={handleAddArticulo}
              disabled={watchedFields[0] === "" || watchedFields[2] <= 0}
            >
              Add
            </Button>
          </div>
        </Row>
        <Row className="mb-3">
          <div className="col-md-5">
            <label>Carta</label>
            <Select
              options={carta?.map((articulo: any) => ({
                label: articulo.nombre,
                value: articulo.sku,
              }))}
              onChange={(e: any) => setValue("carta", e ? e.value : "")}
              isSearchable
              isClearable
              placeholder="Seleccione un artículo"
            />
          </div>
          <div className="col-md-4">
            <label>Cantidad</label>
            <input
              type="number"
              className="form-control"
              step="0.5"
              min="0"
              disabled={watchedFields[1] === ""}
              {...register("cantidadCarta")}
            />
          </div>
          <div className="col-md-3">
            <Button
              variant="success"
              className="mt-4"
              onClick={handleAddCarta}
              disabled={watchedFields[1] === "" || watchedFields[3] <= 0}
            >
              Add
            </Button>
          </div>
          <div className="col-md-6">
            <Button
              variant="success"
              className="mt-4"
              disabled={comandas.length === 0}
              onClick={() => setShowModalDiscount(true)}
            >
              Añadir descuento
            </Button>
          </div>
        </Row>
      </form>
      <h4>Comandas</h4>
      <Table striped bordered hover className="m-2">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Quitar</th>
          </tr>
        </thead>
        <tbody>
          {comandas.map((comanda, index) => (
            <tr key={index}>
              <td>{comanda.tipo}</td>
              <td>{comanda.nombre}</td>
              <td>{comanda.cantidad}</td>
              <td>${comanda.precio_venta * comanda.cantidad}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={()=> handleEliminarComanda(index )}
                >
                  X
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <form onSubmit={handleSubmit(handleGuardar)}>
        <Row className="mb-3">
          <div className="col-md-3">
            <label>Fecha</label>
            <input
              type="date"
              className="form-control"
              {...register("fecha", { required: true })}
            />
          </div>
          <div className="col-md-3">
            <label>Importe sin propina</label>
            <input
              type="number"
              className="form-control"
              step="0.01"
              min="0"
              {...register("importeTotal", { required: true })}
              disabled
            />
          </div>
          <div className="col-md-3">
            <label>Importe con propina</label>
            <input
              type="number"
              className="form-control"
              step="0.01"
              min="0"
              {...register("importeReal", { required: true })}
            />
          </div>
          <div className="col-md-3">
            <label>Ganancia</label>
            <input
              type="number"
              className="form-control"
              step="0.01"
              min="0"
              disabled
              value={getValues("ganancia")}
            />
          </div>
        </Row>
        <Row>
          <div>
            <Button
              variant="primary"
              type="submit"
              disabled={comandas.length === 0}
            >
              Guardar
            </Button>
          </div>
        </Row>
      </form>
      <Modal show={showModalDiscount} onHide={() => setShowModalDiscount(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aplicar Descuento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Seleccionar</th>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {comandas.map((comanda, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedComandas.has(index)}
                      onChange={() => toggleComandaSelection(index)}
                    />
                  </td>
                  <td>{comanda.tipo}</td>
                  <td>{comanda.nombre}</td>
                  <td>{comanda.cantidad}</td>
                  <td>{comanda.precio_venta}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <label>Descuento:</label>
          <input
            type="number"
            className="form-control"
            min="0"
            step="0.01"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDiscount(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleDiscount}>
            Aplicar
          </Button>
        </Modal.Footer>
      </Modal>
    </BoxMui>
  );
};

export default FormVentas;
