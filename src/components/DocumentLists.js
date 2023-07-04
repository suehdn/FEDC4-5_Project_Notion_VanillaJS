import { push } from "../utils/router.js"
import {createList} from "./CreateLists.js"

export default function DocumentLists({$target, initialState, onRemove, onCreate, onToggle}){

    const $documentLists = document.createElement("div")
    $target.appendChild($documentLists)
    $documentLists.className = "document__lists"

    this.state =initialState
    this.setState = nextState =>{
        console.log(nextState)
        this.state = nextState
        this.render()
    }

    this.render = () =>{ 
        $documentLists.innerHTML = createList(this.state)
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
                const $div = $ul.lastElementChild
                $div.className === "hide" ? $div.className = "" : $div.className = "hide"
            }else{
                push(`/documents/${id}`)
            }
        }

    })


    this.render()
}