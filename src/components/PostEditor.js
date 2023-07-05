export default function PostEditor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div');

  this.state = initialState;

  $editor.innerHTML = `
        <div name="title" contentEditable="true" style="width : 600px; height: 30px; box-sizing : border-box; border : 1px solid black;"></div>
        <div name="content" contentEditable="true" style="width : 600px; height : 600px; box-sizing : border-box; padding : 8px; margin-top : 10px; border : 1px solid black;"></div>`;

  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.template = () => {};

  this.render = () => {
    const richContent = (this.state.content || '')
      .split('\n')
      .map((line) => {
        if (line.indexOf('# ') === 0) {
          return `<h1>${line.substring(2)}</h1>`;
        } else if (line.indexOf('## ') === 0) {
          return `<h2>${line.substring(3)}</h2>`;
        } else if (line.indexOf('### ') === 0) {
          return `<h3>${line.substring(4)}</h3>`;
        }
        return line;
      })
      .join('<br>');

    $editor.querySelector('[name=title]').innerHTML = this.state.title;
    $editor.querySelector('[name=content]').innerHTML = richContent;
    (this.state.content || '').replace(/\n/g, '<br>');
  };

  this.render();

  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.innerHTML,
    };

    onEditing(nextState);
  });

  $editor.querySelector('[name=content]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerText,
    };

    onEditing(nextState);
  });

  $editor.querySelector('[name=title]').addEventListener('blur', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.innerHTML,
    };

    this.setState(nextState);
  });

  $editor.querySelector('[name=content]').addEventListener('blur', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerText,
    };

    this.setState(nextState);
  });
}
