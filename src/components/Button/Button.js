import Component from '@core/Component';

export default class Button extends Component {
  template() {
    const { className, textContent } = this.props;
    return `
      <button class="${className}">
        ${textContent}
      </button>
    `;
  }

  setEvent() {
    const { className, onClick } = this.props;

    this.addEvent('click', `.${className}`, () => {
      onClick();
    });
  }
}
