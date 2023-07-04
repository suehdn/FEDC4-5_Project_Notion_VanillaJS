import { push } from "../utils/router.js"

export default function DocumentLists({$target, initialState, onRemove, onCreate, onToggle}){

    const $documentLists = document.createElement("div")
    $target.appendChild($documentLists)
    $documentLists.className = "document__lists"

    this.state = initialState
    this.setState = nextState =>{
        console.log(nextState)
        this.state = nextState
        this.render()
    }

    this.render = () =>{ 
        $documentLists.innerHTML = createList(this.state)
    }

    const createList = (currentList) => {
        return `
        ${currentList.map(({title,documents,id})=>
            `<ul data-id="${id}">
                <div class="document__group">
                    <span>
                        <button class="toggle__button">></button>
                        ${title}
                    </span>
                    <div class="button__group">
                    <button class="create">+</button>
                    <button class="remove">x</button>
                    </div>
                </div>
                <li>${documents.length > 0 ? createList(documents) : ""}</li>
            </ul>`
        ).join("")}
        `
    }

    $documentLists.addEventListener("click", (e)=>{
        const {target} = e
        const $ul = target.closest("ul")

        if($ul){
            const {id} = $ul.dataset
            if(target.className === "remove"){
                onRemove(id)
            }else if(target.className === "create"){
                onCreate(id)
            }else if(target.className === "toggle__button"){
                onToggle()
            }else{
                push(`/documents/${id}`)
            }
        }

    })


    this.render()
}