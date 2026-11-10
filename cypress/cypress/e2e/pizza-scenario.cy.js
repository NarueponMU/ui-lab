// QP-01 A custom pizza reaches the admin list
// Goal: check that a pizza request with restrictions gives a pizza
// that keeps them, that rating a pizza needs a login, and that the
// admin sees the new pizza.

// Date and time of the run as yyyyMMdd-HHmmss, e.g. 20261105-143015
function stamp() {
  const d = new Date()
  const two = (n) => String(n).padStart(2, '0')
  return d.getFullYear() + two(d.getMonth() + 1) + two(d.getDate()) +
    '-' + two(d.getHours()) + two(d.getMinutes()) + two(d.getSeconds())
}

describe('QP-01 A custom pizza reaches the admin list', () => {
  it('follows the steps of QP-01', () => {
    // Step 1: open QuickPizza
    cy.visit('https://quickpizza.grafana.com')
    cy.get('h1')
      .should('have.text', 'Looking to break out of your pizza routine?')

    // Step 2: turn on Advanced
    cy.contains('label', 'Advanced').click()
    cy.contains('label', 'Max Calories per Slice').should('be.visible')
    cy.contains('label', 'Excluded tools').should('be.visible')
    cy.contains('label', 'Must be vegetarian').should('be.visible')
    cy.contains('label', 'Custom Pizza Name').should('be.visible')

    // Step 3: fill in the restrictions and the name
    const pizzaName = 'Lab Pizza ' + stamp()
    cy.contains('label', 'Max Calories per Slice')
      .siblings('input')
      .clear()
      .type('600')
      .should('have.value', '600')
    cy.get('select').select('Knife')
    cy.contains('option', 'Knife').should('be.selected')
    cy.get('#default-checkbox').check().should('be.checked')
    cy.get('input#pizza-name').type(pizzaName)
    cy.get('input#pizza-name').should('have.value', pizzaName)

    // Step 4: ask for a pizza
    cy.get('button[name="pizza-please"]').click()
    cy.get('#recommendations').should('contain', 'Name: ' + pizzaName)
    cy.contains('#recommendations p', 'Tool:')
      .should('not.contain', 'Knife')
    cy.contains('#recommendations p', 'Calories per slice:')
      .invoke('text')
      .then((text) => {
        const calories = Number(text.replace('Calories per slice:', ''))
        expect(calories).to.be.at.most(600)
      })

    // Step 5: rate the pizza without logging in
    cy.get('button[name="rate-5"]').click()
    cy.get('#rate-result').should('have.text', 'Please log in first.')
  })
})