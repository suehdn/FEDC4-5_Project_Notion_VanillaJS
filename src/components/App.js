import DocumentListPage from "./document/DocumentListPage";
import store from "../util/store.js";

export default class App {
  constructor({ $target }) {
    this.$target = $target;
    this.store = new store();
    this.render();
  }

  render() {
    // const { store } = this.store;
    // console.log(store);
    new DocumentListPage({ $target: this.$target, store: this.store });
  }
}
