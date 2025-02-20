import swaggerJSDoc from 'swagger-jsdoc';
import swagerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const filename_ = __filename;
const dirname_ = __dirname;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Don Faustino',
            version: '1.0.0',
            description: 'API para el manejo de la base de datos de Don Faustino'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: [path.join(dirname_, '../routes/*.ts')]
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerDocs = (app:any,port:any) =>{
    app.use('/api-docs', swagerUi.serve, swagerUi.setup(swaggerSpec));
    app.listen(port, () => {
        console.log(`Funcionando en localhost:${port}/swagger`);
    });
}
export default swaggerDocs;