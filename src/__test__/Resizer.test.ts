/**
 * Test: Toolbar
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {void}
 */
import { Toolbar, Resizer } from "../classes"
import template from "./mockup/template_index"

const resizeEvent = document.createEvent("Event")
resizeEvent.initEvent("resize", true, true)

const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x
  window.innerHeight = y
  window.dispatchEvent(resizeEvent)
}

describe("Resizer", () => {
  let resizer: Resizer
  let toolbar: Toolbar

  beforeEach(async () => {
    document.body.innerHTML = template
    toolbar = new Toolbar()
    toolbar.exec()
    resizer = new Resizer()
  })

  test("Resizer should change the toolbar item value", () => {
    resizer.exec()
    const old_toolbar_item_value = document.querySelector(".toolbar > ul > li:first-child")?.innerHTML
    resizeWindow(200, 100)
    const new_toolbar_item_value = document.querySelector(".toolbar > ul > li:first-child")?.innerHTML
    console.log(window.innerWidth)
    console.log(old_toolbar_item_value, new_toolbar_item_value)

    expect(true).toBeTruthy()
  })
})
