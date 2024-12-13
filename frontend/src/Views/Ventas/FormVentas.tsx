import React from "react";
import { Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Box as BoxMui } from "@mui/material";
import { useForm } from "react-hook-form";
import Select from "react-select";

const FormVentas: React.FC = () => {
  const dataCarta = useSelector((state: any) => state.carta.getCarta.data);
  const carta = dataCarta?.data?.content;
  const dataArticulos = useSelector(
    (state: any) => state.articulos.getArticulos.data
  );
  const articulos = dataArticulos?.data?.content;
  const [comandas, setComandas] = React.useState<any[]>([]);
  const { handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      cantidadArticulo: 0,
      precio: 0,
      articulo: "",
      carta: "",
      cantidadCarta: 0,
      fecha: "",
    },
  });

  const watchedFields = watch(["articulo", "carta", "cantidadArticulo", "cantidadCarta"]);

  const isButtonDisabled = React.useMemo(() => {
    // Verificar condiciones
    const articuloSeleccionado = watchedFields[0] !== "";
    const cantidadArticuloValida = watchedFields[2] > 0;

    const cartaSeleccionada = watchedFields[1] !== "";
    const cantidadCartaValida = watchedFields[3] > 0;

    // Habilitar botón solo si ambas condiciones son válidas
    return !(
      (articuloSeleccionado && cantidadArticuloValida) ||
      (cartaSeleccionada && cantidadCartaValida)
    );
  }, [watchedFields]);

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <BoxMui className="row mt-2 mb-2">
      <h3>Ventas - Comandas</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <div className="col-md-6">
            <label>Articulo</label>
            <Select
              options={articulos?.map((articulo: any) => ({
                label: articulo.nombre,
                value: articulo.sku,
              }))}
              onChange={(e: any) => setValue("articulo", e ? e.value : '')}
              isSearchable
              isClearable
              placeholder="Seleccione un articulo"
            />
          </div>
          <div className="col-md-6">
            <label>Cantidad</label>
            <input
              type="number"
              className="form-control"
              min='0'
              {...register("cantidadArticulo")}
            />
          </div>
        </Row>
        <Row className="mb-3">
          <div className="col-md-6">
            <label>Carta</label>
            <Select
              options={carta?.map((articulo: any) => ({
                label: articulo.nombre,
                value: articulo.sku,
              }))}
              onChange={(e: any) => setValue("carta",e ? e.value : '')}
              isSearchable
              isClearable
              placeholder="Seleccione un articulo"
            />
          </div>
          <div className="col-md-6">
            <label>Cantidad</label>
            <input
              type="number"
              className="form-control"
              step="0.5"
              min='0'
              {...register("cantidadCarta")}
            />
          </div>
        </Row>
        <Row className="mb-3">
          <div className="col-md-6">
            <label>Fecha</label>
            <input
              type="date"
              className="form-control"
              {...register("fecha")}
            />
          </div>
          <div className="col-md-6">
            <label>Importe total</label>
            <input
              type="number"
              className="form-control"
              {...register("precio")}
            />
          </div>
        </Row>
        <Row>
          <div>
            <Button variant="primary" type="submit" disabled={isButtonDisabled}>
              Agregar
            </Button>
          </div>
        </Row>
      </form>
    </BoxMui>
  );
};

export default FormVentas;
