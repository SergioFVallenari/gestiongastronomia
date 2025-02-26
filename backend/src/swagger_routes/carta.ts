export default {
    insertCarta: {
        post: {
            tags: ['Carta'],
            summary: 'Insertar carta',
            description: 'Inserta una carta en la base de datos',
            security: [
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
                                descripcion: {
                                    type: 'string'
                                },
                                sku: {
                                    type: 'string'
                                },
                                categoria: {
                                    type: 'string'
                                },
                                ingredientes: {
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
                                            sku: {
                                                type: 'string'
                                            },
                                            valor_modulo: {
                                                type: 'string'
                                            },
                                            cantidad: {
                                                type: 'number'
                                            }
                                        }
                                    }
                                },
                                ganancia: {
                                    type: 'number'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Carta creada',
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
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Error al crear la carta',
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
                                        type: 'null'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    getCartas: {
        get: {
            tags: ['Carta'],
            summary: 'Obtiene todas las cartas',
            description: 'Obtiene todas las cartas de la base de datos',
            security: [
                {
                    bearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: 'Cartas obtenidas',
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
                                                descripcion: {
                                                    type: 'string'
                                                },
                                                sku: {
                                                    type: 'string'
                                                },
                                                categoria: {
                                                    type: 'string'
                                                },
                                                ingredientes: {
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
                                                            sku: {
                                                                type: 'string'
                                                            },
                                                            valor_modulo: {
                                                                type: 'string'
                                                            },
                                                            cantidad: {
                                                                type: 'number'
                                                            }
                                                        }
                                                    }
                                                },
                                                ganancia: {
                                                    type: 'number'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Error al obtener las cartas',
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
                                        type: 'null'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    getCartaById: {
        get: {
            tags: ['Carta'],
            summary: 'Obtiene una carta por id',
            description: 'Obtiene una carta de la base de datos por su id',
            security: [
                {
                    bearerAuth: []
                }
            ],
            parameters: [{
                name: 'id',
                in: 'path',
                required: true,
                schema:
                {
                    type: 'number'
                },
                description: 'Id de la carta'
            }],
            responses: {
                200: {
                    description: 'Carta obtenida',
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
                                            descripcion: {
                                                type: 'string'
                                            },
                                            sku: {
                                                type: 'string'
                                            },
                                            categoria: {
                                                type: 'string'
                                            },
                                            ingredientes: {
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
                                                        sku: {
                                                            type: 'string'
                                                        },
                                                        valor_modulo: {
                                                            type: 'string'
                                                        },
                                                        cantidad: {
                                                            type: 'number'
                                                        }
                                                    }
                                                }
                                            },
                                            ganancia: {
                                                type: 'number'
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
    deleteCarta: {
        delete: {
            tags: ['Carta'],
            summary: 'Borrar carta',
            description: 'Borra una carta de la base de datos',
            security: [
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
                    description: 'Carta borrada',
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
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Error al borrar la carta',
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
                                        type: 'null'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    modificarCarta: {
        put: {
            tags: ['Carta'],
            summary: 'Actualizar carta',
            description: 'Actualiza una carta en la base de datos',
            security: [
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
                                descripcion: {
                                    type: 'string'
                                },
                                sku: {
                                    type: 'string'
                                },
                                categoria: {
                                    type: 'string'
                                },
                                ingredientes: {
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
                                            sku: {
                                                type: 'string'
                                            },
                                            valor_modulo: {
                                                type: 'string'
                                            },
                                            cantidad: {
                                                type: 'number'
                                            }
                                        }
                                    }
                                },
                                ganancia: {
                                    type: 'number'
                                },
                                id_carta: {
                                    type: 'number'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Carta actualizada',
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
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Error al actualizar la carta',
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
                                        type: 'null'
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