import Component from '@core/Component';

export default class Button extends Component {
  initComponent() {
    const { className, textContent } = this.props;
    this.$button = document.createElement('button');

    this.$button.className = className;
    this.$button.textContent = textContent;

    this.$target.appendChild(this.$button);
  }

  setEvent() {
    const { onClick } = this.props;
    this.$button.addEventListener('click', () => {
      onClick();
    });
  }
}
