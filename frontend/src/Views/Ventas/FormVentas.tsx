import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import imagen from "../../images/pattern.webp";
import { iArticulos } from "../../store/interfaces/articulos";
import { iGetCarta } from "../../store/interfaces/carta";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

const FormVentas: React.FC = () => {
    const dataCarta = useSelector((state: any) => state.carta.getCarta.data);
    const carta: iGetCarta = dataCarta?.data?.content;
    const dataArticulos = useSelector((state: any) => state.articulos.getArticulos.data);
    const articulos: iArticulos = dataArticulos?.data?.content;

    const [seleccionCarta, setSeleccionCarta] = useState<any>([]);
    const [seleccionArticulos, setSeleccionArticulos] = useState<any>([]);

    const handleCantidadChange = (producto: any, cantidad: any, tipo: any) => {
        const setSeleccion = tipo === "carta" ? setSeleccionCarta : setSeleccionArticulos;
        const seleccionActual = tipo === "carta" ? seleccionCarta : seleccionArticulos;

        const nuevaSeleccion = seleccionActual.map((item:any) =>
            item.id === (tipo === "carta" ? producto.idcarta : producto.id)
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item
        );

        if (!seleccionActual.find((item:any) => item.id === (tipo === "carta" ? producto.idcarta : producto.id)) && cantidad > 0) {
            nuevaSeleccion.push({
                id: tipo === "carta" ? producto.idcarta : producto.id,
                cantidad,
                productosCarta: tipo === "carta" ? [producto] : [],
                articulos: tipo === "articulos" ? [producto] : [],
            });
        }
        setSeleccion(nuevaSeleccion.filter((item:any) => item.cantidad > 0));
    };

    const handleSubmitForm = () => {
        const seleccionTotal = [...seleccionCarta, ...seleccionArticulos];
        console.log("Selección Final:", seleccionTotal);
    };

    const renderProductos = (productos: any, tipo: any) => {
        return (
            <div
                style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: "16px",
                    paddingBottom: "10px",
                }}
            >
                {productos?.map((producto: any) => (
                    <Card
                        key={`${tipo}-${producto.id || producto.idcarta}`}
                        className="product-card"
                        style={{
                            minWidth: "200px",
                            maxWidth: "200px",
                            height: "auto",
                            flexShrink: 0,
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Card.Img
                            variant="top"
                            src={imagen}
                            alt={producto.nombre}
                            className="product-image"
                        />
                        <Card.Body>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    height: "100%",
                                    p: 2,
                                    border: "1px solid #e0e0e0",
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Card.Title className="product-title">{producto.nombre}</Card.Title>
                                <Card.Text
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <strong>Precio:</strong> ${Number(producto?.precio_venta)?.toFixed(2)}
                                </Card.Text>
                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleCantidadChange(producto, tipo === "carta" ? -0.5 : -1, tipo)}
                                    >
                                        -
                                    </Button>
                                    <Typography
                                        className="mx-2"
                                        style={{ width: "30px", textAlign: "center" }}
                                    >
                                        {
                                            (
                                                tipo === "carta"
                                                    ? seleccionCarta.find((item:any) => item.id === producto.idcarta)
                                                    : seleccionArticulos.find((item:any) => item.id === producto.id)
                                            )?.cantidad || 0
                                        }
                                    </Typography>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleCantidadChange(producto, tipo === "carta" ? 0.5 : 1, tipo)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </Box>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Productos de la Carta</h2>
                    <div className="product-list-container">
                        {renderProductos(carta, "carta")}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Artículos</h2>
                    <div className="product-list-container">
                        {renderProductos(articulos, "articulos")}
                    </div>
                </Col>
            </Row>
            <div className="mt-4 text-center">
                <Button variant="success" onClick={handleSubmitForm}>
                    Enviar Selección
                </Button>
            </div>
        </Container>
    );
};

export default FormVentas;
