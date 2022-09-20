import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I send request to check DelayedResponce', () => {
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
        ]
    }
    
    cy.getRequest("/api/user?delay=3").then((response)=>{
        console.log(response.body)
        expect(response.status).to.be.eqls(200)
        expect(response.body).to.be.jsonSchema(schema)
    })
})