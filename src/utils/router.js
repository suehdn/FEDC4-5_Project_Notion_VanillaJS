import { NAME } from "@Utils/constants";
import { stateSetters } from "@Utils/stateSetters";

export default function router({ $target }) {
  const { pathname } = window.location;

  $target.innerHTML = "";

  if (pathname === "/") {
    stateSetters[NAME.HOME]({});
  } else if (pathname.indexOf("/documents/") === 0) {
    const [, , documentIdStr] = pathname.split("/");
    const documentId = parseInt(documentIdStr);
    stateSetters[NAME.DOCUMENT]({ documentId });
  }
}

export function routeToDocument(documentId) {
  history.pushState(null, null, `/documents/${documentId}`);
  window.dispatchEvent(new CustomEvent("route"));
}
