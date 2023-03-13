/**
 * Class: Toolbar
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {Toolbar}
 */
export default class {
  private _d: Document

  constructor() {
    this._d = document
  }

  private build_template(children_results: HTMLCollection): string {
    let children_template: string
    let template: string

    children_template = Array.from(children_results)
      .map(
        (item) =>
          `<li data-index=${item.getAttribute("data-index")}>Element #${item.getAttribute(
            "data-index",
          )}: [status: hidden] [dimensions: w:- , h:- ] (Last update: ${new Date().toLocaleString()})</li>`,
      )
      .join("")

    template = `
      <ul>
        ${children_template}
      </ul>
    `

    return template
  }

  exec(): void {
    this._d = document

    const wrapper_results: HTMLDivElement | null = this._d.querySelector(".results")
    const wrapper_toolbar: HTMLDivElement | null = this._d.querySelector(".toolbar")
    let children_results: HTMLCollection    

    if (!wrapper_results) return
    if (!wrapper_toolbar) return

    children_results = wrapper_results.children
    
    if (!children_results.length) return

    wrapper_toolbar.innerHTML = this.build_template(children_results)
  }
}
