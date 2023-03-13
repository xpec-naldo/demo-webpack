/**
 * Root:
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com>
 * @returns {void}
 */
import "./assets/css/index.css"
import { App } from "./classes"

window.addEventListener("DOMContentLoaded", () => {
  const app = new App()
  app.inits()
  app.attach_events(".form__add__element")
})

window.addEventListener("error", function (e) {
  console.error(e.message)
})
