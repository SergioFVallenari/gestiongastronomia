import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import Select from 'react-select';
import api from "../../helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getCarta, getCartaById } from "../../store/actions/carta";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { EnviarMensaje } from "../herramientas/General/General";

interface iFormCarta {
  formDisabled?: boolean;
  accion: string;
  idCarta: number;
  onSubmitSuccess: () => void;
}

const FormCarta: React.FC<iFormCarta> = ({
  formDisabled,
  accion,
  onSubmitSuccess,
  idCarta,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      nombre: "",
      precio_costo: 0,
      precio_venta: 0,
      descripcion: "",
      ingredientes_json: [],
      ganancia: 0,
      sku: "",
      categoria: "",
    },
  });
  const [categoriaModulo, setCategoriaModulo] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const [ingredientes, setIngredientes] = useState<any[]>([]);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState<any[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<any>(null);

  useEffect(() => {
    api.get("/materia_prima/lista_ingredientes").then((res) => {
      const options = res.data.content.map((ingrediente: any) => ({
        value: ingrediente.id,
        label: `${ingrediente.nombre}`,
        ingrediente: ingrediente,
      }));
      setIngredientes(options);
    });
    api
      .post(`/tabla/lista_modulos`, { modulo: "categorias_carta" })
      .then((res) => {
        const options = res.data.content.map((categoria: any) => ({
          value: categoria.id_valor_modulo,
          label: categoria.valor_modulo.toUpperCase(),
        }));
        setCategoriaModulo(options);
      });
  }, []);

  useEffect(() => {
    const fetchCarta = async () => {
      if (accion === "m" || accion === "c") {
        try {
          const response: any = await dispatch(getCartaById(idCarta)).unwrap();
          const cartaData = response.data.content[0];

          setValue("nombre", cartaData.nombre);
          setValue("precio_costo", cartaData.precio_costo);
          setValue("precio_venta", cartaData.precio_venta);
          setValue("descripcion", cartaData.descripcion);
          setValue("sku", cartaData.sku);

          const ingredientesData = JSON.parse(cartaData.ingredientes_json).map(
            (ingrediente: any) => ({
              id: ingrediente.id,
              label: ingrediente.nombre,
              cantidad: ingrediente.cantidad,
              sku: ingrediente.sku,
              valor_modulo: ingrediente.valor_modulo,
            })
          );
          setValue("ingredientes_json", ingredientesData);
          setIngredientesSeleccionados(ingredientesData);
          const categoriaData = categoriaModulo.find(
            (categoria) => categoria?.value === cartaData.categoria
          );
          if (categoriaData) {
            setValue("categoria", categoriaData.value || null);
            setCategoriaSeleccionada(categoriaData);
          } else {
            setCategoriaSeleccionada(null);
          }
          
        } catch (error) {
          console.error("Error al obtener la carta:", error);
        }
      }
    };

    fetchCarta();
  }, [dispatch, idCarta, accion, categoriaModulo]);

  const handleAutocompleteChange = (_: any, selectedOptions: any) => {
    const ingredientesConCantidad = selectedOptions.map((option: any) => {
      const ingredienteExistente = ingredientesSeleccionados.find(
        (ingrediente) => ingrediente.id === option?.ingrediente?.id
      );
      return {
        ...option,
        cantidad: ingredienteExistente
          ? ingredienteExistente.cantidad
          : option.cantidad, // Mantener cantidad previa o iniciar en 0
      };
    });
    // Actualizar el estado y el valor en react-hook-form
    setIngredientesSeleccionados(ingredientesConCantidad);
    setValue("ingredientes_json", ingredientesConCantidad);
  };

  const handleCantidadChange = (e: any, index: number) => {
    const nuevaCantidad = Number(e.target.value);

    // Crear una copia actualizada de ingredientes seleccionados con la nueva cantidad
    const updatedIngredientes: any = ingredientesSeleccionados.map(
      (ingrediente, i) =>
        i === index ? { ...ingrediente, cantidad: nuevaCantidad } : ingrediente
    );

    // Actualizar estado y sincronizar con react-hook-form
    setIngredientesSeleccionados(updatedIngredientes);
    setValue("ingredientes_json", updatedIngredientes);
  };

  const onSubmit = (data: any) => {
    if (accion === "a") {
      const json_ingredientes = ingredientesSeleccionados.map(
        (ingrediente) => ({
          id: ingrediente.value,
          nombre: ingrediente.label,
          sku: ingrediente.ingrediente.sku,
          valor_modulo: ingrediente.ingrediente.valor_modulo,
          cantidad: ingrediente.cantidad,
        })
      );
      const body = {
        ...data,
        ingredientes_json: JSON.stringify(json_ingredientes),
      };
      api.post("/carta/alta_carta", body).then((response) => {
        if (response.data.info) {
          EnviarMensaje("success", "Producto añadido a la carta");
          onSubmitSuccess();
          dispatch(getCarta());
        }
      });
    }
  };

  const calcularCosto = () => {
    let json_ingredientes;
    if (accion === "m" || accion === "c") {
      json_ingredientes = getValues("ingredientes_json");
    } else {
      json_ingredientes = ingredientesSeleccionados.map((ingrediente) => ({
        id: ingrediente.value,
        cantidad: ingrediente.cantidad,
        label: ingrediente.label,
        sku: ingrediente.ingrediente.sku,
        valor_modulo: ingrediente.ingrediente.valor_modulo,
      }));
    }
    api
      .post("/materia_prima/calcular_precio_costo", {
        json_ingredientes: JSON.stringify(json_ingredientes),
      })
      .then((res) => {
        setValue("precio_costo", res.data.content[0].costo_total);
      });
  };

  const precioCosto = watch("precio_costo");
  const precioVenta = watch("precio_venta");
  useEffect(() => {
    if (precioCosto >= 0 && precioVenta >= 0) {
      const ganancia = precioVenta - precioCosto;
      setValue("ganancia", ganancia); // Actualizar el valor en el formulario
    }
  }, [precioCosto, precioVenta, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs
          defaultActiveKey="datos"
          id="fill-tab-exasmple"
          fill
          className="modal-tab"
        >
          <Tab eventKey="datos" title="Datos">
            <Box className="row mt-2 mb-2">
              <div className="col-md-4">
                <div className="mb-3">
                  {/* <label className="form-label">Producto</label> */}
                  <TextField
                    label="Producto"
                    type="text"
                    className="form-control"
                    placeholder="Nombre del producto"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    {...register("nombre", { required: "Obligatorio" })}
                    disabled={formDisabled}
                  />
                  {errors.nombre && (
                    <span className="text-danger">{errors.nombre.message}</span>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  {/* <label className="form-label">SKU</label> */}
                  <TextField
                    label="Sku"
                    type="text"
                    className="form-control"
                    placeholder="SKU del producto"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    {...register("sku", { required: "Obligatorio" })}
                    disabled={formDisabled}
                  />
                  {errors.sku && (
                    <span className="text-danger">{errors.sku.message}</span>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  {/* <label className="form-label">Precio Costo</label> */}
                  <div className="input-group">
                    <TextField
                      label="Precio Costo"
                      type="number"
                      className="form-control"
                      {...register("precio_costo", {
                        required: "Obligatorio",
                        min: {
                          value: 1,
                          message: "El precio costo debe ser mayor a 0",
                        },
                      })}
                      disabled
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={calcularCosto}
                      disabled={formDisabled}
                    >
                      Calcular
                    </button>
                    {errors.precio_costo && (
                      <span className="text-danger">
                        {errors.precio_costo.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <TextField
                    label="Precio Venta"
                    type="number"
                    className="form-control"
                    {...register("precio_venta", { required: "Obligatorio" })}
                    disabled={formDisabled}
                  />
                  {errors.precio_venta && (
                    <span className="text-danger">
                      {errors.precio_venta.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <TextField
                    label="Ganancia"
                    variant="filled"
                    color="success"
                    focused
                    className="form-control"
                    {...register("ganancia")}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <Autocomplete
                    options={categoriaModulo}
                    getOptionLabel={(option) => option.label}
                    value={categoriaSeleccionada }
                    onChange={(_event, value) => {
                      setCategoriaSeleccionada(value || null);
                      setValue("categoria", value ? value.value : null, {
                        shouldValidate: true, // Para validar el campo automáticamente
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Categoría"
                        placeholder="Selecciona una categoría"
                        error={!!errors.categoria}
                        helperText={errors.categoria?.message}
                      />
                    )}
                    disabled={formDisabled}
                  />
                  <input
                    type="hidden"
                    {...register("categoria", { required: "Obligatorio" })}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <TextField
                    label="Descripcion"
                    placeholder="Descripción del producto"
                    className="form-control"
                    {...register("descripcion", { required: "Obligatorio" })}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    disabled={formDisabled}
                  />
                  {errors.descripcion && (
                    <span className="text-danger">
                      {errors.descripcion.message}
                    </span>
                  )}
                </div>
              </div>
            </Box>
          </Tab>
          <Tab eventKey="ingredientes" title="Ingredientes">
            <div className="col-md-12">
              <div className="mb-3">
                <Autocomplete
                  sx={{ mt: 2 }}
                  multiple
                  options={ingredientes}
                  value={ingredientesSeleccionados}
                  getOptionLabel={(option) => option.label} // Maneja tanto `label` como `nombre`
                  filterSelectedOptions
                  disabled={formDisabled}
                  onChange={handleAutocompleteChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option: any, index: any) => (
                      <Chip label={option.label} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ingredientes"
                      placeholder="Selecciona los ingredientes"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                {errors.ingredientes_json && (
                  <span className="text-danger">
                    {errors.ingredientes_json.message}
                  </span>
                )}
              </div>
            </div>

            {/* Listado dinámico para ingredientes y cantidades */}
            {ingredientesSeleccionados.map((option, index) => (
              <div key={option.id} className="row mb-3">
                <div className="col-md-6">
                  <TextField
                    type="text"
                    label="Articulo"
                    className="form-control"
                    value={option.label} // Mostramos el nombre del ingrediente
                    disabled
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    type="number"
                    className="form-control"
                    label="Cantidad"
                    onChange={(e) => handleCantidadChange(e, index)}
                    value={option.cantidad}
                    disabled={formDisabled}
                  />
                </div>
              </div>
            ))}
          </Tab>
        </Tabs>
        <div className="col-md-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formDisabled}
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default FormCarta;
