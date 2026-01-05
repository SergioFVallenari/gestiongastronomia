import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import Select from "react-select";
import { useState } from "react";
import FileUploadComponent from "../../components/upload/Upload";
import api from "../../helpers";
import Notiflix from "notiflix";

interface ImportarArticulosProps {
    onDownloadTemplate?: () => void;
}
interface dataResponse {
    success?: string;
    error?: string;
}
const ImportarArticulos: React.FC<ImportarArticulosProps> = ({ onDownloadTemplate }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [file, setFile] = useState<string | null>(null);
    const [data, setData] = useState<dataResponse[] | null>(null);
    const handleUpload = (fileUrl: string) => {
        console.log("Archivo subido con éxito. URL:", fileUrl);
        setFile(fileUrl)
    }

    const handleImportar = async () => {
        Notiflix.Loading.circle('Importando...');
        try {
            const response = await api.post('/articulos/modificarArticulosMasivo', { url: file, accion: selectedOption });
            if (response.data.info) {
                Notiflix.Notify.success('Importación realizada con éxito');
                setData(response.data.content);
                Notiflix.Loading.remove();
            }
        } catch (error) {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Error al importar los artículos');
        }
    }

    const renderResultsTable = () => {
        if (!data || data.length === 0) return null;
        
        return (
            <Container className="border mt-2 rounded shadow">
                <Row className="mb-3 mt-3">
                    <Col>
                        <h4>Resultados de la Importación</h4>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button 
                            variant="secondary" 
                            onClick={() => setData(null)}
                        >
                            Volver
                        </Button>
                    </Col>
                </Row>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.success ? (
                                        <span className="badge bg-success">Éxito</span>
                                    ) : (
                                        <span className="badge bg-danger">Error</span>
                                    )}
                                </td>
                                <td className={item.success ? 'text-success' : 'text-danger'}>
                                    {item.success || item.error}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
    return (
        <>
            {data && data.length > 0 ? (
                renderResultsTable()
            ) : (
                <Container className="border mt-2 rounded shadow">
                    <Alert variant="info" className="mb-3" hidden={selectedOption !== ''}>
                        <Alert.Heading>Instrucciones para la importación/modificación masiva de artículos</Alert.Heading>
                        <ul>
                            <li>-Seleccione la opción deseada en el menú desplegable: "Importación" para agregar nuevos artículos o "Modificación" para actualizar precios de artículos existentes.</li>
                            <li>-Descargue el template haciendo clic en el botón "Descargar template".</li>
                            <li>-Complete el archivo Excel siguiendo el formato del template. Asegúrese de no modificar los encabezados de las columnas.</li>
                            <li>-Suba el archivo completado utilizando el componente de carga de archivos.</li>
                            <li>-Haga clic en el botón "Importar" para procesar el archivo y actualizar la base de datos.</li>
                        </ul>
                    </Alert>
                    <Row className="mb-3" xs={12}>
                        <Col>
                            <Button
                                variant="success"
                                disabled={selectedOption == ''}
                                onClick={onDownloadTemplate}
                            >
                                Descargar template
                            </Button>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Select
                                placeholder="Seleccionar"
                                options={[
                                    { value: '1', label: 'Importación' },
                                    { value: '2', label: 'Modificación' },
                                ]}
                                onChange={(option: any) => setSelectedOption(option.value)}
                                isClearable
                            />
                        </Col>
                    </Row>
                    <Row className="m-2" xs={12} hidden={selectedOption == ''}>
                        <Alert variant="warning">
                            {
                                selectedOption == "2" ? <>
                                    Atención : Esta opción solo modifica precio de costo y precio de venta según el SKU del artículo.
                                </> : <>
                                    Atención : Esta opción agrega nuevos artículos. Asegúrese de eliminar los datos del excel.
                                </>
                            }
                        </Alert>
                    </Row>

                    <Row className="mb-3 m-2" xs={12} hidden={selectedOption == ''}>
                        <FileUploadComponent
                            handleFileUploaded={handleUpload}
                        />
                    </Row>
                    <Button onClick={handleImportar} disabled={!file}>Importar</Button>
                </Container>
            )}
        </>
    );
}

export default ImportarArticulos;