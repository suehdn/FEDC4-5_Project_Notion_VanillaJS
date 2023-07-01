import './style.css';

export default function Header({ $target }) {
  const $Header = document.createElement('header');
  $Header.className = 'Header';
  $Header.textContent = '노션 클로닝 웹 앱입니당.';

  $target.appendChild($Header);
}
