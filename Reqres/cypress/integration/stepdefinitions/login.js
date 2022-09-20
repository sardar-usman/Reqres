import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I send request to login user successfully', () => {
    var schema = {
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "token": {
                "type": "string"
            }
        },
        "required": [
            "token"
        ],
}
    var body = {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    }
    cy.postRequest("/api/login", body).then((response)=>{
        console.log(response.body)
        expect(response.status).to.be.eqls(200)
        expect(response.body).to.be.jsonSchema(schema)
    })
})

When('I send request to login user unsuccessfully', () => {
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
    cy.postRequest("/api/login", body).then((response)=>{

        expect(response.status).to.be.eqls(400)
        expect(response.body.error).to.be.eqls("Missing password")
        expect(response.body).to.be.jsonSchema(schema)
    })
})
