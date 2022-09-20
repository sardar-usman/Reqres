const baseURL = "https://reqres.in"

Cypress.Commands.add('getRequest', (endPoint) => {
    cy.request({
        method: 'GET',
        url : baseURL+endPoint,
        failOnStatusCode: false,
    }). then((response)=>{
       return response;
    })

})

Cypress.Commands.add('postRequest', (endPoint,body) => {
    cy.request({
        method: 'POST',
        url : baseURL+endPoint,
        body : body,
        failOnStatusCode: false,
    }). then((response)=>{
       return response;
    })

})

Cypress.Commands.add('putRequest', (endPoint,body) => {
    cy.request({
        method: 'PUT',
        url : baseURL+endPoint,
        body : body,
        failOnStatusCode: false,
    }). then((response)=>{
       return response;
    })
})

Cypress.Commands.add('patchRequest', (endPoint,body) => {
    cy.request({
        method: 'PATCH',
        url : baseURL+endPoint,
        body : body,
        failOnStatusCode: false,
    }). then((response)=>{
       return response;
    })
})

Cypress.Commands.add('deleteRequest', (endPoint) => {
    cy.request({
        method: 'DELETE',
        url : baseURL+endPoint,
        failOnStatusCode: false,
    }). then((response)=>{
       return response;
    })
})

Cypress.Commands.add('getDate', (endPoint,body) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today.toString()
})
