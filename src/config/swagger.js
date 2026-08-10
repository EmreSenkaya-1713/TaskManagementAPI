const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "Node.js, Express ve MSSQL ile geliştirilmiş görev yönetim API'si."
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ],

        tags: [
            {
                name: "Auth",
                description: "Kullanıcı kayıt ve giriş işlemleri"
            },
            {
                name: "Tasks",
                description: "Görev yönetimi işlemleri"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },

            schemas: {
                Register: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Emre"
                        },
                        email: {
                            type: "string",
                            example: "emre@example.com"
                        },
                        password: {
                            type: "string",
                            example: "123456"
                        }
                    }
                },

                Login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "emre@example.com"
                        },
                        password: {
                            type: "string",
                            example: "123456"
                        }
                    }
                },

                Task: {
                    type: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            type: "string",
                            example: "Node.js öğren"
                        },
                        description: {
                            type: "string",
                            example: "Task Management API projesini tamamla"
                        },
                        completed: {
                            type: "boolean",
                            example: false
                        },
                        priority: {
                            type: "string",
                            enum: ["Low", "Medium", "High"],
                            example: "High"
                        },
                        dueDate: {
                            type: "string",
                            format: "date",
                            example: "2026-08-20"
                        }
                    }
                }
            }
        },

        paths: {
            "/api/auth/register": {
                post: {
                    tags: ["Auth"],
                    summary: "Yeni kullanıcı oluştur",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Register"
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Kullanıcı oluşturuldu"
                        },
                        400: {
                            description: "Geçersiz bilgiler"
                        }
                    }
                }
            },

            "/api/auth/login": {
                post: {
                    tags: ["Auth"],
                    summary: "Kullanıcı girişi yap",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Login"
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Giriş başarılı"
                        },
                        401: {
                            description: "E-posta veya şifre hatalı"
                        }
                    }
                }
            },

            "/api/tasks": {
                get: {
                    tags: ["Tasks"],
                    summary: "Kullanıcının görevlerini getir",
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    responses: {
                        200: {
                            description: "Görevler getirildi"
                        },
                        401: {
                            description: "Yetkisiz erişim"
                        }
                    }
                },

                post: {
                    tags: ["Tasks"],
                    summary: "Yeni görev oluştur",
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Task"
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Görev oluşturuldu"
                        },
                        400: {
                            description: "Geçersiz görev bilgileri"
                        },
                        401: {
                            description: "Yetkisiz erişim"
                        }
                    }
                }
            },

            "/api/tasks/{id}": {
                get: {
                    tags: ["Tasks"],
                    summary: "ID ile görev getir",
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Görev getirildi"
                        },
                        404: {
                            description: "Görev bulunamadı"
                        }
                    }
                },

                put: {
                    tags: ["Tasks"],
                    summary: "Görevi güncelle",
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Task"
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Görev güncellendi"
                        },
                        404: {
                            description: "Görev bulunamadı"
                        }
                    }
                },

                delete: {
                    tags: ["Tasks"],
                    summary: "Görevi sil",
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "integer"
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Görev silindi"
                        },
                        404: {
                            description: "Görev bulunamadı"
                        }
                    }
                }
            }
        }
    },

    apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;