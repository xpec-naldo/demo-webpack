/**
 * Class: App
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {App}
 */
import { Intersection, Resizer, Toolbar } from "./"

export default class {
  private _intersection
  private _resizer
  private _toolbar
  private _d: Document

  constructor() {
    this._intersection = new Intersection()
    this._resizer = new Resizer()
    this._toolbar = new Toolbar()
    this._d = document
  }

  inits(): void {
    this._toolbar.exec()
    this._resizer.exec()
    this._intersection.exec()
  }

  private build_template(children_results: HTMLCollection, input_html_text: HTMLTextAreaElement): string {
    let template: string

    template = `
      <div class="results__item" data-index=${children_results.length + 1}>
        <h5>Element ${children_results.length + 1}</h5>
        ${input_html_text?.value}
      </div>
    `
    return template
  }

  exec(): void {
    this._d = document

    const wrapper_results: HTMLDivElement | null = this._d.querySelector(".results")
    let children_results: HTMLCollection | null
    let input_html_text: HTMLTextAreaElement | null

    input_html_text = this._d.querySelector(".input-html-to-insert")

    if (!input_html_text) return
    if (!input_html_text.value) return
    if (!wrapper_results) return

    children_results = wrapper_results.children

    if (!children_results.length) return

    wrapper_results.innerHTML = `${this.build_template(children_results, input_html_text)}${wrapper_results.innerHTML}`
    input_html_text.value = ""
    this.inits()
  }

  attach_events(wrapper: string): void {
    const _form = document.querySelector(wrapper)

    _form?.addEventListener("submit", (e: Event) => {
      e.preventDefault()
      this.exec()
    })
  }
}
