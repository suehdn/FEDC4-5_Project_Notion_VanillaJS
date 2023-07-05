import Editor from "../components/Editor.js";
import { getDocumentContent, updateDocument } from "../utils/api.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import { debounce } from "../utils/debounce.js";

export default class EditorPage {
  // 여기서 state는 "new" 또는 "id"롤 체크르 하면 될것이다.
  //editor는 document가 선택되거나 ,add new 가 선택될태 화면이 랜더링 ,여리것 onSetState를 통해 로컬 저장, fetch 처리 등
  // 그렇다면 여기는 ininitState가 필요없다.state가 필요한가? 필요하면 어떤 형태?
  constructor({ $target, onEdit }) {
    this.$target = $target;
    this.$page = document.createElement("div");
    this.isRendered = false;
    this.editorComponent = new Editor({
      $target: this.$page,
      initialState: { title: "", content: "" },
      onSetState: (editorState) => {
        if (location.pathname === "/") return;

        const [_, api, id] = location.pathname.split("/");
        const TEMP_SAVE_KEY = `temp-${id}`;
        setItem(TEMP_SAVE_KEY, { ...editorState, tempSavedAt: new Date() });
        debounce(async () => {
          await updateDocument(`/${id}`, editorState);
          removeItem(TEMP_SAVE_KEY);
          onEdit();
        }, 3000);
      },
    });
  }

  render = () => {
    this.$target.appendChild(this.$page);
    this.isRendered = true;
  };
  setState = async () => {
    const { pathname } = location;
    if (pathname === "/" && this.isRendered) {
      this.$target.removeChild(this.$page);
      this.isRendered = false;
      return;
    }
    const [_, api, id] = pathname.split("/");
    if (id === undefined) {
      this.editorComponent.setState({ title: "", content: "" });
      return;
    }
    const { title, content, updatedAt } = await getDocumentContent(`/${id}`);
    const TEMP_SAVE_KEY = `temp-${id}`;
    const tempData = getItem(TEMP_SAVE_KEY, null);

    if (tempData && tempData.tempSavedAt > updatedAt) {
      if (confirm("임시저장된 데이터가 있습니다. 사용하시겠습니까?")) {
        const { title, content } = tempData;
        this.editorComponent.setState({ title, content });
        this.render();
        return;
      }
    }

    this.editorComponent.setState({ title, content });
    this.render();
  };
}
