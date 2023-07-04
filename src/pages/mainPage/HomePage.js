import { homePageMessages } from '../../constants';
import { validateComponent } from '../../utils/validation';

export default function HomePage({ $target }) {
  validateComponent(new.target);

  const $homePage = document.createElement('div');
  $homePage.classList.add('home-page');

  this.render = () => {
    $target.appendChild($homePage);
    $homePage.innerHTML = `
    <h1 class="home-title">📝${homePageMessages.HOME_TITLE}</h1>
    <ul class="home-list">
      <li class="home-list__text">✅${homePageMessages.ADD_PAGE_MESSAGE}</li><br>
      <li class="home-list__text">✅${homePageMessages.ADD_BUTTON_MESSAGE} ${homePageMessages.DELETE_BUTTON_MESSAGE}</li><br>
      <li class="home-list__text">✅${homePageMessages.BACK_TO_HOME}</li>
    </ul>
    `;
  };

  this.render();
}
