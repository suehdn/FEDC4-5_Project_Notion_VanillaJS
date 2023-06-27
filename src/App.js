export default function App({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
  };

  this.render = () => {
    targetElement.innerHTML = `
      <span>hi</span>
    `;
  };

  this.init();
  this.render();
}
