export default {
    altaArticulos: {
        post: {
            tags: ['Articulos'],
            summary: 'Crear un nuevo articulo',
            security: [  // ⬅️ Aplica el esquema de seguridad
                {
                    bearerAuth: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nombre: {
                                    type: 'string'
                                },
                                precio_costo: {
                                    type: 'number'
                                },
                                precio_venta: {
                                    type: 'number'
                                },
                                categoria_articulo: {
                                    type: 'number'
                                },
                                cantidad: {
                                    type: 'number'
                                },
                                sku: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    "description": "Articulo creado",
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    info: {
                                        type: 'boolean'
                                    },
                                    msg: {
                                        type: 'string'
                                    },
                                    response: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'number'
                                                },
                                                nombre: {
                                                    type: 'string'
                                                },
                                                precio_costo: {
                                                    type: 'number'
                                                },
                                                precio_venta: {
                                                    type: 'number'
                                                },
                                                categoria_articulo: {
                                                    type: 'number'
                                                },
                                                cantidad: {
                                                    type: 'number'
                                                },
                                                sku: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    getArticuloById: {
        get: {
            tags: ['Articulos'],
            summary: 'Obtener un articulo por su ID',
            security: [  // ⬅️
                {
                    bearerAuth: []
                }
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'number'
                    },
                    description: 'ID del articulo'
                }
            ],
            responses: {
                200: {
                    "description": "Detalle del articulo",
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    info: {
                                        type: 'boolean'
                                    },
                                    msg: {
                                        type: 'string'
                                    },
                                    response: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'number'
                                                },
                                                nombre: {
                                                    type: 'string'
                                                },
                                                precio_costo: {
                                                    type: 'number'
                                                },
                                                precio_venta: {
                                                    type: 'number'
                                                },
                                                categoria_articulo: {
                                                    type: 'number'
                                                },
                                                cantidad: {
                                                    type: 'number'
                                                },
                                                sku: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    getArticulos: {
        post: {
            tags: ['Articulos'],
            summary: 'Obtener todos los articulos',
            security: [  // ⬅️
                {
                    bearerAuth: []
                }
            ],
            responses: {
                200: {
                    "description": "Detalle del articulo",
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    info: {
                                        type: 'boolean'
                                    },
                                    msg: {
                                        type: 'string'
                                    },
                                    response: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'number'
                                                },
                                                nombre: {
                                                    type: 'string'
                                                },
                                                precio_costo: {
                                                    type: 'number'
                                                },
                                                precio_venta: {
                                                    type: 'number'
                                                },
                                                categoria_articulo: {
                                                    type: 'number'
                                                },
                                                cantidad: {
                                                    type: 'number'
                                                },
                                                sku: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    bajaArticulos: {
        delete: {
            tags: ['Articulos'],
            summary: 'Da de baja un articulo',
            security: [  // ⬅️
                {
                    bearerAuth: []
                }
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'number'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    "description": "Detalle del articulo",
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    info: {
                                        type: 'boolean'
                                    },
                                    msg: {
                                        type: 'string'
                                    },
                                    content: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                info: {
                                                    type: 'integer',
                                                    example: 1
                                                },
                                                msg: {
                                                    type: 'string',
                                                    example: "Registro eliminado con éxito."
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
  "modificarArticulo": {
    "put": {
      "tags": ["Articulos"],
      "summary": "Modificar un articulo",
      "security": [
        {
          "bearerAuth": []
        }
      ],
      "parameters": [
        {
          "name": "id",
          "in": "path",
          "required": true,
          "schema": {
            "type": "number"
          },
          "description": "ID del articulo"
        }
      ],
      "requestBody": {
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "nombre": {
                  "type": "string"
                },
                "precio_costo": {
                  "type": "number"
                },
                "precio_venta": {
                  "type": "number"
                },
                "categoria_articulo": {
                  "type": "number"
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Articulo modificado",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "info": {
                    "type": "boolean"
                  },
                  "msg": {
                    "type": "string"
                  },
                  content: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            info: {
                                type: 'integer',
                                example: 1
                            },
                            msg: {
                                type: 'string',
                                example: "Registro actualizado con éxito."
                            }
                        }
                    }
                
                  }
                }
              }
            }
          }
        }
      }
    }
  }

}


