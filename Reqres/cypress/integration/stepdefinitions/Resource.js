import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I send request for all Resource', () => {
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
                        "name": {
                            "type": "string"
                        },
                        "year": {
                            "type": "integer"
                        },
                        "color": {
                            "type": "string"
                        },
                        "pantone_value": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "color",
                        "id",
                        "name",
                        "pantone_value",
                        "year"
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
        ]
    }
    cy.getRequest("/api/unknown").then((response)=>{
        expect(response.status).to.be.eqls(200)
        expect(response.body.page).to.be.eqls(1)
        expect(response.body.per_page).to.be.eqls(6)
        expect(response.body.total_pages).to.be.eqls(Math.ceil(response.body.total/response.body.per_page))
        expect(response.body).to.be.jsonSchema(schema)
        expect(response.body.support.url).to.be.eqls("https://reqres.in/#support-heading")
        expect(response.body.support.text).to.be.eqls("To keep ReqRes free, contributions towards server costs are appreciated!")
    })
})

When('I send request for a single Resource', () => {
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
                    "name": {
                        "type": "string"
                    },
                    "year": {
                        "type": "integer"
                    },
                    "color": {
                        "type": "string"
                    },
                    "pantone_value": {
                        "type": "string"
                    }
                },
                "required": [
                    "color",
                    "id",
                    "name",
                    "pantone_value",
                    "year"
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
    
    cy.getRequest("/api/unknown/2").then((response)=>{
        expect(response.status).to.be.eqls(200)
        expect(response.body.data.id).to.be.eqls(2)
        expect(response.body.data.name).to.be.eqls("fuchsia rose")
        expect(response.body.data.year).to.be.eqls(2001)
        expect(response.body.data.color).to.be.eqls( "#C74375")
        expect(response.body.data.pantone_value).to.be.eqls("17-2031")
        expect(response.body).to.be.jsonSchema(schema)
        expect(response.body.support.url).to.be.eqls("https://reqres.in/#support-heading")
        expect(response.body.support.text).to.be.eqls("To keep ReqRes free, contributions towards server costs are appreciated!")
    })
})

When('I send request for a non-existing Resource', () => {
    var schema = {
        "type": "object",
        "additionalProperties": false,
    }
    
    
    cy.getRequest("/api/unknown/23").then((response)=>{
        expect(response.status).to.be.eqls(404)
        expect(response.body).to.be.jsonSchema(schema)
    })
})