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
   - Step 4.9 (optional), browser and result: Firefox 159, all specs passed (2 of 2 tests), 00:13, Lab Pizza 20261110-205446. QP-01 took 11 seconds in Firefox against 8 seconds in Chrome, with no change to the specs.

## Part B

1. **โจทย์:** ทำไมเทสต์หาช่อง Max Calories per Slice ผ่าน label แทนการใช้ id ให้เสนอการแก้หน้าเว็บที่ทำให้เทสต์ใช้ id ได้ และบอกว่าการแก้นั้นช่วย tester อย่างไร

   **คำตอบ:** ช่อง Max Calories per Slice ใช้ id `floating_filled` ซ้ำกับช่อง Min และ Max Number of Toppings ตอน Step 0.4 พิมพ์ `$$("#floating_filled").length` ใน Console ได้ `3` แปลว่า id นี้ชี้ไปที่ element เดียวไม่ได้ ตอนอัดใน Selenium IDE (Step 1.6) recorder บันทึกเป็น `type id=floating_filled` ซึ่งจะพิมพ์ลงช่องแรกที่เจอ ตอนนี้บังเอิญเป็นช่องแคลอรี่ แต่ถ้ามีการสลับลำดับช่อง เทสต์จะพิมพ์ผิดช่องโดยไม่มี error เลย จึงต้องหาผ่าน label เพราะข้อความ `Max Calories per Slice` มีอยู่ที่เดียว (XPath `//label[...]/../input` ใน Selenium IDE และ `cy.contains('label', ...).siblings('input')` ใน Cypress) ผมเสนอให้ทีมพัฒนาตั้ง id ที่ไม่ซ้ำให้แต่ละช่อง เช่น `id="max-calories"` หรือเพิ่ม `data-testid="max-calories"` วิธีนี้ทำให้ locator สั้นเหลือแค่ `#max-calories` ไม่ต้องพึ่งโครงสร้าง HTML ระหว่าง label กับ input และไม่พังเมื่อมีการแก้ข้อความ label หรือแปลหน้าเว็บเป็นภาษาอื่น

2. **โจทย์:** Step 7 ของ QP-01 เทียบ tool ในรายการ admin กับ tool ในคำแนะนำ check นี้เป็น test oracle แบบไหน และยกตัวอย่าง fault ใน QuickPizza ที่ check นี้จับได้ 1 อย่าง

   **คำตอบ:** check นี้เป็น **consistency oracle** คือเทียบข้อมูลสองส่วนของระบบเดียวกันว่าตรงกัน โดยไม่ต้องรู้ค่าที่ถูกต้องไว้ก่อน ข้อนี้สำคัญเพราะ QuickPizza สุ่ม tool ใหม่ทุกครั้ง ในรอบของผม `Lab Pizza 20261110-192231` หน้าคำแนะนำแสดง `Tool: Pizza cutter` ซึ่งตรงกับ response ของ `POST /api/pizza` และรายการ admin ก็แสดง `(tool=Pizza cutter, ingredients_number=8)` เทสต์จึงผ่าน fault ที่ check นี้จับได้ เช่น server บันทึกพิซซ่าลงฐานข้อมูลด้วย tool คนละตัวกับที่ส่งให้ลูกค้า (เช่น สุ่ม tool ใหม่ตอนบันทึก หรือบันทึก Knife ที่ลูกค้าห้ามไว้) หน้าลูกค้าจะยังดูถูกต้อง แต่รายการ admin จะไม่ตรง แล้ว Step 7 จะ fail อีกเรื่องที่เห็นจากรอบนี้คือ บรรทัดบนสุดของรายการเป็น `The Grey Funghi (tool=Knife...)` ของผู้ใช้อื่น ถ้าเทสต์ดูแค่บรรทัดบนสุดก็จะเทียบผิดพิซซ่า เทสต์จึงต้องค้นหาจากชื่อพิซซ่าในทั้งรายการ

