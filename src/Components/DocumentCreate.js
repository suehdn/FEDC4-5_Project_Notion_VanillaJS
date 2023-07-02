import { DocumentModal } from "./DocumentModal.js";
export function DocumentCreate({$target, parentId, onClick, onSubmit}){

    // $form.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const $input = $form.querySelector('input');
    //     const content = $input.value;
    //     onSubmit(content);
    //     $input.value =''
    // })

    this.state = {
        parentId :null,
    }
    this.setState = (nextState) => {
        this.state = nextState;
    }
    this.render = () => {
        const $createBtn = document.createElement('button');
        $createBtn.className = 'createDoc';
        if (parentId === null){
            $createBtn.className = 'rootCreate'
        }
        $createBtn.textContent = '+';
        $target.append($createBtn);
    }
    $target.addEventListener('click', (e) => {
        const $createBtn = e.target.closest('button');
        if($createBtn){
            if($createBtn.classList.contains('rootCreate')){
                e.stopImmediatePropagation();
            }
            const { id }  = $createBtn.nextElementSibling.dataset
            console.log(id)
            if(id === undefined){
                const modal = new DocumentModal(null , onSubmit)
                modal.modalOpen();
                return
            }
            const modal = new DocumentModal(id , onSubmit)
            modal.modalOpen();
            onClick(parentId);
        }
    })
}