Cypress.Commands.add('fillMandatoryFields', (user) => {
    cy.get('#firstName')
      .as('campoNome')
      .should('be.visible')
      .type(user.nome);
    cy.get('@campoNome')
      .should('have.value', user.nome);

    cy.get('[name="lastName"]')
      .as('campoSobrenome')
      .should('be.visible')
      .type(user.sobrenome);
    cy.get('@campoSobrenome')
      .should('have.value', user.sobrenome);

    cy.get('#email')
      .as('campoEmail')
      .should('be.visible')
      .type(user.email);
    cy.get('@campoEmail')
      .should('have.value', user.email);

    cy.get('#open-text-area')
      .as('campoFeedback')
      .should('be.visible')
      .type(user.textoAjuda, {delay: 0});
    cy.get('@campoFeedback')
      .should('have.value', user.textoAjuda);

});

Cypress.Commands.add('ClickSubmit', resultado => {
    cy.get('button[type="submit"]')
        .click();
  
  if(resultado == 'sucesso'){
      cy.get('span[class="success"]')
          .should('be.visible', 'Mensagem enviada com sucesso.');
  } else if(resultado == 'falha'){
      cy.get('span[class="error"]')
          .should('be.visible', 'Valide os campos obrigatórios!');
  }

});

Cypress.Commands.add('fillOthersFields', (user) => {
  
    cy.get('#phone-checkbox')
        .as('checkBoxTelefone')
        .click();

    cy.get('#phone')
        .as('campoTelefone')
        .should('be.visible')
        .type(user.telefone);
        
    cy.get('@campoTelefone')
        .should('be.empty');

    cy.fillMandatoryFields(user);
});

Cypress.Commands.add('adicionando telefone', (user) => {
  cy.fillMandatoryFields(user);


});

Cypress.Commands.add('selecionaProduto', (nome) => {
  cy.get('select').select(nome)
    .as('campoProduto');
  cy.get('@campoProduto')
    .should('have.value', nome);

});