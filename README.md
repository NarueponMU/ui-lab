# ui-lab

6787045_Naruepon Santipapchai

Automated UI testing lab (ITDS362). The tests run the test case QP-01 on
[QuickPizza](https://quickpizza.grafana.com) and fill in the
[Selenium web form](https://www.selenium.dev/selenium/web/web-form.html).

Tool parts that I chose: **Part 1 Selenium IDE** and **Part 4 Cypress**.
The results and the answers of Part B are in [RESULTS.md](RESULTS.md).

## selenium-ide (Part 1)

`ui-lab.side` is the Selenium IDE project with two tests, `web form` and `QP-01 customer`
(29 commands). `QP01customerTest.java` is the QP-01 test exported as Java JUnit, kept to show
what an export needs rewritten; it is not meant to be run.

Run both tests with Chrome (needs Node.js 22 or later, and the variable `CHROMEDRIVER` set to a
ChromeDriver that matches the Chrome version):

```
cd selenium-ide
export PATH="$(dirname "$CHROMEDRIVER"):$PATH"
npx --yes selenium-side-runner@4.0.13 ui-lab.side
```

## cypress (Part 4)

A Cypress 16.2.1 project. `cypress/e2e` holds the specs `web-form.cy.js` and
`pizza-scenario.cy.js` (QP-01), `cypress/support/commands.js` holds the custom command
`adminLogin`, and `cypress/videos` and `cypress/screenshots` hold the evidence of the second run.

Run all specs in Chrome (run `npm install` once first):

```
cd cypress
npx cypress run --browser chrome
```