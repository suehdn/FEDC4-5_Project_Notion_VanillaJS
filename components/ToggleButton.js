export default function ToggleButton({ $target, onClick }) {
  const $toggleBtn = document.createElement("button");
  $toggleBtn.className = "toggle-btn2";
  $toggleBtn.textContent = "<<";

  $target.appendChild($toggleBtn);

  $toggleBtn.addEventListener("click", () => {
    onClick();
  });
}
