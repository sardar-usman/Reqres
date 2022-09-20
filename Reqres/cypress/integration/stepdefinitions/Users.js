import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I send request for all users', () => {
    var schema = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "page": {
                "type": "integer"
            },
            "per_page": {
                "type": "integer"
            },
            "total": {
                "type": "integer"
            },
            "total_pages": {
                "type": "integer"
            },
            "data": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "email": {
                            "type": "string"
                        },
                        "first_name": {
                            "type": "string"
                        },
                        "last_name": {
                            "type": "string"
                        },
                        "avatar": {
                            "type": "string",
                            "format": "uri",
                            "qt-uri-protocols": [
                                "https"
                            ],
                            "qt-uri-extensions": [
                                ".jpg"
                            ]
                        }
                    },
                    "required": [
                        "avatar",
                        "email",
                        "first_name",
                        "id",
                        "last_name"
                    ]
                }
            },
            "support": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "url": {
                        "type": "string",
                        "format": "uri",
                        "qt-uri-protocols": [
                            "https"
                        ]
                    },
                    "text": {
                        "type": "string"
                    }
                },
                "required": [
                    "text",
                    "url"
                ]
            }
        },
        "required": [
            "data",
            "page",
            "per_page",
            "support",
            "total",
            "total_pages"
        ],
        "title": "Welcome7"
    }
    
    cy.getRequest("/api/users?page=1").then((response)=>{
        expect(response.status).to.be.eqls(200)
        expect(response.body.page).to.be.eqls(1)
        expect(response.body.per_page).to.be.eqls(6)
        expect(response.body.total_pages).to.be.eqls(Math.ceil(response.body.total/response.body.per_page))
        expect(response.body).to.be.jsonSchema(schema)
        expect(response.body.support.url).to.be.eqls("https://reqres.in/#support-heading")
        expect(response.body.support.text).to.be.eqls("To keep ReqRes free, contributions towards server costs are appreciated!")
    })
})

When('I send request for a single users', () => {
    var schema = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "data": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "email": {
                        "type": "string"
                    },
                    "first_name": {
                        "type": "string"
                    },
                    "last_name": {
                        "type": "string"
                    },
                    "avatar": {
                        "type": "string",
                        "format": "uri",
                        "qt-uri-protocols": [
                            "https"
                        ],
                        "qt-uri-extensions": [
                            ".jpg"
                        ]
                    }
                },
                "required": [
                    "avatar",
                    "email",
                    "first_name",
                    "id",
                    "last_name"
                ]
            },
            "support": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "url": {
                        "type": "string",
                        "format": "uri",
                        "qt-uri-protocols": [
                            "https"
                        ]
                    },
                    "text": {
                        "type": "string"
                    }
                },
                "required": [
                    "text",
                    "url"
                ]
            }
        },
        "required": [
            "data",
            "support"
        ]
    }
    
    cy.getRequest("/api/users/2").then((response)=>{
        expect(response.status).to.be.eqls(200)
        expect(response.body.data.id).to.be.eqls(2)
        expect(response.body.data.email).to.be.eqls("janet.weaver@reqres.in")
        expect(response.body).to.be.jsonSchema(schema)
        expect(response.body.data.first_name).to.be.eqls("Janet")
        expect(response.body.data.last_name).to.be.eqls("Weaver")
        expect(response.body.data.avatar).to.be.eqls("https://reqres.in/img/faces/2-image.jpg")
        
        expect(response.body.support.url).to.be.eqls("https://reqres.in/#support-heading")
        expect(response.body.support.text).to.be.eqls("To keep ReqRes free, contributions towards server costs are appreciated!")
    })
})

When('I send request to create user', () => {
   
    var schema = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "name": {
                "type": "string"
            },
            "job": {
                "type": "string"
            },
            "id": {
                "type": "string",
                "format": "integer"
            },
            "createdAt": {
                "type": "string",
                "format": "date-time"
            }
        },
        "required": [
            "createdAt",
            "id",
            "job",
            "name"
        ]
    }
    
    var body = {
        "name": "Muhammad Usman",
        "job": "QA"
    }
    cy.postRequest("/api/users", body).then((response)=>{
        expect(response.status).to.be.eqls(201)
        expect(response.body.name).to.be.eqls("Muhammad Usman")
        expect(response.body.job).to.be.eqls("QA")
        cy.getDate().then((date) => {
            expect(response.body.createdAt.indexOf(date)).to.be.eqls(0)
        })
        expect(response.body).to.be.jsonSchema(schema)
    })
})

When('I send request to update user through put', () => {
   
    var schema = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "name": {
                "type": "string"
            },
            "job": {
                "type": "string"
            },
            "updatedAt": {
                "type": "string",
                "format": "date-time"
            }
        },
        "required": [
            "job",
            "name",
            "updatedAt"
        ],
    }
    
    
    var body = {
        "name": "Muhammad Usman",
        "job": "QA"
    }
    cy.putRequest("/api/users/2", body).then((response)=>{
        expect(response.status).to.be.eqls(200)
        expect(response.body.name).to.be.eqls("Muhammad Usman")
        expect(response.body.job).to.be.eqls("QA")
        cy.getDate().then((date) => {
            expect(response.body.updatedAt.indexOf(date)).to.be.eqls(0)
        })
        expect(response.body).to.be.jsonSchema(schema)
    })
})

When('I send request to update user through patch', () => {
   
    var schema = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "name": {
                "type": "string"
            },
            "job": {
                "type": "string"
            },
            "updatedAt": {
                "type": "string",
                "format": "date-time"
            }
        },
        "required": [
            "job",
            "name",
            "updatedAt"
        ],
    }
    
    
    var body = {
        "name": "Muhammad Usman",
        "job": "QA"
    }
    cy.patchRequest("/api/users/2", body).then((response)=>{
        expect(response.status).to.be.eqls(200)
        expect(response.body.name).to.be.eqls("Muhammad Usman")
        expect(response.body.job).to.be.eqls("QA")
        cy.getDate().then((date) => {
            expect(response.body.updatedAt.indexOf(date)).to.be.eqls(0)
        })
        expect(response.body).to.be.jsonSchema(schema)
    })
})

When('I send request to delete user', () => {
    cy.patchRequest("/api/users/2").then((response)=>{
        expect(response.status).to.be.eqls(204)
    })
})
