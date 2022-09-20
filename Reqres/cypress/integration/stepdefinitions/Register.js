import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I send request to register user successfully', () => {
    var schema = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "id": {
                "type": "integer"
            },
            "token": {
                "type": "string"
            }
        },
        "required": [
            "id",
            "token"
        ],
}
    var body = {
        "email": "eve.holt@reqres.in",
        "password": "pistol"
    }
    cy.postRequest("/api/register", body).then((response)=>{

        expect(response.status).to.be.eqls(200)
        expect(response.body.id).to.be.eqls(4)
        expect(response.body).to.be.jsonSchema(schema)
    })
})

When('I send request to register user unsuccessfully', () => {
    var schema = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "error": {
                "type": "string"
            }
        },
        "required": [
            "error"
        ],
}
    var body = {
        "email": "eve.holt@reqres.in",
    }
    cy.postRequest("/api/register", body).then((response)=>{

        expect(response.status).to.be.eqls(400)
        expect(response.body.error).to.be.eqls("Missing password")
        expect(response.body).to.be.jsonSchema(schema)
    })
})
