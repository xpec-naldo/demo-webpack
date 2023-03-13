/**
 * Class: Intersection
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {Intersection}
 */
export default class {
  constructor() {}

  private get_options() {
    const options = {
      root: document.querySelector(".results"),
      threshold: 1.0,
      rootMargin: "0px",
    }

    return options
  }

  private callback(entries: IntersectionObserverEntry[]) {
    const _target = entries[0].target
    const entry: IntersectionObserverEntry = entries[0]
    const _index: string | null = _target.getAttribute("data-index")
    const wrapper: HTMLLIElement | null = document.querySelector(`.toolbar > ul > li[data-index="${_index}"]`)
    let _last_update: string

    if (!wrapper) return

    _last_update = `(Last update: ${new Date().toLocaleString()})`

    if (entry.isIntersecting) {
      wrapper.innerHTML = wrapper.innerHTML.replace(/status: hidden/, "status: visible")
    } else {
      wrapper.innerHTML = wrapper.innerHTML.replace(/status: visible/, "status: hidden")
    }

    wrapper.innerHTML = wrapper.innerHTML.replace(/\(Last update: (.*?)\)/, _last_update)
  }

  exec() {
    const target: NodeListOf<HTMLElement> = document.querySelectorAll(".results > .results__item")

    let observer = new IntersectionObserver(this.callback, this.get_options())

    Array.from(target).forEach((item: HTMLElement) => {
      observer.observe(item)
    })
  }
}