3. **โจทย์:** QP-01 ไม่เคยเช็กว่าพิซซ่าเป็นมังสวิรัติจริง ให้เสนอ check ที่เช็กเรื่องนี้ และบอกว่าเทสต์ต้องใช้อะไรจากหน้าเว็บหรือจากแหล่งอื่น

   **คำตอบ:** หน้าเว็บแสดงแค่ชื่อวัตถุดิบ เช่น รอบที่ 2 ของ Step 4.8 ได้ Mozzarella, Kalamata olives, Spinach, Extra virgin olive oil และ San Marzano tomatoes แต่ไม่บอกว่าแต่ละอย่างเป็นมังสวิรัติหรือไม่ เทสต์จึงตัดสินจากหน้าเว็บอย่างเดียวไม่ได้ ผมเสนอให้ดึงรายการวัตถุดิบจาก `#recommendations li` แล้วเช็กว่าไม่มีตัวไหนอยู่ในรายการวัตถุดิบที่ไม่ใช่มังสวิรัติ (เช่น เนื้อสัตว์และอาหารทะเล) ซึ่งต้องได้มาจาก**แหล่งนอกหน้าเว็บ** เช่น spec ของระบบหรือ test data ที่ทีมเตรียมไว้ อีกทางที่ทำได้เร็วใน Cypress คือใช้ `cy.intercept` ที่มีอยู่แล้ว แล้วเช็ก `expect(response.body.vegetarian).to.equal(true)` เพราะ response ของ `/api/pizza` มี field `vegetarian` อยู่ แต่วิธีนี้อ่อนกว่า เพราะเป็นการให้ server ตรวจตัวเอง ถ้า server คำนวณ flag ผิด ทั้ง flag และวัตถุดิบก็ผิดไปพร้อมกัน รายการวัตถุดิบที่เป็นอิสระจาก server จึงเป็น oracle ที่ดีกว่า

4. **โจทย์:** เปรียบเทียบ 2 เครื่องมือที่ใช้: แต่ละตัวรอ QuickPizza อย่างไร เขียน QP-01 ได้เร็วแค่ไหน และ report, log หรือ video อ่านง่ายแค่ไหน

   **คำตอบ:** Selenium IDE ไม่ใส่ wait ให้เลยตอนอัด ผมต้องเพิ่ม `wait for element visible` และ `wait for element present` เองจนครบ ตารางเปลี่ยนจาก 16 แถวที่อัดได้เป็น 29 แถว (แก้ 5 ลบ 8 เพิ่ม 21) การแก้ในช่องเล็ก ๆ ของ GUI ผิดพลาดง่าย ครั้งหนึ่งมี Tab ติดหน้า `pizzaName` ทำให้ log ขึ้น `info: echo: ${pizzaName}` แต่เทสต์ยังผ่าน และตอนหน้าต่างเล็กแค่ 550x691 ก็เกิด `element click intercepted` จนเทสต์ใช้เวลา 20 วินาที report มีแค่ข้อความใน terminal เช่น `Actual value 'Received!' did not match 'Received'` และ `Tests: 2 passed, 2 total` ไม่มีรูปหรือวิดีโอ จึงต้อง `grep` ไฟล์ .side เพื่อหาสาเหตุเอง ส่วน Cypress ลอง `cy.get` และ `should` ซ้ำเองจนถึง `defaultCommandTimeout` 10 วินาที wait เดียวที่ต้องเขียนเองคือ `cy.wait('@pizza')` สำหรับรอ API ผมเขียน QP-01 เป็นโค้ดประมาณ 80 บรรทัดทีละขั้น และทุกขั้นผ่านตั้งแต่รันครั้งแรก report ของ Cypress อ่านง่ายที่สุด มีทั้ง diff `-'Web form' +'Web Form'`, Command Log ที่คลิกย้อนดู DOM snapshot ได้ (ผมใช้หาค่า `Calories per slice: 525`), screenshot 3 รูป และวิดีโอ .mp4 ของแต่ละ spec

