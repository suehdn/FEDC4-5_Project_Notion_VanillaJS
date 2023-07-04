//onSetState로 state 변경시 로컬에 바로 저장하고 디바운스로 5초로 api 호출을 하도록한다. 호출이 완료되면 로컬
export default class Editor {
  constructor({ $target, initialState = { title: "", content: "" }, onSetState }) {
    this.$target = $target;
    this.state = initialState;
    this.$page = document.createElement("div");

    this.$title = document.createElement("input");
    this.$title.setAttribute("name", "title");
    this.$content = document.createElement("textarea");
    this.$content.setAttribute("name", "content");

    this.$page.append(this.$title, this.$content);
    // defaultstate가 필요? 테스트 위해 일단 넣자
    //state = {title, content}
    this.$page.addEventListener("input", (e) => {
      const { target } = e;
      const { name } = target;
      // input이 들어오면 setstate에서 변경,
      this.setState({ ...this.state, [name]: target.value });
      onSetState(this.state);
      target.focus();
    });

    this.render();
  }

  render = () => {
    this.$title.value = this.state.title;
    this.$content.value = this.state.content;
    this.$target.appendChild(this.$page);
  };

  setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };
}
