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
   - Step 1.4, the line of the failed check and the line Tests: "Actual value 'Received!' did not match 'Received' during assertText:id=message:Received" and "Tests: 1 failed, 1 total"

   - Step 1.5, target chosen for Submit, and why the recorded one was fragile: xpath=//button[@type='submit']. The recorded css=.btn uses a style class that other buttons can share, so a new button above Submit would make the test click the wrong one. The type attribute says what the button does.

   - Step 1.6, commands changed, added or deleted after recording:
     - Changed (5): open "/" to the full address https://quickpizza.grafana.com/; click css=.w-9 to xpath=//label[.//span[normalize-space()='Advanced']]; type id=floating_filled to xpath=//label[normalize-space()='Max Calories per Slice']/../input, because the three number boxes share that id; add selection css=.ml-4 to css=select; type id=pizza-name "Lab Pizza test" to css=input#pizza-name with ${pizzaName}, because the answer heading has the same id
     - Deleted (8): set window size, two clicks on id=floating_filled, click css=.mb-2 > .flex:nth-child(2), click id=pizza-name, click css=.mt-4 > .text-center, mouse over and mouse out on name=pizza-please
     - Added (21): 8 waits (rows 2, 5, 6, 7, 8, 12, 21, 28), 9 asserts (rows 3, 16, 17, 18, 19, 22, 23, 26, 29), 2 execute script (rows 9, 25), echo (row 10) and store text (row 24)
     - Note: a first run printed "info: echo: ${pizzaName}" and still passed, because a tab character was pasted before pizzaName in the Value of row 9. The variable was never set, so every step typed and compared the literal text ${pizzaName}. Removing the tab fixed it.

   - Step 1.6, the pizza names of run 1 and run 2, from the lines info: echo: Lab Pizza 20261109-235732

   - Step 1.6, the line Tests: of both runs: Tests: 2 passed, 2 total (both runs)

   - Step 1.7, one line of QP01customerTest.java that needs rewriting, and why:
      - Line 66: `driver.findElement(By.xpath("//label[normalize-space()='Max Calories per Slice']/../input")).sendKeys("600");`
      - Why: The box already holds 1000. This line types 600 without clearing the box first, so the box ends up with 1000600.
      - Fix: Call `clear()` before `sendKeys("600")`.
      - Also wrong: lines 91 and 98 put `vars.get("pizzaName")` inside the quotes, so they compare with that text instead of the pizza name.

   ## Part 4: Cypress
   - node --version, npm --version and npx cypress version: v26.13.0, 11.20.0, Cypress package version 16.2.1 and binary version 16.2.1
   - Step 4.3, failure message for the wrong title: "Timed out retrying after 10000ms", with -'Web form' (actual) and +'Web Form' (expected)
   - Step 4.6, tool and calories in the answer of POST /api/pizza: tool Pizza cutter, calories 525 (pizza Lab Pizza 20261110-192231). The request carried maxCaloriesPerSlice 600.
   - Step 4.7, the line of the admin list that shows your pizza: Lab Pizza 20261110-192231 (tool=Pizza cutter, ingredients_number=8). It was the second line, below a newer pizza of another user.
   - Step 4.8, run 1, result, duration and pizza name: All specs passed (2 of 2 tests), 00:11, Lab Pizza 20261110-204743
   - Step 4.8, run 2, result, duration and pizza name: All specs passed (2 of 2 tests), 00:11, Lab Pizza 20261110-205126
   - Step 4.9 (optional), browser and result:

   ## Part B
   1.
   2.
   3.
   4.
   5.
   6.
   7.