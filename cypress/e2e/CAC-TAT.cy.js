import { faker } from '@faker-js/faker';


describe('Central de Atendimento ao Cliente TAT', () => {

  const user = {};

  beforeEach(() => {
    cy.visit('./src/index.html');
    
    user.nome = faker.person.firstName();
    user.sobrenome = faker.person.lastName();
    user.email = faker.internet.email({firstName: user.nome});
    user.textoAjuda = faker.lorem.text();
    user.telefone = faker.number.int({ min: 11111111111, max: 99999999999, multipleOf: 13 });

  });

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.fillMandatoryFields(user);
    cy.ClickSubmit('sucesso');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    user.email = 'meuemail'
    cy.fillMandatoryFields(user);
    cy.ClickSubmit('falha');
  });

  it('verifica validação do campo telefone', () => {
    user.telefone = faker.string.alpha(11);
    cy.fillOthersFields(user);
    cy.ClickSubmit('falha');
  });

  it('valida obrigatoriedade do telefone', () =>{
    user.telefone = ' ';
    cy.fillOthersFields(user);
    cy.ClickSubmit('falha');  
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.fillOthersFields(user);

    cy.get('#firstName')
      .clear()
      .should('have.value', '');

    cy.get('[name="lastName"]')
      .clear()
      .should('have.value', '');

    cy.get('#email')
      .clear()
      .should('have.value', '');

    cy.get('#phone')
      .clear()
      .should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.ClickSubmit('falha');  
  });

  it('envia o formuário com sucesso usando um comando customizado', () =>{
    cy.fillMandatoryFields(user, 'sucesso');
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    const nome = 'youtube';
    cy.selecionaProduto(nome)
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    const nome = 'mentoria';
    cy.selecionaProduto(nome)
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    const nome = 'blog';
    cy.selecionaProduto(nome)
  });



});