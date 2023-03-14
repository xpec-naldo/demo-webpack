/**
 * Test: App
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {void}
 */
import "intersection-observer"
import { App } from "../classes"
import template from "./mockup/template_index"

describe("App", () => {
  let app: App
  let textarea: HTMLTextAreaElement | null

  beforeEach(async () => {
    document.body.innerHTML = template
    app = new App()
    textarea = document.querySelector(".input-html-to-insert")
    textarea!.value = "Testing Jest"
  })

  test("Results wrapper should have 3 items on initial render", () => {
    expect(document.querySelectorAll(".results > .results__item").length).toBe(3)
  })

  test("Results wrapper  should have 4 items on insert new text", () => {
    app.exec()
    expect(document.querySelectorAll(".results > .results__item").length).toBe(4)
  })
})
