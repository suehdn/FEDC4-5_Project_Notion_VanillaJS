export default function NotFoundPage({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = () => {
    targetElement.innerHTML = '존재하지 않는 페이지 입니다.';
  };

  this.init();
}
