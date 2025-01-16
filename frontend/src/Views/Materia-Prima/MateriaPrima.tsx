import { Card, Tab, Tabs } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import Grid from "../herramientas/Grid/Grid";
import ModalDinamico from "../herramientas/ModalDinamico/ModalDinamico";
import api from "../../helpers";
import { useState } from "react";
import FormMateriaPrima from "./FormMateriaPrima";

const MateriaPrima: React.FC = (): JSX.Element => {
  //Estados
  const [modalMateriaPrima, setmodalMateriaPrima] = useState({
    show: false,
    id: 0,
    accion: 'a',
  });
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalBaja, setmodalBaja] = useState({ show: false, id: 0, accion: 'b' });
  // const [offcanvasMateriaPrima, setoffcanvasMateriaPrima] = useState({
  //   show: false,
  //   id: 0,
  //   accion: 'a',
  // });
  const [recargaGridMateriaPrima, setRecargaGridMateriaPrima] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('MateriaPrima');

  //Funciones
  // const offCanvasClose = () => setoffcanvasMateriaPrima({ show: false, id: 0, accion: 'a' });
  // const offCanvasShow = (id: number, accion: string) => setoffcanvasMateriaPrima({ show: true, id: id, accion: accion });
  const SetRefresh = (date: string) => setRecargaGridMateriaPrima(date);
  const ModalBajaClose = () => setmodalBaja({ show: false, id: 0, accion: 'b' });
  const ModalBajaShow = (id: number, accion: string) => setmodalBaja({ show: true, id: id, accion: accion });
  const ModalClose = () => setmodalMateriaPrima({ show: false, id: 0, accion: 'a' });
  const ModalShow = (id: number, accion: string) => setmodalMateriaPrima({ show: true, id: id, accion: accion });
  const manejo_acciones = (_origen: string, registro: number, accion: string) => {
    switch (accion) {
      case 'a': {
        ModalShow(registro, accion);
        setTitulo('Alta Materia Prima');
        break;
      }
      case 'b': {
        ModalBajaShow(registro, accion);
        setTitulo('Eliminar Materia Prima');
        break;
      }
      case 'm': {
        ModalShow(registro, accion);
        setFormDisabled(true);
        setTitulo('Modificar Materia Prima');
        break;
      }
      case 'c': {
        ModalShow(registro, accion);
        setTitulo('Consultar Materia Prima');
        setFormDisabled(true);
        break;
      }
      default:
        break;
    }
  }
  const handleDelete = (id: number | string) => {
    api.put(`/materia_prima/baja_materia_prima`, { id: id })
  }

  //Render
  return (
    <PageLayout label="Adm. MateriaPrima" >
      <Tabs defaultActiveKey="materia_prima" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="materia_prima" title="Grid Ingredientes">
          <Card>
            <Card.Body>
              <div className="d-flex">
                <button className="btn btn-primary mb-3" onClick={() => manejo_acciones('', 0, 'a')}>Agregar</button>
              </div>
              {Grid(manejo_acciones, 'materia_prima', recargaGridMateriaPrima, setRecargaGridMateriaPrima)}
              <ModalDinamico id="modal_materia_prima" manejador={modalMateriaPrima} modalTitulo={titulo} handleClose={ModalClose} sizeModal="xl">
                <FormMateriaPrima
                  accion={modalMateriaPrima.accion}
                  idArticulo={modalMateriaPrima.id}
                  onSubmitSuccess={ModalClose}
                  formDisabled={formDisabled}
                  setRecargaGridMateriaPrima={SetRefresh}
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
        </Tab>
        <Tab eventKey="stock" title="Grid Stock">
          <Card>
            <Card.Body>
              {Grid(manejo_acciones, 'stock', recargaGridMateriaPrima, setRecargaGridMateriaPrima)}
              {/* <ModalDinamico id="modal_materia_prima" manejador={modalMateriaPrima} modalTitulo={titulo} handleClose={ModalClose} sizeModal="xl">
                <FormMateriaPrima
                  accion={modalMateriaPrima.accion}
                  idArticulo={modalMateriaPrima.id}
                  onSubmitSuccess={ModalClose}
                  formDisabled={formDisabled}
                  setRecargaGridMateriaPrima={SetRefresh}
                />
              </ModalDinamico> */}
              {/* <ModalDinamico id="modal_baja" manejador={modalBaja} modalTitulo={titulo} sizeModal="lg" handleClose={ModalBajaClose}>
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
              </ModalDinamico> */}
            </Card.Body>
          </Card>
        </Tab>

      </Tabs>
    </PageLayout>
  )
}
export default MateriaPrima;