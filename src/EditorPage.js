import { getItem } from './storage.js';
import { request } from './request.js';
import Editor from './Components/Editor.js'
export function EditorPage($target) {
    const $editorPage = document.createElement('div');
    $editorPage.className = 'EditorPage'
    let timer = null

    this.state = {
        id : null,
        title: '',
        content: ''
    }
    let postLocalSaveKey = `temp-post-${this.state.id}`
    const newDocument = getItem(postLocalSaveKey, {
        title:'',
        content: ''
    })
    const editor = new Editor({
        $target: $editorPage, 
        initialState: newDocument, 
        onEditing: (newDocument) => {
            if(timer !== null){
                clearTimeout(timer);
            }
            timer = setTimeout(async () => {
                setItem(postLocalSaveKey, {
                    ...newDocument,
                    tempSaveDate: new Date()
                })

                await request(`/documents/${this.state.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(newDocument)
                })
                removeItem(postLocalSaveKey)
            }, 2000)
        }
})

    this.render = () => {
        $target.appendChild($editorPage);
    }
    this.setState = async nextState => {
        if ( this.state.id !== nextState.id){
            postLocalSaveKey = `temp-post-${nextState.id}`
            this.state = nextState
            await fetchPost();
            return    
        }
            this.state = nextState
            this.render()
            editor.setState(this.state.post || {
                title:'',
                content:''
            });
        }

    const fetchPost = async() => {
        const { id } = this.state;
        const post = await request(`/documents/${id}`)  
        const tempPost = getItem(postLocalSaveKey, {
            title:'',
            content:''
        })
        if(tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at){
            if(confirm('저장되지 않은 임시데이터가 있습니다. 불러올까요?')){
                this.setState({
                    ...this.state,
                    post: tempPost
                })
                return
            }
        }
        this.setState({
            ...this.state,
            post
        })
    }
}