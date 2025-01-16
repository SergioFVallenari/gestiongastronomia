import React, { useEffect, useState } from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import FormVentas from "./FormVentas";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getCarta } from "../../store/actions/carta";
import { getArticulos } from "../../store/actions/articulos";
import Grid from "../herramientas/Grid/Grid";
import ModalDinamico from "../herramientas/ModalDinamico/ModalDinamico";
import FormVentasById from "./FormVentasById";

const Ventas: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("nueva-venta");
    const dispatch = useDispatch<AppDispatch>();
    const [modalVentas, setmodalVentas] = useState({
        show: false,
        id: 0,
        accion: 'a',
    });
    console.log(modalVentas)
    const [recargaGridVentas, setRecargaGridVentas] = useState<string>('');
    
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getCarta());
            await dispatch(getArticulos());
        };
        fetchData();
    }, [dispatch]);

    const handleTabSelect = (key: string | null) => {
        if (key) setActiveTab(key);
    };
    const ModalShow = (id: number, accion: string) => setmodalVentas({ show: true, id: id, accion: accion });
    const manejo_acciones = (_origen: string, registro: number, accion: string) => {
        switch (accion) {
            case 'c': {
                ModalShow(registro, accion);
                break;
            }
            default:
                break;
        }
    }


    return (
        <PageLayout label="Adm. Ventas">
            <Card>
                <Card.Body>
                    <Tabs
                        id="ventas-tabs"
                        activeKey={activeTab}
                        onSelect={handleTabSelect}
                        className="mb-3 custom-tab"
                        fill
                        variant="pills"
                    >
                        <Tab eventKey="nueva-venta" title="Agregar nueva venta">
                            <FormVentas></FormVentas>
                        </Tab>
                        <Tab eventKey="historial-ventas" title="Historial de ventas">
                            {Grid(manejo_acciones, 'ventas', recargaGridVentas, setRecargaGridVentas)}
                            <ModalDinamico id="modalVentasById" manejador={modalVentas} modalTitulo="Detalle de la comanda" handleClose={() => setmodalVentas({ show: false, id: 0, accion: 'a' })} sizeModal="xl">
                                <FormVentasById></FormVentasById>
                            </ModalDinamico>
                        </Tab>
                        <Tab eventKey="otros" title="Otros">
                            <div>Contenido de Otros</div>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </PageLayout>
    );
};

export default Ventas;
