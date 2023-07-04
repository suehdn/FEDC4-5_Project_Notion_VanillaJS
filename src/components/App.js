import { registerStateSetter, stateSetters } from "@Utils/stateSetters";
import Document from "./Document";
import { NAME } from "@Utils/constants";

export default function App({ $target }) {
  const hotionDocument = new Document({ $target });
  registerStateSetter(hotionDocument);

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      stateSetters[NAME.DOCUMENT]({ documentId: 0 });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      stateSetters[NAME.DOCUMENT]({ documentId });
    }
  };

  this.route();
}
