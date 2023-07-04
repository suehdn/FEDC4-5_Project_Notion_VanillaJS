import { editDocumentMessages } from '../../constants';

export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  editDocument,
}) {
  const $editor = document.createElement('div');
  $editor.classList.add('main-editor');
  $target.appendChild($editor);

  this.state = initialState;

  // 초기 상태에서 메시지가 표시되고, 클릭 시 해당 메시지가 사라지도록 처리
  const handleTitleInputClick = (e) => {
    if (e.target.value === `${editDocumentMessages.INITIAL_DOCUMENT_TITLE}`) {
      e.target.value = '';
      e.target.removeEventListener('click', handleTitleInputClick);
    }
  };
  // 전역 범위에 함수 정의
  window.handleTitleInputClick = handleTitleInputClick;

  this.setState = (nextState) => {
    this.state = nextState;
    const { title, content } = this.state;
    // 요기도
    $editor.querySelector('[name=title]').value = title;
    $editor.querySelector('[name=content]').value = content;
  };

  this.render = () => {
    const { title, content } = this.state;
    const titleValue = title === `${editDocumentMessages.INITIAL_DOCUMENT_TITLE}` ? '' : title;
    $editor.innerHTML = `
      <input class="editor-title" type="text" name="title" placeholder='${editDocumentMessages.DOCUMENT_TITLE_PLACEHOLDER}' value="${titleValue}" onclick="handleInputClick(e)">
      <textarea class="editor-content" name="content" placeholder='${editDocumentMessages.DOCUMENT_CONTENT_PLACEHOLDER}'>${content}</textarea>
    `;
  };

  this.render();

  // 이 부분 수정
  $editor.querySelector('[name=title]').addEventListener('click', handleTitleInputClick);
  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = { ...this.state, title: e.target.value };
    this.setState(nextState);
    editDocument(this.state);
  });

  $editor.querySelector('[name=content]').addEventListener('input', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.value,
    };
    this.setState(nextState);
    editDocument(this.state);
  });
}
