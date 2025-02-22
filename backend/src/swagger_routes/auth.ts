export default {
    login: {
        post: {
            tags: ['Autorización'],
            summary: 'Iniciar sesión',
            description: 'Iniciar sesión con un usuario y contraseña',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                username: {
                                    type: 'string',
                                    description: 'Nombre de usuario'
                                },
                                password: {
                                    type: 'string',
                                    description: 'Contraseña'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Usuario logueado correctamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    info: {
                                        type: 'boolean',
                                        description: 'Indica si el usuario fue logueado correctamente'
                                    },
                                    msg: {
                                        type: 'string',
                                        description: 'Mensaje de respuesta'
                                    },
                                    content: {
                                        type: 'string',
                                        description: 'Token JWT'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Error al loguear usuario',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    info: {
                                        type: 'boolean',
                                        description: 'Indica si ocurrió un error'
                                    },
                                    msg: {
                                        type: 'string',
                                        description: 'Mensaje de respuesta'
                                    },
                                    content: {
                                        type: 'null',
                                        description: 'Contenido de respuesta'
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