5. **โจทย์:** เลือกเครื่องมือที่จะใช้ทำ automated UI test ใน Project 2 แล้วให้เหตุผลจากแล็บนี้ 2 ข้อ

   **คำตอบ:** ผมเลือก Cypress เหตุผลแรกคือ Cypress รอให้เองและดักฟัง network ได้ QP-01 ใน Cypress แทบไม่ต้องเขียน wait และยังเทียบหน้าเว็บกับ response จริงของ `POST /api/pizza` ได้ (tool Pizza cutter, calories 525) ขณะที่ Selenium IDE ต้องใส่ wait เองทุกจุดและต้องแก้ทีละแถวหลายรอบ เหตุผลที่สองคือหลักฐานและการ debug ใน Step 4.8 ได้วิดีโอและ screenshot มาให้เองทั้ง 2 รอบ (00:11 ทั้งสองรอบ) Step 4.9 รันบน Firefox 159 ผ่านโดยไม่ต้องแก้ spec (00:13) และไม่ต้องคอยโหลด ChromeDriver ให้ตรงกับ Chrome 157 กับตั้ง PATH ใหม่ทุกครั้งที่เปิด terminal แบบ Selenium IDE ข้อเสียของ Cypress คือต้องเขียน JavaScript เป็น จึงต้องตกลงกับสมาชิกกลุ่มให้ทุกคนพร้อม

6. **โจทย์ (Part 1):** ทำไม target ที่ recorder เลือกให้ปุ่ม Submit ถึงเปราะบาง และทำไม target ที่ใช้แทนถึงเสถียรกว่า

   **คำตอบ:** recorder เลือก `css=.btn` ซึ่งเป็น class ของ Bootstrap ที่ใช้กำหนด**หน้าตา**ของปุ่ม ไม่ได้บอกว่าปุ่มนั้น**ทำหน้าที่อะไร** ปุ่มทุกปุ่มในหน้าใช้ class นี้ได้ และ Selenium จะคลิกตัวแรกที่เจอ ตอนนี้หน้า web form มีปุ่มเดียวเลยยังผ่าน แต่ถ้าวันหนึ่งมีปุ่ม Reset ที่ใช้ class `btn` อยู่ก่อน Submit เทสต์จะคลิกผิดปุ่มโดยไม่มี error ตรงจุดนั้น หรือถ้าดีไซเนอร์เปลี่ยน class ก็จะหาปุ่มไม่เจอ `xpath=//button[@type='submit']` ใช้ attribute `type` ที่กำหนดหน้าที่ส่งฟอร์ม ซึ่งฟอร์มหนึ่งมักมีปุ่มแบบนี้ปุ่มเดียว และ attribute นี้ไม่เปลี่ยนตามการแต่งหน้าตา จึงเสถียรกว่า ส่วน error `element click intercepted` ที่เจอใน Step 1.3 เป็นปัญหาจากหน้าต่างที่แคบเกินไป ไม่ได้เกิดจาก target ซึ่งแสดงให้เห็นว่าเทสต์อาจพังได้ด้วยเหตุผลที่ไม่เกี่ยวกับ locator เลย

7. **โจทย์ (Part 4):** ทำไม QP-01 ต้องเป็นเทสต์เดียวใน Cypress ซึ่งล้าง cookie ก่อนทุกเทสต์ และจะเกิดอะไรขึ้นถ้าแยกขั้น 6 และ 7 ไปเป็นเทสต์ที่สอง

   **คำตอบ:** QuickPizza มีหลายเซิร์ฟเวอร์ และใช้ cookie ผูกเบราว์เซอร์ไว้กับเซิร์ฟเวอร์เดียว รายการ admin จะแสดงเฉพาะพิซซ่าของเซิร์ฟเวอร์นั้น Cypress เปิดใช้ test isolation ซึ่งล้าง cookie และ storage แล้วเริ่มหน้าว่างใหม่ก่อนทุกเทสต์ ถ้าแยกขั้น 6 และ 7 ไปเป็นเทสต์ที่สอง cookie จะหายไป เบราว์เซอร์อาจถูกส่งไปเซิร์ฟเวอร์อื่น แล้ว Step 7 จะ fail ด้วย `Timed out` ทั้งที่แอปทำงานถูก และจะ fail แค่บางรอบตามว่าได้เซิร์ฟเวอร์ไหน กลายเป็น flaky test ที่หาสาเหตุยาก นอกจากนี้ตัวแปร `pizzaName` และ alias `@tool` อยู่ภายในเทสต์เดียว Cypress ล้าง alias ก่อนทุกเทสต์ เทสต์ที่สองจึงไม่รู้ชื่อพิซซ่าและเรียก `cy.get('@tool')` ไม่ได้ ถ้าแก้ด้วยการเก็บค่าไว้นอกเทสต์ ก็จะทำให้เทสต์ต้องรันตามลำดับเท่านั้น ซึ่งไม่ควรทำ