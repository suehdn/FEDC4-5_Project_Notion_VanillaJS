import { NAME } from "@Utils/constants";
import { stateSetters } from "@Utils/stateSetters";

export default function router({ $target }) {
  const { pathname } = window.location;

  $target.innerHTML = "";

  if (pathname === "/") {
    stateSetters[NAME.HOME]({});
  } else if (pathname.indexOf("/documents/") === 0) {
    const [, , documentId] = pathname.split("/");
    stateSetters[NAME.DOCUMENT]({ documentId });
  }
}
