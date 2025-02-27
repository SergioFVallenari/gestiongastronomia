export default {
    uploadFile:{
        post:{
            tags: ['Upload'],
            summary: 'Upload a file',
            description: 'Upload a file to the server',
            security: [
                {
                    bearerAuth: []
                }
            ],
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                file: {
                                    type: 'string',
                                    format: 'binary'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'File uploaded successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string'
                                    },
                                    url: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Error uploading file',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string'
                                    },
                                    error: {
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