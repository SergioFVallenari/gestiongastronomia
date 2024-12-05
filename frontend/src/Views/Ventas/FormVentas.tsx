import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import { useSelector } from "react-redux";
import imagen from "../../images/pattern.webp"
import { iArticulos } from "../../store/interfaces/articulos";
import { iGetCarta } from "../../store/interfaces/carta";
import { useState } from "react";
import { Box } from "@mui/material";

const FormVentas = () => {
    // const dataCarta = useSelector((state: any) => state.carta.getCarta.data);
    // const carta = dataCarta?.data?.content
    // const dataArticulos = useSelector((state: any) => state.articulos.getArticulos.data);
    // const articulos = dataArticulos?.data?.content
    const carta: iGetCarta[] = [
        {
            idcarta: 1,
            nombre: "Pizza Margarita",
            precio_costo: 3.50,
            precio_venta: 8.00,
            descripcion: "Pizza clásica con salsa de tomate, queso mozzarella y albahaca fresca.",
            ingredientes_json: [
                { id: 1, nombre: "Salsa de Tomate", sku: "ING-001", valor_modulo: "ml", cantidad: 100 },
                { id: 2, nombre: "Queso Mozzarella", sku: "ING-002", valor_modulo: "gr", cantidad: 150 },
                { id: 3, nombre: "Hojas de Albahaca", sku: "ING-003", valor_modulo: "gr", cantidad: 10 }
            ]
        },
        {
            idcarta: 2,
            nombre: "Pizza Pepperoni",
            precio_costo: 4.00,
            precio_venta: 10.00,
            descripcion: "Pizza con abundantes rodajas de pepperoni, queso mozzarella y salsa de tomate.",
            ingredientes_json: [
                { id: 1, nombre: "Salsa de Tomate", sku: "ING-001", valor_modulo: "ml", cantidad: 100 },
                { id: 2, nombre: "Queso Mozzarella", sku: "ING-002", valor_modulo: "gr", cantidad: 150 },
                { id: 4, nombre: "Pepperoni", sku: "ING-004", valor_modulo: "gr", cantidad: 80 }
            ]
        },
        {
            idcarta: 3,
            nombre: "Pizza Cuatro Quesos",
            precio_costo: 5.00,
            precio_venta: 12.00,
            descripcion: "Pizza gourmet con una mezcla de mozzarella, gorgonzola, parmesano y queso de cabra.",
            ingredientes_json: [
                { id: 1, nombre: "Salsa de Tomate", sku: "ING-001", valor_modulo: "ml", cantidad: 100 },
                { id: 2, nombre: "Queso Mozzarella", sku: "ING-002", valor_modulo: "gr", cantidad: 100 },
                { id: 5, nombre: "Queso Gorgonzola", sku: "ING-005", valor_modulo: "gr", cantidad: 50 },
                { id: 6, nombre: "Queso Parmesano", sku: "ING-006", valor_modulo: "gr", cantidad: 30 },
                { id: 7, nombre: "Queso de Cabra", sku: "ING-007", valor_modulo: "gr", cantidad: 50 }
            ]
        },
        {
            idcarta: 4,
            nombre: "Pizza Hawaiana",
            precio_costo: 4.50,
            precio_venta: 9.50,
            descripcion: "Pizza dulce y salada con piña, jamón y queso mozzarella.",
            ingredientes_json: [
                { id: 1, nombre: "Salsa de Tomate", sku: "ING-001", valor_modulo: "ml", cantidad: 100 },
                { id: 2, nombre: "Queso Mozzarella", sku: "ING-002", valor_modulo: "gr", cantidad: 150 },
                { id: 8, nombre: "Piña en Trozos", sku: "ING-008", valor_modulo: "gr", cantidad: 80 },
                { id: 9, nombre: "Jamón", sku: "ING-009", valor_modulo: "gr", cantidad: 70 }
            ]
        },
        {
            idcarta: 5,
            nombre: "Pizza Vegetariana",
            precio_costo: 4.00,
            precio_venta: 10.00,
            descripcion: "Pizza saludable con pimientos, champiñones, cebolla y aceitunas.",
            ingredientes_json: [
                { id: 1, nombre: "Salsa de Tomate", sku: "ING-001", valor_modulo: "ml", cantidad: 100 },
                { id: 2, nombre: "Queso Mozzarella", sku: "ING-002", valor_modulo: "gr", cantidad: 150 },
                { id: 10, nombre: "Pimientos", sku: "ING-010", valor_modulo: "gr", cantidad: 50 },
                { id: 11, nombre: "Champiñones", sku: "ING-011", valor_modulo: "gr", cantidad: 70 },
                { id: 12, nombre: "Cebolla", sku: "ING-012", valor_modulo: "gr", cantidad: 40 },
                { id: 13, nombre: "Aceitunas", sku: "ING-013", valor_modulo: "gr", cantidad: 30 }
            ]
        }
    ];

    const articulos: iArticulos[] = [
        {
            id: 1,
            nombre: "Coca Cola",
            sku: "BEB-001",
            precio_costo: 0.50,
            precio_venta: 1.00,
            categoria: "Refrescos",
            idcategoria: 1,
            stock: 100,
            fecha_mod: "2024-12-01"
        },
        {
            id: 2,
            nombre: "Pepsi",
            sku: "BEB-002",
            precio_costo: 0.45,
            precio_venta: 0.95,
            categoria: "Refrescos",
            idcategoria: 1,
            stock: 120,
            fecha_mod: "2024-12-02"
        },
        {
            id: 3,
            nombre: "Jugo de Naranja",
            sku: "BEB-003",
            precio_costo: 0.60,
            precio_venta: 1.20,
            categoria: "Jugos",
            idcategoria: 2,
            stock: 80,
            fecha_mod: "2024-12-03"
        },
        {
            id: 4,
            nombre: "Agua Mineral",
            sku: "BEB-004",
            precio_costo: 0.30,
            precio_venta: 0.70,
            categoria: "Agua",
            idcategoria: 3,
            stock: 200,
            fecha_mod: "2024-12-01"
        },
        {
            id: 5,
            nombre: "Cerveza Lager",
            sku: "BEB-005",
            precio_costo: 1.00,
            precio_venta: 1.50,
            categoria: "Cervezas",
            idcategoria: 4,
            stock: 50,
            fecha_mod: "2024-12-04"
        },
        {
            id: 6,
            nombre: "Vino Tinto",
            sku: "BEB-006",
            precio_costo: 5.00,
            precio_venta: 7.50,
            categoria: "Vinos",
            idcategoria: 5,
            stock: 30,
            fecha_mod: "2024-12-03"
        }
    ];
    const [seleccionCarta, setSeleccionCarta] = useState<{ id: number; cantidad: number }[]>([]);
    const [seleccionArticulos, setSeleccionArticulos] = useState<{ id: number; cantidad: number }[]>([]);

    // Maneja el cambio de cantidad para cada tipo (carta o articulos)
    const handleCantidadChange = (id: number, cantidad: number, tipo: "carta" | "articulos") => {
        const setSeleccion = tipo === "carta" ? setSeleccionCarta : setSeleccionArticulos;
        const seleccionActual = tipo === "carta" ? seleccionCarta : seleccionArticulos;

        const nuevaSeleccion = cantidad > 0
            ? [...seleccionActual.filter((item) => item.id !== id), { id, cantidad }]
            : seleccionActual.filter((item) => item.id !== id);

        setSeleccion(nuevaSeleccion);
    };

    const handleSubmitForm = () => {
        // Combinar las selecciones de carta y artículos
        const seleccionTotal = [...seleccionCarta, ...seleccionArticulos];
        console.log("Selección Final:", seleccionTotal);
    };

    return (
        <Box className='row'>
           <Box className='row'>
            
           </Box>
        </Box>
    );
};

export default FormVentas;