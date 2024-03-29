/**
 * Test: Resizer
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {void}
 */
import { Toolbar, Resizer } from "../classes"
import template from "./mockup/template_index"

describe("Resizer", () => {
  let resizer: Resizer
  let toolbar: Toolbar

  beforeEach(async () => {
    document.body.innerHTML = template
    toolbar = new Toolbar()
    toolbar.exec()
    resizer = new Resizer()
  })

  test("ResizeObserver is attached to window", () => {
    expect(window.ResizeObserver).not.toBeUndefined()
  })

  test("ResizeObserver should be invoked", () => {
    const observe = jest.fn()
    const unobserve = jest.fn()
    // @ts-ignore
    window.ResizeObserver = jest.fn(() => ({
      observe,
      unobserve,
    }))
    resizer.exec()
    expect(observe).toHaveBeenCalled()
  })
})
