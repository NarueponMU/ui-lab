   # UI lab results

   Tool parts that I chose: Part 1 Selenium IDE and Part 4 Cypress

   ## Part 0
   - Step 0.1, Chrome version: 157.0.8103.38 (Official Build) (arm64)
   - Step 0.3, ChromeDriver version: ChromeDriver 157.0.8103.38
   - Step 0.4, locator of Pizza, Please!: button[name='pizza-please']
   - Step 0.4, locator of Excluded tools: select
   - Step 0.4, locator of Must be vegetarian: #default-checkbox
   - Step 0.4, locator of Custom Pizza Name: input#pizza-name (#pizza-name alone finds 2 after the answer appears)
   - Step 0.5, pizza name, tool and calories of the run by hand: LabPizza20261109-2010, Scissors, 425

   | Step | Actual result | Pass or fail |
   |------|---------------|--------------|
   | 1 | The heading reads "Looking to break out of your pizza routine?" | Pass |
   | 2 | Max Calories per Slice, Excluded tools, Must be vegetarian and Custom Pizza Name appeared | Pass |
   | 3 | The fields showed 600, Knife, vegetarian ticked and LabPizza20261109-2010 | Pass |
   | 4 | Name: LabPizza20261109-2010, Tool: Scissors, Calories per slice: 425 | Pass |
   | 5 | The page said "Please log in first." | Pass |
   | 6 | The page showed "Latest pizza recommendations" | Pass |
   | 7 | The list did not show the pizza at first. After Refresh, the 4th line read "LabPizza20261109-2010 (tool=Scissors, ingredients_number=6)", below 3 pizzas of other users | Pass |

   ## Part 1: Selenium IDE
   - Firefox version and Node.js version: Firefox 159.0.1, Node.js v26.13.0
   - Step 1.4, the line of the failed check and the line Tests:
   - Step 1.5, target chosen for Submit, and why the recorded one was fragile:
   - Step 1.6, commands changed, added or deleted after recording:
   - Step 1.6, the pizza names of run 1 and run 2, from the lines info: echo:
   - Step 1.6, the line Tests: of both runs:
   - Step 1.7, one line of QP01customerTest.java that needs rewriting, and why:

   ## Part 4: Cypress
   - node --version, npm --version and npx cypress version:
   - Step 4.3, failure message for the wrong title:
   - Step 4.6, tool and calories in the answer of POST /api/pizza:
   - Step 4.7, the line of the admin list that shows your pizza:
   - Step 4.8, run 1, result, duration and pizza name:
   - Step 4.8, run 2, result, duration and pizza name:
   - Step 4.9 (optional), browser and result:

   ## Part B
   1.
   2.
   3.
   4.
   5.
   6.
   7.