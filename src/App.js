import { EditorPage } from "./EditorPage.js";
import { DocumentPage } from "./DocumentPage.js";
import { initRouter } from "./router.js";

export default function App ($target) {
    const $app = document.createElement('div');
    $app.className = 'mainApp'
    const editorPage = new EditorPage($app);
    const documentPage = new DocumentPage($app);

    $target.appendChild($app);
    //전역관리 state (현재 선택된 node가 무엇인지 관리해준다.)
    this.state = {
        selectedDocument : {
            id : 'new',
            title: ''
        } //노드로 바꿔주기(현재 선택된 친구)
    }


    //router 설정하는 친구 
    this.route = () => {
        const { pathname } = window.location;
        console.log(pathname);
        if (pathname.indexOf('/documents/') === 0){
            console.log("안녕")
            const [, , documentId] = pathname.split('/');
            editorPage.setState({...editorPage.state, id : documentId});
        }
    }
    this.render = () => {
        documentPage.render();
        const { pathname } = window.location;
        const [, , documentId] = pathname.split('/');
        if(documentId){
            editorPage.setState({...editorPage.state, id: documentId})
        }
    }
    this.render();
    initRouter({onRoute : () => this.route()});
}