export default class Button {
  constructor({ $target, className, textContent, onClick }) {
    this.$createButton = document.createElement('button');

    this.$createButton.className = className;
    this.$createButton.textContent = textContent;

    $target.appendChild(this.$createButton);

    this.setEvent(onClick);
  }

  setEvent(callback) {
    this.$createButton.addEventListener('click', () => {
      callback?.();
    });
  }
}
