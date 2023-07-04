export const listMaker = (item, depth = 1) => {
  const $div = document.createElement("div");
  $div.innerHTML = eachItemMaker(item, depth);

  // 현재 document가 자식 document를 가지고 있으면
  const childItems = item.documents;
  if (childItems.length > 0) {
    const $ul = document.createElement("ul");
    childItems.forEach((child) => $ul.appendChild(listMaker(child, depth + 1)));
    $div.appendChild($ul);
  }
  return $div;
};

const eachItemMaker = (item, depth) => {
  return `<li style="padding-left: ${depth * 10}px;">${item.title}</li>`;
};
