/**
 * Test: Intersection
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {void}
 */
import "intersection-observer"
import { Intersection, Toolbar } from "../classes"
import template from "./mockup/template_index"

describe("Interseption", () => {
  let intersection: Intersection
  let toolbar: Toolbar

  beforeEach(async () => {
    document.body.innerHTML = template
    toolbar = new Toolbar()
    toolbar.exec()
    intersection = new Intersection()
  })

  test("ResizeObserver is attached to window", () => {
    expect(window.IntersectionObserver).not.toBeUndefined()
  })

  test("InterceptionObserver should be invoked", () => {
    const observe = jest.fn()
    const unobserve = jest.fn()
    const disconnect = jest.fn()
    // @ts-ignore
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
      disconnect,
    }))
    intersection.exec()
    expect(observe).toHaveBeenCalled()
  })
})
