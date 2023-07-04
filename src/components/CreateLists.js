export const createList = (currentList) => {
    return `
    ${currentList.map(({title,documents,id})=>
        `
        <ul data-id="${id}">
            <div class="document__title">
                <span>
                    <button class="toggle__button">></button>
                    ${title === "" ? "제목없음" : title}
                </span>
                <div>
                <button class="create">+</button>
                <button class="remove">x</button>
                </div>
            </div>
            <div>
            <li>${documents.length > 0 ? createList(documents) : ""}</li>
            </div>
        </ul>`
    ).join("")}
    `
}