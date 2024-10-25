import { Button, Card } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout"
import imagen from "../../images/pattern.webp"
import ModalDinamico from "../herramientas/ModalDinamico/ModalDinamico";
import FormCarta from "./FormCarta";
import { useState } from "react";

const Carta: React.FC = () => {
    const [titulo, setTitulo] = useState<string>('Agregar');
    const [modalArticulos, setmodalArticulos] = useState({
        show: false,
        id: 0,
        accion: 'a',
      });
    const [formDisabled, setFormDisabled] = useState(false);
    const ModalBajaShow = (id: number, accion: string) => setmodalArticulos({ show: true, id: id, accion: accion });
    const handleClose = () => setmodalArticulos({ show: false, id: 0, accion: 'a'});
    const ModalShow = (id: number, accion: string) => setmodalArticulos({ show: true, id: id, accion: accion });
    const manejo_acciones = (_origen: string,registro: number, accion: string) => {
        switch (accion) {
          case 'a':{
            ModalShow(registro, accion);
            setTitulo('Alta Productos');
            break;
          }
          case 'b':{
            ModalBajaShow(registro, accion);
            setTitulo('Eliminar Articulos');
            break;
          }
          case 'm':{
            ModalShow(registro, accion);
            setFormDisabled(true);
            setTitulo('Modificar Articulos');
            break;
          }
          case 'c':{
            ModalShow(registro, accion);
            setTitulo('Consultar Articulos');
            setFormDisabled(true);
            break;
          }
          default:
            break;
        }
      }

    return (
        <PageLayout label="Adm. Carta">
            <div className="row">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={imagen} />
                    <Card.Body>
                        <Card.Title>Agregar producto</Card.Title>
                        <Card.Text>
                            Agregar un producto a la carta
                        </Card.Text>
                        <Button variant="primary" onClick={()=>manejo_acciones('',0,'a')}>Agregar</Button>
                    </Card.Body>
                </Card>
                <ModalDinamico id="modal_carta" sizeModal="xl" modalTitulo={titulo} handleClose={handleClose} manejador={modalArticulos}>
                    <FormCarta></FormCarta>
                </ModalDinamico>
            </div>
        </PageLayout>
    )
}

export default Carta;