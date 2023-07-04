import Editor from "../components/Editor.js"
import {putDocument ,fetchEditor} from "../utils/requset.js"
import { push, update} from "../utils/router.js"

export default function EditorPage({$target, initialState}){
    const $page = document.createElement("div")
    $page.className = "editor__page"

    this.render = ()=>{
        $target.appendChild($page)
    }

    this.state = initialState
    this.setState = async nextState =>{
        this.state = nextState
        const document = await fetchEditor(this.state.documentId)
        if(document !== undefined){
            editor.setState(document)
            this.render()
        }else{
            push("/")
        }
    }

    let timer = null;
    const editor = new Editor({
        $target : $page,
        initialState :{
            title : "",
            content :""},
        onEditing : (document)=>{
            if(timer !== null){
                clearTimeout(timer)
            }
            timer = setTimeout(async ()=>{
                const newDocument = await putDocument(document)
                //타이틀이 다를때만 업데이트 될수있도록 하는 방법 
                update()
            }, 800)
        }
    })

}