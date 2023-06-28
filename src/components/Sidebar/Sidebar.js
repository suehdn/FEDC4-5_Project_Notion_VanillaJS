export default class Sidebar {
  constructor({ $target }) {
    this.$target = $target;
    this.render();
  }

  render() {
    this.$target.innerHTML = `우하하 사이드바인데요`;
  }
}