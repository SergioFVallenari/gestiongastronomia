import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Box as BoxMui } from "@mui/material";
import { useForm } from "react-hook-form";
import Select from "react-select";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const FormVentas: React.FC = () => {
    const dataCarta = useSelector((state: any) => state.carta.getCarta.data);
    const carta = dataCarta?.data?.content;
    console.log(carta);
    const dataArticulos = useSelector((state: any) => state.articulos.getArticulos.data);
    const articulos = dataArticulos?.data?.content;

    const { handleSubmit, register, setValue } = useForm({
        defaultValues: {
            cantidadArticulo: 0,
            precio: 0,
            articulo: '',
            carta: '',
            cantidadCarta: 0,
        },
    });


    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <BoxMui className="row mt-2 mb-2">
            <h3>Ventas - Comandas</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row className='mb-3'>
                    <Col className="col-md-5">
                        <label>Articulo</label>
                        <Select
                            options={articulos?.map((articulo: any) => (
                                { label: articulo.nombre, value: articulo.sku }))}
                            onChange={(e: any) => setValue('articulo', e.value)}
                            isSearchable
                            placeholder='Seleccione un articulo'
                        />
                    </Col>
                    <Col className="col-md-5">
                        <label>Cantidad</label>
                        <input type="number" className="form-control" {...register('cantidadArticulo')} />
                    </Col>
                    <Col className="col-md-2">
                        <AddCircleIcon sx={{mt:4}} />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col className="col-md-5">
                        <label>Carta</label>
                        <Select
                            options={carta?.map((articulo: any) => (
                                { label: articulo.nombre, value: articulo.sku }))}
                            onChange={(e: any) => setValue('carta', e.value)}
                            isSearchable
                            placeholder='Seleccione un articulo'
                        />
                    </Col>
                    <Col className="col-md-5">
                        <label>Cantidad</label>
                        <input type="number" className="form-control" {...register('cantidadCarta')} />
                    </Col>
                </Row>
                <Col className="col-md-6">
                    <label>Importe total</label>
                    <input type="number" className="form-control" {...register('precio')} />
                </Col>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>
                    </Col>
                </Row>
            </form>
        </BoxMui>
    );
};

export default FormVentas;
