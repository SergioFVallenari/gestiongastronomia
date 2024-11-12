import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { JSONTree } from "react-json-tree";
import api from "../../helpers";

interface FormIngresosProps {
    idIngreso: number;
    disabled: boolean;
}

interface IIngreso {
    fecha: string;
    importe_total: number;
    info: string;
}

const FormIngresos: React.FC<FormIngresosProps> = ({ idIngreso, disabled }) => {
    const [ingreso, setIngreso] = useState<IIngreso>({
        fecha: '',
        importe_total: 0,
        info: '',

    });
    useEffect(() => {
        api.get(`/ingresos/get_ingreso/${idIngreso}`)
            .then(res => {
                setIngreso(res.data.content[0]);
            })
    }, []);

    const theme = {
        scheme: 'monokai',
        base00: '#272822',
        base01: '#383830',
        base02: '#49483e',
        base03: '#75715e',
        base04: '#a59f85',
        base05: '#f8f8f2',
        base06: '#f5f4f1',
        base07: '#f9f8f5',
        base08: '#f92672',
        base09: '#fd971f',
        base0A: '#f4bf75',
        base0B: '#a6e22e',
        base0C: '#a1efe4',
        base0D: '#66d9ef',
        base0E: '#ae81ff',
        base0F: '#cc6633',
    };
    return (
        <Form className='row mt-2 mb-2'>
            <div className='row col-12'>
                <div className="col-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="text" value={ingreso?.fecha} disabled={disabled} />
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="mb-3">
                        <Form.Label>Importe</Form.Label>
                        <Form.Control type="text" value={`$ ${ingreso?.importe_total}`} disabled={disabled} />
                    </Form.Group>
                </div>
                <div className="col-12">
                    <Form.Group className="mb-3">
                        <Form.Label>Detalle</Form.Label>
                        {
                            ingreso?.info && (
                                <JSONTree data={JSON.parse(ingreso?.info)} theme={theme} hideRoot={true} shouldExpandNodeInitially={() => true} />
                            )
                        }
                    </Form.Group>
                </div>

            </div>

        </Form>
    )
};

export default FormIngresos;