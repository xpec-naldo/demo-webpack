/**
 * Class: Resizer
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {Resizer}
 */
import { install } from "resize-observer"

if (!window.ResizeObserver) install()

export default class {
  constructor() {}

  private callback(entries: ResizeObserverEntry[]) {
    entries.forEach((entry: ResizeObserverEntry) => {
      const _target = entry.target
      const _index: string = _target.getAttribute("data-index") || ""
      const wrapper = document.querySelector(`.toolbar > ul > li[data-index="${_index}"]`)

      if (!wrapper) return

      const _last_update = `(Last update: ${new Date().toLocaleString()})`
      const w: number = Math.floor(entry.contentRect.width)
      const h: number = Math.floor(entry.contentRect.height)
      const _text: string = `[dimensions: w:${w.toString()} , h:${h.toString()} ]`

      wrapper.innerHTML = wrapper.innerHTML.replace(/\[dimensions: (.*?)\]/, _text)
      wrapper.innerHTML = wrapper.innerHTML.replace(/\(Last update: (.*?)\)/, _last_update)
    })
  }

  exec(): void {
    const observer: ResizeObserver = new ResizeObserver(this.callback)

    const target: NodeListOf<HTMLElement> = document.querySelectorAll(".results > .results__item")

    Array.from(target).forEach((item: HTMLElement) => {
      observer.observe(item)
    })
  }
}
