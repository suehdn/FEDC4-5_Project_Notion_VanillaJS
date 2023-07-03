
import { request } from './request.js';
import Editor from './Components/Editor.js';
import DocumentDelete from './Components/DocumentDelete.js';

export function EditorPage($target) {
    const $editorPage = document.createElement('div');
    $editorPage.className = 'EditorPage'
    let timer = null

    this.state = {
        id : null,
        post: {
            title: "",
            content: "",
        }
    }
    const editor = new Editor({
        $target: $editorPage, 
        initialState: this.state.post, 
        onEditing: (newDocument) => {
            if(timer !== null){
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                await request(`/documents/${this.state.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(newDocument)
                })
            }, 1000)
        }
    })
    const documentDelete = new DocumentDelete({$target: $editorPage, id : this.state.id})
    this.render = () => {
        $target.appendChild($editorPage);
    }
    this.setState = async nextState => {
        if (this.state.id !== nextState.id){
            this.state = nextState
            documentDelete.setState({id: this.state.id})
            await fetchPost();
            return    
        }
        this.state = nextState
        this.render()
        editor.setState(this.state.post || {
            title:'',
            content:''
        });
        documentDelete.setState({id: this.state.id})
    }

    const fetchPost = async() => {
        const { id } = this.state;
        const post = await request(`/documents/${id}`)
        this.setState({
            ...this.state,
            post
        })
    }
}