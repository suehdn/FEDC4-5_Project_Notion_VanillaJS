import { registerStateSetter, stateSetters } from "@Utils/stateSetters";
import Document from "./Document";
import { NAME } from "@Utils/constants";
import Home from "./Home";

export default function App({ $target }) {
  const home = new Home({ $target });

  const hotionDocument = new Document({ $target });
  registerStateSetter(hotionDocument);

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      home.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      stateSetters[NAME.DOCUMENT]({ documentId });
    }
  };

  this.route();
}
