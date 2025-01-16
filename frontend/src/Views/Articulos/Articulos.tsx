import { Card } from "react-bootstrap"
import PageLayout from "../../layouts/PageLayout"
import { useState } from "react";
import Grid from "../herramientas/Grid/Grid";
import ModalDinamico from "../herramientas/ModalDinamico/ModalDinamico";
import FormArticulos from "./FormArticulos";
import api from "../../helpers";

const Articulos: React.FC = (): JSX.Element => {
  //Estados
  const [modalArticulos, setmodalArticulos] = useState({
    show: false,
    id: 0,
    accion: 'a',
  });
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalBaja, setmodalBaja] = useState({ show: false, id: 0, accion: 'b' });
  // const [offcanvasArticulos, setoffcanvasArticulos] = useState({
  //   show: false,
  //   id: 0,
  //   accion: 'a',
  // });
  const [recargaGridArticulos, setRecargaGridArticulos] = useState<string>('');
  const [titulo,setTitulo] = useState<string>('Articulos');

  //Funciones
  // const offCanvasClose = () => setoffcanvasArticulos({ show: false, id: 0, accion: 'a' });
  // const offCanvasShow = (id: number, accion: string) => setoffcanvasArticulos({ show: true, id: id, accion: accion });
  const SetRefresh = (date: string) => setRecargaGridArticulos(date);
  const ModalBajaClose = () => setmodalBaja({ show: false, id: 0, accion: 'b' });
  const ModalBajaShow = (id: number, accion: string) => setmodalBaja({ show: true, id: id, accion: accion });
  const ModalClose = () => setmodalArticulos({ show: false, id: 0, accion: 'a' });
  const ModalShow = (id: number, accion: string) => setmodalArticulos({ show: true, id: id, accion: accion });
  const manejo_acciones = (_origen: string,registro: number, accion: string) => {
    switch (accion) {
      case 'a':{
        ModalShow(registro, accion);
        setTitulo('Alta Articulos');
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
  const handleDelete = (id: any) => {
    api.delete('/articulos/baja_articulos', { data: { id: id } })
  }
  
  //Render
  return (
    <PageLayout label="Adm. Articulos">
      <Card className="shadow-lg">
        <Card.Body>
          <div className="d-flex">
            <button className="btn btn-primary mb-3" onClick={() => manejo_acciones('',0, 'a')}>Agregar</button>
          </div>
          {Grid(manejo_acciones, 'articulos', recargaGridArticulos, setRecargaGridArticulos)}
          <ModalDinamico id="modal_articulos" manejador={modalArticulos} modalTitulo={titulo} handleClose={ModalClose} sizeModal="xl">
            <FormArticulos
             accion={modalArticulos.accion}
             idArticulo={modalArticulos.id}
             onSubmitSuccess={ModalClose}
              formDisabled={formDisabled}
              setRecargaGridArticulos={SetRefresh}
            />
          </ModalDinamico>
          <ModalDinamico id="modal_baja" manejador={modalBaja} modalTitulo={titulo} sizeModal="lg" handleClose={ModalBajaClose}>
                    <div className="row mt-2 mb-2 d-flex justify-content-center align-items-center text-center">
                        <div className="row col-12">
                            <div className="alert alert-danger" role="alert">
                                ¿Está seguro que desea eliminar el conector? Esta acción no se puede deshacer.
                            </div>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    handleDelete(modalBaja.id);
                                }}
                            >
                                Eliminar
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    ModalBajaClose();
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </ModalDinamico>
        </Card.Body>
      </Card>
    </PageLayout>
  )
}

export default Articulos