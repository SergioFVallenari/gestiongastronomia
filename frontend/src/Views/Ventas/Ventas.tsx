import React, { useEffect, useState } from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import FormVentas from "./FormVentas";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getCarta } from "../../store/actions/carta";
import { getArticulos } from "../../store/actions/articulos";

const Ventas: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("nueva-venta");
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(getCarta());
        dispatch(getArticulos());
    }, [dispatch]);

    const handleTabSelect = (key: string | null) => {
        if (key) setActiveTab(key);
    };

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
