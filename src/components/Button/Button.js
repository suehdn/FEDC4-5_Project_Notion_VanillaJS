import Component from '@core/Component';

export default class Button extends Component {
  initComponent() {
    const { className, textContent } = this.props;
    this.$createButton = document.createElement('button');

    this.$createButton.className = className;
    this.$createButton.textContent = textContent;

    this.$target.appendChild(this.$createButton);
  }

  setEvent() {
    const { onClick } = this.props;
    this.$createButton.addEventListener('click', () => {
      onClick();
    });
  }
}
