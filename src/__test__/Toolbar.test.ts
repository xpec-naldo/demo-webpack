/**
 * Test: Toolbar
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {void}
 */
import { Toolbar } from "../classes"
import template from "./mockup/template_index"

describe("Toolbar", () => {
  let toolbar: Toolbar

  beforeEach(async () => {
    document.body.innerHTML = template
    toolbar = new Toolbar()
  })

  test("Toolbar should be empty during the initial load", () => {
    expect(document.querySelector(".toolbar")?.innerHTML).toBe("")
  })

  test("Toolbar should have three children after App is mounted", () => {
    toolbar.exec()
    expect(document.querySelectorAll(".toolbar > ul > li").length).toBe(3)
  })

  test("Toolbar children should contain data-index attribute", () => {
    toolbar.exec()
    expect(document.querySelector(".toolbar > ul > li:first-child")?.hasAttribute("data-index")).toBeTruthy()
  })

  test("Toolbar should contain current [status] info", () => {
    toolbar.exec()
    expect(document.querySelector(".toolbar > ul > li:first-child")?.innerHTML).toMatch(/status/)
  })

  test("Toolbar should contain current [dimensions] info", () => {
    toolbar.exec()
    expect(document.querySelector(".toolbar > ul > li:first-child")?.innerHTML).toMatch(/dimensions/)
  })

  test("Toolbar should contain current [Last update] info", () => {
    toolbar.exec()
    expect(document.querySelector(".toolbar > ul > li:first-child")?.innerHTML).toMatch(/Last update/)
  })
})
