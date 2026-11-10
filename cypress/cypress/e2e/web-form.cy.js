   // Goal: fill in every kind of field on Selenium's web form, send
   // the form, and check that the next page says Received!.
   describe('Web form', () => {
     it('fills in the fields and sends the form', () => {
       cy.visit('https://www.selenium.dev/selenium/web/web-form.html')
       cy.title().should('eq', 'Web form')
     })
   })