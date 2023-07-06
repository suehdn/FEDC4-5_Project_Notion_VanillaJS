import './style.css';

export default function TextEditor({ $target, initialState, onEditing }) {
  const $titleEditor = document.createElement('input');
  $titleEditor.className = 'TitleEditor';

  const $textEditor = document.createElement('textarea');
  $textEditor.className = 'TextEditor';

  $target.appendChild($titleEditor);
  $target.appendChild($textEditor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { status, res } = this.state;

    if (!status && res) {
      $titleEditor.value = res.title;
      $textEditor.value = res.content ? res.content : '';
    }
  };

  const onKeyUp = () => {
    const { id } = this.state.res;
    onEditing(id, { title: $titleEditor.value ? $titleEditor.value : '제목 없음', content: $textEditor.value });
  };

  $titleEditor.addEventListener('keyup', onKeyUp);
  $textEditor.addEventListener('keyup', onKeyUp);
}
