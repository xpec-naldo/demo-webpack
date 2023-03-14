const template = `
<div class="toolbar"></div>
<main class="main">
  <section class="actions">
    <form class="form__add__element">
      <textarea name="input-html-to-insert" class="input-html-to-insert"></textarea>
      <br />
      <input class="event_add_element" type="submit" value="Add Element" />
    </form>
  </section>

  <section class="results">
    <div class="results__item" data-index="3">
      <h5>Element 3</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae molestiae, illo corporis fugiat ipsam totam,
        molestias aspernatur atque, magni fugit eius iure consequuntur laboriosam ea a quis illum placeat rerum!
      </p>
    </div>

    <div class="results__item" data-index="2">
      <h5>Element 2</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae molestiae, illo corporis fugiat ipsam totam,
        molestias aspernatur atque, magni fugit eius iure consequuntur laboriosam ea a quis illum placeat rerum!
      </p>
    </div>

    <div class="results__item" data-index="1">
      <h5>Element 1</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae molestiae, illo corporis fugiat ipsam totam,
        molestias aspernatur atque, magni fugit eius iure consequuntur laboriosam ea a quis illum placeat rerum!
      </p>
    </div>
  </section>
</main>
`

export default template