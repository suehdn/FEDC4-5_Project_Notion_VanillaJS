import { push } from '@router';
import request from '@api';
import './style.css';

export default function SideBar({ $target, initialState = [] }) {
  const $sideBar = document.createElement('div');
  $sideBar.className = 'SideBar';

  $target.appendChild($sideBar);

  this.state = initialState;

  this.setState = async () => {
    const nextState = await request('/documents');
    this.state = nextState;
    this.render();
  };

  this.renderDocuments = (documents) =>
    documents
      .map(
        ({ id, title, documents }) => `
        <ul data-id=${id}>
          <li class="TitleWrapper" style="display:flex">
            <div class="TitleWrapperHeader">
              <h4 class="Title">${title}</h4>
              <button data-id="single">문서 추가</button>
            </div>
            <span class="Content">${
              documents.length ? `${this.renderDocuments(documents)}` : '하위 문서가 없습니다. 🤔'
            }</span>
          </li>
        </ul>
      `,
      )
      .join('');

  $sideBar.innerHTML = `
      <div class="Documents">
        <div class="DocumentsWrapper"></div>
        <button data-id="root">루트 문서들 불러오기 🫚</button>
      </div>
    `;

  this.render = () => {
    $sideBar.querySelector('.DocumentsWrapper').innerHTML = this.renderDocuments(this.state);
  };

  $sideBar.addEventListener('click', ({ target }) => {
    if (target.closest('h4')) {
      const nextElem = target.closest('h4').parentElement.nextElementSibling;
      console.log(nextElem);
      if (nextElem && nextElem.tagName === 'SPAN') {
        // Add this condition to check if the nextElem is a span tag
        if (nextElem.style.transform === 'scaleY(0)') {
          nextElem.style.transform = 'scaleY(1)';
        } else {
          nextElem.style.transform = 'scaleY(0)';
        }
      }
      return;
    }

    if (!target.closest('button')) return;
    const { id } = target.closest('button').dataset;
    // console.log(id);
    if (id === 'root') {
      this.setState();
      push('/documents');
    } else if (confirm(`문서를 추가하시겠습니까?`)) {
      const { id } = target.closest('li').dataset;
      push(`/documents/${id}/new`);
    }
  });
}
