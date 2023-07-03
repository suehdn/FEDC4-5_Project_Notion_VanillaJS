import { isConstructor } from "@Utils/validation";

export default function Document({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $textarea = document.createElement("textarea");
  $target.appendChild($textarea);
}
