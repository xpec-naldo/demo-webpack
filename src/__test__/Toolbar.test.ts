import { Toolbar } from "../classes"
import template from "./mockup/template_index"

describe("Toolbar", () => {

  beforeAll(() => {
    document.body.innerHTML = template
  })

  test("Toolbar should be empty during the initial load", () => {
    expect(document.querySelector(".toolbar")?.innerHTML).toBe("")
  })
  
  test("Toolbar should have three children after App is mounted", () => {
    const toolbar = new Toolbar()
    const dom_toolbar = document.querySelector(".toolbar")
    const dom_results = document.querySelector(".results")

    toolbar.exec()
    expect(document.querySelectorAll(".toolbar > ul > li").length).toBe(3)
  })

})