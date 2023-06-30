export default function Button({ targetElement, textContent, onClick }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.setEvent = () => {
    targetElement.addEventListener('click', onClick);
  };

  this.render = () => {
    targetElement.textContent = textContent;
  };

  this.init();
}
