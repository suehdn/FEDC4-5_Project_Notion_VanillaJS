import { registerStateSetter } from "@Utils/stateSetters";
import Document from "./Document";
import Home from "./Home";
import router from "../router";

export default function App({ $target }) {
  const home = new Home({ $target });
  registerStateSetter(home);

  const hotionDocument = new Document({ $target });
  registerStateSetter(hotionDocument);

  const route = () => router({ $target });
  window.addEventListener("load", route);
  window.addEventListener("popstate", route);
}
