import "./assets/css/index.css"

const callback = (entries: any) => {
  const _target = entries[0].target
  const _index = _target.getAttribute("data-index")
  const _wrapper_toolbar = document.querySelector(`.toolbar > ul > li[data-index="${_index}"]`)

  if (!_wrapper_toolbar) return

  const _last_update = `(Last update: ${new Date().toLocaleString()})`

  if (entries[0].isIntersecting) {
    _wrapper_toolbar.innerHTML = _wrapper_toolbar.innerHTML.replace(/status: hidden/, "status: visible")
  } else {
    _wrapper_toolbar.innerHTML = _wrapper_toolbar.innerHTML.replace(/status: visible/, "status: hidden")
  }

  _wrapper_toolbar.innerHTML = _wrapper_toolbar.innerHTML.replace(/\(Last update: (.*?)\)/, _last_update)
}

const callback_resize = (entries: any) => {
  entries.forEach((entry: any) => {
    const _target = entry.target
    const _index = _target.getAttribute("data-index")
    const _wrapper_toolbar = document.querySelector(`.toolbar > ul > li[data-index="${_index}"]`)
    if (!_wrapper_toolbar) return
    const _last_update = `(Last update: ${new Date().toLocaleString()})`
    const w = parseInt(entry.contentRect.width)
    const h = parseInt(entry.contentRect.height)
    const _text = `[dimensions: w:${w} , h:${h} ]`

    _wrapper_toolbar.innerHTML = _wrapper_toolbar.innerHTML.replace(/\[dimensions: (.*?)\]/, _text)
    _wrapper_toolbar.innerHTML = _wrapper_toolbar.innerHTML.replace(/\(Last update: (.*?)\)/, _last_update)
  })
}

const get_options = () => {
  return {
    root: document.querySelector(".results"),
    threshold: 1.0,
    rootMargin: "0px",
  }
}

const create_visibility = () => {
  const target: any = document.querySelectorAll(".results > .results__item")

  let observer = new IntersectionObserver(callback, get_options())

  target.forEach((item: any) => {
    observer.observe(item)
  })
}

const create_resize = () => {
  const observer = new ResizeObserver(callback_resize)

  const target: any = document.querySelectorAll(".results > .results__item")

  target.forEach((item: any) => {
    observer.observe(item)
  })
}

// childrens: HTMLCollection
const build_toolbar = (props?: any) => {
  const wrapper_results: HTMLDivElement | null = document.querySelector(".results")
  const wrapper_toolbar: HTMLDivElement | null = document.querySelector(".toolbar")

  if (!wrapper_results) return
  if (!wrapper_toolbar) return

  const childrens: HTMLCollection = wrapper_results.children

  const template_childrens = Array.from(childrens)
    .map(
      (item: any, index: number) =>
        `<li data-index=${item.getAttribute("data-index")}>Element #${item.getAttribute(
          "data-index",
        )}: [status: hidden] [dimensions: w:- , h:- ] (Last update: ${new Date().toLocaleString()})</li>`,
    )
    .join("")

  const template = `
    <ul>
      ${template_childrens}
    </ul>
  `
  wrapper_toolbar.innerHTML = template
}

const exec = (props?: any) => {
  const _d = document
  const wrapper_results: HTMLDivElement | null = document.querySelector(".results")
  if (!wrapper_results) return
  const childrens: HTMLCollection = wrapper_results.children

  const input_html_text: HTMLTextAreaElement | null = _d.querySelector(".input-html-to-insert")

  if (!input_html_text) return

  if (!input_html_text.value) return

  const template = `
    <div class="results__item" data-index=${childrens.length + 1}>
      <h5>Element ${childrens.length + 1}</h5>
      ${input_html_text?.value}
    </div>
  `
  wrapper_results.innerHTML = `${template}${wrapper_results.innerHTML}`

  build_toolbar()
  create_visibility()
  create_resize()

  input_html_text.value = ""
}

window.addEventListener("DOMContentLoaded", () => {
  build_toolbar()
  create_visibility()
  create_resize()

  const _form = document.querySelector(".form__add__element")

  _form?.addEventListener("submit", (e: any) => {
    e.preventDefault()
    exec()
  })
})

window.addEventListener("error", function (e) {
  console.error(e.message)
})
