import swaggerJSDoc from 'swagger-jsdoc';
import swagerUi from 'swagger-ui-express';
import path from 'path';
import articulos from '../swagger_routes/articulos';
const {altaArticulos, getArticuloById, getArticulos, bajaArticulos, modificarArticulo} = articulos
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
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        paths:{
            "/articulos/alta_articulos":altaArticulos,
            "/articulos/get_articulos":getArticulos,
            "/articulos/get_articulo/{id}":getArticuloById,
            "/articulos/baja_articulos":bajaArticulos,
            "/articulos/modificar_articulo/{id}":modificarArticulo
        }
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