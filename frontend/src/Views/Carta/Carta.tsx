import { Button, ButtonGroup, Card } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout"
import imagen from "../../images/pattern.webp"
import ModalDinamico from "../herramientas/ModalDinamico/ModalDinamico";
import FormCarta from "./FormCarta";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCarta, getCarta } from "../../store/actions/carta";
import { AppDispatch } from "../../store/store";
import { Box, Typography } from "@mui/material";
import { Loading } from "notiflix";

const Carta: React.FC = () => {
    const [titulo, setTitulo] = useState<string>('Agregar');
    const [modalArticulos, setmodalArticulos] = useState({
        show: false,
        id: 0,
        accion: 'a',
    });
    const [modalArticulosBaja, setmodalArticulosBaja] = useState({
        show: false,
        id: 0,
        accion: 'b',
    });
    const [formDisabled, setFormDisabled] = useState(false);
    const ModalBajaShow = (id: number, accion: string) => setmodalArticulosBaja({ show: true, id: id, accion: accion });
    const handleCloseBaja = () => setmodalArticulosBaja({ show: false, id: 0, accion: 'b' });
    const handleClose = () => setmodalArticulos({ show: false, id: 0, accion: 'a' });
    const ModalShow = (id: number, accion: string) => setmodalArticulos({ show: true, id: id, accion: accion });
    const dispatch = useDispatch<AppDispatch>();
    const dataCarta = useSelector((state: any) => state.carta.getCarta.data);
    const carta = dataCarta?.data?.content
    const manejo_acciones = (_origen: string, registro: number, accion: string) => {
        switch (accion) {
            case 'a': {
                ModalShow(registro, accion);
                setFormDisabled(false);
                setTitulo('Alta Productos');
                break;
            }
            case 'b': {
                ModalBajaShow(registro, accion);
                setFormDisabled(true);
                setTitulo('Eliminar Carta');
                break;
            }
            case 'm': {
                ModalShow(registro, accion);
                setFormDisabled(false);
                setTitulo('Modificar Articulos');
                break;
            }
            case 'c': {
                ModalShow(registro, accion);
                setTitulo('Consultar Articulos');
                setFormDisabled(true);
                break;
            }
            default:
                break;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            dispatch(getCarta());
        }
        fetchData();
    }, [dispatch]);

    const handleDeleteCarta = async (id: number) => {
        Loading.pulse('Eliminando carta...');
        const response: any = await dispatch(deleteCarta({ id: id }));
        console.log(response.payload)
        if (response.payload.data.info) {
            dispatch(getCarta());
            setTimeout(() => {
                Loading.remove();
                handleCloseBaja();
            }, 2000);
        }
    }
    return (
        <PageLayout label="Adm. Carta">
            <Box className="row">
                    <Card style={{ width: '18rem', borderRadius: 20 }} className="m-2">
                        <Card.Img variant="top" src={imagen} />
                        <Card.Body style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                            <Card.Title>Agregar producto</Card.Title>
                            <Card.Text>
                                Agregar un producto a la carta
                            </Card.Text>
                            <Button variant="success" onClick={() => manejo_acciones('', 0, 'a')}>Agregar</Button>
                        </Card.Body>
                    </Card>
                    {
                        carta?.map((item: any, index: any) => (
                            <Card style={{ width: '18rem', maxHeight: '40vh', borderRadius: 20 }} key={index} className="m-2">
                                <Card.Img variant="top" src={imagen} />
                                <Card.Body style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                                    <Card.Title>{item.nombre}</Card.Title>
                                    <Card.Text>
                                        $ {item.precio_venta}
                                    </Card.Text>
                                    <Card.Text style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {item.descripcion}
                                    </Card.Text>
                                    <ButtonGroup size="sm">
                                        <Button variant="info" onClick={() => manejo_acciones('', item.idcarta, 'c')}>Consultar</Button>
                                        <Button variant="primary" onClick={() => manejo_acciones('', item.idcarta, 'm')}>Modificar</Button>
                                        <Button variant="danger" onClick={() => manejo_acciones('', item.idcarta, 'b')}>Eliminar</Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        ))
                    }
            </Box>
            <ModalDinamico id="modal_carta" sizeModal="xl" modalTitulo={titulo} handleClose={handleClose} manejador={modalArticulos}>
                <FormCarta
                    formDisabled={formDisabled}
                    accion={modalArticulos.accion}
                    idCarta={modalArticulos.id}
                    onSubmitSuccess={handleClose}
                />
            </ModalDinamico>
            <ModalDinamico id="modal_carta_baja" sizeModal="lg" modalTitulo={titulo} handleClose={handleCloseBaja} manejador={modalArticulosBaja}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        m: 2,
                        gap: 2,
                        textAlign: 'center',
                        boxShadow: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                        ¿Estás seguro de que deseas eliminar este artículo?
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Esta acción no se puede deshacer. Si eliminas este artículo, se perderá toda la información asociada.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            mt: 3
                        }}
                    >
                        <Button
                            variant="primary"
                            onClick={() => handleDeleteCarta(modalArticulosBaja.id)}
                        >
                            Eliminar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleCloseBaja}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </ModalDinamico>
        </PageLayout>
    )
}

export default Carta;