export default function Modal({ props, ConstructorComponent }) {
  const $modal = document.createElement("div")
  let isInitialized = false
  $modal.className = "modal"

  this.onClose = () => {
    $modal.remove()
    document.querySelector("#modal").classList.remove("open")
  }

  this.render = () => {
    if (!isInitialized) {
      $modal.innerHTML = `
                <div class="modal-inner">
                    <button class="modal-close">X</button>
                    <div class="modal-content"></div>
                </div>
            `
    }
    isInitialized = true
    new ConstructorComponent({ $target: $modal.querySelector(".modal-content"), ...props })
    $modal.querySelector(".modal-close").addEventListener("click", this.onClose)
    document.querySelector("#modal").hasChildNodes()
      ? document.querySelector("#modal").replaceChild($modal, document.querySelector("#modal").firstChild)
      : document.querySelector("#modal").appendChild($modal)
    document.querySelector("#modal").classList.add("open")
  }

  this.render()
}
